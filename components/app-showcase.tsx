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
      className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-wash px-4 py-14 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto min-w-0 max-w-[1100px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {copy.highlightsLabel}
          </p>
          <h2 className="font-heading mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.85px] text-[#0F1A15] sm:text-[2rem] md:text-[2.65rem]">
            {copy.highlightsTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
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
                      "shrink-0 rounded-full px-3.5 py-2.5 text-left text-sm font-semibold leading-snug transition-colors",
                      isActive
                        ? "bg-brand text-[#052E1C]"
                        : "bg-white text-[#1F2E27] ring-1 ring-[#B9CFC3]",
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
              <p className="text-sm font-semibold text-brand-deep">
                {copy.items[currentScreen].caption}
              </p>
              <h3 className="font-heading mt-1 text-xl font-semibold leading-snug text-[#0F1A15]">
                {current.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[#1F2E27]">
                {current.desc}
              </p>
            </div>
          </div>

          <ol className="order-2 hidden gap-2.5 lg:grid lg:order-1">
            {highlights.map((item, idx) => {
              const isActive = idx === active;
              return (
                <li key={item.screen}>
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl border px-5 py-4 text-left transition-colors",
                      isActive
                        ? "border-brand/45 bg-white shadow-card-mint"
                        : "border-transparent bg-white/40 hover:bg-white",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold",
                        isActive ? "bg-brand text-[#052E1C]" : "bg-brand/15 text-brand-deep",
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-lg font-semibold text-[#0F1A15]">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-[#4A5C53]">
                        {item.desc}
                      </span>
                      <span className="mt-2 block text-xs font-medium text-brand-deep">
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
