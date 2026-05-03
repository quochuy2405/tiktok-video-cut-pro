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
import { cn } from "@/lib/utils";

const NAV_PATHS = [
  { href: "/#features", labelKey: "features" as const },
  { href: "/#download", labelKey: "downloadApp" as const },
  { href: "/#install-guide", labelKey: "installGuide" as const },
  { href: "/terms-of-service", labelKey: "terms" as const },
  { href: "/privacy-policy", labelKey: "privacy" as const },
];

function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
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
      {NAV_PATHS.map((item) => {
        const isLegal =
          item.href === "/terms-of-service" ||
          item.href === "/privacy-policy";
        const active = isLegal && pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "block whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium transition-colors lg:px-3.5 lg:py-2",
                active
                  ? "text-brand"
                  : "text-white/90 hover:text-white",
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
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#050507]/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#050507]/55">
      <div className="mx-auto flex min-h-[62px] min-w-0 max-w-[1200px] items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] sm:gap-3"
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
              TikTok Video
            </span>
            <span className="bg-gradient-to-r from-brand via-[#4df5b8] to-[#5ee9b8] bg-clip-text text-[12px] font-semibold tracking-[-0.03em] text-transparent sm:text-[13px] md:text-[15px]">
              Cut Pro
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 items-center gap-3 lg:flex xl:gap-4">
          <nav className="flex min-w-0 items-center" aria-label={t("mainNav")}>
            <NavLinks className="flex-row items-center gap-1 lg:gap-2 xl:gap-3" />
          </nav>
          <LanguageSwitcher />
          <Link
            href="/#download"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "glow-brand-sm rounded-full border-0 bg-brand px-6 font-medium text-[#050507] transition-[transform,box-shadow] hover:-translate-y-px hover:bg-brand hover:glow-brand-lg",
            )}
          >
            {t("ctaDesktop")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/#download"
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
                <NavLinks onNavigate={() => setMobileOpen(false)} />
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
