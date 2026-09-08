import type { MetadataRoute } from "next";

import { absoluteLocaleUrl, MARKETING_PATHS } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of MARKETING_PATHS) {
    const isHome = path === "";
    const priority = isHome ? 1.0 : 0.6;
    const changeFrequency: "daily" | "weekly" | "monthly" = isHome
      ? "daily"
      : "monthly";

    // Languages alternate dictionary for Google Hreflang indexing
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        absoluteLocaleUrl(locale, path),
      ]),
    ) as Record<string, string>;

    languages["x-default"] = absoluteLocaleUrl(routing.defaultLocale, path);

    // Create a dedicated <url><loc> entry for each supported locale
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteLocaleUrl(locale, path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
