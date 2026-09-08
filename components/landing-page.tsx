"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Coins,
  Copy,
  Download,
  Eye,
  Flame,
  HelpCircle,
  LayoutTemplate,
  Layers,
  Lock,
  Mail,
  Music2,
  Pause,
  Play,
  PlayCircle,
  RotateCcw,
  Scissors,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Type,
  Upload,
  UserCheck,
  Users,
  Video,
  Wallet,
  Wand2,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
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
    inputTitle: string;
    inputDesc: string;
    engineTitle: string;
    engineDesc: string;
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

type FormulaShot = {
  num: number;
  stage: string;
  time: string;
  angle: string;
  action: string;
  script: string;
};

type FormulaItem = {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  creator: string;
  creatorBadge: string;
  brandDeal: string;
  totalTime: string;
  views: string;
  kocCount: string;
  conversion: string;
  summary: string;
  shots: FormulaShot[];
};

type FormulaCategory = {
  id: string;
  label: string;
};

type FormulaSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  categories: FormulaCategory[];
  simulatorTitle: string;
  simulatorSubtitle: string;
  playSimulator: string;
  pauseSimulator: string;
  applyFormulaBtn: string;
  sceneHeader: string;
  durationLabel: string;
  angleLabel: string;
  actionLabel: string;
  scriptLabel: string;
  cartNotice: string;
  formulas: FormulaItem[];
};

type EcosystemRole = {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
};

type EcosystemSectionCopy = {
  label: string;
  title: string;
  subtitle: string;
  roles: EcosystemRole[];
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

const FEATURE_ICONS = {
  "formula-marketplace": Sparkles,
  "camera-pacing": Video,
  "retention-hook": TrendingUp,
  "creator-wallet": Wallet,
  "brand-deals": Building2,
  "speed-export": Upload,
  templates: LayoutTemplate,
  "cut-merge": Scissors,
  "text-effects": Type,
  "music-trend": Music2,
  export: Upload,
} as const;

const ROLE_ICONS = {
  kocLearner: PlayCircle,
  creatorPro: Coins,
  brandSponsor: Building2,
} as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function WindowsInstallMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M3 3h9v9H3V3zm10 0h9v9h-9V3zM3 13h9v9H3v-9zm10 0h9v9h-9v-9z" />
    </svg>
  );
}

function PlatformMark({
  id,
  className,
}: {
  id: DownloadAsset["id"];
  className?: string;
}) {
  if (id === "windows") {
    return <WindowsInstallMark className={className} />;
  }
  if (id === "android") {
    return <Smartphone className={className} strokeWidth={2} />;
  }
  if (id === "ios") {
    return <Apple className={className} strokeWidth={2} />;
  }
  return <Apple className={className} strokeWidth={2} />;
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
          aria-hidden
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

  // Formula Showcase State (For end users to test and explore)
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFormulaId, setSelectedFormulaId] = useState("f-skincare");
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [isSimulatorPlaying, setIsSimulatorPlaying] = useState(false);

  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const howItWorks = t.raw("howItWorksSection") as HowItWorksSectionCopy;
  const batchEngine = t.raw("batchEngineSection") as BatchEngineSectionCopy;
  const benefits = t.raw("benefitsSection") as BenefitsSectionCopy;
  const formulaSection = t.raw("formulaSection") as FormulaSectionCopy;
  const sponsors = t.raw("sponsorsSection") as SponsorsSectionCopy;
  const faq = t.raw("faqSection") as FaqSectionCopy;
  const downloadCards = t.raw("downloadCards") as Record<
    string,
    DownloadCardCopy
  >;
  const install = t.raw("installSection") as InstallSectionCopy;

  // Selected Formula item
  const selectedFormula =
    formulaSection.formulas?.find((f) => f.id === selectedFormulaId) ||
    formulaSection.formulas?.[0];

  const currentShot =
    selectedFormula?.shots?.[currentShotIndex] || selectedFormula?.shots?.[0];

  // Auto-play simulator timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSimulatorPlaying && selectedFormula?.shots?.length) {
      const shotDuration = parseFloat(currentShot?.time || "2.5") * 1000;
      timer = setTimeout(() => {
        setCurrentShotIndex((prev) => (prev + 1) % selectedFormula.shots.length);
      }, shotDuration);
    }
    return () => clearTimeout(timer);
  }, [isSimulatorPlaying, currentShotIndex, selectedFormula]);

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

  const filteredFormulas =
    activeCategory === "all"
      ? formulaSection.formulas
      : formulaSection.formulas?.filter((f) => f.category === activeCategory);

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
            <p className="font-heading text-[14px] font-medium tracking-[-0.02em] text-zinc-400">
              {t("hero.productName")}
            </p>
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

          {/* Quick value tags */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300">
              <Camera className="size-3.5 text-emerald-400" />
              {t("hero.pillRetention")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-medium text-brand">
              <Layers className="size-3.5 text-brand" />
              {t("hero.pillBatch")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300">
              <Timer className="size-3.5 text-cyan-400" />
              {t("hero.pillSpeed")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300">
              <TrendingUp className="size-3.5 text-amber-400" />
              {t("hero.pillCta")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-medium text-purple-300">
              <ShieldCheck className="size-3.5 text-purple-400" />
              {t("hero.pillAntiReup")}
            </span>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-zinc-500"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.22 }}
          >
            <span>{t("hero.audienceKoc")}</span>
            <span className="hidden text-zinc-700 sm:inline" aria-hidden>
              ·
            </span>
            <span>{t("hero.audienceSeller")}</span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            className="mt-10 flex w-full min-w-0 flex-wrap items-center justify-center gap-3 px-1 sm:px-0"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.25 }}
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
                "rounded-full border-0 bg-brand px-8 py-3 text-[15px] font-medium text-[#050507] shadow-none glow-brand-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand hover:glow-brand-lg",
              )}
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#batch-engine"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_explore_batch",
                  cta_location: "hero",
                  cta_text: t("hero.pillBatch"),
                  cta_category: "navigation_section",
                  destination_url: "/#batch-engine",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-white/[0.04] px-8 py-3 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.09] hover:text-white",
              )}
            >
              <Layers className="mr-1.5 size-4 text-brand" />
              {t("hero.pillBatch")}
            </Link>
            <Link
              href="/#formula"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_explore_formula",
                  cta_location: "hero",
                  cta_text: t("hero.ctaSecondary"),
                  cta_category: "navigation_section",
                  destination_url: "/#formula",
                });
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-white/[0.04] px-8 py-3 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.09] hover:text-white",
              )}
            >
              {t("hero.ctaSecondary")}
            </Link>
            <Link
              href="/#sponsors"
              onClick={() => {
                trackCtaClick({
                  cta_id: "hero_explore_sponsors",
                  cta_location: "hero",
                  cta_text: t("hero.ctaBrand"),
                  cta_category: "lead_sponsor",
                  destination_url: "/#sponsors",
                });
              }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-[15px] font-medium text-emerald-400 hover:bg-emerald-500/20 hover:text-white transition-colors",
              )}
            >
              <Building2 className="mr-1.5 size-4" />
              {t("hero.ctaBrand")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 1. How It Works: Chưa biết quay hay edit? Chỉ 3 bước đơn giản */}
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
              const stepIcons = [Camera, LayoutTemplate, Wand2];
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
                      href="/#formula"
                      onClick={() => {
                        trackCtaClick({
                          cta_id: "batch_guide_formula",
                          cta_location: "batch_engine",
                          cta_text: t("hero.ctaSecondary"),
                          cta_category: "navigation_section",
                          destination_url: "/#formula",
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
                    {(batchEngine.pipeline as any).inputBadge || "Nguồn vào"}
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
                    {(batchEngine.pipeline as any).engineBadge || "Động cơ tự động"}
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
                    {(batchEngine.pipeline as any).outputBadge || "Kết quả đầu ra"}
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

      {/* 3. Live Formula Marketplace Showcase (End-User Content & Interactive Simulator) */}
      <section
        id="formula"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1240px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="size-3.5" />
              <span>{formulaSection.label}</span>
            </div>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {formulaSection.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
              {formulaSection.subtitle}
            </p>

            {/* Category Filter Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {formulaSection.categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all",
                    activeCategory === cat.id
                      ? "bg-brand text-[#050507] font-semibold glow-brand-sm"
                      : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Formula Cards Grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFormulas?.map((f) => {
              const isSelected = f.id === selectedFormula?.id;
              return (
                <div
                  key={f.id}
                  onClick={() => {
                    setSelectedFormulaId(f.id);
                    setCurrentShotIndex(0);
                    setIsSimulatorPlaying(false);
                  }}
                  className={cn(
                    "group relative cursor-pointer rounded-[22px] border p-5 sm:p-6 transition-all duration-300",
                    isSelected
                      ? "border-brand bg-brand/[0.06] shadow-xl shadow-brand/10 ring-1 ring-brand/40"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-brand/30 bg-brand/15 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                      {f.categoryLabel}
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-400">
                      {f.totalTime}
                    </span>
                  </div>

                  <h3 className="font-heading mt-3 text-base sm:text-lg font-semibold text-white group-hover:text-brand transition-colors line-clamp-2">
                    {f.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2">
                    {f.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <UserCheck className="size-3.5 text-brand" />
                      {f.creator}
                    </span>
                    <span className="font-mono text-brand font-semibold">
                      {f.conversion}
                    </span>
                  </div>

                  {f.brandDeal ? (
                    <div className="mt-2 inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                      <Building2 className="size-3" />
                      <span>{f.brandDeal}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Live Phone Camera Simulator & Full Script Breakdown */}
          {selectedFormula ? (
            <div className="mt-16 rounded-[28px] border border-brand/30 bg-gradient-to-b from-black/80 via-[#070b09] to-black/90 p-6 sm:p-8 md:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand/20 px-3 py-0.5 text-xs font-semibold text-brand">
                      {selectedFormula.categoryLabel}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {(formulaSection as any).goldenDurationPrefix || "Thời lượng:"} {selectedFormula.totalTime} · {selectedFormula.shots?.length || 6} {(formulaSection as any).scenesCountSuffix || "phân cảnh"}
                    </span>
                  </div>
                  <h3 className="font-heading mt-2 text-xl sm:text-2xl font-bold text-white">
                    {selectedFormula.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                    {(formulaSection as any).createdByLabel || "Sáng tạo bởi"} <span className="text-white font-medium">{selectedFormula.creator}</span> · {selectedFormula.views} {(formulaSection as any).viewsCountSuffix || "lượt xem"} · {selectedFormula.kocCount} {(formulaSection as any).appliedCountSuffix || "đã áp dụng"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSimulatorPlaying(!isSimulatorPlaying)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all",
                      isSimulatorPlaying
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                        : "bg-brand text-[#050507] glow-brand-sm hover:bg-brand",
                    )}
                  >
                    {isSimulatorPlaying ? (
                      <>
                        <Pause className="size-4" />
                        {formulaSection.pauseSimulator}
                      </>
                    ) : (
                      <>
                        <Play className="size-4 fill-current" />
                        {formulaSection.playSimulator}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentShotIndex(0);
                      setIsSimulatorPlaying(false);
                    }}
                    className="size-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                    title="Quay lại cảnh 1"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                </div>
              </div>

              {/* Main Interactive Split: Phone Camera (Left) & Shot Scripts (Right) */}
              <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
                {/* Left: Phone Camera HUD Simulator */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full max-w-[320px] aspect-[9/18] rounded-[36px] border-[3px] border-zinc-700 bg-[#090b0e] p-3 shadow-2xl ring-1 ring-white/10 overflow-hidden flex flex-col justify-between">
                    {/* Camera Island & Status Bar */}
                    <div className="flex items-center justify-between px-2 pt-1 text-[11px] font-mono text-zinc-400 z-10">
                      <span className="flex items-center gap-1.5 font-bold text-rose-500 animate-pulse">
                        <span className="size-2 rounded-full bg-rose-500" />
                        REC 00:{currentShot?.time}
                      </span>
                      <span className="size-2.5 rounded-full bg-black border border-zinc-700" />
                      <span className="text-zinc-500 font-semibold">9:16 HD</span>
                    </div>

                    {/* Camera Framing HUD */}
                    <div className="relative my-auto flex flex-col items-center justify-center text-center p-4">
                      {/* Focus Box */}
                      <div className="size-44 rounded-2xl border border-dashed border-brand/50 p-2 flex flex-col items-center justify-center relative">
                        <div className="absolute top-1 left-1 size-2 border-t-2 border-l-2 border-brand" />
                        <div className="absolute top-1 right-1 size-2 border-t-2 border-r-2 border-brand" />
                        <div className="absolute bottom-1 left-1 size-2 border-b-2 border-l-2 border-brand" />
                        <div className="absolute bottom-1 right-1 size-2 border-b-2 border-r-2 border-brand" />

                        <div className="rounded-full bg-brand/20 px-2.5 py-1 text-[11px] font-bold text-brand uppercase tracking-wider">
                          {currentShot?.stage}
                        </div>

                        <div className="mt-2 text-2xl font-extrabold text-white font-mono">
                          {currentShot?.time}
                        </div>

                        <div className="mt-1 text-[10px] text-zinc-400 font-medium">
                          {(formulaSection as any).sceneLabel || "Cảnh"} {currentShot?.num}/{selectedFormula?.shots?.length || 6}
                        </div>
                      </div>

                      {/* Dynamic Prompter Banner */}
                      <div className="mt-5 w-full rounded-xl bg-black/80 border border-brand/30 p-3 backdrop-blur-md">
                        <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Camera className="size-3 shrink-0" />
                          <span className="truncate">{currentShot?.angle}</span>
                        </p>
                        <p className="text-xs text-zinc-100 font-medium line-clamp-3 flex items-start gap-1.5">
                          <Lock className="size-3 text-brand shrink-0 mt-0.5" />
                          <span>{currentShot?.script}</span>
                        </p>
                      </div>
                    </div>

                    {/* Bottom HUD: TikTok Shop Yellow Cart Simulator */}
                    <div className="z-10 space-y-2">
                      <div className="flex items-center gap-2 rounded-xl bg-amber-400/15 border border-amber-400/30 p-2 text-[11px] text-amber-300 animate-bounce">
                        <ShoppingBag className="size-4 shrink-0 text-amber-400" />
                        <span className="font-semibold truncate">
                          {formulaSection.cartNotice}
                        </span>
                      </div>

                      {/* Scene Step indicator dots */}
                      <div className="flex items-center justify-center gap-1.5 py-1">
                        {selectedFormula?.shots?.map((s, idx) => (
                          <button
                            key={s.num}
                            type="button"
                            onClick={() => setCurrentShotIndex(idx)}
                            className={cn(
                              "h-1.5 rounded-full transition-all",
                              idx === currentShotIndex
                                ? "w-6 bg-brand"
                                : "w-1.5 bg-zinc-700 hover:bg-zinc-500",
                            )}
                            title={`Nhảy tới cảnh ${s.num}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-zinc-500 font-medium">
                    {formulaSection.simulatorSubtitle}
                  </p>
                </div>

                {/* Right: Full Script & Angle Breakdown (Clickable) */}
                <div className="lg:col-span-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    {formulaSection.sceneHeader}
                  </p>

                  {selectedFormula.shots?.map((shot, idx) => {
                    const isActive = idx === currentShotIndex;
                    return (
                      <div
                        key={shot.num}
                        onClick={() => setCurrentShotIndex(idx)}
                        className={cn(
                          "cursor-pointer rounded-2xl border p-4 transition-all duration-200",
                          isActive
                            ? "border-brand bg-brand/[0.08] ring-1 ring-brand/30 shadow-md"
                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "flex size-6 items-center justify-center rounded-full font-mono text-xs font-bold",
                                isActive
                                   ? "bg-brand text-[#050507]"
                                   : "bg-white/10 text-zinc-400",
                              )}
                            >
                              {shot.num}
                            </span>
                            <span className="font-heading text-sm font-semibold text-white">
                              {shot.stage}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-300">
                              {shot.time}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-amber-300 font-medium flex items-center gap-1.5">
                          <Video className="size-3.5 shrink-0" />
                          <span>{shot.angle}</span>
                        </div>

                        <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          <span className="text-zinc-400 font-medium">{formulaSection.actionLabel}: </span>
                          {shot.action}
                        </p>

                        <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/[0.08] px-3 py-2 text-xs font-medium text-brand">
                          <Lock className="size-3.5 shrink-0 text-brand" />
                          <span className="truncate font-medium">{shot.script}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-2">
                    <Link
                      href="/#download"
                      onClick={() => {
                        trackCtaClick({
                          cta_id: "formula_apply_download",
                          cta_location: "formula_section",
                          cta_text: formulaSection.applyFormulaBtn,
                          cta_category: "conversion_download",
                          destination_url: "/#download",
                        });
                      }}
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "w-full rounded-xl bg-brand py-3 text-sm font-semibold text-[#050507] glow-brand-sm hover:bg-brand",
                      )}
                    >
                      <Download className="mr-2 size-4" />
                      {formulaSection.applyFormulaBtn}
                    </Link>
                  </div>

                  {(formulaSection as any).vipCallout ? (
                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center">
                      <p className="text-xs text-zinc-400">
                        {(formulaSection as any).vipCallout}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
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

          <div className="mt-14 space-y-12">
            <div>
              <h3 className="mb-5 text-center text-sm font-medium text-zinc-300 md:text-left">
                {t("downloadSection.desktopLabel")}
              </h3>
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
            </div>

            <div>
              <h3 className="mb-5 text-center text-sm font-medium text-zinc-300 md:text-left">
                {t("downloadSection.mobileLabel")}
              </h3>
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
            </div>
          </div>

          {/* 8. Install Guide */}
          <FadeIn
            id="install-guide"
            className="mt-16 scroll-mt-[72px] md:mt-24"
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-zinc-400">{install.label}</p>
              <h2 className="font-heading mt-3 text-[1.65rem] font-semibold tracking-[-0.85px] text-white md:text-[2rem]">
                {install.title}
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10"
                    aria-hidden
                  >
                    <Apple className="size-[1.35rem]" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug pt-0.5">
                    {install.macTitle}
                  </span>
                </h3>
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
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10"
                    aria-hidden
                  >
                    <WindowsInstallMark className="size-[1.15rem]" />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug pt-0.5">
                    {install.winTitle}
                  </span>
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                  {install.winSteps.map((step, i) => (
                    <li key={`win-${i}`}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10"
                    aria-hidden
                  >
                    <Apple className="size-[1.35rem]" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug pt-0.5">
                    {install.iosTitle}
                  </span>
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                  {install.iosSteps.map((step, i) => (
                    <li key={`ios-${i}`}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="min-w-0 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 md:p-8">
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-zinc-200 ring-1 ring-white/10"
                    aria-hidden
                  >
                    <Smartphone className="size-[1.25rem]" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug pt-0.5">
                    {install.androidTitle}
                  </span>
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-zinc-500">
                  {install.androidSteps.map((step, i) => (
                    <li key={`android-${i}`}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>

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
