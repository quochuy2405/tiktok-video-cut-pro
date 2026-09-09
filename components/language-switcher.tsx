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
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.65px] text-zinc-500">
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
                    ? "border-brand/50 bg-brand/15 text-brand shadow-sm shadow-brand/20 font-semibold"
                    : "border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white",
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
            ? "border-brand/40 bg-brand/15 text-brand shadow-sm shadow-brand/20"
            : "border-white/[0.12] bg-white/[0.05] text-zinc-300 hover:border-white/25 hover:bg-white/[0.09] hover:text-white",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language")}
      >
        <Globe className="size-3.5 shrink-0 text-brand opacity-90" aria-hidden />
        <span className="font-mono text-[11px] font-bold tracking-wide sm:text-[12px]">
          {activeInfo.short}
        </span>
        <span className="hidden xl:inline text-zinc-300 text-[12px]">
          {activeInfo.nativeName}
        </span>
        <ChevronDown
          className={cn(
            "size-3 shrink-0 text-zinc-400 transition-transform duration-200",
            isOpen && "rotate-180 text-brand",
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[175px] overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0c0c10]/95 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl ring-1 ring-white/5 animate-in fade-in-0 zoom-in-95 duration-150"
          role="listbox"
          aria-label={t("language")}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500 border-b border-white/[0.06] mb-1">
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
                      : "text-zinc-300 hover:bg-white/[0.07] hover:text-white",
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
                    <span className="font-mono text-[10px] font-bold text-zinc-500 group-hover:text-zinc-400">
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
