/** Real iOS captures in public/screens, cropped below the status bar. */
export const SCREEN_WIDTH = 642;
export const SCREEN_HEIGHT = 1319;

export type ScreenKey =
  | "explore"
  | "market"
  | "recipe"
  | "guide"
  | "result"
  | "merge"
  | "brand";

export const SCREEN_SOURCES: Record<ScreenKey, string> = {
  explore: "/screens/explore-templates.png",
  market: "/screens/template-market.png",
  recipe: "/screens/shot-recipe.png",
  guide: "/screens/shot-guide-video.png",
  result: "/screens/result-video.png",
  merge: "/screens/merge-export.png",
  brand: "/screens/brand-popup.png",
};

/** Placements proof for brand-facing surfaces. */
export const BRAND_SCREENS: ScreenKey[] = ["brand", "guide", "merge"];

export function screenshotUrls(origin: string): string[] {
  return Object.values(SCREEN_SOURCES).map((path) => `${origin}${path}`);
}
