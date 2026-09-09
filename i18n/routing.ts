import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "zh", "th", "ja"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
