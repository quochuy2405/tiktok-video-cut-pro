export type MarketingBannerSlide = {
  index?: number;
  imageUrl: string;
  title?: string | null;
  actionUrl?: string | null;
};

export type MarketingBanner = {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  type?: string | null;
  placement?: string | null;
  imageUrl?: string | null;
  targetUrl?: string | null;
  displayOrder?: number | null;
  isActive?: boolean | null;
  slides: MarketingBannerSlide[];
};

export const MARKETING_BANNER_TYPES = {
  login: "banner_login",
  exportAds: "export_ads_banner",
  common: "common_banner",
} as const;

export type MarketingBannerType =
  (typeof MARKETING_BANNER_TYPES)[keyof typeof MARKETING_BANNER_TYPES];

function getMarketingApiBase(): string {
  const raw =
    process.env.MARKETING_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_MARKETING_API_BASE_URL?.trim() ||
    "https://api.tizancutpro.com";
  return raw.replace(/\/$/, "");
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeSlide(raw: unknown, fallbackAction?: string | null): MarketingBannerSlide | null {
  if (typeof raw === "string") {
    const imageUrl = raw.trim();
    if (!imageUrl) return null;
    return { imageUrl, actionUrl: fallbackAction ?? null };
  }
  const item = asRecord(raw);
  if (!item) return null;
  const imageUrl =
    asString(item.image_url) || asString(item.imageUrl) || asString(item.url);
  if (!imageUrl) return null;
  const action = asRecord(item.action);
  const actionUrl =
    asString(action?.value) ||
    asString(item.target_url) ||
    asString(item.targetUrl) ||
    fallbackAction ||
    null;
  return {
    index: typeof item.index === "number" ? item.index : undefined,
    imageUrl,
    title: asString(item.title),
    actionUrl,
  };
}

function normalizeBanner(raw: unknown): MarketingBanner | null {
  const item = asRecord(raw);
  if (!item) return null;
  const id = asString(item.id);
  if (!id) return null;

  const targetUrl = asString(item.target_url) || asString(item.targetUrl);
  const imageUrl = asString(item.image_url) || asString(item.imageUrl);
  const slidesRaw = Array.isArray(item.slides)
    ? item.slides
    : Array.isArray(item.images)
      ? item.images
      : [];
  const slides = slidesRaw
    .map((slide) => normalizeSlide(slide, targetUrl))
    .filter((slide): slide is MarketingBannerSlide => Boolean(slide));

  if (slides.length === 0 && imageUrl) {
    slides.push({ imageUrl, actionUrl: targetUrl });
  }

  return {
    id,
    title: asString(item.title),
    subtitle: asString(item.subtitle),
    type: asString(item.type),
    placement: asString(item.placement),
    imageUrl,
    targetUrl,
    displayOrder:
      typeof item.display_order === "number"
        ? item.display_order
        : typeof item.displayOrder === "number"
          ? item.displayOrder
          : null,
    isActive:
      typeof item.is_active === "boolean"
        ? item.is_active
        : typeof item.isActive === "boolean"
          ? item.isActive
          : true,
    slides,
  };
}

export function flattenBannerSlides(
  banners: MarketingBanner[],
  expectedType?: MarketingBannerType,
): MarketingBannerSlide[] {
  const slides: MarketingBannerSlide[] = [];
  const seen = new Set<string>();
  for (const banner of banners) {
    if (banner.isActive === false) continue;
    if (expectedType && !matchesBannerType(banner, expectedType)) continue;
    for (const slide of banner.slides) {
      if (!slide.imageUrl || seen.has(slide.imageUrl)) continue;
      seen.add(slide.imageUrl);
      slides.push({
        ...slide,
        title: slide.title || banner.title,
        actionUrl: slide.actionUrl || banner.targetUrl,
      });
    }
  }
  return slides;
}

/** Match mobile `MarketingBannerModel.matchesSlotType`. */
function matchesBannerType(
  banner: MarketingBanner,
  expectedType: MarketingBannerType,
): boolean {
  const t = (banner.type ?? "").trim();
  const p = (banner.placement ?? "").trim();
  // Typed API responses may omit type/placement — trust the endpoint.
  if (!t && !p) return true;
  return t === expectedType || p === expectedType;
}

/** Fetch marketing banners — same endpoint as Five Cut Pro mobile. */
export async function fetchMarketingBanners(
  type: MarketingBannerType = MARKETING_BANNER_TYPES.common,
): Promise<MarketingBanner[]> {
  const base = getMarketingApiBase();
  const url = `${base}/api/v1/marketing/banners/type/${encodeURIComponent(type)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "FiveCutProWeb/1.0",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: unknown };
    const list = Array.isArray(json.data) ? json.data : [];
    return list
      .map(normalizeBanner)
      .filter((banner): banner is MarketingBanner => Boolean(banner))
      .filter((banner) => matchesBannerType(banner, type))
      .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
  } catch {
    return [];
  }
}

export async function fetchWebMarketingPayload(): Promise<{
  stripSlides: MarketingBannerSlide[];
  popupSlides: MarketingBannerSlide[];
}> {
  const [login, common] = await Promise.all([
    fetchMarketingBanners(MARKETING_BANNER_TYPES.login),
    fetchMarketingBanners(MARKETING_BANNER_TYPES.common),
  ]);
  return {
    // Strip "Mẫu & chiến dịch" — chỉ `banner_login` (giống Explore trên app)
    stripSlides: flattenBannerSlides(login, MARKETING_BANNER_TYPES.login),
    // Popup giữa màn — chỉ `common_banner`
    popupSlides: flattenBannerSlides(common, MARKETING_BANNER_TYPES.common),
  };
}

/** @deprecated Prefer fetchWebMarketingPayload for mobile-parity layouts. */
export async function fetchWebMarketingSlides(): Promise<MarketingBannerSlide[]> {
  const { stripSlides, popupSlides } = await fetchWebMarketingPayload();
  return [...stripSlides, ...popupSlides];
}
