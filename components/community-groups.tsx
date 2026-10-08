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

export function CommunityGroupList({
  groups,
  title,
  joinLabel,
  location,
  className,
}: {
  groups: SocialGroup[];
  title: string;
  joinLabel: string;
  location: Extract<CtaLocation, "community_section" | "footer">;
  className?: string;
}) {
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
              className="group flex items-center gap-3.5 rounded-2xl border border-emerald-500/20 bg-[#0d1812]/90 px-3.5 py-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.9),0_0_22px_rgba(0,245,160,0.2)] focus-visible:ring-2 focus-visible:ring-brand"
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
                    PLATFORM_CHIP[group.platform],
                  )}
                >
                  {label}
                </span>
                <span className="mt-0.5 block truncate text-sm font-semibold text-white">
                  {title}
                </span>
              </span>
              <span className="shrink-0 text-sm font-bold text-brand drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]">
                {joinLabel}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

