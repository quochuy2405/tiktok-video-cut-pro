import type { MetadataRoute } from "next";

import {
  absoluteLocaleUrl,
  absoluteUrl,
  CONTENT_UPDATED,
  MARKETING_PATHS,
} from "@/lib/site";
import { routing } from "@/i18n/routing";
import {
  GUIDES_PATH,
  GUIDE_LOCALES,
  getGuideBundle,
  guideSlugAlternates,
} from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(CONTENT_UPDATED);
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

  // Guides exist only in the locales a human wrote them in.
  const guideLanguages: Record<string, string> = Object.fromEntries(
    GUIDE_LOCALES.map((locale) => [locale, absoluteLocaleUrl(locale, GUIDES_PATH)]),
  );
  guideLanguages["x-default"] = absoluteLocaleUrl("vi", GUIDES_PATH);

  for (const locale of GUIDE_LOCALES) {
    entries.push({
      url: absoluteLocaleUrl(locale, GUIDES_PATH),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: guideLanguages },
    });

    for (const article of getGuideBundle(locale)?.articles || []) {
      const languages = Object.fromEntries(
        Object.entries(guideSlugAlternates(locale, article.slug)).map(
          ([otherLocale, otherSlug]) => [
            otherLocale,
            absoluteLocaleUrl(otherLocale, `${GUIDES_PATH}/${otherSlug}`),
          ],
        ),
      );

      entries.push({
        url: absoluteLocaleUrl(locale, `${GUIDES_PATH}/${article.slug}`),
        lastModified: new Date(article.datePublished),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  entries.push(
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  );

  return entries;
}
