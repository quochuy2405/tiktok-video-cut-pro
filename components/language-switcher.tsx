"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-0 rounded-full border border-white/12 bg-white/[0.06] p-0.5 backdrop-blur-sm",
        className,
      )}
      role="group"
      aria-label={t("language")}
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={cn(
            "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors md:px-3.5",
            locale === loc
              ? "bg-brand text-[#050507] shadow-md shadow-brand/35"
              : "text-zinc-400 hover:text-white",
          )}
          prefetch={false}
        >
          {loc === "vi" ? t("languageVi") : t("languageEn")}
        </Link>
      ))}
    </div>
  );
}
