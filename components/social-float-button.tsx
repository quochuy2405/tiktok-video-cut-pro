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
      className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex w-[5.5rem] flex-col items-center gap-1.5 rounded-[22px] border border-emerald-500/25 bg-[#0a140f]/90 backdrop-blur-xl px-2 py-2.5 text-center shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(0,245,160,0.15)] outline-none transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_28px_rgba(0,245,160,0.35)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
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
      <span className="line-clamp-2 w-full text-[11px] font-semibold leading-tight text-white">
        {groupTitle}
      </span>
    </a>
  );
}
