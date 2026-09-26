"use client";

import { trackCtaClick, type CtaLocation } from "@/lib/analytics";
import {
  platformLabel,
  type SocialGroup,
  type SocialGroupPlatform,
} from "@/lib/social-groups";
import { cn } from "@/lib/utils";

const PLATFORM_STYLE: Record<
  SocialGroupPlatform,
  { chip: string; icon: string }
> = {
  zalo: {
    chip: "bg-[#E8F1FF] text-[#0068FF]",
    icon: "bg-[#0068FF]",
  },
  telegram: {
    chip: "bg-[#E7F6FD] text-[#168ACD]",
    icon: "bg-[#2AABEE]",
  },
  whatsapp: {
    chip: "bg-[#E7F8EE] text-[#128C7E]",
    icon: "bg-[#25D366]",
  },
};

function PlatformMark({ platform }: { platform: SocialGroupPlatform }) {
  const style = PLATFORM_STYLE[platform];
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-xl text-white",
        style.icon,
      )}
      aria-hidden
    >
      {platform === "zalo" ? <ZaloIcon /> : null}
      {platform === "telegram" ? <TelegramIcon /> : null}
      {platform === "whatsapp" ? <WhatsAppIcon /> : null}
    </span>
  );
}

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
        const style = PLATFORM_STYLE[group.platform];
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
              <PlatformMark platform={group.platform} />
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    style.chip,
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

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M12.2 3.2c-4.6 0-8.2 3.2-8.2 7.3 0 2.2 1.1 4.2 2.9 5.5l-.9 3.2c-.1.4.3.7.6.5l3.4-2c.7.2 1.4.3 2.2.3 4.6 0 8.2-3.2 8.2-7.3s-3.6-7.5-8.2-7.5zm3.5 8.6h-3.4l1.8-3.4c.2-.3 0-.7-.4-.7h-3.2c-.3 0-.5.3-.4.6l1.5 3.5H9.1c-.3 0-.5.3-.4.6l.5.9c.1.2.3.3.5.3h5.6c.4 0 .6-.4.4-.7l-.6-.8c-.1-.2 0-.3.2-.3z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M20.7 4.3 3.4 10.9c-1.2.5-1.1 1.1-.2 1.4l4.4 1.4 10.2-6.4c.5-.3.9-.1.6.2l-8.3 7.5-.3 4.4c.4 0 .6-.2.9-.4l2.2-2.1 4.6 3.4c.8.5 1.5.2 1.7-.8l3-14.2c.3-1.2-.4-1.8-1.5-1.4z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M12.1 3.2A8.7 8.7 0 0 0 4.6 16.4L3.4 20.6l4.3-1.1A8.7 8.7 0 1 0 12.1 3.2zm5 12.2c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-.3-.1-.7-.3-1.3-.5-2.2-1-3.7-3.2-3.8-3.3-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.5l-.2.2c-.1.1-.2.2-.1.4.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1.1-.2.6-.7.8-.9.2-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.7-.1 1.2z" />
    </svg>
  );
}
