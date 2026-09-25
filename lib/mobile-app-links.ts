/** Android package + iOS bundle used for TikTok App Link / Universal Link. */
export const MOBILE_APP_ID = "com.fivecutpro.asia";

/** HTTPS redirect URI registered in TikTok Developer Portal (Login Kit). */
export const TIKTOK_OAUTH_REDIRECT_URI =
  process.env.TIKTOK_REDIRECT_URI?.trim() ||
  "https://fivecutpro.com/tiktok/callback";

/** Optional custom-scheme fallback when Universal / App Links do not open. */
export const TIKTOK_APP_SCHEME =
  process.env.TIKTOK_APP_SCHEME?.trim() || "fivecutpro://tiktok/callback";

/** Play App Signing, upload key, and debug certs for com.fivecutpro.asia. */
const ANDROID_SHA256_CERT_FINGERPRINTS = [
  "56:8A:91:35:CF:E4:4B:10:70:34:3D:F9:47:6B:15:1C:FD:C4:CD:37:CF:A2:E9:10:7B:E4:C6:E7:40:B2:AD:2D",
  "FD:E4:26:68:E6:28:DE:F8:15:C6:40:C6:0F:6E:09:DA:EA:63:A4:9B:95:31:39:39:C4:5A:17:B4:1C:F7:C6:0F",
  "68:B1:02:D2:54:24:F1:CB:A3:8C:D0:46:7D:DF:FC:67:55:67:6B:12:4F:04:C9:68:70:5D:D0:92:73:11:40:29",
  "66:78:0A:BC:95:55:78:5B:DA:55:37:2A:4E:1C:91:80:6F:7A:8C:F7:85:A6:F8:7A:2E:24:C1:E4:DC:A1:88:04",
];

function parseFingerprints(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim().replace(/\s+/g, "").toUpperCase())
    .filter(Boolean);
}

export function getAndroidSha256Fingerprints(): string[] {
  const extra =
    process.env.ANDROID_SHA256_CERT_FINGERPRINTS?.trim() ||
    process.env.ANDROID_SHA256_FINGERPRINT?.trim() ||
    "";
  const merged = [
    ...ANDROID_SHA256_CERT_FINGERPRINTS,
    ...(extra ? parseFingerprints(extra) : []),
  ];
  return [...new Set(merged)];
}

export function getIosTeamId(): string | null {
  const team =
    process.env.IOS_TEAM_ID?.trim() || process.env.APPLE_TEAM_ID?.trim() || "9AYG5LR4BV";
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
      relation: [
        "delegate_permission/common.handle_all_urls",
        "delegate_permission/common.get_login_creds",
      ],
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
