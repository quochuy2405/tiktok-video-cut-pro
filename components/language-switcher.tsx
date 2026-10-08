"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALE_INFO: Record<
  AppLocale,
  { label: string; short: string; nativeName: string; flag: string }
> = {
  vi: { label: "Tiếng Việt", short: "VI", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  en: { label: "English", short: "EN", nativeName: "English", flag: "🇺🇸" },
  zh: { label: "中文 (简体)", short: "ZH", nativeName: "中文", flag: "🇨🇳" },
  th: { label: "ไทย", short: "TH", nativeName: "ไทย", flag: "🇹🇭" },
  ja: { label: "日本語", short: "JA", nativeName: "日本語", flag: "🇯🇵" },
  ko: { label: "한국어", short: "KO", nativeName: "한국어", flag: "🇰🇷" },
};

export function LanguageSwitcher({
  className,
  variant = "dropdown",
  onSelect,
}: {
  className?: string;
  variant?: "dropdown" | "grid";
  onSelect?: () => void;
}) {
  const currentLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeInfo = LOCALE_INFO[currentLocale] ?? LOCALE_INFO.vi;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (variant === "grid") {
    return (
      <div className={cn("w-full space-y-2", className)}>
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {t("language")}
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {routing.locales.map((loc) => {
            const info = LOCALE_INFO[loc];
            const isCurrent = currentLocale === loc;
            return (
              <Link
                key={loc}
                href={pathname}
                locale={loc}
                onClick={() => {
                  onSelect?.();
                }}
                className={cn(
                  "flex min-h-[44px] items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all active:scale-[0.98]",
                  isCurrent
                    ? "border-brand/50 bg-brand/20 text-brand shadow-[0_0_12px_rgba(0,245,160,0.25)] font-semibold"
                    : "border-white/10 bg-[#0d1812] text-slate-200 hover:border-emerald-400/40 hover:bg-[#12241b] hover:text-white",
                )}
                prefetch={false}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[14px] leading-none shrink-0" aria-hidden>
                    {info.flag}
                  </span>
                  <span className="truncate leading-tight">{info.nativeName}</span>
                </div>
                {isCurrent && (
                  <Check className="size-3.5 text-brand shrink-0" aria-hidden />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={cn("relative shrink-0", className)}
      role="region"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex min-h-[38px] items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all sm:text-[13px] active:scale-95",
          isOpen
            ? "border-brand/50 bg-brand/20 text-brand shadow-[0_0_15px_rgba(0,245,160,0.25)]"
            : "border-emerald-500/20 bg-[#0d1812] text-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:border-emerald-400/40 hover:bg-[#12241b]",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language")}
      >
        <Globe className="size-3.5 shrink-0 text-brand opacity-90" aria-hidden />
        <span className="font-mono text-xs font-bold tracking-wide">
          {activeInfo.short}
        </span>
        <span className="hidden xl:inline text-slate-300 text-xs">
          {activeInfo.nativeName}
        </span>
        <ChevronDown
          className={cn(
            "size-3 shrink-0 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180 text-brand",
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[175px] overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0a140f]/95 backdrop-blur-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,160,0.15)] ring-1 ring-brand/20 animate-in fade-in-0 zoom-in-95 duration-150"
          role="listbox"
          aria-label={t("language")}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 border-b border-emerald-500/15 mb-1">
            {t("language")}
          </div>
          <div className="flex flex-col gap-0.5">
            {routing.locales.map((loc) => {
              const info = LOCALE_INFO[loc];
              const isCurrent = currentLocale === loc;
              return (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={() => {
                    setIsOpen(false);
                    onSelect?.();
                  }}
                  className={cn(
                    "group flex items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium transition-colors",
                    isCurrent
                      ? "bg-brand/20 text-brand font-semibold shadow-[0_0_10px_rgba(0,245,160,0.2)]"
                      : "text-slate-200 hover:bg-emerald-500/10 hover:text-white",
                  )}
                  prefetch={false}
                  role="option"
                  aria-selected={isCurrent}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] leading-none" aria-hidden>
                      {info.flag}
                    </span>
                    <span className="leading-snug">{info.nativeName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      {info.short}
                    </span>
                    {isCurrent ? (
                      <Check className="size-3.5 text-brand shrink-0" aria-hidden />
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
