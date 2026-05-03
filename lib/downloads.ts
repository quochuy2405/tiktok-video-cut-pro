export type DownloadAssetId = "mac-apple-silicon" | "mac-intel" | "windows";

/** GitHub repo for Releases assets (may still override URLs via env). */
export const GITHUB_RELEASES_REPO = "licenseadminshayshay-ux/tiktok-video-cut-pro";

/** Must match an existing GitHub Release tag and uploaded asset names (working download URLs). */
export const DOWNLOAD_RELEASE_TAG = "v0.1.5";

/** Filename segment on Releases — keep in sync with DOWNLOAD_RELEASE_TAG. */
const ARTIFACT_VERSION = "0.1.5";

/** Marketing version shown on the site (hero, copy); can differ from ARTIFACT_VERSION / DOWNLOAD_RELEASE_TAG. */
export const DISPLAY_APP_VERSION = "1.1.3";

const FILES: Record<DownloadAssetId, string> = {
  "mac-apple-silicon": `Tiktok-Video-Cut-Pro-${ARTIFACT_VERSION}-macOS-AppleSilicon.dmg`,
  "mac-intel": `Tiktok-Video-Cut-Pro-${ARTIFACT_VERSION}-macOS-Intel.dmg`,
  windows: `Tiktok-Video-Cut-Pro-${ARTIFACT_VERSION}-Windows-Setup.exe`,
};

const ENV_BY_ID: Record<DownloadAssetId, string | undefined> = {
  "mac-apple-silicon": process.env.NEXT_PUBLIC_DOWNLOAD_MAC_APPLE_SILICON,
  "mac-intel": process.env.NEXT_PUBLIC_DOWNLOAD_MAC_INTEL,
  windows: process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS,
};

export function githubReleaseAssetUrl(filename: string): string {
  return `https://github.com/${GITHUB_RELEASES_REPO}/releases/download/${DOWNLOAD_RELEASE_TAG}/${filename}`;
}

/** Link to the tagged release page (all assets + notes). */
export function githubReleasesTagPageUrl(): string {
  return `https://github.com/${GITHUB_RELEASES_REPO}/releases/tag/${DOWNLOAD_RELEASE_TAG}`;
}

/**
 * Resolve installer URLs:
 * - Per-file override: NEXT_PUBLIC_DOWNLOAD_* (absolute URL)
 * - Shared base: NEXT_PUBLIC_DOWNLOAD_BASE_URL + filename
 * - Default: GitHub Releases direct asset URL
 */
export function resolveDownloadHref(id: DownloadAssetId): string {
  const override = ENV_BY_ID[id];
  if (override?.trim()) return override.trim();

  const file = FILES[id];
  const base = process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL?.replace(/\/$/, "");
  if (base) return `${base}/${encodeURIComponent(file)}`;

  return githubReleaseAssetUrl(file);
}

export const DOWNLOAD_ASSETS = [
  {
    id: "mac-apple-silicon",
    title: "macOS (Apple Silicon)",
    subtitle: "Chip M1 / M2 / M3 trở lên",
    fileLabel: FILES["mac-apple-silicon"],
    href: resolveDownloadHref("mac-apple-silicon"),
  },
  {
    id: "mac-intel",
    title: "macOS (Intel)",
    subtitle: "Mac dùng chip Intel",
    fileLabel: FILES["mac-intel"],
    href: resolveDownloadHref("mac-intel"),
  },
  {
    id: "windows",
    title: "Windows",
    subtitle: "Windows 10 / 11",
    fileLabel: FILES.windows,
    href: resolveDownloadHref("windows"),
  },
] as const;
