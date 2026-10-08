"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
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
import { hasGuides } from "@/lib/guides";
import { trackCtaClick } from "@/lib/analytics";
import { APP_NAME_ACCENT, APP_NAME_LEAD } from "@/lib/brand";
import { SocialLinks } from "@/components/social-links";
import { cn } from "@/lib/utils";

type NavItem = { href: string; labelKey: "features" | "howItWorks" | "campaigns" | "sponsors" | "guides" | "compare" | "downloadApp" | "faq" };

const GUIDES_ITEM: NavItem = { href: "/guides", labelKey: "guides" };

const DESKTOP_NAV_BASE: NavItem[] = [
  { href: "/#koc", labelKey: "features" },
  { href: "/#download", labelKey: "downloadApp" },
  { href: "/#sponsors", labelKey: "sponsors" },
  { href: "/#faq", labelKey: "faq" },
];

const MOBILE_NAV_BASE: NavItem[] = [
  { href: "/#koc", labelKey: "features" },
  { href: "/#download", labelKey: "downloadApp" },
  { href: "/#sponsors", labelKey: "sponsors" },
  { href: "/#faq", labelKey: "faq" },
];

/** Guides only exist in the locales they were written in. */
function navItems(base: NavItem[], locale: string, tail: NavItem[] = []): NavItem[] {
  const withGuides = hasGuides(locale) ? [...base, GUIDES_ITEM] : base;
  return [...withGuides, ...tail];
}

function NavLinks({
  className,
  items,
  onNavigate,
}: {
  className?: string;
  items: NavItem[];
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
      {items.map((item, idx) => {
        const isLegal =
          item.href === "/terms-of-service" ||
          item.href === "/privacy-policy";
        const isDownload = item.href === "/#download";
        const active = isLegal && pathname === item.href;

        return (
          <li key={`${item.href}-${idx}`} className="shrink-0">
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
                  ? "text-brand font-semibold bg-brand/10"
                  : "text-[#9db7aa] hover:text-[#00f5a0] hover:bg-brand/10",
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
  const locale = useLocale();
  const desktopNav = navItems(DESKTOP_NAV_BASE, locale);
  const mobileNav = navItems(MOBILE_NAV_BASE, locale);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-500/15 bg-[#060907]/80 backdrop-blur-2xl shadow-[0_12px_36px_-12px_rgba(0,0,0,0.85),0_0_20px_-8px_rgba(0,245,160,0.15)]">
      <div className="mx-auto flex min-h-[64px] min-w-0 max-w-[1360px] items-center justify-between gap-2.5 px-2.5 py-2 sm:px-4 md:px-5 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#060907] sm:gap-2.5"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-brand/30 blur-md" aria-hidden />
            <Image
              src="/logo.png"
              alt={t("logoAlt")}
              width={36}
              height={36}
              className="relative size-8 sm:size-9 shrink-0 rounded-xl shadow-lg ring-1 ring-white/10"
              priority
            />
          </div>
          <span className="font-heading inline-flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-[15px] font-bold tracking-tight sm:text-[17px]">
            <span className="whitespace-nowrap text-white">{APP_NAME_LEAD}</span>
            <span className="whitespace-nowrap text-gradient-brand">
              {APP_NAME_ACCENT}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden items-center gap-2 lg:flex xl:gap-4">
          <nav className="flex items-center" aria-label={t("mainNav")}>
            <NavLinks items={desktopNav} className="flex-row items-center gap-0.5 xl:gap-1" />
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
                "glow-brand-sm shrink-0 rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-4 py-2 text-xs font-bold text-[#02180e] shadow-[0_0_22px_rgba(0,245,160,0.45)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,245,160,0.7)] xl:px-5 xl:text-sm",
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
              "glow-brand-sm rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-4 font-bold text-[#02180e] shadow-[0_0_18px_rgba(0,245,160,0.4)] transition-[transform,box-shadow] hover:shadow-[0_0_28px_rgba(0,245,160,0.65)] active:translate-y-px",
            )}
          >
            {t("ctaMobile")}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-xl border-emerald-500/25 bg-[#0d1812] text-white hover:bg-[#12241b]",
              )}
              aria-label={t("menuOpen")}
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-0 border-emerald-500/20 bg-[#070e0a]/95 backdrop-blur-2xl p-0 text-white"
            >
              <SheetHeader className="border-b border-emerald-500/15 px-4 py-4">
                <SheetTitle className="font-heading text-left text-white">
                  {t("sheetTitle")}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4">
                <LanguageSwitcher variant="grid" onSelect={() => setMobileOpen(false)} />
                <NavLinks items={mobileNav} onNavigate={() => setMobileOpen(false)} />
                <div className="my-2 border-t border-emerald-500/15 pt-3 space-y-2">
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#8aa195]">
                    {t("officialSocial")}
                  </span>
                  <SocialLinks showLabel />
                </div>
                <SheetClose
                  render={
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-emerald-500/25 bg-[#0d1812] text-white hover:bg-[#12241b]"
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
