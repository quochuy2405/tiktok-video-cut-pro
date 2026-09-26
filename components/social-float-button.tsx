"use client";

import { PlatformIcon } from "@/components/platform-brand-icons";
import { trackCtaClick } from "@/lib/analytics";
import {
  platformLabel,
  resolveFloatGroup,
  type SocialFloatMap,
  type SocialGroup,
} from "@/lib/social-groups";

export function SocialFloatButton({
  groups,
  floatByCountry,
  country,
  locale,
}: {
  groups: SocialGroup[];
  floatByCountry: SocialFloatMap;
  country?: string | null;
  locale?: string | null;
}) {
  const group = resolveFloatGroup(groups, floatByCountry, { country, locale });
  if (!group) return null;

  const label = platformLabel(group.platform);

  return (
    <a
      href={group.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${group.name}`}
      title={`${label} — ${group.name}`}
      id="social-float"
      className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 size-14 rounded-[22%] shadow-[0_10px_24px_-8px_rgba(15,26,21,0.45)] outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      onClick={() => {
        trackCtaClick({
          cta_id: `float_${group.platform}`,
          cta_location: "social_float",
          cta_text: label,
          cta_category: "external_resource",
          destination_url: group.url,
          platform: group.platform,
        });
      }}
    >
      <PlatformIcon platform={group.platform} className="size-14" />
    </a>
  );
}
