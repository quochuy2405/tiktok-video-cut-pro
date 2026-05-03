"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#030305]">
      <div className="mx-auto flex min-w-0 max-w-[1200px] flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between md:py-16 lg:px-8">
        <div className="min-w-0 max-w-sm space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#030305]"
          >
            <Image
              src="/logo.png"
              alt={tNav("logoAlt")}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-2xl shadow-lg shadow-brand/20 ring-1 ring-white/10"
            />
            <span className="font-heading text-base font-semibold tracking-[-0.02em] text-white">
              TikTok Video Cut Pro
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-zinc-400">{t("tagline")}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-10 sm:flex-row sm:gap-14 lg:gap-16">
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
            <Link
              href="/#install-guide"
              className="text-zinc-300 transition-colors hover:text-brand"
            >
              {t("installLink")}
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

          <section
            className="max-w-xs shrink-0"
            aria-labelledby="footer-contact-heading"
          >
            <h2
              id="footer-contact-heading"
              className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-white"
            >
              <span aria-hidden className="select-none">
                📬
              </span>
              {t("contactHeading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {t("contactCopyright")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {t("contactBlurb")}
            </p>
            <a
              href={`mailto:${t("contactEmail")}`}
              className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-brand transition-colors hover:text-[#5ee9b8]"
              aria-label={t("contactEmailAria")}
            >
              <span aria-hidden className="select-none">
                📧
              </span>
              {t("contactEmail")}
            </a>
          </section>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto min-w-0 max-w-[1200px] px-4 py-7 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-zinc-500">
            © {year} {t("copyrightBody")}
          </p>
        </div>
      </div>
    </footer>
  );
}
