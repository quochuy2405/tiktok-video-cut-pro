/** Android package + iOS bundle used for TikTok App Link / Universal Link. */
export const MOBILE_APP_ID = "com.fivecutpro.asia";

/** HTTPS redirect URI registered in TikTok Developer Portal (Login Kit). */
export const TIKTOK_OAUTH_REDIRECT_URI =
  process.env.TIKTOK_REDIRECT_URI?.trim() ||
  "https://fivecutpro.asia/tiktok/callback";

/** Optional custom-scheme fallback when Universal / App Links do not open. */
export const TIKTOK_APP_SCHEME =
  process.env.TIKTOK_APP_SCHEME?.trim() || "fivecutpro://tiktok/callback";

export function getAndroidSha256Fingerprints(): string[] {
  const raw =
    process.env.ANDROID_SHA256_CERT_FINGERPRINTS?.trim() ||
    process.env.ANDROID_SHA256_FINGERPRINT?.trim() ||
    "";
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim().replace(/\s+/g, "").toUpperCase())
    .filter(Boolean);
}

export function getIosTeamId(): string | null {
  const team =
    process.env.IOS_TEAM_ID?.trim() || process.env.APPLE_TEAM_ID?.trim() || "";
  if (!team || team.includes("example")) return null;
  return team;
}

export function getIosBundleId(): string {
  return process.env.IOS_BUNDLE_ID?.trim() || MOBILE_APP_ID;
}

export function getAndroidPackageName(): string {
  return process.env.ANDROID_PACKAGE_NAME?.trim() || MOBILE_APP_ID;
}

export function buildAndroidAssetLinks() {
  const fingerprints = getAndroidSha256Fingerprints();
  if (fingerprints.length === 0) return [];

  return [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: getAndroidPackageName(),
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ];
}

export function buildAppleAppSiteAssociation() {
  const teamId = getIosTeamId();
  const bundleId = getIosBundleId();
  const appID = teamId ? `${teamId}.${bundleId}` : null;

  const paths = ["/tiktok/callback", "/tiktok/callback/*"];

  return {
    applinks: {
      apps: [] as string[],
      details: appID
        ? [
            {
              appID,
              paths,
              // iOS 13+ / newer AASA shape
              appIDs: [appID],
              components: [
                { "/": "/tiktok/callback" },
                { "/": "/tiktok/callback/*" },
              ],
            },
          ]
        : [],
    },
    webcredentials: appID
      ? {
          apps: [appID],
        }
      : undefined,
  };
}
