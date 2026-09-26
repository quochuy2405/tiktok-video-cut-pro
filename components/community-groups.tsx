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
  zalo: "bg-[#E8F1FF] text-[#0068FF]",
  telegram: "bg-[#E7F6FD] text-[#168ACD]",
  whatsapp: "bg-[#E7F8EE] text-[#128C7E]",
};

export function CommunityGroupList({
  groups,
  joinLabel,
  location,
  className,
}: {
  groups: SocialGroup[];
  joinLabel: string;
  location: Extract<CtaLocation, "community_section" | "footer">;
  className?: string;
}) {
  if (groups.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {groups.map((group) => {
        const label = platformLabel(group.platform);
        return (
          <li key={group.id}>
            <a
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-[#D8E5DD] bg-white px-3 py-2.5 shadow-card-mint outline-none transition-colors hover:border-brand/40 focus-visible:ring-2 focus-visible:ring-brand"
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
                <span className="mt-0.5 block truncate text-sm font-medium text-[#0F1A15]">
                  {group.name}
                </span>
              </span>
              <span className="shrink-0 text-sm font-medium text-brand">
                {joinLabel}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

