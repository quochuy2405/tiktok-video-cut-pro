import type { MetadataRoute } from "next";

import { absoluteLocaleUrl, MARKETING_PATHS } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return MARKETING_PATHS.map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        absoluteLocaleUrl(locale, path),
      ]),
    ) as Record<string, string>;

    languages["x-default"] = absoluteLocaleUrl(routing.defaultLocale, path);

    return {
      url: absoluteLocaleUrl(routing.defaultLocale, path),
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.5,
      alternates: { languages },
    };
  });
}
