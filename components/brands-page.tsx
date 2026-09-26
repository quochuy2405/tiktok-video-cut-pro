"use client";

import { Building2, Download, HelpCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandScreens, type ScreenCopy } from "@/components/app-screens";
import { BreadcrumbTrail } from "@/components/breadcrumb-trail";
import { FadeIn } from "@/components/fade-in";
import {
  SponsorBenefits,
  SponsorInsight,
  SponsorPlacements,
  SponsorProcess,
  SponsorStats,
} from "@/components/sponsor-blocks";
import { SponsorContact } from "@/components/sponsor-contact";
import { SponsorForm } from "@/components/sponsor-form";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { BRAND_SCREENS } from "@/lib/screenshots";
import { cn } from "@/lib/utils";
import type { BrandsPageCopy } from "@/types/pages";
import type { SponsorsSectionCopy } from "@/types/sponsor";

export function BrandsPage() {
  const t = useTranslations("Landing");
  const tNav = useTranslations("Nav");
  const page = t.raw("brandsPage") as BrandsPageCopy;
  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const screens = t.raw("screenshots") as ScreenCopy;

  return (
    <>
      {/* Hero */}
      <section className="section-band-mint border-b border-[#B9CFC3] px-4 pb-16 pt-24 sm:px-6 md:pb-20 md:pt-28 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[1120px]">
          <BreadcrumbTrail homeLabel={tNav("home")} current={page.breadcrumb} />

          <FadeIn className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Building2 className="size-3.5" />
              <span>{page.heroLabel}</span>
            </div>
            <h1 className="font-heading mt-5 text-[2.1rem] font-semibold leading-[1.12] tracking-[-1px] text-[#0F1A15] md:text-[3rem]">
              {page.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4A5C53] md:text-lg">
              {page.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#sponsor-form"
                onClick={() => {
                  trackCtaClick({
                    cta_id: "brands_hero_form",
                    cta_location: "brands_page",
                    cta_text: page.heroCtaPrimary,
                    cta_category: "lead_sponsor",
                    destination_url: "#sponsor-form",
                  });
                }}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "rounded-full border-0 bg-brand px-8 py-3.5 text-[15px] font-semibold text-[#052E1C] glow-brand-sm transition-transform hover:-translate-y-0.5 hover:bg-brand",
                )}
              >
                {page.heroCtaPrimary}
              </a>
              <a
                href="#placements"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border border-[#B9CFC3] bg-white px-8 py-3.5 text-[15px] font-medium text-[#0F1A15] shadow-card-mint hover:border-brand/35 hover:bg-[#EEF5F1] hover:text-[#0F1A15]",
                )}
              >
                {page.heroCtaSecondary}
              </a>
            </div>
          </FadeIn>

          <div className="mt-12">
            <SponsorStats stats={sponsors.stats} />
          </div>
        </div>
      </section>

      {/* Why brands pick Five Cut Pro */}
      <section className="border-b border-[#B9CFC3] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[1120px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-[-0.7px] text-[#0F1A15] md:text-[2.4rem]">
              {page.whyTitle}
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {page.why?.map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.07} className="flex">
                <div className="glass-panel flex w-full flex-col rounded-[24px] border border-[#B9CFC3] p-7">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
                    <Sparkles className="size-5" />
                  </div>
                  <h3 className="font-heading mt-5 text-lg font-semibold text-[#0F1A15]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4A5C53]">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Insight + placements + process */}
      <section className="section-band-wash border-b border-[#B9CFC3] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[1120px] space-y-16">
          <SponsorInsight insight={sponsors.insight} />
          {screens ? <BrandScreens copy={screens} screens={BRAND_SCREENS} /> : null}
          <SponsorPlacements
            id="placements"
            title={sponsors.placementsTitle}
            subtitle={sponsors.placementsSubtitle}
            groups={sponsors.placementGroups}
          />
          <SponsorProcess
            title={sponsors.processTitle}
            steps={sponsors.process}
            note={sponsors.processNote}
          />
        </div>
      </section>

      {/* Benefits + form */}
      <section className="border-b border-[#B9CFC3] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[1120px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[1.85rem] font-semibold tracking-[-0.7px] text-[#0F1A15] md:text-[2.4rem]">
              {page.ctaTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4A5C53]">
              {page.ctaSubtitle}
            </p>
          </FadeIn>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
            <FadeIn className="lg:col-span-5">
              <SponsorBenefits
                title={sponsors.benefitsTitle}
                benefits={sponsors.benefits}
                offerBadge={sponsors.offerBadge}
                offerText={sponsors.offerText}
              >
                <SponsorContact copy={sponsors.form} location="brands_page" />
              </SponsorBenefits>
            </FadeIn>
            <FadeIn delay={0.08} className="lg:col-span-7">
              <SponsorForm
                id="sponsor-form"
                copy={sponsors.form}
                location="brands_page"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Brand FAQ — plain markup so it is readable without JavaScript */}
      <section className="section-band-raised px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto min-w-0 max-w-[860px]">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <HelpCircle className="size-3.5" />
              <span>{page.faqTitle}</span>
            </div>
          </FadeIn>

          <div className="mt-10 space-y-5">
            {page.faq?.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.04}>
                <div className="rounded-2xl surface-card p-6">
                  <h3 className="font-heading text-base font-semibold text-[#0F1A15] sm:text-lg">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1F2E27]">
                    {item.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-12 text-center">
            <Link
              href="/#download"
              onClick={() => {
                trackCtaClick({
                  cta_id: "brands_download",
                  cta_location: "brands_page",
                  cta_text: page.ctaTitle,
                  cta_category: "conversion_download",
                  destination_url: "/#download",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border border-[#B9CFC3] bg-white px-8 py-3.5 text-[15px] font-medium text-[#0F1A15] shadow-card-mint hover:border-brand/35 hover:bg-[#EEF5F1]",
              )}
            >
              <Download className="mr-2 size-4" />
              {t("hero.ctaPrimary")}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
