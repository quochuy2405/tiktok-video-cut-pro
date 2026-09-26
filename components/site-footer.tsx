"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { APP_NAME } from "@/lib/brand";
import { gmailComposeUrl } from "@/lib/site";
import { CommunityGroupList } from "@/components/community-groups";
import { SocialLinks } from "@/components/social-links";
import type { SocialGroup } from "@/lib/social-groups";

export function SiteFooter({ groups = [] }: { groups?: SocialGroup[] }) {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D8E5DD] bg-gradient-to-b from-[#EEF5F1] to-[#E5F3EC]">
      <div className="mx-auto flex min-w-0 max-w-[1200px] flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between md:py-16 lg:px-8">
        <div className="min-w-0 max-w-sm space-y-5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF5F1]"
          >
            <Image
              src="/logo.png"
              alt={tNav("logoAlt")}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-2xl shadow-lg shadow-[#00C48C]/25 ring-1 ring-black/5"
            />
            <span className="font-heading text-base font-semibold tracking-[-0.02em] text-[#0F1A15]">
              {APP_NAME}
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-[#4A5C53]">{t("tagline")}</p>
          <div className="pt-2 space-y-2.5">
            <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#4A5C53]">
              {t("socialHeading")}
            </span>
            <SocialLinks showLabel />
          </div>
          {groups.length > 0 ? (
            <div className="max-w-sm space-y-3">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#4A5C53]">
                {t("groupsHeading")}
              </span>
              <CommunityGroupList
                groups={groups}
                title={t("groupsHeading")}
                joinLabel={t("groupsJoin")}
                location="footer"
              />
            </div>
          ) : null}
        </div>
        <div className="flex min-w-0 flex-col gap-10 sm:flex-row sm:gap-14 lg:gap-16">
          <nav
            className="flex flex-col gap-8 text-sm font-medium sm:flex-row sm:gap-14"
            aria-label={t("footerNav")}
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#4A5C53]">
                {t("product")}
              </span>
              <Link
                href="/#features"
                className="text-[#1F2E27] transition-colors hover:text-brand"
              >
                {t("featuresLink")}
              </Link>
            <Link
              href="/#download"
              onClick={() => {
                trackCtaClick({
                  cta_id: "footer_download",
                  cta_location: "footer",
                  cta_text: t("downloadLink"),
                  cta_category: "conversion_download",
                  destination_url: "/#download",
                });
              }}
              className="text-[#1F2E27] transition-colors hover:text-brand"
            >
              {t("downloadLink")}
            </Link>
            <Link
              href="/#how-it-works"
              className="text-[#1F2E27] transition-colors hover:text-brand"
            >
              {t("installLink")}
            </Link>
          </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#4A5C53]">
                {t("legal")}
              </span>
              <Link
                href="/terms-of-service"
                className="text-[#1F2E27] transition-colors hover:text-brand"
              >
                {t("termsLink")}
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[#1F2E27] transition-colors hover:text-brand"
              >
                {t("privacyLink")}
              </Link>
              <Link
                href="/delete-account"
                className="text-[#1F2E27] transition-colors hover:text-brand"
              >
                {t("deleteAccountLink")}
              </Link>
            </div>
          </nav>

          <section
            className="max-w-xs shrink-0"
            aria-labelledby="footer-contact-heading"
          >
            <h2
              id="footer-contact-heading"
              className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-[#0F1A15]"
            >
              <Mail className="size-4 text-brand shrink-0" aria-hidden="true" />
              {t("contactHeading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4A5C53]">
              {t("contactCopyright")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#4A5C53]">
              {t("contactBlurb")}
            </p>
            <a
              href={gmailComposeUrl(t("contactEmail"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-brand transition-colors hover:text-[#00B267]"
              aria-label={t("contactEmailAria")}
            >
              <Mail className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
              {t("contactEmail")}
            </a>
          </section>
        </div>
      </div>
      <div className="border-t border-[#E7E9EF]">
        <div className="mx-auto min-w-0 max-w-[1200px] px-4 py-7 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[#4A5C53]">
            © {year} {t("copyrightBody")}
          </p>
        </div>
      </div>
    </footer>
  );
}
