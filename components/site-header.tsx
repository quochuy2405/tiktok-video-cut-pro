"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { APP_NAME_ACCENT, APP_NAME_LEAD } from "@/lib/brand";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

const DESKTOP_NAV_PATHS = [
  { href: "/#features", labelKey: "features" as const },
  { href: "/#how-it-works", labelKey: "howItWorks" as const },
  { href: "/#campaigns", labelKey: "campaigns" as const },
  { href: "/#sponsors", labelKey: "sponsors" as const },
  { href: "/#faq", labelKey: "faq" as const },
];

const MOBILE_NAV_PATHS = [
  { href: "/#features", labelKey: "features" as const },
  { href: "/#how-it-works", labelKey: "howItWorks" as const },
  { href: "/#campaigns", labelKey: "campaigns" as const },
  { href: "/#sponsors", labelKey: "sponsors" as const },
  { href: "/#download", labelKey: "downloadApp" as const },
  { href: "/#faq", labelKey: "faq" as const },
];

function NavLinks({
  className,
  items = DESKTOP_NAV_PATHS,
  onNavigate,
}: {
  className?: string;
  items?: typeof MOBILE_NAV_PATHS;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <ul
      className={cn(
        "flex flex-col gap-1",
        className,
      )}
    >
      {items.map((item) => {
        const isLegal =
          item.href === "/terms-of-service" ||
          item.href === "/privacy-policy";
        const isDownload = item.href === "/#download";
        const active = isLegal && pathname === item.href;

        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              onClick={() => {
                if (isDownload) {
                  trackCtaClick({
                    cta_id: "header_menu_download",
                    cta_location: "header_menu",
                    cta_text: t(item.labelKey),
                    cta_category: "conversion_download",
                    destination_url: item.href,
                  });
                }
                onNavigate?.();
              }}
              className={cn(
                "block whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3.5 xl:py-2 xl:text-[14px]",
                active
                  ? "text-brand"
                  : "text-[#1F2E27] hover:text-[#0F1A15]",
              )}
            >
              {t(item.labelKey)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#D8E5DD]/80 bg-[#F4F8F6]/85 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#F4F8F6]/70 shadow-[0_8px_30px_-20px_rgba(15,31,24,0.18)]">
      <div className="mx-auto flex min-h-[64px] min-w-0 max-w-[1360px] items-center justify-between gap-2.5 px-2.5 py-2 sm:px-4 md:px-5 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2           focus-visible:ring-offset-[#F4F8F6] sm:gap-2.5"
        >
          <Image
            src="/logo.png"
            alt={t("logoAlt")}
            width={36}
            height={36}
            className="size-8 sm:size-9 shrink-0 rounded-xl shadow-lg shadow-[#00C48C]/25 ring-1 ring-black/5"
            priority
          />
          <span className="font-heading inline-flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-[15px] font-bold tracking-tight sm:text-[17px]">
            <span className="whitespace-nowrap text-[#0F1A15]">{APP_NAME_LEAD}</span>
            <span className="whitespace-nowrap text-gradient-brand">
              {APP_NAME_ACCENT}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden items-center gap-2 lg:flex xl:gap-4">
          <nav className="flex items-center" aria-label={t("mainNav")}>
            <NavLinks items={DESKTOP_NAV_PATHS} className="flex-row items-center gap-0.5 xl:gap-1" />
          </nav>
          <div className="flex shrink-0 items-center gap-2 xl:gap-2.5">
            <SocialLinks variant="header" className="hidden xl:flex" />
            <LanguageSwitcher />
            <Link
              href="/#download"
              onClick={() => {
                trackCtaClick({
                  cta_id: "header_download_desktop",
                  cta_location: "header_desktop",
                  cta_text: t("ctaDesktop"),
                  cta_category: "conversion_download",
                  destination_url: "/#download",
                });
              }}
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "glow-brand-sm shrink-0 rounded-full border-0 bg-brand px-4 py-2 text-xs font-semibold text-[#052E1C] transition-[transform,box-shadow] hover:-translate-y-px hover:bg-brand hover:glow-brand-lg xl:px-5 xl:text-sm",
              )}
            >
              {t("ctaDesktop")}
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/#download"
            onClick={() => {
              trackCtaClick({
                cta_id: "header_download_mobile",
                cta_location: "header_mobile",
                cta_text: t("ctaMobile"),
                cta_category: "conversion_download",
                destination_url: "/#download",
              });
            }}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "glow-brand-sm rounded-full border-0 bg-brand px-4 font-medium text-[#052E1C] transition-[transform,box-shadow] hover:glow-brand-lg active:translate-y-px",
            )}
          >
            {t("ctaMobile")}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-xl border-[#D8E5DD] bg-white text-[#0F1A15] shadow-card-mint hover:bg-[#EEF5F1]",
              )}
              aria-label={t("menuOpen")}
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-0 border-[#D8E5DD] bg-[#F4F8F6] p-0 text-[#0F1A15]"
            >
              <SheetHeader className="border-b border-[#D8E5DD] px-4 py-4">
                <SheetTitle className="font-heading text-left text-[#0F1A15]">
                  {t("sheetTitle")}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4">
                <LanguageSwitcher variant="grid" onSelect={() => setMobileOpen(false)} />
                <NavLinks items={MOBILE_NAV_PATHS} onNavigate={() => setMobileOpen(false)} />
                <div className="my-2 border-t border-[#D8E5DD] pt-3 space-y-2">
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#4A5C53]">
                    {t("officialSocial")}
                  </span>
                  <SocialLinks showLabel />
                </div>
                <SheetClose
                  render={
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-[#D8E5DD] bg-white hover:bg-[#EEF5F1]"
                    />
                  }
                >
                  {t("sheetClose")}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
