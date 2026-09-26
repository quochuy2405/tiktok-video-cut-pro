import { cache } from "react";

export const SOCIAL_GROUP_PLATFORMS = ["zalo", "telegram", "whatsapp"] as const;

export type SocialGroupPlatform = (typeof SOCIAL_GROUP_PLATFORMS)[number];

export type SocialGroup = {
  id: string;
  platform: SocialGroupPlatform;
  name: string;
  url: string;
};

const PLATFORM_ORDER: Record<SocialGroupPlatform, number> = {
  zalo: 0,
  telegram: 1,
  whatsapp: 2,
};

function getApiBase(): string {
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

function asPlatform(value: unknown): SocialGroupPlatform | null {
  const raw = asString(value)?.toLowerCase();
  if (raw === "zalo" || raw === "telegram" || raw === "whatsapp") return raw;
  return null;
}

function isActive(value: unknown): boolean {
  return value !== false;
}

function addGroup(
  groups: SocialGroup[],
  seen: Set<string>,
  group: SocialGroup | null,
) {
  if (!group) return;
  if (seen.has(group.url)) return;
  seen.add(group.url);
  groups.push(group);
}

function fromItem(
  raw: unknown,
  fallbackPlatform?: SocialGroupPlatform,
): SocialGroup | null {
  const item = asRecord(raw);
  if (!item || !isActive(item.is_active ?? item.isActive)) return null;
  const platform = asPlatform(item.platform) ?? fallbackPlatform ?? null;
  const url = asString(item.url) || asString(item.link) || asString(item.href);
  if (!platform || !url) return null;
  const name = asString(item.name) || asString(item.title) || platformLabel(platform);
  const id = asString(item.id) || `${platform}:${url}`;
  return { id, platform, name, url };
}

export function platformLabel(platform: SocialGroupPlatform): string {
  switch (platform) {
    case "zalo":
      return "Zalo";
    case "telegram":
      return "Telegram";
    case "whatsapp":
      return "WhatsApp";
  }
}

function normalizeConfig(data: unknown): SocialGroup[] {
  const root = asRecord(data);
  const payload = asRecord(root?.data) ?? root;
  if (!payload) return [];

  const groups: SocialGroup[] = [];
  const seen = new Set<string>();

  const social = Array.isArray(payload.social_groups) ? payload.social_groups : [];
  for (const item of social) addGroup(groups, seen, fromItem(item));

  const zaloOnly = Array.isArray(payload.zalo_groups) ? payload.zalo_groups : [];
  for (const item of zaloOnly) addGroup(groups, seen, fromItem(item, "zalo"));

  const singles: Array<[SocialGroupPlatform, unknown]> = [
    ["zalo", payload.zalo_group_url],
    ["telegram", payload.telegram_group_url],
    ["whatsapp", payload.whatsapp_group_url],
  ];
  for (const [platform, url] of singles) {
    const href = asString(url);
    if (!href) continue;
    if (groups.some((group) => group.platform === platform)) continue;
    addGroup(groups, seen, {
      id: `${platform}:${href}`,
      platform,
      name: platformLabel(platform),
      url: href,
    });
  }

  return groups.sort(
    (a, b) => PLATFORM_ORDER[a.platform] - PLATFORM_ORDER[b.platform],
  );
}

/** Active Zalo / Telegram / WhatsApp groups from `/api/v1/app/config`. */
export const fetchSocialGroups = cache(async (): Promise<SocialGroup[]> => {
  try {
    const res = await fetch(`${getApiBase()}/api/v1/app/config`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "FiveCutProWeb/1.0",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return normalizeConfig(await res.json());
  } catch {
    return [];
  }
});

export function socialGroupsMarkdown(groups: SocialGroup[]): string {
  if (groups.length === 0) return "";
  const lines = groups.map(
    (group) =>
      `- ${platformLabel(group.platform)} — [${group.name}](${group.url})`,
  );
  return `\n## Nhóm hỗ trợ\n\nDanh sách đang bật từ cấu hình app. Chỉ gồm Zalo, Telegram và WhatsApp có link.\n\n${lines.join("\n")}\n`;
}
