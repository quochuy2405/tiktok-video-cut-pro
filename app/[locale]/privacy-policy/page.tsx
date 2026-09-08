import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalDocumentView } from "@/components/legal-document";
import type { AppLocale } from "@/i18n/routing";
import { APP_NAME } from "@/lib/brand";
import { loadPrivacy } from "@/lib/load-legal";
import {
  absoluteLocaleUrl,
  absoluteUrl,
  hreflangAlternates,
  OG_IMAGE,
  OG_VI,
} from "@/lib/site";

const PATH = "privacy-policy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = loadPrivacy(locale as AppLocale);

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
      locale: "vi_VN",
      type: "article",
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          secureUrl: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_VI.imageAlt,
          type: OG_IMAGE.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.metaTitle,
      description: doc.metaDescription,
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_VI.imageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const doc = loadPrivacy(locale as AppLocale);
  return <LegalDocumentView doc={doc} />;
}
