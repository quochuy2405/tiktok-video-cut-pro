"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState } from "react";
import {
  MenuIcon,
  Sparkles,
  Download,
  Building2,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";

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

type NavItem = {
  href: string;
  labelKey: "features" | "howItWorks" | "campaigns" | "sponsors" | "guides" | "compare" | "downloadApp" | "faq";
  icon?: typeof Sparkles;
};

const GUIDES_ITEM: NavItem = { href: "/guides", labelKey: "guides", icon: BookOpen };

const DESKTOP_NAV_BASE: NavItem[] = [
  { href: "/#koc", labelKey: "features", icon: Sparkles },
  { href: "/#download", labelKey: "downloadApp", icon: Download },
  { href: "/#sponsors", labelKey: "sponsors", icon: Building2 },
  { href: "/#faq", labelKey: "faq", icon: HelpCircle },
];

const MOBILE_NAV_BASE: NavItem[] = [
  { href: "/#koc", labelKey: "features", icon: Sparkles },
  { href: "/#download", labelKey: "downloadApp", icon: Download },
  { href: "/#sponsors", labelKey: "sponsors", icon: Building2 },
  { href: "/#faq", labelKey: "faq", icon: HelpCircle },
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
    <ul className={cn("flex flex-col gap-1", className)}>
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
                "block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-200 xl:px-3.5 xl:py-2 xl:text-[14px]",
                active
                  ? "text-brand font-semibold bg-brand/10 shadow-[0_0_12px_rgba(0,245,160,0.2)]"
                  : "text-slate-300 hover:text-brand hover:bg-emerald-500/10",
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

function MobileNavLinks({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, idx) => {
        const isLegal =
          item.href === "/terms-of-service" ||
          item.href === "/privacy-policy";
        const isDownload = item.href === "/#download";
        const active = isLegal && pathname === item.href;
        const Icon = item.icon || Sparkles;

        return (
          <li key={`mobile-${item.href}-${idx}`}>
            <Link
              href={item.href}
              onClick={() => {
                if (isDownload) {
                  trackCtaClick({
                    cta_id: "mobile_drawer_download",
                    cta_location: "mobile_drawer",
                    cta_text: t(item.labelKey),
                    cta_category: "conversion_download",
                    destination_url: item.href,
                  });
                }
                onNavigate?.();
              }}
              className={cn(
                "group flex min-h-[48px] items-center justify-between rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-all active:scale-[0.98]",
                active
                  ? "border-brand/50 bg-brand/15 text-brand shadow-[0_0_16px_rgba(0,245,160,0.25)]"
                  : "border-white/10 bg-[#0d1712] text-slate-200 hover:border-emerald-500/40 hover:bg-[#12231b] hover:text-white",
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-xl transition-colors",
                  active
                    ? "bg-brand/20 text-brand"
                    : "bg-white/5 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand"
                )}>
                  <Icon className="size-4" />
                </div>
                <span>{t(item.labelKey)}</span>
              </div>
              <ChevronRight className="size-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
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
      <div className="mx-auto flex min-h-[64px] min-w-0 max-w-[1360px] items-center justify-between gap-2.5 px-3 py-2 sm:px-4 md:px-5 lg:px-6">
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
              "glow-brand-sm min-h-[38px] rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-3.5 text-xs font-bold text-[#02180e] shadow-[0_0_18px_rgba(0,245,160,0.4)] transition-[transform,box-shadow] active:scale-95",
            )}
          >
            {t("ctaMobile")}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "size-10 min-h-[40px] min-w-[40px] rounded-xl border-emerald-500/25 bg-[#0d1812] text-white hover:bg-[#12241b] active:scale-95",
              )}
              aria-label={t("menuOpen")}
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-0 border-emerald-500/20 bg-[#070e0a]/95 backdrop-blur-2xl p-0 text-white flex flex-col"
            >
              <SheetHeader className="border-b border-emerald-500/15 px-5 py-4">
                <SheetTitle className="font-heading text-left text-white text-base">
                  {t("sheetTitle")}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto flex flex-col gap-5 p-5">
                <LanguageSwitcher variant="grid" onSelect={() => setMobileOpen(false)} />
                <div className="space-y-1.5">
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Menu
                  </span>
                  <MobileNavLinks items={mobileNav} onNavigate={() => setMobileOpen(false)} />
                </div>
                <div className="border-t border-emerald-500/15 pt-4 space-y-2.5">
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {t("officialSocial")}
                  </span>
                  <SocialLinks showLabel />
                </div>
              </div>
              <div className="border-t border-emerald-500/15 p-4 bg-[#050b08]/80 space-y-2.5">
                <Link
                  href="/#download"
                  onClick={() => {
                    trackCtaClick({
                      cta_id: "mobile_sheet_download_btn",
                      cta_location: "mobile_sheet_bottom",
                      cta_text: t("ctaMobile"),
                      cta_category: "conversion_download",
                      destination_url: "/#download",
                    });
                    setMobileOpen(false);
                  }}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "w-full min-h-[48px] rounded-2xl border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep font-bold text-[#02180e] shadow-[0_0_24px_rgba(0,245,160,0.5)] text-sm active:scale-98",
                  )}
                >
                  <Download className="mr-2 size-4" />
                  {t("ctaMobile")}
                </Link>
                <SheetClose
                  render={
                    <Button
                      variant="outline"
                      className="w-full min-h-[44px] rounded-2xl border-white/10 bg-[#0d1812] text-slate-300 hover:bg-[#12241b] hover:text-white text-xs"
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
