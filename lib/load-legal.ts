import enPrivacy from "@/messages/en/privacy.json";
import enTerms from "@/messages/en/terms.json";
import viPrivacy from "@/messages/vi/privacy.json";
import viTerms from "@/messages/vi/terms.json";
import type { AppLocale } from "@/i18n/routing";
import type { LegalDocument } from "@/types/legal";

export function loadTerms(locale: AppLocale): LegalDocument {
  return (locale === "en" ? enTerms : viTerms) as LegalDocument;
}

export function loadPrivacy(locale: AppLocale): LegalDocument {
  return (locale === "en" ? enPrivacy : viPrivacy) as LegalDocument;
}
