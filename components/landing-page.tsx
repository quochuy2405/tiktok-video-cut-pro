"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  Flame,
  Globe,
  HelpCircle,
  Layers,
  Music2,
  Play,
  Scissors,
  Sparkles,
  Trophy,
  Upload,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import { BrandScreens, type ScreenCopy } from "@/components/app-screens";
import { AppShowcase } from "@/components/app-showcase";
import { RevealWords, SpotlightCard } from "@/components/motion-effects";
import { ScreenMarquee } from "@/components/screen-marquee";
import { CommunityGroupList } from "@/components/community-groups";
import {
  SponsorBenefits,
  SponsorInsight,
  SponsorPlacements,
  SponsorProcess,
  SponsorStats,
} from "@/components/sponsor-blocks";
import { SponsorContact } from "@/components/sponsor-contact";
import { SponsorForm } from "@/components/sponsor-form";
import { FadeIn } from "@/components/fade-in";
import { CommonBannerPopup } from "@/components/common-banner-popup";
import { MarketingBannerCarousel } from "@/components/marketing-banner-carousel";
import { StoreQrCodes } from "@/components/store-qr-codes";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import { DISPLAY_APP_VERSION } from "@/lib/downloads";
import type { MarketingBannerSlide } from "@/lib/marketing-api";
import type { SocialGroup } from "@/lib/social-groups";
import { BRAND_SCREENS } from "@/lib/screenshots";
import { cn } from "@/lib/utils";
import type { SponsorsSectionCopy } from "@/types/sponsor";

type LandingFeature = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
};

type HowStep = {
  num: string;
  title: string;
  desc: string;
  badge: string;
};

type HowItWorksSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  stepLabel: string;
  steps: HowStep[];
};

type CampaignChannel = {
  id: string;
  title: string;
  desc: string;
  bullets?: string[];
};

type CampaignsSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  channels: CampaignChannel[];
  flowTitle: string;
  flow: string[];
  note: string;
  cta: string;
};

type MetricItem = {
  value: string;
  label: string;
  desc: string;
};

type ComparisonSectionCopy = {
  badge: string;
  title: string;
  subtitle: string;
  oldWay: {
    badge: string;
    title: string;
    subtitle: string;
    points: string[];
  };
  newWay: {
    badge: string;
    title: string;
    subtitle: string;
    points: string[];
  };
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
};

type FeaturesSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
};

const FEATURE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "koc-market": Flame,
  recipes: Layers,
  "shot-guide": Camera,
  "merge-export": Scissors,
};

const CAMPAIGN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  tiktok: Music2,
  events: Trophy,
  community: Globe,
};

const easeOut = [0.22, 1, 0.36, 1] as const;


export function LandingPage({
  stripBanners = [],
  popupBanners = [],
  socialGroups = [],
}: {
  stripBanners?: MarketingBannerSlide[];
  popupBanners?: MarketingBannerSlide[];
  socialGroups?: SocialGroup[];
}) {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Landing");
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const metricsBar = (t.raw("metricsBar") as MetricItem[]) || [];
  const featuresSection = t.raw("featuresSection") as FeaturesSectionCopy;
  const features = ((t.raw("features") as LandingFeature[]) || []).filter(
    (f) => f.id === "koc-market" || f.id === "recipes" || f.id === "shot-guide" || f.id === "merge-export",
  );
  const howItWorks = t.raw("howItWorksSection") as HowItWorksSectionCopy;
  const comparison = t.raw("comparisonSection") as ComparisonSectionCopy;
  const campaigns = t.raw("campaignsSection") as CampaignsSectionCopy;
  const screens = t.raw("screenshots") as ScreenCopy;
  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const faq = t.raw("faqSection") as FaqSectionCopy;

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero-atmosphere relative isolate flex min-h-[min(94vh,960px)] flex-col justify-center overflow-x-clip px-4 pb-24 pt-16 sm:px-6 md:pb-32 md:pt-20 lg:px-8">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-90" aria-hidden />
        {/* Static blobs: animating a 480px blur repaints the whole hero every frame. */}
        <div
          className="pointer-events-none absolute -left-24 top-1/4 size-[420px] rounded-full bg-brand/20 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-deep/25 blur-[110px]"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full min-w-0 max-w-[840px] flex-col items-center text-center">
          <motion.div
            className="relative mb-8"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="absolute inset-0 scale-110 rounded-[28px] bg-brand/20 blur-2xl" aria-hidden />
            <Image
              src="/logo.png"
              alt={t("hero.logoAlt")}
              width={128}
              height={128}
              priority
              className="relative size-28 rounded-[24px] shadow-2xl ring-1 ring-black/5 sm:size-32 sm:rounded-[26px] md:size-36 md:rounded-[28px]"
            />
          </motion.div>

          <motion.div
            className="mb-6 flex flex-col items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.06 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-md">
              <Scissors className="size-3.5 shrink-0" />
              <span>{t("hero.tagline")}</span>
            </div>
          </motion.div>

          <h1 className="font-heading max-w-[min(100%,32rem)] text-[clamp(2.1rem,6.5vw+0.2rem,4.4rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#0F1A15] text-balance sm:max-w-none md:tracking-[-1.35px]">
            <RevealWords text={t("hero.titleLead")} delay={0.08} />{" "}
            <RevealWords
              text={t("hero.titleAccent")}
              className="text-gradient-shimmer"
              delay={0.24}
            />
          </h1>

          <motion.p
            className="mt-6 max-w-2xl px-1 text-base leading-relaxed text-[#4A5C53] md:px-0 md:text-lg md:leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.16 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="mt-8 flex w-full min-w-0 flex-wrap items-center justify-center gap-3.5 px-1 sm:px-0"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.22 }}
          >
            <Link
              href="/#download"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_download_primary",
                  cta_location: "hero",
                  cta_text: t("hero.ctaPrimary"),
                  cta_category: "conversion_download",
                  destination_url: "/#download",
                });
              }}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-full border-0 bg-brand px-8 py-3.5 text-[15px] font-semibold text-[#052E1C] shadow-none glow-brand-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand hover:glow-brand-lg",
              )}
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#comparison"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_explore_features",
                  cta_location: "hero",
                  cta_text: t("hero.ctaSecondary"),
                  cta_category: "navigation_section",
                  destination_url: "/#comparison",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border border-[#B9CFC3] bg-white px-8 py-3.5 text-[15px] font-medium text-[#0F1A15] shadow-card-mint hover:border-brand/35 hover:bg-[#EEF5F1] hover:text-[#0F1A15]",
              )}
            >
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>

          {/* Hero Trust Micro-copy */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-1.5 text-center text-xs"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="flex items-center gap-1.5 font-medium text-[#1F2E27]">
              <CheckCircle2 className="size-3.5 text-brand shrink-0" />
              <span>{t("hero.ctaTrust")}</span>
            </p>
            <p className="text-[11px] text-[#4A5C53]">
              {t("hero.ctaSocialProof")}
            </p>
          </motion.div>
        </div>

        {/* Impact Metrics Bar */}
        {metricsBar?.length ? (
          <motion.div
            className="relative z-10 mx-auto mt-14 w-full max-w-[1040px] rounded-2xl surface-card p-4 sm:p-6"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-2 lg:divide-x lg:divide-[#D8E5DD]">
              {metricsBar.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex min-w-0 flex-col items-center justify-start px-2 text-center lg:px-4"
                >
                  <span className="font-heading flex h-9 items-center whitespace-nowrap text-xl font-bold tracking-tight text-[#0F1A15] sm:h-10 sm:text-2xl lg:text-[1.65rem]">
                    <span className="text-gradient-brand">{metric.value}</span>
                  </span>
                  <span className="mt-1.5 flex h-10 items-start justify-center text-xs font-semibold leading-snug text-[#1F2E27] sm:text-sm">
                    <span className="line-clamp-2">{metric.label}</span>
                  </span>
                  <span className="mt-1 flex h-8 items-start justify-center text-[11px] leading-snug text-[#4A5C53]">
                    <span className="line-clamp-2">{metric.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </section>

      {/* Real app screens, highlight by highlight */}
      {screens ? <AppShowcase copy={screens} /> : null}
      {screens ? <ScreenMarquee copy={screens} /> : null}

      {/* Comparison: Old Manual Way vs Five Cut Pro */}
      {comparison && (
        <section
          id="comparison"
          className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-mint px-4 py-20 sm:px-6 md:py-28 lg:px-8 relative overflow-hidden"
        >
          <div className="mx-auto min-w-0 max-w-[1120px] relative z-10">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/25 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                <Flame className="size-3.5" />
                <span>{comparison.badge}</span>
              </div>
              <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem] md:tracking-[-1px]">
                {comparison.title}
            </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
                {comparison.subtitle}
            </p>
          </FadeIn>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {/* Old Way Card */}
              <FadeIn delay={0.1} className="flex">
                <div className="relative flex w-full flex-col justify-between rounded-[26px] border border-red-200 bg-gradient-to-b from-red-50 via-white to-[#FBFCFB] shadow-card-mint p-7 sm:p-9 backdrop-blur-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
                        <XCircle className="size-3.5" />
                        {comparison.oldWay.badge}
                      </span>
                    </div>
                    <h3 className="font-heading mt-5 text-xl font-semibold text-[#0F1A15] sm:text-2xl">
                      {comparison.oldWay.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4A5C53]">
                      {comparison.oldWay.subtitle}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {comparison.oldWay.points?.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-sm text-[#4A5C53]">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600">
                            <XCircle className="size-3.5" />
                          </div>
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* New Way Card (Five Cut Pro) */}
              <FadeIn delay={0.2} className="flex">
                <div className="relative flex w-full flex-col justify-between rounded-[26px] border border-brand/40 bg-gradient-to-b from-brand/[0.12] via-brand/[0.04] to-transparent p-7 sm:p-9 backdrop-blur-sm glow-brand-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-brand/40 bg-brand/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                        <CheckCircle2 className="size-3.5" />
                        {comparison.newWay.badge}
                      </span>
                    </div>
                    <h3 className="font-heading mt-5 text-xl font-semibold text-[#0F1A15] sm:text-2xl">
                      {comparison.newWay.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#1F2E27]">
                      {comparison.newWay.subtitle}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {comparison.newWay.points?.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-sm text-[#1F2E27]">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                            <Check className="size-3.5" strokeWidth={3} />
                          </div>
                          <span className="leading-relaxed font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#B9CFC3]">
                    <Link
                      href="/#download"
                      onClick={() => {
                        trackCtaClick({
                          cta_id: "comparison_download",
                          cta_location: "comparison_section",
                          cta_text: t("hero.ctaPrimary"),
                          cta_category: "conversion_download",
                          destination_url: "/#download",
                        });
                      }}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-[#052E1C] glow-brand-sm hover:bg-brand transition-transform hover:-translate-y-0.5",
                      )}
                    >
                      <Download className="mr-2 size-4" />
                      {t("hero.ctaPrimary")}
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* 2. Core Features Section */}
      <section
        id="features"
        className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-raised px-4 py-20 sm:px-6 md:py-28 lg:px-8 relative overflow-hidden"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-brand/[0.06] blur-[120px]" />

        <div className="mx-auto min-w-0 max-w-[1200px] relative z-10">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Layers className="size-3.5" />
              <span>{featuresSection.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem] md:tracking-[-1px]">
              {featuresSection.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
              {featuresSection.subtitle}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const FeatureIcon = FEATURE_ICONS[feature.id] || Layers;
              return (
                <FadeIn key={feature.id} delay={idx * 0.07} className="flex">
                  <SpotlightCard className="glass-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#B9CFC3] p-7 transition-all duration-300 hover:border-brand/40 hover:glow-brand-sm sm:p-8">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
                          <FeatureIcon className="size-6" />
                      </div>
                        <span className="font-mono text-xs font-bold text-[#4A5C53]">
                          0{idx + 1}
                        </span>
                      </div>
                      <div className="pt-2">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#0F1A15]">
                        {feature.title}
                      </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#4A5C53]">
                        {feature.description}
                      </p>

                      {feature.bullets && feature.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2 pt-3 border-t border-[#B9CFC3]">
                          {feature.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[#1F2E27]"
                            >
                              <CheckCircle2 className="size-4 shrink-0 text-brand mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </SpotlightCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It Works: Chưa biết quay hay edit? Chỉ 3 bước đơn giản */}
      <section
        id="how-it-works"
        className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-wash px-4 py-20 sm:px-6 md:py-28 lg:px-8 relative overflow-hidden"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-mist bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-deep">
              <Play className="size-3.5 fill-current" />
              <span>{howItWorks.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem] md:tracking-[-1px]">
              {howItWorks.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
              {howItWorks.subtitle}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {howItWorks.steps?.map((step, idx) => {
              const stepIcons = [Video, Scissors, Upload];
              const StepIcon = stepIcons[idx % stepIcons.length];
              return (
                <FadeIn key={step.num} delay={idx * 0.08} className="flex">
                  <SpotlightCard className="glass-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#B9CFC3] p-7 transition-all duration-300 hover:border-brand/40 hover:glow-brand-sm sm:p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/25">
                          <StepIcon className="size-6" />
                        </div>
                        <span className="rounded-full border border-brand-mist bg-brand/10 px-3 py-1 text-xs font-medium text-brand-deep">
                          {step.badge}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                          {howItWorks.stepLabel} {step.num}
                        </span>
                        <h3 className="font-heading mt-1 text-lg sm:text-xl font-semibold text-[#0F1A15]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[#4A5C53]">
                        {step.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Brand campaigns for creators */}
      {campaigns && (
        <section
          id="campaigns"
          className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-mint px-4 py-20 sm:px-6 md:py-28 lg:px-8"
        >
          <div className="mx-auto min-w-0 max-w-[1200px]">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <Sparkles className="size-3.5" />
                <span>{campaigns.label}</span>
              </div>
              <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem] md:tracking-[-1px]">
                {campaigns.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
                {campaigns.subtitle}
              </p>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {campaigns.channels?.map((channel, idx) => {
                const ChannelIcon = CAMPAIGN_ICONS[channel.id] || Sparkles;
                return (
                  <FadeIn key={channel.id} delay={idx * 0.07} className="flex">
                    <SpotlightCard className="glass-panel group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-[#B9CFC3] p-7 transition-all duration-300 hover:border-brand/40 hover:glow-brand-sm sm:p-8">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
                        <ChannelIcon className="size-6" />
                      </div>
                      <h3 className="font-heading mt-5 text-lg font-semibold text-[#0F1A15] sm:text-xl">
                        {channel.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#4A5C53]">
                        {channel.desc}
                      </p>
                      {channel.bullets && channel.bullets.length > 0 ? (
                        <ul className="mt-5 space-y-2 border-t border-[#B9CFC3] pt-4">
                          {channel.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-xs text-[#1F2E27] sm:text-sm"
                            >
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </SpotlightCard>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={0.1} className="mt-14 block">
              <div className="rounded-[26px] surface-card p-7 sm:p-9">
                <h3 className="font-heading text-lg font-semibold text-[#0F1A15] sm:text-xl">
                  {campaigns.flowTitle}
                </h3>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-10">
                  {campaigns.flow?.map((step, i) => (
                    <li
                      key={step}
                      className="relative flex min-w-0 flex-col gap-2.5 rounded-2xl border border-[#D8E5DD] bg-white/80 p-4 lg:flex-1"
                    >
                      <span className="flex size-7 items-center justify-center rounded-full bg-brand/15 font-mono text-[11px] font-bold text-brand-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs leading-relaxed text-[#1F2E27] sm:text-sm">
                        {step}
                      </span>
                      {i < campaigns.flow.length - 1 ? (
                        <span
                          className="absolute top-1/2 left-[calc(100%+1.25rem)] z-10 hidden -translate-x-1/2 -translate-y-1/2 text-brand lg:block"
                          aria-hidden
                        >
                          <ArrowRight className="size-4" />
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>

                <div className="mt-7 flex flex-col items-start gap-4 border-t border-[#D8E5DD] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-sm text-[#1F2E27]">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{campaigns.note}</span>
                  </p>
                  <Link
                    href="/#download"
                    onClick={() => {
                      trackCtaClick({
                        cta_id: "campaigns_download",
                        cta_location: "campaigns_section",
                        cta_text: campaigns.cta,
                        cta_category: "conversion_download",
                        destination_url: "/#download",
                      });
                    }}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "shrink-0 rounded-full border-0 bg-brand px-7 py-3 text-sm font-semibold text-[#052E1C] glow-brand-sm transition-transform hover:-translate-y-0.5 hover:bg-brand",
                    )}
                  >
                    <Download className="mr-2 size-4" />
                    {campaigns.cta}
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <MarketingBannerCarousel
        slides={stripBanners}
        title={t("bannerSection.title")}
        subtitle={t("bannerSection.subtitle")}
        steps={t.raw("bannerSection.steps") as string[]}
      />
      <CommonBannerPopup slides={popupBanners} />

      {/* Download — mobile first */}
      <section
        id="download"
        className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-mint px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-[#4A5C53]">
              {t("downloadSection.label")}
            </p>
            <h2 className="font-heading mt-3 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem]">
              {t("downloadSection.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4A5C53] md:text-lg">
              {t("downloadSection.subtitle", { version: DISPLAY_APP_VERSION })}
            </p>
          </FadeIn>

          <div className="mt-10">
            <StoreQrCodes
              title={t("downloadSection.qrTitle")}
              subtitle={t("downloadSection.qrSubtitle")}
              scanLabel={t("downloadSection.qrLabel")}
              openLabel={t("downloadSection.ctaStore")}
            />
          </div>
        </div>
      </section>

      {socialGroups.length > 0 ? (
        <section
          id="community"
          className="scroll-mt-[72px] border-t border-[#B9CFC3] px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
          <div className="mx-auto grid min-w-0 max-w-[1200px] gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-12">
            <FadeIn>
              <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem]">
                {t("communitySection.title")}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#4A5C53] md:text-lg">
                {t("communitySection.subtitle")}
              </p>
            </FadeIn>
            <CommunityGroupList
              groups={socialGroups}
              title={t("communitySection.title")}
              joinLabel={t("communitySection.join")}
              location="community_section"
            />
          </div>
        </section>
      ) : null}

      {/* Brand Sponsors */}
      {sponsors && (
        <section
          id="sponsors"
          className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-mint px-4 py-20 sm:px-6 md:py-28 lg:px-8"
        >
          <div className="mx-auto min-w-0 max-w-[1200px]">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <Building2 className="size-3.5" />
                <span>{sponsors.label}</span>
              </div>
              <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem] md:tracking-[-1px]">
                {sponsors.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
                {sponsors.subtitle}
              </p>
            </FadeIn>

            <div className="mt-12">
              <SponsorStats stats={sponsors.stats} />
            </div>

            <div className="mt-14">
              <SponsorInsight insight={sponsors.insight} />
            </div>

            {screens ? (
              <div className="mt-16">
                <BrandScreens copy={screens} screens={BRAND_SCREENS} />
              </div>
            ) : null}

            <div className="mt-16">
              <SponsorPlacements
                title={sponsors.placementsTitle}
                subtitle={sponsors.placementsSubtitle}
                groups={sponsors.placementGroups}
              />
            </div>

            <div className="mt-16">
              <SponsorProcess
                title={sponsors.processTitle}
                steps={sponsors.process}
                note={sponsors.processNote}
              />
            </div>

            <div className="mt-14 grid items-start gap-8 lg:grid-cols-12">
              <FadeIn className="space-y-6 lg:col-span-5">
                <SponsorBenefits
                  title={sponsors.benefitsTitle}
                  benefits={sponsors.benefits}
                  offerBadge={sponsors.offerBadge}
                  offerText={sponsors.offerText}
                >
                  <SponsorContact copy={sponsors.form} location="sponsor_section" />
                </SponsorBenefits>
              </FadeIn>

              <FadeIn delay={0.08} className="lg:col-span-7">
                <SponsorForm copy={sponsors.form} location="sponsor_section" />
              </FadeIn>
            </div>
          </div>
        </section>
      )}


      {/* 5. FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-raised px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[860px]">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <HelpCircle className="size-3.5" />
              <span>{faq.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem] md:tracking-[-1px]">
              {faq.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
              {faq.subtitle}
            </p>
          </FadeIn>

          <div className="mt-12 space-y-4">
            {faq.items?.map((item, idx) => {
              const isOpen = openFaq === item.id;
              return (
                <FadeIn key={item.id} delay={idx * 0.05}>
                  <div className="rounded-2xl surface-card transition-all hover:border-brand-mist hover:glow-brand-sm">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    >
                      <span className="font-heading text-base sm:text-lg font-semibold text-[#0F1A15]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-[#4A5C53] transition-transform duration-300",
                          isOpen && "rotate-180 text-brand",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#B9CFC3] px-5 pb-5 sm:px-6 sm:pb-6 pt-3 text-sm leading-relaxed text-[#1F2E27]">
                        {item.answer}
                    </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
