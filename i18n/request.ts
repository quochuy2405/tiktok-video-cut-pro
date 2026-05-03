import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [ui, landing] = await Promise.all([
    import(`../messages/${locale}/ui.json`),
    import(`../messages/${locale}/landing.json`),
  ]);

  return {
    locale,
    messages: {
      ...ui.default,
      Landing: landing.default,
    },
  };
});
