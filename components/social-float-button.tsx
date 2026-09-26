"use client";

import { useTranslations } from "next-intl";

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
  const t = useTranslations("Footer");
  const group = resolveFloatGroup(groups, floatByCountry, { country, locale });
  if (!group) return null;

  const label = platformLabel(group.platform);
  const groupTitle = t("groupsHeading");
  const title = `${label} — ${groupTitle}`;

  return (
    <a
      href={group.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      title={title}
      id="social-float"
      className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex w-[5.5rem] flex-col items-center gap-1.5 rounded-[22px] border border-[#D8E5DD] bg-white px-2 py-2.5 text-center shadow-card-mint outline-none transition-colors hover:border-brand/45 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      onClick={() => {
        trackCtaClick({
          cta_id: `float_${group.platform}`,
          cta_location: "social_float",
          cta_text: groupTitle,
          cta_category: "external_resource",
          destination_url: group.url,
          platform: group.platform,
        });
      }}
    >
      <span className="overflow-hidden rounded-[14px]">
        <PlatformIcon platform={group.platform} className="size-11" />
      </span>
      <span className="line-clamp-2 w-full text-[11px] font-semibold leading-tight text-[#0F1A15]">
        {groupTitle}
      </span>
    </a>
  );
}
