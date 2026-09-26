import { Check, CheckCircle2, Gift, Handshake, Megaphone, Quote } from "lucide-react";

import { FadeIn } from "@/components/fade-in";
import type {
  SponsorInsightCopy,
  SponsorPlacementGroup,
  SponsorProcessStep,
  SponsorStat,
} from "@/types/sponsor";

/** Brand stats strip — hard facts only, no invented metrics. */
export function SponsorStats({ stats }: { stats: SponsorStat[] }) {
  if (!stats?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((stat, idx) => (
        <FadeIn key={stat.label} delay={idx * 0.05}>
          <div className="rounded-[20px] surface-card px-3 py-5 text-center">
            <span className="block font-heading font-mono text-xl font-bold text-gradient-brand sm:text-2xl">
              {stat.value}
            </span>
            <span className="mt-1 block whitespace-nowrap text-[11px] leading-tight text-[#4A5C53] sm:text-xs">
              {stat.label}
            </span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/** Why brand exposure inside the shot guide beats a scrolled-past banner. */
export function SponsorInsight({ insight }: { insight: SponsorInsightCopy }) {
  if (!insight) return null;

  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-[26px] border border-brand/35 bg-gradient-to-b from-brand/[0.12] via-brand/[0.04] to-transparent p-7 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-deep">
              <Quote className="size-3.5" />
              {insight.badge}
            </span>
            <p className="font-heading mt-5 text-xl font-semibold leading-snug text-[#0F1A15] sm:text-2xl">
              {insight.quote}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#1F2E27] sm:text-base">
              {insight.body}
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4A5C53]">
                {insight.providesLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {insight.provides?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#B9CFC3] bg-white px-3 py-1.5 text-xs font-medium text-[#1F2E27]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4A5C53]">
                {insight.anglesLabel}
              </p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {insight.angles?.map((angle, i) => (
                  <li
                    key={angle}
                    className="flex items-center gap-2.5 rounded-xl bg-white/80 px-3 py-2 text-xs font-medium text-[#1F2E27] ring-1 ring-[#D8E5DD]"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 font-mono text-[10px] font-bold text-brand-deep">
                      0{i + 1}
                    </span>
                    <span className="leading-snug">{angle}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/** The 12 brand placement slots, numbered across four groups. */
export function SponsorPlacements({
  title,
  subtitle,
  groups,
  id,
}: {
  title: string;
  subtitle: string;
  groups: SponsorPlacementGroup[];
  id?: string;
}) {
  if (!groups?.length) return null;

  return (
    <div id={id} className="scroll-mt-[72px]">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          <Megaphone className="size-3.5" />
          <span>{title}</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#4A5C53] sm:text-base">
          {subtitle}
        </p>
      </FadeIn>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, gi) => {
          const offset = groups
            .slice(0, gi)
            .reduce((acc, g) => acc + (g.items?.length || 0), 0);
          return (
            <FadeIn key={group.title} delay={gi * 0.05} className="flex">
              <div className="glass-panel flex w-full flex-col rounded-[22px] border border-[#B9CFC3] p-6">
                <h3 className="font-heading text-base font-semibold text-[#0F1A15]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.items?.map((item, ii) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#1F2E27]">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 font-mono text-[10px] font-bold text-brand-deep">
                        {String(offset + ii + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

/** Five-step partnership flow. */
export function SponsorProcess({
  title,
  steps,
  note,
}: {
  title: string;
  steps: SponsorProcessStep[];
  note: string;
}) {
  if (!steps?.length) return null;

  return (
    <div>
      <FadeIn className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          <Handshake className="size-3.5" />
          <span>{title}</span>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, idx) => (
          <FadeIn key={step.num} delay={idx * 0.05} className="flex">
            <div className="flex w-full flex-col rounded-[20px] surface-card p-5">
              <span className="font-mono text-xs font-bold text-brand">{step.num}</span>
              <h3 className="font-heading mt-2 text-sm font-semibold text-[#0F1A15]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#4A5C53]">{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-[#1F2E27]">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>{note}</span>
        </p>
      </FadeIn>
    </div>
  );
}

/** Benefit list plus the founding-partner offer. */
export function SponsorBenefits({
  title,
  benefits,
  offerBadge,
  offerText,
  children,
}: {
  title: string;
  benefits: string[];
  offerBadge: string;
  offerText: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-[24px] border border-[#B9CFC3] p-7 sm:p-8">
      <h3 className="font-heading mb-5 text-xl font-semibold text-[#0F1A15]">{title}</h3>
      <ul className="space-y-4">
        {benefits?.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-[#1F2E27]">
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Check className="size-3.5" strokeWidth={3} />
            </div>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-2xl border border-brand/35 bg-brand/10 p-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-deep">
          <Gift className="size-3.5" />
          {offerBadge}
        </span>
        <p className="mt-2 text-sm font-medium leading-relaxed text-[#0F1A15]">
          {offerText}
        </p>
      </div>

      {children}
    </div>
  );
}
