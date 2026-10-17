"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Check,
  ChevronDown,
  Globe,
  HelpCircle,
  Layers,
  Share2,
  ShoppingCart,
  Sparkles,
  Video,
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

  const services = t.raw("servicesSection") as ServicesSectionCopy;
  const appPoints = (t.raw("appSection.points") as string[]) || [];
  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const faq = t.raw("faqSection") as FaqSectionCopy;

  return (
    <>
      {/* 1. Hero: Giải pháp trọn gói Video & Digital Marketing cho nhãn hàng */}
      <section
        id="solutions"
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

          {/* Tiêu đề chính: Video & Digital Marketing cho nhãn hàng */}
          <h1 className="font-heading w-full max-w-[22ch] text-[clamp(1.85rem,6.2vw+0.35rem,4.4rem)] font-bold leading-[1.12] tracking-[-0.05em] text-white text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] sm:max-w-none md:tracking-[-1.35px]">
            <RevealWords text={t("hero.titleLead")} delay={0.08} />{" "}
            <RevealWords
              text={t("hero.titleAccent")}
              wordClassName="text-gradient-shimmer"
              delay={0.24}
            />
          </h1>

          {/* Dòng dẫn: Từ ý tưởng đến thực thi */}
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
              href="/#sponsors"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_brand_consult",
                  cta_location: "hero",
                  cta_text: t("hero.ctaPrimary"),
                  cta_category: "lead_sponsor",
                  destination_url: "/#sponsors",
                });
              }}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full sm:w-auto min-h-[48px] rounded-full border-0 bg-gradient-to-r from-brand via-[#00DF9E] to-brand-deep px-8 py-3.5 text-[15px] font-bold text-[#02180e] shadow-[0_0_28px_rgba(0,245,160,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(0,245,160,0.75)] active:scale-98",
              )}
            >
              <Building2 className="mr-2 size-4" />
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#services"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_goto_services",
                  cta_location: "hero",
                  cta_text: t("hero.ctaBrand"),
                  cta_category: "navigation_section",
                  destination_url: "/#services",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto min-h-[48px] rounded-full border border-emerald-500/30 bg-[#0d1a14]/90 px-8 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.8)] hover:border-emerald-400/60 hover:bg-[#12251d] hover:text-white hover:shadow-[0_0_25px_rgba(0,245,160,0.25)] active:scale-98",
              )}
            >
              <Layers className="mr-2 size-4 text-brand" />
              {t("hero.ctaBrand")}
            </Link>
          </motion.div>

          {/* 4 nhóm dịch vụ chính — Thẻ 3D Glassmorphic sâu với Neon Glow */}
          <motion.div
            className="mt-12 grid w-full min-w-0 max-w-[940px] grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4.5"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.28 }}
          >
            {(
              [
                { key: "pointVideo" as const, Icon: Video },
                { key: "pointSales" as const, Icon: ShoppingCart },
                { key: "pointSocial" as const, Icon: Share2 },
                { key: "pointWeb" as const, Icon: Globe },
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
        </div>
      </section>

      {/* 2. Giải pháp trọn gói Video & Digital Marketing cho nhãn hàng */}
      <ServicesSection copy={services} />

      {/* 3. Phần Nhãn Hàng (Sponsors & Brand Collaboration) */}
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

      {/* 4. Mạng lưới KOC — lớp thực thi nhân rộng nội dung của nhãn hàng */}
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

          <div id="download" className="mt-12 scroll-mt-[72px]">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <h3 className="font-heading text-[1.5rem] font-bold leading-tight tracking-[-0.6px] text-white sm:text-[1.8rem]">
                {t("downloadSection.title")}
              </h3>
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
        </div>
      </section>

      {/* 5. Nhóm hỗ trợ KOC */}
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

      {/* 6. FAQ Section */}
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
