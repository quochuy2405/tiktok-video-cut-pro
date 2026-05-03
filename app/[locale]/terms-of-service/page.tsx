import { setRequestLocale } from "next-intl/server";

import { LegalDocumentView } from "@/components/legal-document";
import type { AppLocale } from "@/i18n/routing";
import { loadTerms } from "@/lib/load-legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = loadTerms(locale as AppLocale);
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
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
