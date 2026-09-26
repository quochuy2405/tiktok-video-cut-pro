import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ComparePage } from "@/components/compare-page";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildContentPageJsonLd,
} from "@/components/json-ld";
import { APP_NAME } from "@/lib/brand";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  hreflangAlternates,
  llmAlternateTypes,
  OG_IMAGE,
  openGraphAlternateLocales,
  openGraphLocale,
} from "@/lib/site";
import type { ComparePageCopy } from "@/types/pages";

const PATH = "vs-capcut";

async function copy(locale: string): Promise<ComparePageCopy> {
  const t = await getTranslations({ locale, namespace: "Landing" });
  return t.raw("comparePage") as ComparePageCopy;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await copy(locale);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: absoluteLocaleUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
      types: llmAlternateTypes(),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteLocaleUrl(locale, PATH),
      siteName: APP_NAME,
      locale: openGraphLocale(locale),
      alternateLocale: openGraphAlternateLocales(locale),
      type: "website",
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          secureUrl: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: page.metaTitle,
          type: OG_IMAGE.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [absoluteUrl(OG_IMAGE.path)],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CompareRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await copy(locale);
  const tNav = await getTranslations({ locale, namespace: "Nav" });

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd(locale, PATH, tNav("home"), page.breadcrumb),
          ...buildContentPageJsonLd({
            locale,
            path: PATH,
            name: page.metaTitle,
            description: page.metaDescription,
            faqItems: page.faq,
          }),
        ]}
      />
      <ComparePage />
    </>
  );
}
