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
        "flex items-center gap-0.5 rounded-full border border-white/12 bg-white/[0.04] p-0.5 backdrop-blur-sm",
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
            "rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors",
            locale === loc
              ? "bg-brand text-[#050507] shadow-sm shadow-brand/30"
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
