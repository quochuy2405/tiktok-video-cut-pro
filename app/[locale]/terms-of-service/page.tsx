import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalDocumentView } from "@/components/legal-document";
import type { AppLocale } from "@/i18n/routing";
import { APP_NAME } from "@/lib/brand";
import { loadTerms } from "@/lib/load-legal";
import {
  absoluteLocaleUrl,
  hreflangAlternates,
  OG_IMAGE,
  openGraphLocale,
} from "@/lib/site";

const PATH = "terms-of-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = loadTerms(locale as AppLocale);

  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    alternates: {
      canonical: absoluteLocaleUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
    openGraph: {
      title: doc.metaTitle,
      description: doc.metaDescription,
      url: absoluteLocaleUrl(locale, PATH),
      siteName: APP_NAME,
      locale: openGraphLocale(locale),
      type: "article",
      images: [
        {
          url: OG_IMAGE.path,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
          type: OG_IMAGE.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.metaTitle,
      description: doc.metaDescription,
      images: [OG_IMAGE.path],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const doc = loadTerms(locale as AppLocale);
  return <LegalDocumentView doc={doc} />;
}
