import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { GuideIndexView } from "@/components/guide-views";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildContentPageJsonLd,
} from "@/components/json-ld";
import { APP_NAME } from "@/lib/brand";
import {
  GUIDES_PATH,
  GUIDE_LOCALES,
  getGuideBundle,
} from "@/lib/guides";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  llmAlternateTypes,
  OG_IMAGE,
  openGraphAlternateLocales,
  openGraphLocale,
} from "@/lib/site";

export function generateStaticParams() {
  return GUIDE_LOCALES.map((locale) => ({ locale }));
}

/** Guides exist only where a human wrote them, so hreflang lists just those. */
function guideLanguages(): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of GUIDE_LOCALES) {
    languages[locale] = absoluteLocaleUrl(locale, GUIDES_PATH);
  }
  languages["x-default"] = absoluteLocaleUrl("vi", GUIDES_PATH);
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const bundle = getGuideBundle(locale);
  if (!bundle) return {};

  const { index } = bundle;
  return {
    title: index.metaTitle,
    description: index.metaDescription,
    alternates: {
      canonical: absoluteLocaleUrl(locale, GUIDES_PATH),
      languages: guideLanguages(),
      types: llmAlternateTypes(),
    },
    openGraph: {
      title: index.metaTitle,
      description: index.metaDescription,
      url: absoluteLocaleUrl(locale, GUIDES_PATH),
      siteName: APP_NAME,
      locale: openGraphLocale(locale),
      alternateLocale: openGraphAlternateLocales(locale),
      type: "website",
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: index.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: index.metaTitle,
      description: index.metaDescription,
      images: [absoluteUrl(OG_IMAGE.path)],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuidesIndexRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bundle = getGuideBundle(locale);
  if (!bundle) notFound();

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const { index, articles } = bundle;

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd(locale, GUIDES_PATH, tNav("home"), index.breadcrumb),
          ...buildContentPageJsonLd({
            locale,
            path: GUIDES_PATH,
            name: index.metaTitle,
            description: index.metaDescription,
            type: "CollectionPage",
          }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: index.title,
            itemListElement: articles.map((article, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: article.title,
              url: absoluteLocaleUrl(locale, `${GUIDES_PATH}/${article.slug}`),
            })),
          },
        ]}
      />
      <GuideIndexView copy={index} articles={articles} homeLabel={tNav("home")} />
    </>
  );
}
