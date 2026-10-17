"use client";

import { PlatformIcon } from "@/components/platform-brand-icons";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics";
import {
  platformLabel,
  type SocialGroup,
  type SocialGroupPlatform,
} from "@/lib/social-groups";
import { cn } from "@/lib/utils";

const PLATFORM_CHIP: Record<SocialGroupPlatform, string> = {
  zalo: "bg-[#0068FF]/15 border border-[#0068FF]/30 text-[#4D94FF]",
  telegram: "bg-[#168ACD]/15 border border-[#168ACD]/30 text-[#4EB5E8]",
  whatsapp: "bg-[#128C7E]/15 border border-[#128C7E]/30 text-[#25D366]",
};

/** Light chips read better on the white cards used on the home page. */
const PLATFORM_CHIP_LIGHT: Record<SocialGroupPlatform, string> = {
  zalo: "bg-[#0068FF]/10 border border-[#0068FF]/25 text-[#0057D8]",
  telegram: "bg-[#168ACD]/10 border border-[#168ACD]/25 text-[#1278B4]",
  whatsapp: "bg-[#128C7E]/10 border border-[#128C7E]/25 text-[#0F7A6D]",
};

const TONE = {
  light: {
    box: "border-white/60 bg-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] hover:border-brand hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,245,160,0.25)]",
    title: "text-slate-900",
    join: "text-brand-ink",
    chip: PLATFORM_CHIP_LIGHT,
  },
  dark: {
    box: "border-emerald-500/20 bg-[#0d1812]/90 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] hover:border-emerald-400/50 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.9),0_0_22px_rgba(0,245,160,0.2)]",
    title: "text-white",
    join: "text-brand drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]",
    chip: PLATFORM_CHIP,
  },
} as const;

export function CommunityGroupList({
  groups,
  title,
  joinLabel,
  location,
  className,
  tone = "dark",
}: {
  groups: SocialGroup[];
  title: string;
  joinLabel: string;
  location: Extract<CtaLocation, "community_section" | "footer">;
  className?: string;
  tone?: keyof typeof TONE;
}) {
  const skin = TONE[tone];

  if (groups.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {groups.map((group) => {
        const label = platformLabel(group.platform);
        return (
          <li key={group.id}>
            <a
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-3.5 rounded-2xl border px-3.5 py-3 outline-none transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand",
                skin.box,
              )}
              onClick={() => {
                trackCtaClick({
                  cta_id: `community_${group.platform}`,
                  cta_location: location,
                  cta_text: `${joinLabel} ${label}`,
                  cta_category: "external_resource",
                  destination_url: group.url,
                  platform: group.platform,
                });
              }}
            >
              <PlatformIcon platform={group.platform} className="size-10" />
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    skin.chip[group.platform],
                  )}
                >
                  {label}
                </span>
                <span className={cn("mt-0.5 block truncate text-sm font-semibold", skin.title)}>
                  {title}
                </span>
              </span>
              <span className={cn("shrink-0 text-sm font-bold", skin.join)}>
                {joinLabel}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

