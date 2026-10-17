"use client";

import Image from "next/image";
import {
  AppleIcon,
  GooglePlayIcon,
  AndroidIcon,
} from "@/components/platform-icons";
import { trackCtaClick, trackDownload } from "@/lib/analytics";
import { DISPLAY_APP_VERSION, STORE_QR } from "@/lib/downloads";
import { cn } from "@/lib/utils";
import {
  Camera,
  Sparkles,
  Clock,
  ArrowUpRight,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  title?: string;
  subtitle?: string;
  scanLabel?: string;
  openLabel?: string;
  comingSoonLabel?: string;
  className?: string;
};

/**
 * Modern Store QR Codes Section:
 * - iOS: Spotlight Hero Card with ultra-premium viewfinder styling, scan animations, and direct App Store CTA.
 * - Android: Clean "Sắp ra mắt" (Coming soon) card with Beta progress & community early-access CTA.
 */
export function StoreQrCodes({
  title,
  subtitle,
  scanLabel,
  openLabel,
  comingSoonLabel,
  className,
}: Props) {
  const t = useTranslations("Landing");

  const iosCopy = {
    title: t("downloadCards.ios.title") || "Five Cut Pro cho iOS",
    subtitle:
      t("downloadCards.ios.subtitle") ||
      "Dành cho iPhone & iPad · iOS 15.0+ · Miễn phí hoàn toàn",
    badge: t("downloadCards.ios.badge") || "Đã phát hành · Sẵn sàng tải",
    cta: openLabel || t("downloadCards.ios.cta") || "Tải trên App Store",
    scanHint:
      t("downloadCards.ios.scanHint") ||
      "Mở Camera iPhone / iPad quét mã để tải ngay",
    perk1: t("downloadCards.ios.perk1") || "Miễn phí 100%",
    perk2: t("downloadCards.ios.perk2") || "Không quảng cáo",
    perk3: t("downloadCards.ios.perk3") || "Ghép video 9:16",
  };

  const androidCopy = {
    title: t("downloadCards.android.title") || "Phiên bản Android",
    subtitle:
      t("downloadCards.android.subtitle") ||
      "Dành cho điện thoại & máy tính bảng Android",
    badge:
      comingSoonLabel
        ? `${comingSoonLabel} · Coming Soon`
        : t("downloadCards.android.badge") || "Sắp ra mắt · Coming Soon",
    status:
      t("downloadCards.android.status") ||
      "Đang hoàn thiện & kiểm thử bản Beta",
    desc:
      t("downloadCards.android.desc") ||
      "Phiên bản Android đang trong giai đoạn kiểm thử cuối cùng trước khi chính thức phát hành trên Google Play Store.",
    cta:
      comingSoonLabel
        ? `Google Play · ${comingSoonLabel}`
        : t("downloadCards.android.cta") || "Google Play · Sắp ra mắt",
    communityHint:
      t("downloadCards.android.communityHint") ||
      "Muốn nhận bản Beta hoặc thông báo khi ra mắt?",
    communityCta:
      t("downloadCards.android.communityCta") || "Tham gia nhóm hỗ trợ KOC",
  };

  return (
    <div className={cn("mx-auto w-full max-w-5xl", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand drop-shadow-[0_0_12px_rgba(0,245,160,0.35)]">
          {scanLabel || t("downloadSection.qrLabel") || "MÃ QR TẢI APP"}
        </p>
        <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title || t("downloadSection.qrTitle") || "Tải Five Cut Pro trên điện thoại"}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
          {subtitle ||
            t("downloadSection.qrSubtitle") ||
            "Mở Camera iPhone/iPad quét mã để tải ngay từ App Store. Bản Android sắp ra mắt."}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-7">
        {/* ========================================================= */}
        {/* 1. iOS STAR / HERO CARD (Đặc sắc vô cùng)                 */}
        {/* ========================================================= */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-brand hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,245,160,0.28)] sm:p-8 lg:col-span-7">
          {/* Ambient neon backdrop glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-emerald-100 blur-3xl" />
          {/* Top specular reflection line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

          <div className="relative z-[1]">
            {/* Top row: Platform Badge + Live Status */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 shadow-sm">
                <AppleIcon className="size-4 text-slate-900" />
                <span className="text-xs font-semibold tracking-wide text-slate-900">
                  App Store
                </span>
                <span className="rounded-md border border-slate-200 bg-emerald-100 px-2 py-0.5 font-mono text-[10px] text-brand-ink">
                  v{DISPLAY_APP_VERSION}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-brand-ink">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>{iosCopy.badge}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-5 text-left">
              <h4 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {iosCopy.title}
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">
                {iosCopy.subtitle}
              </p>
            </div>

            {/* Ultra-luxe Viewfinder QR Frame */}
            <div className="relative mt-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center backdrop-blur-sm sm:p-6">
              {/* Precision camera brackets at 4 corners */}
              <div className="pointer-events-none absolute -left-2 -top-2 size-5 rounded-tl-lg border-l-2 border-t-2 border-brand" />
              <div className="pointer-events-none absolute -right-2 -top-2 size-5 rounded-tr-lg border-r-2 border-t-2 border-brand" />
              <div className="pointer-events-none absolute -bottom-2 -left-2 size-5 rounded-bl-lg border-b-2 border-l-2 border-brand" />
              <div className="pointer-events-none absolute -bottom-2 -right-2 size-5 rounded-br-lg border-b-2 border-r-2 border-brand" />

              {/* Ceramic QR code card */}
              <div className="group relative overflow-hidden rounded-2xl bg-white p-3.5 shadow-[0_8px_24px_rgba(6,40,28,0.12)] ring-4 ring-emerald-100 sm:p-4">
                <Image
                  src={STORE_QR.ios.qrSrc}
                  alt="Mã QR tải Five Cut Pro trên App Store"
                  width={176}
                  height={176}
                  className="size-[150px] block sm:size-[170px]"
                  priority
                />

                {/* Animated scanner laser bar */}
                <div className="pointer-events-none absolute inset-x-2 h-0.5 rounded-full bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_12px_#00C48C] animate-qr-sweep" />

                {/* Mini Apple center badge */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-black/95 text-white shadow-lg backdrop-blur-sm">
                    <AppleIcon className="size-4" />
                  </div>
                </div>
              </div>

              {/* Camera hint */}
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-ink">
                <Camera className="size-4 shrink-0 text-brand-ink" />
                <span>{iosCopy.scanHint}</span>
              </div>
            </div>
          </div>

          <div className="relative z-[1]">
            {/* Primary Action Button */}
            <a
              href={STORE_QR.ios.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCtaClick({
                  cta_id: "qr_download_ios",
                  cta_location: "download_qr",
                  cta_text: STORE_QR.ios.storeLabel,
                  cta_category: "conversion_download",
                  destination_url: STORE_QR.ios.href,
                  platform: "ios",
                });
                trackDownload({
                  file_name: STORE_QR.ios.storeLabel,
                  file_extension: "store",
                  platform: "ios",
                  app_version: DISPLAY_APP_VERSION,
                  link_url: STORE_QR.ios.href,
                });
              }}
              className="group/btn relative mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-6 py-4 text-base font-bold text-[#032516] shadow-[0_14px_30px_-6px_rgba(0,196,140,0.55)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_18px_38px_-6px_rgba(0,196,140,0.7)] active:scale-[0.99]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <AppleIcon className="size-5 shrink-0" />
              <span>{iosCopy.cta}</span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>

            {/* Feature Perks row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-brand-ink sm:gap-3 sm:text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                <CheckCircle2 className="size-3 text-brand-ink" />
                {iosCopy.perk1}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                <CheckCircle2 className="size-3 text-brand-ink" />
                {iosCopy.perk2}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                <CheckCircle2 className="size-3 text-brand-ink" />
                {iosCopy.perk3}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. ANDROID CARD — SẮP RA MẮT (Coming Soon Showcase)      */}
        {/* ========================================================= */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_26px_65px_-16px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.2)] sm:p-8 lg:col-span-5">
          {/* Subtle watermark background icon */}
          <AndroidIcon className="pointer-events-none absolute -bottom-6 -right-6 size-48 text-slate-900/[0.03]" />
          {/* Ambient amber glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
          {/* Top specular reflection line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          <div className="relative z-[1]">
            {/* Top row: Platform Badge + Sắp ra mắt Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 shadow-sm">
                <GooglePlayIcon className="size-4" />
                <span className="text-xs font-semibold text-slate-900">
                  Google Play
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                <Clock className="size-3.5 animate-spin-slow text-amber-600" />
                <span>{androidCopy.badge}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-5 text-left">
              <h4 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {androidCopy.title}
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">
                {androidCopy.subtitle}
              </p>
            </div>

            {/* High-tech Coming Soon / Beta progress box */}
            <div className="relative my-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center backdrop-blur-sm">
              {/* Pulsing Android icon */}
              <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-brand-ink ring-4 ring-emerald-100">
                <AndroidIcon className="size-8" />
              </div>

              {/* Status pill */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-brand-ink">
                <Sparkles className="size-3.5 text-brand-ink" />
                <span>{androidCopy.status}</span>
              </div>

              {/* Description */}
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-slate-600">
                {androidCopy.desc}
              </p>
            </div>
          </div>

          <div className="relative z-[1]">
            {/* Disabled Action Button */}
            <div className="inline-flex w-full cursor-not-allowed select-none items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-600">
              <GooglePlayIcon className="size-4 opacity-50 grayscale" />
              <span>{androidCopy.cta}</span>
            </div>

            {/* Early Access / Community CTA Box */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3.5 text-center shadow-sm">
              <p className="text-xs font-medium text-slate-600">
                {androidCopy.communityHint}
              </p>
              <a
                href="#community"
                className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-brand-ink transition-colors hover:text-brand-ink-deep"
              >
                <Users className="size-3.5" />
                <span>{androidCopy.communityCta}</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
