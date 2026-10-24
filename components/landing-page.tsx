"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  Flame,
  HelpCircle,
  Layers,
  Play,
  Scissors,
  Sparkles,
  Upload,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import { RevealWords, SpotlightCard } from "@/components/motion-effects";
import { CommunityGroupList } from "@/components/community-groups";
import { FadeIn } from "@/components/fade-in";
import {
  SponsorBenefits,
  SponsorInsight,
  SponsorPlacements,
  SponsorProcess,
  SponsorStats,
} from "@/components/sponsor-blocks";
import { ServicesSection } from "@/components/services-section";
import { SponsorContact } from "@/components/sponsor-contact";
import { SponsorForm } from "@/components/sponsor-form";
import { StoreQrCodes } from "@/components/store-qr-codes";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import type { MarketingBannerSlide } from "@/lib/marketing-api";
import type { SocialGroup } from "@/lib/social-groups";
import { cn } from "@/lib/utils";
import type { ServicesSectionCopy } from "@/components/services-section";
import type { SponsorsSectionCopy } from "@/types/sponsor";

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

type LandingFeature = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
};

type FeaturesSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
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

type ComparisonWay = {
  badge: string;
  title: string;
  subtitle: string;
  points: string[];
};

type ComparisonSectionCopy = {
  badge: string;
  title: string;
  subtitle: string;
  oldWay: ComparisonWay;
  newWay: ComparisonWay;
};

/** One icon per feature id, in the order the copy lists them. */
const FEATURE_ICONS: Record<string, typeof Video> = {
  "koc-market": Flame,
  "shot-guide": Camera,
  "merge-export": Scissors,
  recipes: Layers,
};

const STEP_ICONS = [Video, Scissors, Upload];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function LandingPage({
  socialGroups = [],
}: {
  stripBanners?: MarketingBannerSlide[];
  popupBanners?: MarketingBannerSlide[];
  socialGroups?: SocialGroup[];
}) {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Landing");
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const featuresSection = t.raw("featuresSection") as FeaturesSectionCopy;
  const features = (t.raw("features") as LandingFeature[]) || [];
  const howItWorks = t.raw("howItWorksSection") as HowItWorksSectionCopy;
  const comparison = t.raw("comparisonSection") as ComparisonSectionCopy;
  const services = t.raw("servicesSection") as ServicesSectionCopy;
  const appPoints = (t.raw("appSection.points") as string[]) || [];
  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const faq = t.raw("faqSection") as FaqSectionCopy;

  return (
    <>
      {/* 1. Hero: App cắt ghép video hàng loạt — mục tiêu chính là tải app */}
      <section
        id="koc"
        className="hero-atmosphere relative isolate flex flex-col justify-center overflow-x-clip px-4 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-16 lg:px-8"
      >
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-90" aria-hidden />
        <div
          className="pointer-events-none absolute -left-24 top-1/4 size-[420px] rounded-full bg-brand/20 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-deep/25 blur-[110px]"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full min-w-0 max-w-[940px] flex-col items-center text-center">
          {/* Logo icon */}
          <motion.div
            className="relative mb-5"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="absolute inset-0 scale-110 rounded-[24px] bg-brand/20 blur-2xl" aria-hidden />
            <Image
              src="/logo.png"
              alt={t("hero.logoAlt")}
              width={104}
              height={104}
              priority
              className="relative size-20 rounded-[20px] shadow-2xl ring-1 ring-black/5 sm:size-24 sm:rounded-[24px] md:size-28 md:rounded-[26px]"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="mb-4 flex flex-col items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.06 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/35 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-md">
              <Sparkles className="size-3.5 shrink-0" />
              <span>{t("hero.tagline")}</span>
            </div>
          </motion.div>

          {/* Tiêu đề chính: Cắt ghép video hàng loạt ngay trên điện thoại */}
          <h1 className="font-heading w-full max-w-[22ch] text-[clamp(1.85rem,6.2vw+0.35rem,4.4rem)] font-bold leading-[1.12] tracking-[-0.05em] text-white text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] sm:max-w-none md:tracking-[-1.35px]">
            <RevealWords text={t("hero.titleLead")} delay={0.08} />{" "}
            <RevealWords
              text={t("hero.titleAccent")}
              wordClassName="text-gradient-shimmer"
              delay={0.24}
            />
          </h1>

          {/* Dòng dẫn: vài nguồn quay → hàng trăm clip không trùng lặp */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-2 px-2"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.16 }}
          >
            <p className="font-heading text-xl font-bold leading-snug text-[#f4faf6] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-2xl md:text-3xl">
              {t("hero.subLead")}
            </p>
            <p className="font-heading text-lg font-bold leading-snug text-brand drop-shadow-[0_0_22px_rgba(0,245,160,0.35)] sm:text-xl md:text-2xl">
              {t("hero.subAccent")}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className="mt-8 flex w-full min-w-0 flex-col sm:flex-row items-center justify-center gap-3.5 px-1 sm:px-0"
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
                "w-full sm:w-auto min-h-[48px] rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-8 py-3.5 text-[15px] font-bold text-[#02180e] shadow-[0_0_28px_rgba(0,245,160,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(0,245,160,0.75)] active:scale-98",
              )}
            >
              <Download className="mr-2 size-4" />
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_goto_how_it_works",
                  cta_location: "hero",
                  cta_text: t("hero.ctaSecondary"),
                  cta_category: "navigation_section",
                  destination_url: "/#how-it-works",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto min-h-[48px] rounded-full border border-emerald-500/30 bg-[#0d1a14]/90 px-8 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.8)] hover:border-emerald-400/60 hover:bg-[#12251d] hover:text-white hover:shadow-[0_0_25px_rgba(0,245,160,0.25)] active:scale-98",
              )}
            >
              <Play className="mr-2 size-4 fill-current text-brand" />
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>

          {/* 4 khẳng định về app — Thẻ 3D Glassmorphic sâu với Neon Glow */}
          <motion.div
            className="mt-12 grid w-full min-w-0 max-w-[940px] grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4.5"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.28 }}
          >
            {(
              [
                { key: "pointShoot" as const, Icon: Camera },
                { key: "pointEdit" as const, Icon: Scissors },
                { key: "pointBatch" as const, Icon: Layers },
                { key: "pointFree" as const, Icon: Sparkles },
              ] as const
            ).map(({ key, Icon }) => (
              <SpotlightCard
                key={key}
                className="group relative min-w-0 rounded-2xl border border-white/60 bg-white p-4.5 sm:p-6 text-left shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.95),0_0_30px_rgba(0,245,160,0.28)]"
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-brand-ink ring-1 ring-emerald-200 transition-all duration-300 group-hover:scale-105 group-hover:ring-emerald-300 sm:size-14">
                    <Icon className="size-6 sm:size-7" />
                  </div>
                  <h3 className="min-w-0 flex-1 font-heading text-[15px] font-bold leading-snug text-slate-900 wrap-break-word transition-colors group-hover:text-brand-ink sm:text-lg">
                    {t(`hero.${key}`)}
                  </h3>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* Dòng tin cậy ngay dưới các thẻ */}
          <motion.p
            className="mt-6 text-xs font-medium text-slate-300 sm:text-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
          >
            {t("hero.ctaTrust")}
          </motion.p>
        </div>
      </section>

      {/* 2. Tải app: khối chuyển đổi chính, đặt ngay dưới hero */}
      <section
        id="download"
        className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-raised px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <Download className="size-3.5" />
              <span>{t("downloadSection.label")}</span>
            </div>
            <h2 className="font-heading mt-4 text-[1.85rem] font-bold leading-tight tracking-[-0.85px] text-white sm:text-[2.2rem] md:text-[2.6rem]">
              {t("downloadSection.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              {t("downloadSection.subtitle")}
            </p>
          </FadeIn>

          <div className="mt-10">
            <StoreQrCodes
              title={t("downloadSection.qrTitle")}
              subtitle={t("downloadSection.qrSubtitle")}
              scanLabel={t("downloadSection.qrLabel")}
              openLabel={t("downloadSection.ctaStore")}
              comingSoonLabel={t("downloadSection.comingSoon")}
            />
          </div>
        </div>
      </section>

      {/* 3. Lợi ích cốt lõi của app */}
      <section
        id="features"
        className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-wash px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <Layers className="size-3.5" />
              <span>{featuresSection.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {featuresSection.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              {featuresSection.subtitle}
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map((feature, idx) => {
              const FeatureIcon = FEATURE_ICONS[feature.id] ?? Layers;
              return (
                <FadeIn key={feature.id} delay={idx * 0.06}>
                  <SpotlightCard className="group relative flex h-full min-w-0 flex-col rounded-2xl border border-white/60 bg-white p-5 text-left shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,245,160,0.28)] sm:p-7">
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-brand-ink ring-1 ring-emerald-200 transition-all duration-300 group-hover:scale-105 group-hover:ring-emerald-300">
                        <FeatureIcon className="size-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-heading mt-4 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-ink sm:text-lg">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                    {feature.bullets?.length ? (
                      <ul className="mt-4 space-y-2 border-t border-emerald-100 pt-4">
                        {feature.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-700"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-ink" />
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
        </div>
      </section>

      {/* 4. Quy trình 3 bước: chọn mẫu → quay → app ghép */}
      <section
        id="how-it-works"
        className="scroll-mt-[72px] border-t border-emerald-500/15 px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <Play className="size-3.5 fill-current" />
              <span>{howItWorks.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {howItWorks.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              {howItWorks.subtitle}
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {howItWorks.steps?.map((step, idx) => {
              const StepIcon = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <FadeIn key={step.num} delay={idx * 0.08}>
                  <SpotlightCard className="group relative flex h-full min-w-0 flex-col rounded-2xl border border-white/60 bg-white p-5 text-left shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_50px_-18px_rgba(0,0,0,0.95),0_0_28px_rgba(0,245,160,0.28)] sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-brand-ink ring-1 ring-emerald-200 transition-all duration-300 group-hover:scale-105 group-hover:ring-emerald-300">
                        <StepIcon className="size-6" />
                      </div>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-ink">
                        {step.badge}
                      </span>
                    </div>
                    <span className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-brand-ink">
                      {howItWorks.stepLabel} {step.num}
                    </span>
                    <h3 className="font-heading mt-1 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </SpotlightCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Tự làm kiểu cũ vs làm theo app */}
      {comparison && (
        <section
          id="comparison"
          className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-mint px-4 py-20 sm:px-6 md:py-28 lg:px-8"
        >
          <div className="mx-auto min-w-0 max-w-[1120px]">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <Flame className="size-3.5" />
                <span>{comparison.badge}</span>
              </div>
              <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
                {comparison.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                {comparison.subtitle}
              </p>
            </FadeIn>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <FadeIn delay={0.08} className="flex">
                <div className="flex w-full flex-col rounded-[26px] border border-red-200 bg-gradient-to-b from-red-50 via-white to-white p-6 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] sm:p-8">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
                    <XCircle className="size-3.5" />
                    {comparison.oldWay.badge}
                  </span>
                  <h3 className="font-heading mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">
                    {comparison.oldWay.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {comparison.oldWay.subtitle}
                  </p>
                  <ul className="mt-7 space-y-4">
                    {comparison.oldWay.points?.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                          <XCircle className="size-3.5" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.16} className="flex">
                <div className="flex w-full flex-col rounded-[26px] border border-brand/60 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 p-6 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9),0_0_26px_rgba(0,245,160,0.22)] sm:p-8">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-brand/40 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-ink">
                    <CheckCircle2 className="size-3.5" />
                    {comparison.newWay.badge}
                  </span>
                  <h3 className="font-heading mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">
                    {comparison.newWay.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">
                    {comparison.newWay.subtitle}
                  </p>
                  <ul className="mt-7 space-y-4">
                    {comparison.newWay.points?.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-700"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand-ink">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
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
                        "w-full min-h-[48px] rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep py-3.5 text-[15px] font-bold text-[#02180e] shadow-[0_0_24px_rgba(0,245,160,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(0,245,160,0.7)] active:scale-98",
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

      {/* 6. Dịch vụ trọn gói cho nhãn hàng */}
      <ServicesSection copy={services} />

      {/* 7. Phần Nhãn Hàng (Sponsors & Brand Collaboration) */}
      {sponsors && (
        <section
          id="sponsors"
          className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-mint px-4 py-20 sm:px-6 md:py-28 lg:px-8"
        >
          <div className="mx-auto min-w-0 max-w-[1200px]">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
                <Building2 className="size-3.5" />
                <span>{sponsors.label}</span>
              </div>
              <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
                {sponsors.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                {sponsors.subtitle}
              </p>
            </FadeIn>

            <div className="mt-12">
              <SponsorStats stats={sponsors.stats} />
            </div>

            <div className="mt-14">
              <SponsorInsight insight={sponsors.insight} />
            </div>

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

      {/* 8. Mạng lưới KOC — nhãn hàng vào app thì KOC có thêm mẫu để làm */}
      <section
        id="app"
        className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-raised px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <Layers className="size-3.5" />
              <span>{t("appSection.label")}</span>
            </div>
            <h2 className="font-heading mt-4 text-[1.85rem] font-semibold leading-tight tracking-[-0.85px] text-white sm:text-[2.2rem] md:text-[2.6rem]">
              {t("appSection.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              {t("appSection.subtitle")}
            </p>
          </FadeIn>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {appPoints.map((point, idx) => (
              <FadeIn key={point} delay={idx * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4 text-left shadow-[0_12px_30px_-16px_rgba(0,0,0,0.9)]">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-brand-ink">
                    <Check className="size-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed text-slate-600">{point}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Nhóm hỗ trợ KOC */}
      {socialGroups.length > 0 ? (
        <section
          id="community"
          className="scroll-mt-[72px] border-t border-emerald-500/15 px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        >
          <div className="mx-auto grid min-w-0 max-w-[1200px] gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-12">
            <FadeIn>
              <h2 className="font-heading text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem]">
                {t("communitySection.title")}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
                {t("communitySection.subtitle")}
              </p>
            </FadeIn>
            <CommunityGroupList
              tone="light"
              groups={socialGroups}
              title={t("communitySection.title")}
              joinLabel={t("communitySection.join")}
              location="community_section"
            />
          </div>
        </section>
      ) : null}

      {/* 10. FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-wash px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[860px]">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/35 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <HelpCircle className="size-3.5" />
              <span>{faq.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {faq.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              {faq.subtitle}
            </p>
          </FadeIn>

          <div className="mt-12 space-y-4">
            {faq.items?.map((item, idx) => {
              const isOpen = openFaq === item.id;
              return (
                <FadeIn key={item.id} delay={idx * 0.05}>
                  <div
                    className={cn(
                      "rounded-2xl border transition-all duration-300",
                      isOpen
                        ? "border-emerald-300 bg-emerald-50/70 shadow-[0_10px_26px_-12px_rgba(0,160,112,0.45)]"
                        : "border-emerald-200 bg-white backdrop-blur-xl hover:border-emerald-300 hover:shadow-[0_10px_26px_-12px_rgba(0,160,112,0.45)]",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.id)}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 p-5 sm:p-6 text-left active:scale-[0.99] transition-transform"
                    >
                      <span className="font-heading text-base sm:text-lg font-semibold text-slate-900">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-slate-500 transition-transform duration-300",
                          isOpen && "rotate-180 text-brand-ink",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-emerald-200 px-5 pb-5 sm:px-6 sm:pb-6 pt-3 text-sm leading-relaxed text-slate-600">
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
