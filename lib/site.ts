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

export function hreflangAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteLocaleUrl(locale, path);
  }
  languages["x-default"] = absoluteLocaleUrl(routing.defaultLocale, path);
  return languages;
}

export function openGraphLocale(locale: string): string {
  return locale === "vi" ? "vi_VN" : "en_US";
}

export function openGraphAlternateLocales(locale: string): string[] {
  return routing.locales
    .filter((l) => l !== locale)
    .map((l) => openGraphLocale(l));
}

export const SITE = {
  name: APP_NAME,
  shortName: "Five",
  email: "shay.hcmc.work@gmail.com",
  copyrightHolder: "Shay Shay",
  defaultLocale: routing.defaultLocale as AppLocale,
  locales: routing.locales as readonly AppLocale[],
} as const;

export const MARKETING_PATHS = [
  "",
  "privacy-policy",
  "terms-of-service",
] as const;

/** Shared social preview image (1200×630). */
export const OG_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Five Cut Pro — Tự động hóa video bán hàng cho KOC và nhà bán hàng",
} as const;

/** Open Graph / Twitter share copy — luôn tiếng Việt (thị trường chính). */
export const OG_VI = {
  title: "Five Cut Pro — Tạo video bán hàng dễ dàng, chuyên nghiệp",
  description:
    "Kho template dành riêng cho nhà bán hàng, KOC, KOL – giúp bạn tạo video ấn tượng chỉ trong vài phút.",
  twitterDescription:
    "Kho template cho nhà bán hàng, KOC, KOL. Cắt ghép nhanh — tăng doanh số với video chất lượng.",
  imageAlt:
    "Five Cut Pro — Tạo video bán hàng dễ dàng, chuyên nghiệp cho nhà bán hàng, KOC, KOL",
} as const;
