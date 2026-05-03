"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#030305]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between md:py-16 lg:px-8">
        <div className="max-w-sm space-y-4">
          <p className="font-heading text-base font-semibold tracking-[-0.02em] text-white">
            TikTok Video Cut Pro
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">{t("tagline")}</p>
        </div>
        <nav
          className="flex flex-col gap-8 text-sm font-medium sm:flex-row sm:gap-14"
          aria-label={t("footerNav")}
        >
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-zinc-500">
              {t("product")}
            </span>
            <Link
              href="/#features"
              className="text-zinc-300 transition-colors hover:text-brand"
            >
              {t("featuresLink")}
            </Link>
            <Link
              href="/#download"
              className="text-zinc-300 transition-colors hover:text-brand"
            >
              {t("downloadLink")}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-zinc-500">
              {t("legal")}
            </span>
            <Link
              href="/terms-of-service"
              className="text-zinc-300 transition-colors hover:text-brand"
            >
              {t("termsLink")}
            </Link>
            <Link
              href="/privacy-policy"
              className="text-zinc-300 transition-colors hover:text-brand"
            >
              {t("privacyLink")}
            </Link>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1200px] px-6 py-7 lg:px-8">
          <p className="text-center text-xs text-zinc-500">
            © {year} {t("copyrightBody")}
          </p>
        </div>
      </div>
    </footer>
  );
}
