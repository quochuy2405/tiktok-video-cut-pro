"use client";

import Image from "next/image";

import { AppleIcon, GooglePlayIcon } from "@/components/platform-icons";
import { trackCtaClick, trackDownload } from "@/lib/analytics";
import { DISPLAY_APP_VERSION, STORE_QR } from "@/lib/downloads";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  subtitle?: string;
  scanLabel?: string;
  openLabel?: string;
  className?: string;
};

const ITEMS = [
  {
    ...STORE_QR.ios,
    Icon: AppleIcon,
    accent: "from-[#111111] to-[#333333]",
  },
  {
    ...STORE_QR.android,
    Icon: GooglePlayIcon,
    accent: "from-[#00A87A] to-[#14532D]",
  },
] as const;

/** One compact card per store: QR + open-store CTA together. */
export function StoreQrCodes({
  title = "Quét mã để tải app",
  subtitle = "Mở camera điện thoại, quét QR hoặc chạm để vào cửa hàng.",
  scanLabel = "Quét mã QR",
  openLabel = "Mở cửa hàng",
  className,
}: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
          {scanLabel}
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-[#0F1A15] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4A5C53]">{subtitle}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCtaClick({
                cta_id: `qr_download_${item.id}`,
                cta_location: "download_qr",
                cta_text: item.storeLabel,
                cta_category: "conversion_download",
                destination_url: item.href,
                platform: item.id,
              });
              trackDownload({
                file_name: item.storeLabel,
                file_extension: "store",
                platform: item.id,
                app_version: DISPLAY_APP_VERSION,
                link_url: item.href,
              });
            }}
            className="group flex flex-col items-center rounded-[24px] border border-[#B9CFC3] bg-white p-5 shadow-card-mint transition-all hover:-translate-y-0.5 hover:border-brand/45 hover:glow-brand-sm sm:p-6"
          >
            <div className="flex w-full items-center justify-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#EEF5F1] text-[#0F1A15] ring-1 ring-[#B9CFC3]">
                <item.Icon className="size-4" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold text-[#0F1A15]">{item.label}</p>
                <p className="text-xs text-[#4A5C53]">{item.storeLabel}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#D8E5DD] bg-[#F8FAF9] p-2.5">
              <Image
                src={item.qrSrc}
                alt={`QR tải Five Cut Pro ${item.label}`}
                width={148}
                height={148}
                className="size-[132px] sm:size-[148px]"
                priority
              />
            </div>

            <span
              className={cn(
                "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-white shadow-button-mint transition group-hover:brightness-110",
                item.accent,
              )}
            >
              <item.Icon className="size-3.5 shrink-0" />
              {openLabel}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
