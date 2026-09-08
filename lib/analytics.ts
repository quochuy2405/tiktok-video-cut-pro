/**
 * ============================================================================
 * GOOGLE ANALYTICS 4 (GA4) EVENT TRACKING SPECIFICATION & SCHEMA
 * ============================================================================
 *
 * Tiêu chuẩn định danh và phân loại sự kiện (Event Taxonomy) tối ưu cho:
 * - GA4 Standard & Exploration Reports (Báo cáo Khám phá & Phễu chuyển đổi)
 * - Looker Studio Dashboards
 * - BigQuery Export
 *
 * 1. cta_click: Theo dõi hành vi click vào các nút Call-To-Action trên toàn site.
 *    - cta_id: Mã định danh duy nhất của nút (vd: 'hero_download_primary')
 *    - cta_text: Nhãn nút người dùng nhìn thấy (vd: 'Tải ứng dụng miễn phí')
 *    - cta_location: Vị trí của nút trên trang ('header', 'hero', 'formula', v.v.)
 *    - cta_category: Loại hành động ('download', 'navigation', 'lead', 'external')
 *    - destination_url: Đường dẫn hoặc anchor đích (vd: '/#download')
 *
 * 2. file_download: Chuẩn GA4 Recommended Event khi người dùng tải bộ cài.
 *    - file_name: Tên tệp tải về
 *    - file_extension: Định dạng tệp ('dmg', 'exe', 'apk')
 *    - platform: Hệ điều hành ('mac-apple-silicon', 'windows', v.v.)
 *    - app_version: Phiên bản phần mềm
 *    - link_url: URL tải trực tiếp
 *
 * 3. generate_lead: Chuẩn GA4 Recommended Event khi gửi form hợp tác/tài trợ.
 *    - lead_type: Loại lead ('brand_sponsor')
 *    - brand_name: Tên nhãn hàng
 *    - budget_tier: Mức ngân sách lựa chọn
 *
 * 4. copy_install_command: Micro-conversion khi copy lệnh terminal sửa lỗi macOS.
 *    - command_type: Loại lệnh ('macos_gatekeeper_bypass')
 *
 * 5. contact_click: Khi click liên hệ trực tiếp qua email.
 *    - contact_method: Phương thức ('email')
 *    - contact_target: Địa chỉ email
 * ============================================================================
 */

export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-B6H1PXJMNV";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Hàm gửi sự kiện cơ sở tới GA4 thông qua window.gtag
 */
export function trackEvent(
  action: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}

// ----------------------------------------------------------------------------
// 1. CTA CLICKS (Hành vi click vào nút kêu gọi hành động)
// ----------------------------------------------------------------------------

export type CtaLocation =
  | "header_desktop"
  | "header_mobile"
  | "header_menu"
  | "hero"
  | "batch_engine"
  | "formula_section"
  | "download_cards"
  | "download_terminal"
  | "download_github"
  | "sponsor_section"
  | "footer";

export type CtaCategory =
  | "conversion_download" // Dẫn tới hành động tải app
  | "navigation_section"  // Điều hướng nội bộ tới tính năng
  | "lead_sponsor"        // Tiếp cận tài trợ / hợp tác
  | "external_resource";  // Tài nguyên bên ngoài (GitHub, mailto...)

export interface TrackCtaParams {
  /** Định danh duy nhất của CTA để nhóm và phân tích phễu (vd: hero_download_primary) */
  cta_id: string;
  /** Vị trí component chứa CTA */
  cta_location: CtaLocation;
  /** Văn bản hiển thị trên nút */
  cta_text: string;
  /** Nhóm hành động phục vụ phân loại báo cáo */
  cta_category: CtaCategory;
  /** Đích đến của liên kết (URL hoặc Hash Anchor) */
  destination_url?: string;
  /** Nền tảng hoặc thiết bị mục tiêu nếu có */
  platform?: string;
  /** Thuộc tính mở rộng bổ sung */
  [key: string]: unknown;
}

export function trackCtaClick({
  cta_id,
  cta_location,
  cta_text,
  cta_category,
  destination_url,
  platform,
  ...rest
}: TrackCtaParams) {
  trackEvent("cta_click", {
    cta_id,
    cta_location,
    cta_text,
    cta_category,
    destination_url: destination_url || "",
    platform: platform || "",
    ...rest,
  });
}

// ----------------------------------------------------------------------------
// 2. FILE DOWNLOAD (Sự kiện chuẩn GA4: file_download)
// ----------------------------------------------------------------------------

export interface TrackDownloadParams {
  /** Tên tệp cài đặt (vd: Five-Cut-Pro-0.1.5-macOS-AppleSilicon.dmg) */
  file_name: string;
  /** Đuôi mở rộng của tệp (dmg, exe, apk...) */
  file_extension: string;
  /** Nền tảng hệ điều hành */
  platform: string;
  /** Phiên bản ứng dụng */
  app_version?: string;
  /** Đường dẫn tải trực tiếp */
  link_url?: string;
  /** ID asset cài đặt */
  asset_id?: string;
  [key: string]: unknown;
}

export function trackDownload({
  file_name,
  file_extension,
  platform,
  app_version,
  link_url,
  asset_id,
  ...rest
}: TrackDownloadParams) {
  trackEvent("file_download", {
    file_name,
    file_extension,
    platform,
    app_version: app_version || "",
    link_url: link_url || "",
    asset_id: asset_id || "",
    ...rest,
  });
}

// ----------------------------------------------------------------------------
// 3. GENERATE LEAD (Sự kiện chuẩn GA4: generate_lead cho Brand Sponsor)
// ----------------------------------------------------------------------------

export interface TrackLeadParams {
  lead_type: "brand_sponsor";
  brand_name?: string;
  budget_tier?: string;
  [key: string]: unknown;
}

export function trackLeadGeneration({
  lead_type,
  brand_name,
  budget_tier,
  ...rest
}: TrackLeadParams) {
  trackEvent("generate_lead", {
    lead_type,
    brand_name: brand_name || "Unspecified",
    budget_tier: budget_tier || "Unspecified",
    ...rest,
  });
}

// ----------------------------------------------------------------------------
// 4. MICRO-CONVERSIONS (Sao chép lệnh cài đặt & liên hệ trực tiếp)
// ----------------------------------------------------------------------------

export function trackCopyTerminalCommand() {
  trackEvent("copy_terminal_command", {
    command_type: "macos_gatekeeper_bypass",
    location: "download_terminal",
  });
}

export function trackDirectContact({
  method,
  target,
}: {
  method: "email" | "phone";
  target: string;
}) {
  trackEvent("contact_click", {
    contact_method: method,
    contact_target: target,
    location: "sponsor_section",
  });
}
