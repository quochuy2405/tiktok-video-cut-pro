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
  Copy,
  Download,
  Flame,
  HelpCircle,
  Layers,
  Mail,
  Scissors,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Type,
  Upload,
  Users,
  Video,
  Wand2,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  AppleIcon,
  WindowsIcon,
  AndroidIcon,
  GooglePlayIcon,
  GoogleIcon,
} from "@/components/platform-icons";
import {
  trackCopyTerminalCommand,
  trackCtaClick,
  trackDirectContact,
  trackDownload,
  trackLeadGeneration,
} from "@/lib/analytics";
import {
  DESKTOP_DOWNLOAD_ASSETS,
  DISPLAY_APP_VERSION,
  MOBILE_DOWNLOAD_ASSETS,
  githubReleasesTagPageUrl,
  type DownloadAsset,
} from "@/lib/downloads";
import { cn } from "@/lib/utils";

type LandingFeature = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
};

type DownloadCardCopy = {
  title: string;
  subtitle: string;
};

type InstallSectionCopy = {
  label: string;
  title: string;
  macTitle: string;
  macSteps: string[];
  macCommandLabel: string;
  macCommand: string;
  copyCommandLabel: string;
  copiedCommandLabel: string;
  winTitle: string;
  winSteps: string[];
  iosTitle: string;
  iosSteps: string[];
  androidTitle: string;
  androidSteps: string[];
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
  steps: HowStep[];
};

type AntiReupPoint = {
  num: string;
  title: string;
  desc: string;
};

type AntiReupCopy = {
  label: string;
  title: string;
  subtitle: string;
  points: AntiReupPoint[];
};

type BatchEngineSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  tagline: string;
  guideCard?: {
    badge: string;
    title: string;
    description: string;
  };
  pipeline: {
    inputBadge?: string;
    inputTitle: string;
    inputDesc: string;
    engineBadge?: string;
    engineTitle: string;
    engineDesc: string;
    outputBadge?: string;
    outputTitle: string;
    outputDesc: string;
  };
  antiReup?: AntiReupCopy;
};

type BenefitItem = {
  id: string;
  num: string;
  title: string;
  desc: string;
  highlight: string;
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

type BenefitsSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  items: BenefitItem[];
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

type SponsorStat = {
  value: string;
  label: string;
};

type SponsorFormCopy = {
  title: string;
  desc: string;
  brandNameLabel: string;
  brandNamePlaceholder: string;
  contactNameLabel: string;
  contactNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  budgetLabel: string;
  budgetOptions: string[];
  noteLabel: string;
  notePlaceholder: string;
  submitButton: string;
  successMessage: string;
  directContact: string;
  emailAria: string;
  emailText: string;
};

type SponsorsSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  stats: SponsorStat[];
  benefitsTitle: string;
  benefits: string[];
  form: SponsorFormCopy;
};

const FEATURE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "smart-cut": Scissors,
  "batch-remix": Layers,
  "safeguard-anti-reup": ShieldCheck,
  "hook-cta": Target,
  "auto-captions": Type,
  "batch-export": Zap,
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function PlatformMark({
  id,
  className,
}: {
  id: DownloadAsset["id"];
  className?: string;
}) {
  if (id === "windows") {
    return (
      <span
        title="Microsoft Windows"
        aria-label="Microsoft Windows"
        className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
      >
        <WindowsIcon className={className} title="Microsoft Windows" />
      </span>
    );
  }
  if (id === "android") {
    return (
      <span className="inline-flex items-center justify-center gap-1.5">
        <span
          title="Android"
          aria-label="Android"
          className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
        >
          <AndroidIcon className={className} title="Android" />
        </span>
        <span
          title="Google Play"
          aria-label="Google Play"
          className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
        >
          <GooglePlayIcon className={cn(className, "size-[1.1rem]")} title="Google Play" />
        </span>
      </span>
    );
  }
  if (id === "ios") {
    return (
      <span
        title="Apple (iOS / App Store)"
        aria-label="Apple iOS"
        className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
      >
        <AppleIcon className={className} title="Apple" />
      </span>
    );
  }
  if (id === "mac-apple-silicon") {
    return (
      <span
        title="Apple macOS (Apple Silicon M1/M2/M3/M4)"
        aria-label="Apple macOS (Apple Silicon)"
        className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
      >
        <AppleIcon className={className} title="Apple macOS" />
      </span>
    );
  }
  if (id === "mac-intel") {
    return (
      <span
        title="Apple macOS (Intel)"
        aria-label="Apple macOS (Intel)"
        className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
      >
        <AppleIcon className={className} title="Apple macOS" />
      </span>
    );
  }
  return (
    <span
      title="Apple"
      aria-label="Apple"
      className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
    >
      <AppleIcon className={className} title="Apple" />
    </span>
  );
}

function DownloadCard({
  asset,
  card,
  ctaLabel,
  comingSoonLabel,
  delay,
}: {
  asset: DownloadAsset;
  card?: DownloadCardCopy;
  ctaLabel: string;
  comingSoonLabel: string;
  delay: number;
}) {
  const available = Boolean(asset.href);
  const content = (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex shrink-0 items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 pr-2">
          <h3 className="font-heading text-lg font-semibold leading-snug tracking-[-0.2px] text-white sm:text-xl">
            {card?.title ?? asset.title}
          </h3>
          <p className="mt-1.5 text-sm text-zinc-400">
            {card?.subtitle ?? asset.subtitle}
          </p>
        </div>
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10"
        >
          <PlatformMark id={asset.id} className="size-[1.25rem]" />
        </span>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col justify-between gap-4">
        <p className="break-all text-[12px] leading-snug text-zinc-500 sm:break-words">
          {asset.fileLabel}
        </p>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-2 text-sm font-medium",
            available ? "text-brand" : "text-zinc-500",
          )}
        >
          <Download className="size-4 shrink-0" aria-hidden />
          {available ? ctaLabel : comingSoonLabel}
        </span>
      </div>
    </>
  );

  return (
    <FadeIn className="h-full min-h-0 min-w-0" delay={delay}>
      {available ? (
        <a
          href={asset.href!}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            const fileExt = asset.fileLabel.endsWith(".dmg")
              ? "dmg"
              : asset.fileLabel.endsWith(".exe")
              ? "exe"
              : asset.fileLabel.endsWith(".apk")
              ? "apk"
              : "installer";

            trackCtaClick({
              cta_id: `download_asset_${asset.id}`,
              cta_location: "download_cards",
              cta_text: ctaLabel,
              cta_category: "conversion_download",
              destination_url: asset.href!,
              platform: asset.id,
              asset_title: asset.title,
              file_name: asset.fileLabel,
            });

            trackDownload({
              file_name: asset.fileLabel,
              file_extension: fileExt,
              platform: asset.id,
              app_version: DISPLAY_APP_VERSION,
              link_url: asset.href!,
              asset_id: asset.id,
            });
          }}
          className="group relative flex h-full min-h-[240px] min-w-0 w-full flex-col overflow-hidden rounded-[20px] border border-white/[0.1] bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05] sm:p-8 md:min-h-[260px] md:p-9"
        >
          {content}
        </a>
      ) : (
        <div
          className="relative flex h-full min-h-[240px] min-w-0 w-full flex-col overflow-hidden rounded-[20px] border border-dashed border-white/[0.12] bg-white/[0.02] p-6 opacity-80 sm:p-8 md:min-h-[260px] md:p-9"
          aria-disabled
        >
          {content}
        </div>
      )}
    </FadeIn>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Landing");
  const [macCommandCopied, setMacCommandCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Brand Sponsor Form State
  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    contactName: "",
    email: "",
    phone: "",
    budget: "",
    note: "",
  });

  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const metricsBar = (t.raw("metricsBar") as MetricItem[]) || [];
  const featuresSection = t.raw("featuresSection") as FeaturesSectionCopy;
  const features = (t.raw("features") as LandingFeature[]) || [];
  const howItWorks = t.raw("howItWorksSection") as HowItWorksSectionCopy;
  const comparison = t.raw("comparisonSection") as ComparisonSectionCopy;
  const batchEngine = t.raw("batchEngineSection") as BatchEngineSectionCopy;
  const benefits = t.raw("benefitsSection") as BenefitsSectionCopy;
  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const faq = t.raw("faqSection") as FaqSectionCopy;
  const downloadCards = t.raw("downloadCards") as Record<
    string,
    DownloadCardCopy
  >;
  const install = t.raw("installSection") as InstallSectionCopy;

  const copyMacCommand = useCallback(async () => {
    try {
      trackCopyTerminalCommand();
      trackCtaClick({
        cta_id: "copy_mac_terminal_command",
        cta_location: "download_terminal",
        cta_text: install.copyCommandLabel,
        cta_category: "conversion_download",
      });
      await navigator.clipboard.writeText(install.macCommand);
      setMacCommandCopied(true);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => setMacCommandCopied(false), 2000);
    } catch {
      setMacCommandCopied(false);
    }
  }, [install.macCommand, install.copyCommandLabel]);

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackLeadGeneration({
      lead_type: "brand_sponsor",
      brand_name: formData.brandName,
      budget_tier: formData.budget,
    });
    trackCtaClick({
      cta_id: "sponsor_form_submit",
      cta_location: "sponsor_section",
      cta_text: sponsors.form.submitButton,
      cta_category: "lead_sponsor",
      brand_name: formData.brandName,
      budget: formData.budget,
    });
    setSponsorLoading(true);

    try {
      await fetch("/api/sponsor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("[Sponsor Form Error]:", err);
    } finally {
      setSponsorLoading(false);
      setSponsorSubmitted(true);
    }
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero-atmosphere relative isolate flex min-h-[min(94vh,960px)] flex-col justify-center overflow-x-clip px-4 pb-24 pt-16 sm:px-6 md:pb-32 md:pt-20 lg:px-8">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-90" aria-hidden />
        {!reduceMotion ? (
          <>
            <motion.div
              className="pointer-events-none absolute -left-24 top-1/4 size-[420px] rounded-full bg-brand/25 blur-[100px]"
              aria-hidden
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-deep/30 blur-[110px]"
              aria-hidden
              animate={{ opacity: [0.25, 0.5, 0.25], scale: [1.05, 1, 1.05] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        ) : (
          <>
            <div
              className="pointer-events-none absolute -left-24 top-1/4 size-[420px] rounded-full bg-brand/20 blur-[100px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-brand-deep/25 blur-[110px]"
              aria-hidden
            />
          </>
        )}

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
              className="relative size-28 rounded-[24px] shadow-2xl ring-1 ring-white/10 sm:size-32 sm:rounded-[26px] md:size-36 md:rounded-[28px]"
            />
          </motion.div>

          <motion.div
            className="mb-6 flex flex-col items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.06 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur-md">
              <Sparkles className="size-3.5 shrink-0" />
              <span>{t("hero.tagline")}</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-heading max-w-[min(100%,32rem)] text-[clamp(2.1rem,6.5vw+0.2rem,4.4rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white text-balance sm:max-w-none md:tracking-[-1.35px]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: easeOut, delay: 0.1 }}
          >
            {t("hero.titleLead")}{" "}
            <span className="bg-gradient-to-r from-brand via-[#5ee9b8] to-brand-deep bg-clip-text text-transparent">
              {t("hero.titleAccent")}
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl px-1 text-base leading-relaxed text-zinc-400 md:px-0 md:text-lg md:leading-relaxed"
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
                "rounded-full border-0 bg-brand px-8 py-3.5 text-[15px] font-semibold text-[#050507] shadow-none glow-brand-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand hover:glow-brand-lg",
              )}
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#features"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_explore_features",
                  cta_location: "hero",
                  cta_text: t("hero.ctaSecondary"),
                  cta_category: "navigation_section",
                  destination_url: "/#features",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-white/[0.04] px-8 py-3.5 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.09] hover:text-white",
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
            <p className="flex items-center gap-1.5 font-medium text-zinc-300">
              <CheckCircle2 className="size-3.5 text-brand shrink-0" />
              <span>{t("hero.ctaTrust")}</span>
            </p>
            <p className="text-[11px] text-zinc-500">
              {t("hero.ctaSocialProof")}
            </p>
          </motion.div>
        </div>

        {/* Impact Metrics Bar */}
        {metricsBar?.length ? (
          <motion.div
            className="relative z-10 mx-auto mt-14 w-full max-w-[1040px] rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md sm:p-6"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {metricsBar.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2 text-center"
                >
                  <span className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    <span className="bg-gradient-to-r from-brand via-[#5ee9b8] to-emerald-400 bg-clip-text text-transparent">
                      {metric.value}
                    </span>
                  </span>
                  <span className="mt-1 text-xs font-semibold text-zinc-200 sm:text-sm">
                    {metric.label}
                  </span>
                  <span className="mt-0.5 text-[11px] text-zinc-500">
                    {metric.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </section>

      {/* 2. Core Features Section */}
      <section
        id="features"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-zinc-950/80 relative overflow-hidden"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-brand/[0.06] blur-[120px]" />

        <div className="mx-auto min-w-0 max-w-[1200px] relative z-10">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="size-3.5" />
              <span>{featuresSection.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {featuresSection.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {featuresSection.subtitle}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const FeatureIcon = FEATURE_ICONS[feature.id] || Sparkles;
              return (
                <FadeIn key={feature.id} delay={idx * 0.07} className="flex">
                  <div className="glass-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.08] p-7 transition-all duration-300 hover:border-brand/40 hover:glow-brand-sm sm:p-8">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
                          <FeatureIcon className="size-6" />
                        </div>
                        <span className="font-mono text-xs font-bold text-zinc-500">
                          0{idx + 1}
                        </span>
                      </div>
                      <div className="pt-2">
                        <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {feature.description}
                      </p>

                      {feature.bullets && feature.bullets.length > 0 && (
                        <ul className="mt-4 space-y-2 pt-3 border-t border-white/[0.06]">
                          {feature.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300"
                            >
                              <CheckCircle2 className="size-4 shrink-0 text-brand mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It Works: Chưa biết quay hay edit? Chỉ 3 bước đơn giản */}
      <section
        id="how-it-works"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-zinc-950/70 relative overflow-hidden"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Sparkles className="size-3.5" />
              <span>{howItWorks.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {howItWorks.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {howItWorks.subtitle}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {howItWorks.steps?.map((step, idx) => {
              const stepIcons = [Video, Wand2, Upload];
              const StepIcon = stepIcons[idx % stepIcons.length];
              return (
                <FadeIn key={step.num} delay={idx * 0.08} className="flex">
                  <div className="glass-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.08] p-7 transition-all duration-300 hover:border-brand/40 hover:glow-brand-sm sm:p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/25">
                          <StepIcon className="size-6" />
                        </div>
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                          {step.badge}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                          Bước {step.num}
                        </span>
                        <h3 className="font-heading mt-1 text-lg sm:text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: Old Manual Way vs Five Cut Pro */}
      {comparison && (
        <section
          id="comparison"
          className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-black relative overflow-hidden"
        >
          <div className="mx-auto min-w-0 max-w-[1120px] relative z-10">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Flame className="size-3.5" />
                <span>{comparison.badge}</span>
              </div>
              <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
                {comparison.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                {comparison.subtitle}
              </p>
            </FadeIn>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {/* Old Way Card */}
              <FadeIn delay={0.1} className="flex">
                <div className="relative flex w-full flex-col justify-between rounded-[26px] border border-red-500/20 bg-gradient-to-b from-red-950/[0.12] to-transparent p-7 sm:p-9 backdrop-blur-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                        <XCircle className="size-3.5" />
                        {comparison.oldWay.badge}
                      </span>
                    </div>
                    <h3 className="font-heading mt-5 text-xl font-semibold text-white sm:text-2xl">
                      {comparison.oldWay.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      {comparison.oldWay.subtitle}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {comparison.oldWay.points?.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-sm text-zinc-400">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
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
                        <Sparkles className="size-3.5" />
                        {comparison.newWay.badge}
                      </span>
                    </div>
                    <h3 className="font-heading mt-5 text-xl font-semibold text-white sm:text-2xl">
                      {comparison.newWay.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300">
                      {comparison.newWay.subtitle}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {comparison.newWay.points?.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-sm text-zinc-200">
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                            <Check className="size-3.5" strokeWidth={3} />
                          </div>
                          <span className="leading-relaxed font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/[0.08]">
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
                        "w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-[#050507] glow-brand-sm hover:bg-brand transition-transform hover:-translate-y-0.5",
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

      {/* 2. Batch Engine: 1 Video Raw -> 100 Video Bán Hàng & Chống Reup */}
      <section
        id="batch-engine"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-gradient-to-b from-black via-zinc-950/60 to-black relative overflow-hidden"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-brand/[0.07] blur-[120px]" />

        <div className="mx-auto min-w-0 max-w-[1200px] relative z-10">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Layers className="size-3.5" />
              <span>{batchEngine.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {batchEngine.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {batchEngine.subtitle}
            </p>
          </FadeIn>

          {/* Beginner Guidance Spotlight Card */}
          {batchEngine.guideCard && (
            <FadeIn className="mt-10">
              <div className="relative overflow-hidden rounded-[24px] border border-emerald-500/30 bg-gradient-to-r from-emerald-500/[0.12] via-brand/[0.06] to-transparent p-7 sm:p-9 md:p-10">
                <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-brand/15 blur-3xl" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                      <Camera className="size-3.5" />
                      {batchEngine.guideCard.badge}
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-white">
                      {batchEngine.guideCard.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-zinc-300">
                      {batchEngine.guideCard.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <Link
                      href="/#features"
                      onClick={() => {
                        trackCtaClick({
                          cta_id: "batch_guide_features",
                          cta_location: "batch_engine",
                          cta_text: t("hero.ctaSecondary"),
                          cta_category: "navigation_section",
                          destination_url: "/#features",
                        });
                      }}
                      className={cn(
                        buttonVariants({ variant: "default", size: "default" }),
                        "rounded-full bg-brand text-[#050507] hover:bg-brand font-medium glow-brand-sm",
                      )}
                    >
                      <Sparkles className="mr-1.5 size-4" />
                      {t("hero.ctaSecondary")}
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* 3-Step Visual Pipeline */}
          <FadeIn className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-brand/40 hover:bg-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
                    <Camera className="size-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {batchEngine.pipeline.inputBadge || "Nguồn vào"}
                  </span>
                </div>
                <h4 className="mt-4 text-base font-semibold text-white">
                  {batchEngine.pipeline.inputTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {batchEngine.pipeline.inputDesc}
                </p>
              </div>

              <div className="relative rounded-2xl border border-brand/30 bg-brand/[0.04] p-6 backdrop-blur-sm transition-all hover:border-brand/50 hover:bg-brand/[0.07]">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-brand/40 bg-brand/20 text-brand">
                    <Wand2 className="size-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">
                    {batchEngine.pipeline.engineBadge || "Động cơ tự động"}
                  </span>
                </div>
                <h4 className="mt-4 text-base font-semibold text-white">
                  {batchEngine.pipeline.engineTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {batchEngine.pipeline.engineDesc}
                </p>
              </div>

              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/15 text-cyan-400">
                    <Layers className="size-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {batchEngine.pipeline.outputBadge || "Kết quả đầu ra"}
                  </span>
                </div>
                <h4 className="mt-4 text-base font-semibold text-white">
                  {batchEngine.pipeline.outputTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {batchEngine.pipeline.outputDesc}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Anti-Reup Breakdown */}
          {batchEngine.antiReup && (
            <div className="mt-16 rounded-[24px] border border-purple-500/20 bg-gradient-to-b from-purple-500/[0.05] via-transparent to-transparent p-7 sm:p-9 md:p-10">
              <FadeIn className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
                  <ShieldCheck className="size-3.5" />
                  <span>{batchEngine.antiReup.label}</span>
                </div>
                <h3 className="font-heading mt-3 text-xl md:text-2xl font-semibold text-white">
                  {batchEngine.antiReup.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {batchEngine.antiReup.subtitle}
                </p>
              </FadeIn>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {batchEngine.antiReup.points?.map((pt) => (
                  <FadeIn key={pt.num} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
                    <span className="font-mono text-xs font-bold text-purple-400">#{pt.num}</span>
                    <h4 className="mt-1.5 text-sm font-semibold text-white">{pt.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{pt.desc}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Core Benefits: 4 Lợi ích sống còn cho KOC & Affiliate */}
      <section
        id="benefits"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-black/60"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <TrendingUp className="size-3.5" />
              <span>{benefits.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {benefits.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {benefits.subtitle}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {benefits.items?.map((item, idx) => {
              const benefitIcons = [Timer, TrendingUp, Users, ShieldCheck];
              const BenefitIcon = benefitIcons[idx % benefitIcons.length];
              const badgeColors = [
                "border-brand/30 bg-brand/10 text-brand",
                "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
                "border-amber-400/30 bg-amber-400/10 text-amber-300",
                "border-purple-400/30 bg-purple-400/10 text-purple-300",
              ];
              return (
                <FadeIn key={item.id} delay={idx * 0.08} className="flex">
                  <div className="glass-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.08] p-7 transition-all duration-300 hover:border-brand/35 hover:glow-brand-sm sm:p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={cn("flex size-12 items-center justify-center rounded-2xl border", badgeColors[idx % badgeColors.length])}>
                          <BenefitIcon className="size-6" />
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-brand">
                          {item.highlight}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="font-mono text-xs font-bold text-zinc-500">
                          0{idx + 1}
                        </span>
                        <h3 className="font-heading mt-1 text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>


      {/* 5. Brand Sponsors Section (Tab & Contact Form For Brands) */}
      <section
        id="sponsors"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-gradient-to-b from-black/60 to-black/80"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Building2 className="size-3.5" />
              <span>{sponsors.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {sponsors.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {sponsors.subtitle}
            </p>
          </FadeIn>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {sponsors.stats?.map((stat, idx) => (
              <FadeIn key={stat.label} delay={idx * 0.05}>
                <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-5 text-center">
                  <span className="block font-heading text-2xl sm:text-3xl font-bold text-brand font-mono">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs sm:text-sm text-zinc-400">
                    {stat.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Benefits + Interactive Form */}
          <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">
            {/* Left: Benefits */}
            <FadeIn className="lg:col-span-5 space-y-6">
              <div className="glass-panel rounded-[24px] border border-white/[0.08] p-7 sm:p-8">
                <h3 className="font-heading text-xl font-semibold text-white mb-5">
                  {sponsors.benefitsTitle}
                </h3>
                <ul className="space-y-4">
                  {sponsors.benefits?.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <div className="size-5 shrink-0 rounded-full bg-brand/15 text-brand flex items-center justify-center mt-0.5">
                        <Check className="size-3.5" strokeWidth={3} />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-3">
                  <p className="text-xs text-zinc-400 font-medium">
                    {sponsors.form.directContact}
                  </p>
                  <a
                    href={`mailto:${sponsors.form.emailText}`}
                    onClick={() => {
                      trackDirectContact({
                        method: "email",
                        target: sponsors.form.emailText,
                      });
                      trackCtaClick({
                        cta_id: "sponsor_direct_email",
                        cta_location: "sponsor_section",
                        cta_text: sponsors.form.emailText,
                        cta_category: "external_resource",
                        destination_url: `mailto:${sponsors.form.emailText}`,
                      });
                    }}
                    aria-label={sponsors.form.emailAria}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                  >
                    <Mail className="size-4" />
                    <span>{sponsors.form.emailText}</span>
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Right: Contact Form */}
            <FadeIn className="lg:col-span-7">
              <div className="glass-panel rounded-[24px] border border-brand/30 bg-brand/[0.02] p-7 sm:p-9 shadow-xl">
                <h3 className="font-heading text-xl font-semibold text-white">
                  {sponsors.form.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
                  {sponsors.form.desc}
                </p>

                {sponsorSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 rounded-2xl border border-brand/50 bg-brand/10 p-6 text-center space-y-3"
                  >
                    <div className="size-12 rounded-full bg-brand text-[#050507] flex items-center justify-center mx-auto">
                      <Check className="size-6" strokeWidth={3} />
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white">
                      Đã gửi thành công!
                    </h4>
                    <p className="text-sm text-zinc-300">
                      {sponsors.form.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSponsorSubmit} className="mt-7 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {sponsors.form.brandNameLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.brandName}
                          onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                          placeholder={sponsors.form.brandNamePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {sponsors.form.contactNameLabel} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder={sponsors.form.contactNamePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {sponsors.form.emailLabel} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={sponsors.form.emailPlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          {sponsors.form.phoneLabel} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={sponsors.form.phonePlaceholder}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {sponsors.form.budgetLabel}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#0c0c10] px-4 py-2.5 text-sm text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      >
                        <option value="">-- Chọn ngân sách --</option>
                        {sponsors.form.budgetOptions?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {sponsors.form.noteLabel}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder={sponsors.form.notePlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sponsorLoading}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "w-full rounded-xl border-0 bg-brand py-3 text-sm font-semibold text-[#050507] glow-brand-sm hover:bg-brand hover:glow-brand-lg transition-all",
                        sponsorLoading && "opacity-75 cursor-not-allowed",
                      )}
                    >
                      <Send className="mr-2 size-4" />
                      {sponsorLoading ? "Đang gửi..." : sponsors.form.submitButton}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8 bg-zinc-950/60"
      >
        <div className="mx-auto min-w-0 max-w-[860px]">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <HelpCircle className="size-3.5" />
              <span>{faq.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {faq.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {faq.subtitle}
            </p>
          </FadeIn>

          <div className="mt-12 space-y-4">
            {faq.items?.map((item, idx) => {
              const isOpen = openFaq === item.id;
              return (
                <FadeIn key={item.id} delay={idx * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all hover:border-white/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    >
                      <span className="font-heading text-base sm:text-lg font-semibold text-white">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-zinc-400 transition-transform duration-300",
                          isOpen && "rotate-180 text-brand",
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/[0.06] px-5 pb-5 sm:px-6 sm:pb-6 pt-3 text-sm leading-relaxed text-zinc-300">
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

      {/* 7. Download Section */}
      <section
        id="download"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-zinc-400">
              {t("downloadSection.label")}
            </p>
            <h2 className="font-heading mt-3 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem]">
              {t("downloadSection.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              {t("downloadSection.subtitle", { version: DISPLAY_APP_VERSION })}
            </p>
          </FadeIn>

          <div className="mt-14 space-y-16">
            {/* Desktop Section: Downloads + Quick Installation Guide */}
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {t("downloadSection.desktopLabel")}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    macOS (Apple Silicon & Intel) · Windows (10 / 11)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand">
                  <Sparkles className="size-3.5" />
                  <span>{install.title}</span>
                </div>
              </div>

              {/* 3 Desktop Download Cards */}
              <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                {DESKTOP_DOWNLOAD_ASSETS.map((asset, index) => (
                  <DownloadCard
                    key={asset.id}
                    asset={asset}
                    card={downloadCards[asset.id]}
                    ctaLabel={t("downloadSection.ctaDownloads")}
                    comingSoonLabel={t("downloadSection.comingSoon")}
                    delay={index * 0.05}
                  />
                ))}
              </div>

              {/* Desktop Install Guide - Directly connected to desktop downloads */}
              <div
                id="install-guide"
                className="mt-6 scroll-mt-[72px] grid gap-6 md:grid-cols-2 md:gap-8"
              >
                <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                  <h4 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10 transition-transform hover:scale-105 cursor-help"
                      title="Apple macOS"
                      aria-label="Apple macOS"
                    >
                      <AppleIcon className="size-[1.35rem]" title="Apple macOS" />
                    </span>
                    <span className="min-w-0 flex-1 leading-snug pt-0.5">
                      {install.macTitle}
                    </span>
                  </h4>
                  <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                    {install.macSteps.map((step, i) => (
                      <li key={`mac-${i}`}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-2">
                    <p className="min-w-0 text-sm font-medium leading-snug text-zinc-300">
                      {install.macCommandLabel}
                    </p>
                    <button
                      type="button"
                      onClick={() => void copyMacCommand()}
                      className={cn(
                        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-colors",
                        macCommandCopied
                          ? "border-brand/50 bg-brand/15 text-brand"
                          : "border-white/[0.12] bg-white/[0.04] text-zinc-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white",
                      )}
                      aria-label={install.copyCommandLabel}
                    >
                      {macCommandCopied ? (
                        <Check className="size-3.5 shrink-0" aria-hidden />
                      ) : (
                        <Copy className="size-3.5 shrink-0" aria-hidden />
                      )}
                      {macCommandCopied
                        ? install.copiedCommandLabel
                        : install.copyCommandLabel}
                    </button>
                  </div>
                  <pre
                    className="mt-2 max-w-full overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0a0c] p-3 font-mono text-[11px] leading-snug text-zinc-300 sm:p-4 sm:text-[12px] md:text-[13px]"
                    tabIndex={0}
                  >
                    <code className="break-all whitespace-pre-wrap sm:break-normal sm:whitespace-pre">
                      {install.macCommand}
                    </code>
                  </pre>
                </div>

                <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                  <h4 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10 transition-transform hover:scale-105 cursor-help"
                      title="Microsoft Windows"
                      aria-label="Microsoft Windows"
                    >
                      <WindowsIcon className="size-[1.2rem]" title="Microsoft Windows" />
                    </span>
                    <span className="min-w-0 flex-1 leading-snug pt-0.5">
                      {install.winTitle}
                    </span>
                  </h4>
                  <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                    {install.winSteps.map((step, i) => (
                      <li key={`win-${i}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Mobile Section: Downloads + Quick Installation Guide */}
            <div className="border-t border-white/[0.08] pt-12">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {t("downloadSection.mobileLabel")}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">
                    iOS (iPhone & iPad) · Android
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand">
                  <Sparkles className="size-3.5" />
                  <span>{install.title}</span>
                </div>
              </div>

              {/* 2 Mobile Download Cards */}
              <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
                {MOBILE_DOWNLOAD_ASSETS.map((asset, index) => (
                  <DownloadCard
                    key={asset.id}
                    asset={asset}
                    card={downloadCards[asset.id]}
                    ctaLabel={t("downloadSection.ctaStore")}
                    comingSoonLabel={t("downloadSection.comingSoon")}
                    delay={index * 0.05}
                  />
                ))}
              </div>

              {/* Mobile Install Guide - Directly connected to mobile downloads */}
              <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
                <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                  <h4 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10 transition-transform hover:scale-105 cursor-help"
                      title="Apple (iOS / App Store)"
                      aria-label="Apple iOS"
                    >
                      <AppleIcon className="size-[1.35rem]" title="Apple (iOS)" />
                    </span>
                    <span className="min-w-0 flex-1 leading-snug pt-0.5">
                      {install.iosTitle}
                    </span>
                  </h4>
                  <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                    {install.iosSteps.map((step, i) => (
                      <li key={`ios-${i}`}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                  <h4 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10 gap-1"
                    >
                      <span
                        title="Android"
                        aria-label="Android"
                        className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
                      >
                        <AndroidIcon className="size-[1.15rem]" title="Android" />
                      </span>
                      <span
                        title="Google Play"
                        aria-label="Google Play"
                        className="inline-flex items-center justify-center transition-transform hover:scale-110 cursor-help"
                      >
                        <GooglePlayIcon className="size-[1.05rem]" title="Google Play" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 leading-snug pt-0.5">
                      {install.androidTitle}
                    </span>
                  </h4>
                  <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                    {install.androidSteps.map((step, i) => (
                      <li key={`android-${i}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <FadeIn className="mt-14 px-1 text-center sm:px-0">
            <a
              href={githubReleasesTagPageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCtaClick({
                  cta_id: "github_all_releases",
                  cta_location: "download_github",
                  cta_text: t("downloadSection.githubAll"),
                  cta_category: "external_resource",
                  destination_url: githubReleasesTagPageUrl(),
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "inline-flex w-full max-w-md justify-center rounded-full border-white/20 bg-white/[0.04] px-6 py-3 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.09] hover:text-white sm:w-auto sm:max-w-none sm:px-10",
              )}
            >
              {t("downloadSection.githubAll")}
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
