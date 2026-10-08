"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Download, Sparkles, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { trackCtaClick } from "@/lib/analytics";
import { STORE_QR } from "@/lib/downloads";

export function MobileStickyDownloadBar() {
  const t = useTranslations("Nav");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling down 180px
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Hide if inside the #download section
    const downloadSection = document.getElementById("download");
    let observer: IntersectionObserver | null = null;
    if (downloadSection && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible(false);
            } else if (window.scrollY > 180) {
              setVisible(true);
            }
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(downloadSection);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Tải nhanh Five Cut Pro"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-emerald-500/25 bg-[#060907]/92 backdrop-blur-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(0,245,160,0.1)] px-3.5 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* App identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-xl bg-brand/35 blur-sm" aria-hidden />
            <Image
              src="/logo.png"
              alt="Five Cut Pro"
              width={36}
              height={36}
              className="relative size-9 rounded-xl shadow-md ring-1 ring-white/15"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-xs text-white truncate">
                Five Cut Pro
              </span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-brand/15 px-1.5 py-0.2 font-mono text-[9px] font-bold text-brand ring-1 ring-brand/30">
                <Sparkles className="size-2.5 text-brand" />
                Free
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              Mẫu KOC & Video Bán Hàng
            </p>
          </div>
        </div>

        {/* CTA + Dismiss */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="/#download"
            onClick={() => {
              trackCtaClick({
                cta_id: "mobile_sticky_download_btn",
                cta_location: "mobile_sticky_bar",
                cta_text: t("ctaMobile"),
                cta_category: "conversion_download",
                destination_url: "/#download",
              });
            }}
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-4 py-2 text-xs font-bold text-[#02180e] shadow-[0_0_18px_rgba(0,245,160,0.45)] transition-all active:scale-95"
          >
            <Download className="size-3.5 shrink-0" />
            <span>{t("ctaMobile")}</span>
          </a>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Đóng thanh tải app"
            className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
