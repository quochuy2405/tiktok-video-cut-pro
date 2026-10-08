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
          <div className="rounded-[20px] surface-card border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 px-3 py-5 text-center shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85),0_0_20px_rgba(0,245,160,0.1)] transition-all hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9),0_0_28px_rgba(0,245,160,0.2)]">
            <span className="block font-heading font-mono text-xl font-bold text-gradient-brand drop-shadow-[0_0_16px_rgba(0,245,160,0.3)] sm:text-2xl">
              {stat.value}
            </span>
            <span className="mt-1 block whitespace-nowrap text-[11px] leading-tight text-[#9db7aa] sm:text-xs">
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
      <div className="relative overflow-hidden rounded-[26px] border border-emerald-500/25 bg-gradient-to-br from-[#0c1812]/90 via-[#0a1510]/85 to-[#060c09]/95 p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,160,0.1)] sm:p-9">
        <div className="pointer-events-none absolute -top-24 left-1/3 size-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12 relative z-[1]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-[0_0_12px_rgba(0,245,160,0.25)]">
              <Quote className="size-3.5" />
              {insight.badge}
            </span>
            <p className="font-heading mt-5 text-xl font-semibold leading-snug text-white sm:text-2xl">
              {insight.quote}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#b2cfc1] sm:text-base">
              {insight.body}
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9db7aa]">
                {insight.providesLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {insight.provides?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-500/25 bg-[#0e1c15]/90 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9db7aa]">
                {insight.anglesLabel}
              </p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {insight.angles?.map((angle, i) => (
                  <li
                    key={angle}
                    className="flex items-center gap-2.5 rounded-xl bg-[#0d1a14]/85 px-3 py-2 text-xs font-medium text-[#b2cfc1] ring-1 ring-emerald-500/20"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 font-mono text-[10px] font-bold text-brand shadow-[0_0_10px_rgba(0,245,160,0.3)]">
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
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
          <Megaphone className="size-3.5" />
          <span>{title}</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#9db7aa] sm:text-base">
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
              <div className="glass-panel flex w-full flex-col rounded-[22px] border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-6 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9),0_0_20px_rgba(0,245,160,0.1)] transition-all hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_20px_45px_-16px_rgba(0,0,0,0.95),0_0_30px_rgba(0,245,160,0.2)]">
                <h3 className="font-heading text-base font-semibold text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.items?.map((item, ii) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#b2cfc1]">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 font-mono text-[10px] font-bold text-brand shadow-[0_0_10px_rgba(0,245,160,0.25)]">
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
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
          <Handshake className="size-3.5" />
          <span>{title}</span>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, idx) => (
          <FadeIn key={step.num} delay={idx * 0.05} className="flex">
            <div className="flex w-full flex-col rounded-[20px] surface-card border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-5 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.85)] transition-all hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,160,0.15)]">
              <span className="font-mono text-xs font-bold text-brand drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]">{step.num}</span>
              <h3 className="font-heading mt-2 text-sm font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#9db7aa]">{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-[#b2cfc1]">
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
    <div className="glass-panel rounded-[24px] border border-emerald-500/20 bg-gradient-to-br from-[#0c1812]/90 via-[#0a140f]/90 to-[#070e0a]/95 p-7 sm:p-8 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.9),0_0_25px_rgba(0,245,160,0.12)]">
      <h3 className="font-heading mb-5 text-xl font-semibold text-white">{title}</h3>
      <ul className="space-y-4">
        {benefits?.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-[#b2cfc1]">
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand shadow-[0_0_10px_rgba(0,245,160,0.3)]">
              <Check className="size-3.5" strokeWidth={3} />
            </div>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-2xl border border-brand/35 bg-brand/10 p-5 shadow-[0_0_20px_rgba(0,245,160,0.15)]">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand">
          <Gift className="size-3.5" />
          {offerBadge}
        </span>
        <p className="mt-2 text-sm font-medium leading-relaxed text-[#f4faf6]">
          {offerText}
        </p>
      </div>

      {children}
    </div>
  );
}
