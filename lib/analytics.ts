export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-B6H1PXJMNV";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Generic event tracker for Google Analytics 4
 */
export function trackEvent(
  action: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}

export interface TrackCtaParams {
  cta_name: string;
  cta_location: string;
  cta_text?: string;
  destination_url?: string;
  asset_id?: string;
  platform?: string;
  [key: string]: unknown;
}

/**
 * Specific tracker for user CTA clicks
 */
export function trackCtaClick({
  cta_name,
  cta_location,
  cta_text,
  destination_url,
  asset_id,
  platform,
  ...rest
}: TrackCtaParams) {
  trackEvent("cta_click", {
    cta_name,
    cta_location,
    cta_text,
    destination_url,
    asset_id,
    platform,
    ...rest,
  });
}

export interface TrackDownloadParams {
  file_name?: string;
  platform?: string;
  link_url?: string;
  asset_id?: string;
  [key: string]: unknown;
}

/**
 * GA4 recommended event for file downloads
 */
export function trackDownload({
  file_name,
  platform,
  link_url,
  asset_id,
  ...rest
}: TrackDownloadParams) {
  trackEvent("file_download", {
    file_name,
    platform,
    link_url,
    asset_id,
    ...rest,
  });
}
