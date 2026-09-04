export type DownloadAssetId =
  | "mac-apple-silicon"
  | "mac-intel"
  | "windows"
  | "ios"
  | "android";

export type DownloadPlatform = "desktop" | "mobile";

/**
 * GitHub repo that currently hosts installer binaries.
 * Slug may still be historical; override URLs via NEXT_PUBLIC_DOWNLOAD_* if needed.
 */
export const GITHUB_RELEASES_REPO = "licenseadminshayshay-ux/tiktok-video-cut-pro";

/** Must match an existing GitHub Release tag and uploaded asset names (working download URLs). */
export const DOWNLOAD_RELEASE_TAG = "v0.1.5";

/** Filename segment on Releases — keep in sync with DOWNLOAD_RELEASE_TAG. */
const ARTIFACT_VERSION = "0.1.5";

/** Marketing version shown on the site (hero, copy); can differ from ARTIFACT_VERSION / DOWNLOAD_RELEASE_TAG. */
export const DISPLAY_APP_VERSION = "1.1.3";

/**
 * Exact filenames uploaded to the release host.
 * Kept for URL resolution so existing installers keep working.
 */
const RELEASE_ASSET_FILES: Record<
  Exclude<DownloadAssetId, "ios" | "android">,
  string
> = {
  "mac-apple-silicon": `Tiktok-Video-Cut-Pro-${ARTIFACT_VERSION}-macOS-AppleSilicon.dmg`,
  "mac-intel": `Tiktok-Video-Cut-Pro-${ARTIFACT_VERSION}-macOS-Intel.dmg`,
  windows: `Tiktok-Video-Cut-Pro-${ARTIFACT_VERSION}-Windows-Setup.exe`,
};

/** User-facing installer labels (product rename). */
const DISPLAY_FILE_LABELS: Record<
  Exclude<DownloadAssetId, "ios" | "android">,
  string
> = {
  "mac-apple-silicon": `Tizan-Cut-Pro-${ARTIFACT_VERSION}-macOS-AppleSilicon.dmg`,
  "mac-intel": `Tizan-Cut-Pro-${ARTIFACT_VERSION}-macOS-Intel.dmg`,
  windows: `Tizan-Cut-Pro-${ARTIFACT_VERSION}-Windows-Setup.exe`,
};

const ENV_BY_ID: Record<DownloadAssetId, string | undefined> = {
  "mac-apple-silicon": process.env.NEXT_PUBLIC_DOWNLOAD_MAC_APPLE_SILICON,
  "mac-intel": process.env.NEXT_PUBLIC_DOWNLOAD_MAC_INTEL,
  windows: process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS,
  ios: process.env.NEXT_PUBLIC_DOWNLOAD_IOS,
  android: process.env.NEXT_PUBLIC_DOWNLOAD_ANDROID,
};

export function githubReleaseAssetUrl(filename: string): string {
  return `https://github.com/${GITHUB_RELEASES_REPO}/releases/download/${DOWNLOAD_RELEASE_TAG}/${filename}`;
}

/** Link to the tagged release page (all assets + notes). */
export function githubReleasesTagPageUrl(): string {
  return `https://github.com/${GITHUB_RELEASES_REPO}/releases/tag/${DOWNLOAD_RELEASE_TAG}`;
}

/**
 * Resolve installer / store URLs:
 * - Per-file override: NEXT_PUBLIC_DOWNLOAD_* (absolute URL)
 * - Shared base: NEXT_PUBLIC_DOWNLOAD_BASE_URL + filename (desktop only)
 * - Default: direct asset URL on the configured release host (desktop only)
 * - Mobile without env: null (coming soon)
 */
export function resolveDownloadHref(id: DownloadAssetId): string | null {
  const override = ENV_BY_ID[id];
  if (override?.trim()) return override.trim();

  if (id === "ios" || id === "android") return null;

  const file = RELEASE_ASSET_FILES[id];
  const base = process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL?.replace(/\/$/, "");
  if (base) return `${base}/${encodeURIComponent(file)}`;

  return githubReleaseAssetUrl(file);
}

export type DownloadAsset = {
  id: DownloadAssetId;
  platform: DownloadPlatform;
  title: string;
  subtitle: string;
  fileLabel: string;
  href: string | null;
};

export const DOWNLOAD_ASSETS: readonly DownloadAsset[] = [
  {
    id: "mac-apple-silicon",
    platform: "desktop",
    title: "macOS (Apple Silicon)",
    subtitle: "Chip M1 / M2 / M3 trở lên",
    fileLabel: DISPLAY_FILE_LABELS["mac-apple-silicon"],
    href: resolveDownloadHref("mac-apple-silicon"),
  },
  {
    id: "mac-intel",
    platform: "desktop",
    title: "macOS (Intel)",
    subtitle: "Mac dùng chip Intel",
    fileLabel: DISPLAY_FILE_LABELS["mac-intel"],
    href: resolveDownloadHref("mac-intel"),
  },
  {
    id: "windows",
    platform: "desktop",
    title: "Windows",
    subtitle: "Windows 10 / 11",
    fileLabel: DISPLAY_FILE_LABELS.windows,
    href: resolveDownloadHref("windows"),
  },
  {
    id: "ios",
    platform: "mobile",
    title: "iOS",
    subtitle: "iPhone & iPad",
    fileLabel: "App Store",
    href: resolveDownloadHref("ios"),
  },
  {
    id: "android",
    platform: "mobile",
    title: "Android",
    subtitle: "Phone & tablet",
    fileLabel: "Google Play",
    href: resolveDownloadHref("android"),
  },
] as const;

export const DESKTOP_DOWNLOAD_ASSETS = DOWNLOAD_ASSETS.filter(
  (a) => a.platform === "desktop",
);
export const MOBILE_DOWNLOAD_ASSETS = DOWNLOAD_ASSETS.filter(
  (a) => a.platform === "mobile",
);
