"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Apple,
  Clapperboard,
  Download,
  Languages,
  Mic,
  MonitorSmartphone,
  Palette,
  Sparkles,
} from "lucide-react";

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

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Landing");

  const features = t.raw("features") as LandingFeature[];
  const downloadCards = t.raw("downloadCards") as Record<
    string,
    DownloadCardCopy
  >;

  return (
    <>
      <section className="hero-atmosphere relative isolate flex min-h-[min(92vh,920px)] flex-col justify-center overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-20 lg:px-8">
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

        <div className="relative mx-auto flex w-full max-w-[780px] flex-col items-center text-center">
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
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.7px] text-brand backdrop-blur-md"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.06 }}
          >
            <Sparkles className="size-3.5 text-brand" aria-hidden />
            {t("hero.badge", { version: DISPLAY_APP_VERSION })}
          </motion.div>

          <motion.h1
            className="font-heading max-w-[18ch] text-[2.65rem] font-semibold leading-[1.08] tracking-[-1.2px] text-white md:max-w-none md:text-[clamp(2.75rem,6vw,4.25rem)] md:tracking-[-1.35px]"
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
            className="mt-7 max-w-[40ch] text-base leading-relaxed text-zinc-400 md:text-lg md:leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: easeOut, delay: 0.16 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            className="mt-11 flex flex-wrap items-center justify-center gap-3"
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
        className="scroll-mt-[72px] border-t border-white/[0.07] px-6 py-20 md:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
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
                <FadeIn key={feature.id} delay={index * 0.06}>
                  <div
                    className={cn(
                      "glass-panel group hover:border-brand/35 relative h-full overflow-hidden rounded-[22px] p-8 transition-all duration-300 hover:glow-brand-sm md:p-9",
                      featureSpanClass(index),
                    )}
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-70" />
                    <div className="relative flex flex-col gap-5">
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
        className="scroll-mt-[72px] border-t border-white/[0.07] px-6 py-20 md:py-28 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
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

          <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DOWNLOAD_ASSETS.map((asset, index) => {
              const card = downloadCards[asset.id];

              return (
                <FadeIn
                  key={asset.id}
                  className="h-full min-h-0"
                  delay={index * 0.05}
                >
                  <a
                    href={asset.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "glass-panel group hover:border-brand/40 relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1 hover:glow-brand-sm md:min-h-[280px] md:p-9",
                    )}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex shrink-0 items-start justify-between gap-4">
                      <div className="min-w-0 pr-2">
                        <h3 className="font-heading text-xl font-semibold tracking-[-0.2px] text-white">
                          {card?.title ?? asset.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-zinc-400">
                          {card?.subtitle ?? asset.subtitle}
                        </p>
                      </div>
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-[#050507] shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-105">
                        {asset.id === "windows" ? (
                          <MonitorSmartphone className="size-6" aria-hidden />
                        ) : (
                          <Apple className="size-6" aria-hidden />
                        )}
                      </span>
                    </div>

                    <div className="mt-6 flex min-h-0 flex-1 flex-col justify-between gap-4">
                      <p className="font-mono text-[10px] font-medium uppercase leading-snug tracking-[0.55px] text-zinc-500 break-words hyphens-auto">
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

          <FadeIn className="mt-14 text-center">
            <a
              href={githubReleasesTagPageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/20 bg-white/[0.04] px-10 py-3 text-[15px] font-medium text-white backdrop-blur-sm hover:bg-white/[0.09] hover:text-white",
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
