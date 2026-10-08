"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Camera,
  ChevronDown,
  Download,
  Flame,
  HelpCircle,
  Scissors,
  Sparkles,
  Zap,
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
import { SponsorContact } from "@/components/sponsor-contact";
import { SponsorForm } from "@/components/sponsor-form";
import { StoreQrCodes } from "@/components/store-qr-codes";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { trackCtaClick } from "@/lib/analytics";
import type { MarketingBannerSlide } from "@/lib/marketing-api";
import type { SocialGroup } from "@/lib/social-groups";
import { cn } from "@/lib/utils";
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

  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const faq = t.raw("faqSection") as FaqSectionCopy;

  return (
    <>
      {/* 1. Phần chính: Template video dành cho KOC (Content lớn, chuẩn đa ngôn ngữ) */}
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

          {/* Tiêu đề chính: Template video dành cho KOC */}
          <h1 className="font-heading w-full max-w-[22ch] text-[clamp(1.85rem,6.2vw+0.35rem,4.4rem)] font-bold leading-[1.12] tracking-[-0.05em] text-[#0F1A15] text-balance sm:max-w-none md:tracking-[-1.35px]">
            <RevealWords text={t("hero.titleLead")} delay={0.08} />{" "}
            <RevealWords
              text={t("hero.titleAccent")}
              wordClassName="text-gradient-shimmer"
              delay={0.24}
            />
          </h1>

          {/* Content lớn: Tạo video bán hàng chỉ với vài nguồn & xuất bản hàng trăm clip không trùng lặp */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-2 px-2"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.16 }}
          >
            <p className="font-heading text-xl font-bold leading-snug text-[#0F1A15] sm:text-2xl md:text-3xl">
              {t("hero.subLead")}
            </p>
            <p className="font-heading text-lg font-bold leading-snug text-brand sm:text-xl md:text-2xl">
              {t("hero.subAccent")}
            </p>
          </motion.div>

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
              <Download className="mr-2 size-4" />
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#sponsors"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_goto_sponsors",
                  cta_location: "hero",
                  cta_text: t("hero.ctaBrand"),
                  cta_category: "navigation_section",
                  destination_url: "/#sponsors",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border border-[#B9CFC3] bg-white px-8 py-3.5 text-[15px] font-medium text-[#0F1A15] shadow-card-mint hover:border-brand/35 hover:bg-[#EEF5F1] hover:text-[#0F1A15]",
              )}
            >
              <Building2 className="mr-2 size-4 text-brand" />
              {t("hero.ctaBrand")}
            </Link>
          </motion.div>

          {/* 4 khẳng định — chữ luôn wrap đủ trên mobile */}
          <motion.div
            className="mt-12 grid w-full min-w-0 max-w-[940px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.28 }}
          >
            {(
              [
                { key: "pointShoot" as const, Icon: Camera },
                { key: "pointEdit" as const, Icon: Scissors },
                { key: "pointGuide" as const, Icon: Zap },
                { key: "pointContent" as const, Icon: Flame },
              ] as const
            ).map(({ key, Icon }) => (
              <SpotlightCard
                key={key}
                className="glass-panel group relative min-w-0 rounded-2xl border border-[#B9CFC3] p-4 text-left transition-all hover:border-brand/50 hover:glow-brand-sm sm:p-6"
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30 sm:size-14">
                    <Icon className="size-6 sm:size-7" />
                  </div>
                  <h3 className="min-w-0 flex-1 font-heading text-[15px] font-bold leading-snug text-[#0F1A15] wrap-break-word sm:text-lg">
                    {t(`hero.${key}`)}
                  </h3>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Section T2: Download App (1.0.1, Google Play = Sắp ra mắt) */}
      <section
        id="download"
        className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-raised px-4 py-14 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[1.85rem] font-bold leading-tight tracking-[-0.85px] text-[#0F1A15] sm:text-[2.2rem] md:text-[2.6rem]">
              {t("downloadSection.title")}
            </h2>
          </FadeIn>

          <div className="mt-8">
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

      {/* 3. Phần Nhãn Hàng (Sponsors & Brand Collaboration) */}
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

      {/* 4. Nhóm hỗ trợ KOC */}
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

      {/* 5. FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-wash px-4 py-20 sm:px-6 md:py-28 lg:px-8"
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
