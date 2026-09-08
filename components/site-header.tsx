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
import { cn } from "@/lib/utils";

const DESKTOP_NAV_PATHS = [
  { href: "/#how-it-works", labelKey: "howItWorks" as const },
  { href: "/#batch-engine", labelKey: "batchEngine" as const },
  { href: "/#formula", labelKey: "formula" as const },
  { href: "/#sponsors", labelKey: "sponsors" as const },
  { href: "/#faq", labelKey: "faq" as const },
];

const MOBILE_NAV_PATHS = [
  { href: "/#how-it-works", labelKey: "howItWorks" as const },
  { href: "/#batch-engine", labelKey: "batchEngine" as const },
  { href: "/#benefits", labelKey: "benefits" as const },
  { href: "/#formula", labelKey: "formula" as const },
  { href: "/#sponsors", labelKey: "sponsors" as const },
  { href: "/#faq", labelKey: "faq" as const },
  { href: "/#download", labelKey: "downloadApp" as const },
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
                  : "text-zinc-300 hover:text-white",
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#050507]/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#050507]/60">
      <div className="mx-auto flex min-h-[64px] min-w-0 max-w-[1240px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] sm:gap-3"
        >
          <Image
            src="/logo.png"
            alt={t("logoAlt")}
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-xl shadow-lg shadow-brand/15 ring-1 ring-white/10"
            priority
          />
          <span className="font-heading flex min-w-0 flex-col items-start gap-0.5 leading-none">
            <span className="text-[12px] font-semibold tracking-[-0.03em] text-white sm:text-[13px] md:text-[15px]">
              {APP_NAME_LEAD}
            </span>
            <span className="bg-gradient-to-r from-brand via-[#4df5b8] to-[#5ee9b8] bg-clip-text text-[12px] font-semibold tracking-[-0.03em] text-transparent sm:text-[13px] md:text-[15px]">
              {APP_NAME_ACCENT}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-5">
          <nav className="flex items-center" aria-label={t("mainNav")}>
            <NavLinks items={DESKTOP_NAV_PATHS} className="flex-row items-center gap-0.5 xl:gap-1.5" />
          </nav>
          <div className="flex shrink-0 items-center gap-2.5 xl:gap-3">
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
                "glow-brand-sm shrink-0 rounded-full border-0 bg-brand px-5 py-2 text-xs font-semibold text-[#050507] transition-[transform,box-shadow] hover:-translate-y-px hover:bg-brand hover:glow-brand-lg xl:text-sm",
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
              "glow-brand-sm rounded-full border-0 bg-brand px-4 font-medium text-[#050507] transition-[transform,box-shadow] hover:glow-brand-lg active:translate-y-px",
            )}
          >
            {t("ctaMobile")}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-xl border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]",
              )}
              aria-label={t("menuOpen")}
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-0 border-white/10 bg-[#0a0a0c] p-0 text-white"
            >
              <SheetHeader className="border-b border-white/[0.08] px-4 py-4">
                <SheetTitle className="font-heading text-left text-white">
                  {t("sheetTitle")}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4">
                <LanguageSwitcher className="self-start" />
                <NavLinks items={MOBILE_NAV_PATHS} onNavigate={() => setMobileOpen(false)} />
                <SheetClose
                  render={
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-white/15 bg-transparent hover:bg-white/[0.06]"
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
