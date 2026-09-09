import enPrivacy from "@/messages/en/privacy.json";
import enTerms from "@/messages/en/terms.json";
import enEula from "@/messages/en/eula.json";
import viPrivacy from "@/messages/vi/privacy.json";
import viTerms from "@/messages/vi/terms.json";
import viEula from "@/messages/vi/eula.json";
import zhPrivacy from "@/messages/zh/privacy.json";
import zhTerms from "@/messages/zh/terms.json";
import zhEula from "@/messages/zh/eula.json";
import thPrivacy from "@/messages/th/privacy.json";
import thTerms from "@/messages/th/terms.json";
import thEula from "@/messages/th/eula.json";
import jaPrivacy from "@/messages/ja/privacy.json";
import jaTerms from "@/messages/ja/terms.json";
import jaEula from "@/messages/ja/eula.json";
import type { AppLocale } from "@/i18n/routing";
import type { LegalDocument } from "@/types/legal";

const TERMS_BY_LOCALE: Record<AppLocale, LegalDocument> = {
  vi: viTerms as LegalDocument,
  en: enTerms as LegalDocument,
  zh: zhTerms as LegalDocument,
  th: thTerms as LegalDocument,
  ja: jaTerms as LegalDocument,
};

const PRIVACY_BY_LOCALE: Record<AppLocale, LegalDocument> = {
  vi: viPrivacy as LegalDocument,
  en: enPrivacy as LegalDocument,
  zh: zhPrivacy as LegalDocument,
  th: thPrivacy as LegalDocument,
  ja: jaPrivacy as LegalDocument,
};

const EULA_BY_LOCALE: Record<AppLocale, LegalDocument> = {
  vi: viEula as LegalDocument,
  en: enEula as LegalDocument,
  zh: zhEula as LegalDocument,
  th: thEula as LegalDocument,
  ja: jaEula as LegalDocument,
};

export function loadTerms(locale: AppLocale): LegalDocument {
  return TERMS_BY_LOCALE[locale] ?? TERMS_BY_LOCALE.en;
}

export function loadPrivacy(locale: AppLocale): LegalDocument {
  return PRIVACY_BY_LOCALE[locale] ?? PRIVACY_BY_LOCALE.en;
}

export function loadEula(locale: AppLocale): LegalDocument {
  return EULA_BY_LOCALE[locale] ?? EULA_BY_LOCALE.en;
}
