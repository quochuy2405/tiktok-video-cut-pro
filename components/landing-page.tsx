"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Apple,
  Check,
  Clapperboard,
  Copy,
  Download,
  Languages,
  Mic,
  Palette,
  Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FadeIn } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  DISPLAY_APP_VERSION,
  DOWNLOAD_ASSETS,
  githubReleasesTagPageUrl,
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
};

const FEATURE_ICONS = {
  "smart-edit": Clapperboard,
  "source-quality": Mic,
  localization: Languages,
  filters: Palette,
} as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function featureSpanClass(index: number) {
  if (index === 0 || index === 3) return "md:col-span-2";
  return "md:col-span-1";
}

/** Four-pane mark commonly associated with Windows desktop OS (geometric, not a trademarked artwork copy). */
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

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Landing");
  const [macCommandCopied, setMacCommandCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const features = t.raw("features") as LandingFeature[];
  const downloadCards = t.raw("downloadCards") as Record<
    string,
    DownloadCardCopy
  >;
  const install = t.raw("installSection") as InstallSectionCopy;

  const copyMacCommand = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(install.macCommand);
      setMacCommandCopied(true);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => setMacCommandCopied(false), 2000);
    } catch {
      setMacCommandCopied(false);
    }
  }, [install.macCommand]);

  return (
    <>
      <section className="hero-atmosphere relative isolate flex min-h-[min(92vh,920px)] flex-col justify-center overflow-x-clip px-4 pb-24 pt-16 sm:px-6 md:pb-32 md:pt-20 lg:px-8">
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

        <div className="relative mx-auto flex w-full min-w-0 max-w-[780px] flex-col items-center text-center">
          <motion.div
            className="relative mb-10"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="absolute inset-0 scale-110 rounded-[28px] bg-brand/25 blur-2xl" aria-hidden />
            <Image
              src="/logo.png"
              alt={t("hero.logoAlt")}
              width={132}
              height={132}
              priority
              className="relative size-[7.25rem] rounded-[26px] shadow-2xl ring-2 ring-brand/40 md:size-36 md:rounded-[28px]"
            />
          </motion.div>

          <motion.div
            className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-center font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.65px] text-brand backdrop-blur-md sm:px-4 sm:text-[11px] sm:tracking-[0.7px]"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.06 }}
          >
            <Sparkles className="size-3.5 text-brand" aria-hidden />
            {t("hero.badge", { version: DISPLAY_APP_VERSION })}
          </motion.div>

          <motion.h1
            className="font-heading max-w-[min(100%,22rem)] text-[clamp(1.85rem,6vw+0.25rem,4.25rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white text-balance md:max-w-none md:tracking-[-1.35px]"
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
            className="mt-7 max-w-xl px-1 text-base leading-relaxed text-zinc-400 md:max-w-[40ch] md:px-0 md:text-lg md:leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.16 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            className="mt-11 flex w-full min-w-0 flex-wrap items-center justify-center gap-3 px-1 sm:px-0"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.22 }}
          >
            <Link
              href="/#download"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-full border-0 bg-brand px-9 py-3 text-[15px] font-medium text-[#050507] shadow-none glow-brand-sm transition-[transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand hover:glow-brand-lg",
              )}
            >
              {t("hero.ctaPrimary")}
            </Link>
            <Link
              href="/#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-white/[0.04] px-9 py-3 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.09] hover:text-white",
              )}
            >
              {t("hero.ctaSecondary")}
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.65px] text-brand">
              {t("featuresSection.label")}
            </p>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem] md:tracking-[-1px]">
              {t("featuresSection.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              {t("featuresSection.subtitle")}
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon =
                FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS];

              return (
                <FadeIn key={feature.id} className="min-w-0" delay={index * 0.06}>
                  <div
                    className={cn(
                      "glass-panel group hover:border-brand/35 relative h-full min-w-0 overflow-hidden rounded-[22px] p-6 transition-all duration-300 hover:glow-brand-sm sm:p-8 md:p-9",
                      featureSpanClass(index),
                    )}
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-70" />
                    <div className="relative flex min-w-0 flex-col gap-5">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/25">
                        {Icon ? (
                          <Icon className="size-6" aria-hidden />
                        ) : null}
                      </div>
                      <h3 className="font-heading text-xl font-semibold tracking-[-0.2px] text-white md:text-[1.35rem]">
                        {feature.title}
                      </h3>
                      <p className="text-base leading-relaxed text-zinc-400">
                        {feature.description}
                      </p>
                      {feature.bullets?.length ? (
                        <ul className="space-y-2.5 border-t border-white/[0.07] pt-5 text-sm leading-relaxed text-zinc-400">
                          {feature.bullets.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span
                                className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                                aria-hidden
                              />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="scroll-mt-[72px] border-t border-white/[0.07] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="mx-auto min-w-0 max-w-[1200px]">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.65px] text-brand">
              {t("downloadSection.label")}
            </p>
            <h2 className="font-heading mt-4 text-[2rem] font-semibold tracking-[-0.85px] text-white md:text-[2.65rem]">
              {t("downloadSection.title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              {t("downloadSection.subtitle", { version: DISPLAY_APP_VERSION })}
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DOWNLOAD_ASSETS.map((asset, index) => {
              const card = downloadCards[asset.id];

              return (
                <FadeIn
                  key={asset.id}
                  className="h-full min-h-0 min-w-0"
                  delay={index * 0.05}
                >
                  <a
                    href={asset.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "glass-panel group hover:border-brand/40 relative flex h-full min-h-[260px] min-w-0 w-full flex-col overflow-hidden rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-brand-sm sm:p-8 md:min-h-[280px] md:p-9",
                    )}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                        className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand shadow-lg shadow-brand/25 ring-1 ring-brand/30 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-brand/35"
                        aria-hidden
                      >
                        {asset.id === "windows" ? (
                          <WindowsInstallMark className="size-[1.25rem]" />
                        ) : (
                          <Apple className="size-[1.35rem]" strokeWidth={2} />
                        )}
                      </span>
                    </div>

                    <div className="mt-6 flex min-h-0 flex-1 flex-col justify-between gap-4">
                      <p className="break-all font-mono text-[10px] font-medium uppercase leading-snug tracking-[0.55px] text-zinc-500 sm:break-words">
                        {asset.fileLabel}
                      </p>
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand">
                        <Download className="size-4 shrink-0" aria-hidden />
                        {t("downloadSection.ctaDownloads")}
                      </span>
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn
            id="install-guide"
            className="mt-16 scroll-mt-[72px] md:mt-24"
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.65px] text-brand">
                {install.label}
              </p>
              <h2 className="font-heading mt-4 text-[1.65rem] font-semibold tracking-[-0.85px] text-white md:text-[2rem]">
                {install.title}
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="glass-panel min-w-0 rounded-[24px] border-white/[0.08] p-5 sm:p-7 md:p-8">
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/25"
                    aria-hidden
                  >
                    <Apple className="size-[1.35rem]" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug pt-0.5">
                    {install.macTitle}
                  </span>
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-brand">
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
                        : "border-white/[0.12] bg-white/[0.04] text-zinc-300 hover:border-brand/35 hover:bg-white/[0.07] hover:text-white",
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
                  className="mt-2 max-w-full overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0a0c] p-3 font-mono text-[11px] leading-snug text-brand sm:p-4 sm:text-[12px] md:text-[13px]"
                  tabIndex={0}
                >
                  <code className="break-all whitespace-pre-wrap sm:break-normal sm:whitespace-pre">
                    {install.macCommand}
                  </code>
                </pre>
              </div>

              <div className="glass-panel min-w-0 rounded-[24px] border-white/[0.08] p-5 sm:p-7 md:p-8">
                <h3 className="flex items-start gap-3 font-heading text-lg font-semibold tracking-[-0.2px] text-white md:text-xl">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/35"
                    aria-hidden
                  >
                    <WindowsInstallMark className="size-[1.15rem]" />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug pt-0.5">
                    {install.winTitle}
                  </span>
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400 marker:text-brand">
                  {install.winSteps.map((step, i) => (
                    <li key={`win-${i}`}>{step}</li>
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
