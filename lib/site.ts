import { APP_NAME } from "@/lib/brand";
import { routing, type AppLocale } from "@/i18n/routing";

/** Prefer production domain; override with NEXT_PUBLIC_SITE_URL when deploying. */
const FALLBACK_SITE_URL = "https://fivecutpro.com";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // Do NOT fall back to VERCEL_URL because Vercel auto-injects an internal deployment URL
  // (e.g. *.vercel.app) which has Vercel SSO / deployment protection enabled,
  // blocking Facebook/Zalo/Twitter crawlers from accessing og:image with HTTP 302.
  return FALLBACK_SITE_URL;
}

export function absoluteUrl(pathname = "/"): string {
  const base = getSiteUrl();
  if (!pathname || pathname === "/") return base;
  return `${base}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/**
 * Localized path:
 * - Default locale (vi): `/` or `/privacy-policy` (no prefix)
 * - Alternate locales (en): `/en` or `/en/privacy-policy`
 */
export function localePath(locale: string, path = ""): string {
  const normalized = path.replace(/^\//, "");
  if (locale === routing.defaultLocale) {
    return normalized ? `/${normalized}` : "/";
  }
  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

export function absoluteLocaleUrl(locale: string, path = ""): string {
  return absoluteUrl(localePath(locale, path));
}

/** Plain-text copies for AI crawlers. Child pages must repeat this: they replace `alternates`. */
export function llmAlternateTypes(): Record<string, string> {
  return {
    "text/plain": absoluteUrl("/llms.txt"),
    "text/markdown": absoluteUrl("/llms-full.txt"),
  };
}

export function hreflangAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteLocaleUrl(locale, path);
  }
  languages["x-default"] = absoluteLocaleUrl(routing.defaultLocale, path);
  return languages;
}

export function openGraphLocale(locale: string): string {
  switch (locale) {
    case "vi":
      return "vi_VN";
    case "zh":
      return "zh_CN";
    case "th":
      return "th_TH";
    case "ja":
      return "ja_JP";
    case "ko":
      return "ko_KR";
    default:
      return "en_US";
  }
}

export function openGraphAlternateLocales(locale: string): string[] {
  return routing.locales
    .filter((l) => l !== locale)
    .map((l) => openGraphLocale(l));
}

export const SITE = {
  name: APP_NAME,
  shortName: "Five",
  email: "support@fivecutpro.com",
  partnerEmail: "partner@fivecutpro.com",
  partnerPhone: "0388 387 471",
  copyrightHolder: "Five Cut Pro Asia",
  defaultLocale: routing.defaultLocale as AppLocale,
  locales: routing.locales as readonly AppLocale[],
} as const;

/** Opens Gmail compose in the browser instead of the OS default mail client. */
export function gmailComposeUrl(email: string = SITE.email): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

/** BCP-47 tag per locale, for schema.org inLanguage and feeds. */
const LOCALE_TAGS: Record<string, string> = {
  vi: "vi-VN",
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  th: "th-TH",
};

export function localeTag(locale: string): string {
  return LOCALE_TAGS[locale] ?? LOCALE_TAGS.vi;
}

export function allLocaleTags(): string[] {
  return routing.locales.map((l) => localeTag(l));
}

/** Last real content update — sitemap lastModified, not the build clock. */
export const CONTENT_UPDATED = "2026-09-26";

export const MARKETING_PATHS = [
  "",
  "brands",
  "vs-capcut",
  "privacy-policy",
  "terms-of-service",
  "eula",
  "delete-account",
] as const;

export const SOCIAL_LINKS = {
  threads: "https://www.threads.net/@fivecutpro",
  instagram: "https://www.instagram.com/fivecutpro",
  youtube: "https://www.youtube.com/@fivecutpro",
} as const;

/** Shared social preview image (1200×630). */
export const OG_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Five Cut Pro — Chọn mẫu, quay shot, ghép video bán hàng cho KOC",
} as const;

/** Open Graph / Twitter share copy — luôn tiếng Việt (thị trường chính). */
export const OG_VI = {
  title: "Five Cut Pro — Chọn Mẫu · Quay Shot · Ghép Video Bán Hàng",
  description:
    "App trên điện thoại cho KOC & nhà bán hàng: chợ mẫu KOC, hướng dẫn quay từng shot, ghép và xuất sẵn đăng TikTok — và nhận chiến dịch từ nhãn hàng.",
  twitterDescription:
    "Không cần biết edit. Chọn mẫu → quay đúng shot → app ghép → xuất & chia sẻ TikTok. Nhận chiến dịch từ nhãn hàng ngay trong app.",
  imageAlt:
    "Five Cut Pro — Chọn mẫu, quay shot, ghép video bán hàng cho KOC",
} as const;
