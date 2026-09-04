import { APP_NAME } from "@/lib/brand";
import { routing, type AppLocale } from "@/i18n/routing";

/** Prefer production domain; override with NEXT_PUBLIC_SITE_URL when deploying. */
const FALLBACK_SITE_URL = "https://tizancutpro.com";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return FALLBACK_SITE_URL;
}

export function absoluteUrl(pathname = "/"): string {
  const base = getSiteUrl();
  if (!pathname || pathname === "/") return base;
  return `${base}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/** Locale-prefixed path, e.g. `/vi/privacy-policy`. */
export function localePath(locale: string, path = ""): string {
  const normalized = path.replace(/^\//, "");
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
  shortName: "Tizan",
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
  alt: "Tizan Cut Pro — Tạo video bán hàng cho shop, KOC, KOL",
} as const;
