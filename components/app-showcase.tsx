"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { PhoneScreen, type ScreenCopy } from "@/components/app-screens";
import { type ScreenKey } from "@/lib/screenshots";
import { cn } from "@/lib/utils";

/**
 * One large phone stays put. The visitor picks a highlight and the screenshot
 * swaps in place, so the UI in the capture stays big enough to read.
 */
export function AppShowcase({ copy }: { copy: ScreenCopy }) {
  const reduceMotion = useReducedMotion();
  const highlights = copy.highlights || [];
  const [active, setActive] = useState(0);

  if (!highlights.length) return null;

  const current = highlights[active];
  const currentScreen = current.screen as ScreenKey;

  return (
    <section
      id="screens"
      className="scroll-mt-[72px] border-t border-emerald-500/15 section-band-wash px-4 py-14 sm:px-6 md:py-24 lg:px-8 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 w-[700px] h-[300px] bg-radial from-emerald-500/10 via-transparent to-transparent blur-3xl -z-10" />

      <div className="mx-auto min-w-0 max-w-[1100px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand drop-shadow-[0_0_12px_rgba(0,245,160,0.4)]">
            {copy.highlightsLabel}
          </p>
          <h2 className="font-heading mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.85px] text-white sm:text-[2rem] md:text-[2.65rem]">
            {copy.highlightsTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            {copy.highlightsSubtitle}
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-14">
          <div className="order-1 lg:sticky lg:top-24 lg:order-2">
            <div
              role="tablist"
              aria-label={copy.highlightsLabel}
              className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
            >
              {highlights.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={item.screen}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(idx)}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-2.5 text-left text-sm font-semibold leading-snug transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-emerald-400 to-[#00DF9E] text-slate-950 font-bold shadow-[0_0_20px_rgba(0,245,160,0.5)]"
                        : "bg-[#0b1410]/80 text-slate-300 ring-1 ring-white/10 hover:ring-emerald-500/40 hover:text-white",
                    )}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div className="mx-auto w-[min(88vw,360px)] lg:w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentScreen}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <PhoneScreen
                    screen={currentScreen}
                    alt={copy.items[currentScreen].alt}
                    priority={active === 0}
                    sizes="(min-width: 1024px) 360px, 88vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mx-auto mt-5 w-[min(88vw,360px)] lg:hidden">
              <p className="text-sm font-semibold text-brand drop-shadow-[0_0_8px_rgba(0,245,160,0.3)]">
                {copy.items[currentScreen].caption}
              </p>
              <h3 className="font-heading mt-1 text-xl font-semibold leading-snug text-white">
                {current.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-300">
                {current.desc}
              </p>
            </div>
          </div>

          <ol className="order-2 hidden gap-3 lg:grid lg:order-1">
            {highlights.map((item, idx) => {
              const isActive = idx === active;
              return (
                <li key={item.screen}>
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                      isActive
                        ? "border-emerald-500/50 bg-[#0d1813]/90 shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_24px_rgba(0,245,160,0.15)] ring-1 ring-emerald-400/30"
                        : "border-white/5 bg-[#09110d]/40 hover:bg-[#0c1611]/80 hover:border-white/10 hover:translate-x-1",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-all",
                        isActive
                          ? "bg-gradient-to-r from-emerald-400 to-[#00DF9E] text-slate-950 shadow-[0_0_12px_rgba(0,245,160,0.4)]"
                          : "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/20",
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className={cn(
                        "block font-heading text-lg font-semibold transition-colors",
                        isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                      )}>
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-slate-400">
                        {item.desc}
                      </span>
                      <span className="mt-2 block text-xs font-medium text-brand/90 drop-shadow-[0_0_8px_rgba(0,245,160,0.25)]">
                        {copy.items[item.screen as ScreenKey].caption}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
