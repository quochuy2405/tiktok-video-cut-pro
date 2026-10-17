"use client";

import {
  Clapperboard,
  Globe,
  Lightbulb,
  Mail,
  Radio,
  Share2,
  ShoppingCart,
  Sparkles,
  Video,
} from "lucide-react";

import { FadeIn } from "@/components/fade-in";
import { SpotlightCard } from "@/components/motion-effects";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ServiceItem = {
  id: string;
  title: string;
  desc: string;
};

export type ServicesSectionCopy = {
  label: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  pillars: string[];
  tagline: string;
  items: ServiceItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  contactEmail: string;
  contactEmailAria: string;
};

/** One icon per service id — matches the order on the brand banner. */
const SERVICE_ICONS: Record<string, typeof Video> = {
  production: Video,
  editing: Clapperboard,
  "sales-video": ShoppingCart,
  social: Share2,
  lighting: Lightbulb,
  "live-room": Radio,
  website: Globe,
};

/** Full-service offer for brands: video, social and website under one roof. */
export function ServicesSection({ copy }: { copy: ServicesSectionCopy }) {
  if (!copy?.items?.length) return null;

  return (
    <section
      id="services"
      className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-contrast px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <div className="mx-auto min-w-0 max-w-[1200px]">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
            <Sparkles className="size-3.5" />
            <span>{copy.label}</span>
          </div>
          <h2 className="font-heading mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
            {copy.titleLead}
            <span className="block text-gradient-brand">{copy.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            {copy.subtitle}
          </p>
          {copy.pillars?.length ? (
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
              {copy.pillars.map((pillar, idx) => (
                <li key={pillar} className="flex items-center gap-3">
                  {idx > 0 ? (
                    <span className="size-1 rounded-full bg-brand/70" aria-hidden />
                  ) : null}
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </FadeIn>

        {/* White boxes on the dark band — the service strip from the brand banner. */}
        <div className="mt-12 grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {copy.items.map((item, idx) => {
            const Icon = SERVICE_ICONS[item.id] ?? Video;
            return (
              <FadeIn key={item.id} delay={idx * 0.04}>
                <SpotlightCard className="group relative h-full min-w-0 rounded-2xl border border-white/60 bg-white p-5 text-left shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,245,160,0.28)] sm:p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-brand-ink ring-1 ring-emerald-200 transition-all duration-300 group-hover:scale-105 group-hover:ring-emerald-300">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-heading mt-4 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </FadeIn>
            );
          })}

          {/* 8th cell on desktop: the contact card closes the grid. */}
          <FadeIn delay={copy.items.length * 0.04}>
            <div className="relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-brand/60 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9),0_0_26px_rgba(0,245,160,0.22)] sm:p-6">
              <div
                className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-brand/25 blur-3xl"
                aria-hidden
              />
              <div className="relative z-[1]">
                <p className="font-heading text-lg font-bold leading-snug text-slate-900">
                  {copy.ctaTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {copy.ctaSubtitle}
                </p>
              </div>
              <a
                href={`mailto:${copy.contactEmail}`}
                aria-label={copy.contactEmailAria}
                onClick={() => {
                  trackCtaClick({
                    cta_id: "services_contact_email",
                    cta_location: "services_section",
                    cta_text: copy.contactEmail,
                    cta_category: "external_resource",
                    destination_url: `mailto:${copy.contactEmail}`,
                  });
                }}
                className="relative z-[1] mt-5 inline-flex items-center gap-2 rounded-full border border-brand/50 bg-white px-3.5 py-2 text-xs font-semibold text-brand-ink transition-colors hover:border-brand hover:bg-emerald-50 sm:text-sm"
              >
                <Mail className="size-4 shrink-0" />
                <span className="truncate">{copy.contactEmail}</span>
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mt-12">
          <div className="flex flex-col items-center gap-6 rounded-[26px] border border-emerald-500/20 bg-[#0a130e]/85 px-6 py-8 text-center backdrop-blur-xl sm:px-10 md:flex-row md:justify-between md:text-left">
            <p className="font-heading text-xl font-semibold italic leading-snug text-gradient-brand sm:text-2xl">
              {copy.tagline}
            </p>
            <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/#sponsors"
                onClick={() => {
                  trackCtaClick({
                    cta_id: "services_cta_primary",
                    cta_location: "services_section",
                    cta_text: copy.ctaPrimary,
                    cta_category: "lead_sponsor",
                    destination_url: "/#sponsors",
                  });
                }}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full sm:w-auto min-h-[48px] rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-7 py-3.5 text-[15px] font-bold text-[#02180e] shadow-[0_0_28px_rgba(0,245,160,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(0,245,160,0.7)] active:scale-98",
                )}
              >
                {copy.ctaPrimary}
              </Link>
              <Link
                href="/#sponsors"
                onClick={() => {
                  trackCtaClick({
                    cta_id: "services_cta_secondary",
                    cta_location: "services_section",
                    cta_text: copy.ctaSecondary,
                    cta_category: "navigation_section",
                    destination_url: "/#sponsors",
                  });
                }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto min-h-[48px] rounded-full border border-emerald-500/30 bg-[#0d1a14]/90 px-7 py-3.5 text-[15px] font-medium text-white hover:border-emerald-400/60 hover:bg-[#12251d] hover:text-white active:scale-98",
                )}
              >
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
