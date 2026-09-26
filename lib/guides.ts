import enGuides from "@/messages/en/guides.json";
import viGuides from "@/messages/vi/guides.json";

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  paragraphsAfter?: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublished: string;
  readingMinutes: number;
  related?: string[];
  intro: string[];
  sections: GuideSection[];
  faq?: GuideFaq[];
  takeaway?: string;
};

export type GuideIndexCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  title: string;
  subtitle: string;
  readingSuffix: string;
  readMore: string;
  relatedTitle: string;
  tocTitle: string;
  faqTitle: string;
  takeawayTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  updatedLabel: string;
};

export type GuideBundle = {
  index: GuideIndexCopy;
  articles: GuideArticle[];
};

/** Guides are written by hand, so they only exist where a human wrote them. */
export const GUIDE_LOCALES = ["vi", "en"] as const;
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

const BUNDLES: Record<GuideLocale, GuideBundle> = {
  vi: viGuides as GuideBundle,
  en: enGuides as GuideBundle,
};

export const GUIDES_PATH = "guides";

export function hasGuides(locale: string): locale is GuideLocale {
  return (GUIDE_LOCALES as readonly string[]).includes(locale);
}

export function getGuideBundle(locale: string): GuideBundle | null {
  return hasGuides(locale) ? BUNDLES[locale] : null;
}

export function getGuide(locale: string, slug: string): GuideArticle | null {
  return getGuideBundle(locale)?.articles.find((a) => a.slug === slug) ?? null;
}

/** Every locale/slug pair, for generateStaticParams. */
export function guideParams(): Array<{ locale: GuideLocale; slug: string }> {
  return GUIDE_LOCALES.flatMap((locale) =>
    BUNDLES[locale].articles.map((article) => ({ locale, slug: article.slug })),
  );
}

/**
 * Articles line up one-to-one across locales by position, so the same topic can
 * be linked with hreflang even though each locale has its own slug.
 */
export function guideSlugAlternates(
  locale: string,
  slug: string,
): Partial<Record<GuideLocale, string>> {
  if (!hasGuides(locale)) return {};
  const index = BUNDLES[locale].articles.findIndex((a) => a.slug === slug);
  if (index < 0) return {};

  const out: Partial<Record<GuideLocale, string>> = {};
  for (const other of GUIDE_LOCALES) {
    const match = BUNDLES[other].articles[index];
    if (match) out[other] = match.slug;
  }
  return out;
}

export function relatedGuides(locale: string, article: GuideArticle): GuideArticle[] {
  const bundle = getGuideBundle(locale);
  if (!bundle || !article.related?.length) return [];
  return article.related
    .map((slug) => bundle.articles.find((a) => a.slug === slug))
    .filter((a): a is GuideArticle => Boolean(a));
}
