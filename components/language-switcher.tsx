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
      <div className={cn("w-full space-y-1.5", className)}>
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-[#6B7A72]">
          {t("language")}
        </span>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
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
                  "flex items-center justify-between gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-medium transition-all",
                  isCurrent
                    ? "border-brand/50 bg-brand/15 text-brand shadow-sm shadow-[#00C48C]/20 font-semibold"
                    : "border-[#D8E5DD] bg-white text-[#334039] hover:border-brand/40 hover:bg-[#EEF5F1] hover:text-[#18231D]",
                )}
                prefetch={false}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[13px] leading-none shrink-0" aria-hidden>
                    {info.flag}
                  </span>
                  <span className="truncate leading-tight">{info.nativeName}</span>
                </div>
                {isCurrent && (
                  <Check className="size-3 text-brand shrink-0" aria-hidden />
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
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] font-semibold transition-all sm:px-3 sm:text-[13px]",
          isOpen
            ? "border-brand/40 bg-brand/15 text-brand shadow-sm shadow-[#00C48C]/20"
            : "border-[#D8E5DD] bg-white text-[#334039] shadow-card-mint hover:border-brand/35 hover:bg-[#EEF5F1] hover:text-[#18231D]",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language")}
      >
        <Globe className="size-3.5 shrink-0 text-brand opacity-90" aria-hidden />
        <span className="font-mono text-[11px] font-bold tracking-wide sm:text-[12px]">
          {activeInfo.short}
        </span>
        <span className="hidden xl:inline text-[#334039] text-[12px]">
          {activeInfo.nativeName}
        </span>
        <ChevronDown
          className={cn(
            "size-3 shrink-0 text-[#6B7A72] transition-transform duration-200",
            isOpen && "rotate-180 text-brand",
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[175px] overflow-hidden rounded-2xl border border-[#D8E5DD] bg-white p-1.5 shadow-[0_20px_50px_-24px_rgba(15,31,24,0.35)] ring-1 ring-brand/10 animate-in fade-in-0 zoom-in-95 duration-150"
          role="listbox"
          aria-label={t("language")}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#6B7A72] border-b border-[#D8E5DD] mb-1">
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
                      ? "bg-brand/15 text-brand font-semibold"
                      : "text-[#334039] hover:bg-[#EEF5F1] hover:text-[#18231D]",
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
                    <span className="font-mono text-[10px] font-bold text-[#6B7A72]">
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
