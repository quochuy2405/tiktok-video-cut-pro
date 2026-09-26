import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuideArticleView } from "@/components/guide-views";
import { JsonLd, buildBreadcrumbJsonLd } from "@/components/json-ld";
import { APP_NAME } from "@/lib/brand";
import {
  GUIDES_PATH,
  getGuide,
  getGuideBundle,
  guideParams,
  guideSlugAlternates,
  relatedGuides,
} from "@/lib/guides";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  llmAlternateTypes,
  localeTag,
  OG_IMAGE,
  openGraphAlternateLocales,
  openGraphLocale,
  SITE,
} from "@/lib/site";

export function generateStaticParams() {
  return guideParams();
}

function articleLanguages(locale: string, slug: string): Record<string, string> {
  const languages: Record<string, string> = {};
  const alternates = guideSlugAlternates(locale, slug);
  for (const [otherLocale, otherSlug] of Object.entries(alternates)) {
    languages[otherLocale] = absoluteLocaleUrl(
      otherLocale,
      `${GUIDES_PATH}/${otherSlug}`,
    );
  }
  if (alternates.vi) {
    languages["x-default"] = absoluteLocaleUrl(
      "vi",
      `${GUIDES_PATH}/${alternates.vi}`,
    );
  }
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getGuide(locale, slug);
  if (!article) return {};

  const url = absoluteLocaleUrl(locale, `${GUIDES_PATH}/${slug}`);
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: url,
      languages: articleLanguages(locale, slug),
      types: llmAlternateTypes(),
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      siteName: APP_NAME,
      locale: openGraphLocale(locale),
      alternateLocale: openGraphAlternateLocales(locale),
      type: "article",
      publishedTime: article.datePublished,
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: article.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [absoluteUrl(OG_IMAGE.path)],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuideArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const bundle = getGuideBundle(locale);
  const article = getGuide(locale, slug);
  if (!bundle || !article) notFound();

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const url = absoluteLocaleUrl(locale, `${GUIDES_PATH}/${slug}`);

  const jsonLd: Array<Record<string, unknown>> = [
    buildBreadcrumbJsonLd(locale, GUIDES_PATH, tNav("home"), bundle.index.breadcrumb),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      url,
      mainEntityOfPage: url,
      inLanguage: localeTag(locale),
      datePublished: article.datePublished,
      dateModified: article.datePublished,
      wordCount: [
        ...article.intro,
        ...article.sections.flatMap((s) => [
          s.heading,
          ...(s.paragraphs || []),
          ...(s.bullets || []),
          ...(s.paragraphsAfter || []),
        ]),
      ]
        .join(" ")
        .split(/\s+/).length,
      image: absoluteUrl(OG_IMAGE.path),
      author: {
        "@type": "Organization",
        name: SITE.copyrightHolder,
        url: absoluteUrl(`/${SITE.defaultLocale}`),
      },
      publisher: {
        "@type": "Organization",
        name: SITE.copyrightHolder,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
        },
      },
      about: {
        "@type": "SoftwareApplication",
        name: APP_NAME,
      },
    },
  ];

  if (article.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: localeTag(locale),
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <GuideArticleView
        copy={bundle.index}
        article={article}
        related={relatedGuides(locale, article)}
        homeLabel={tNav("home")}
      />
    </>
  );
}
