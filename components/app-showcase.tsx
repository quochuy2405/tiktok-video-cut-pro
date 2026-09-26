"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ScreenCopy } from "@/components/app-screens";
import {
  SCREEN_HEIGHT,
  SCREEN_SOURCES,
  SCREEN_WIDTH,
  type ScreenKey,
} from "@/lib/screenshots";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 10;

/**
 * Scroll-driven showcase: the phone sticks while the highlights scroll past,
 * and the screen swaps to whichever highlight is centred in the viewport.
 * Tilt is CSS 3D (perspective), so there is no WebGL cost.
 */
export function AppShowcase({ copy }: { copy: ScreenCopy }) {
  const reduceMotion = useReducedMotion();
  const highlights = copy.highlights || [];
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      // a band across the middle of the viewport decides the active highlight
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [highlights.length]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width - 0.5;
      const py = (event.clientY - bounds.top) / bounds.height - 0.5;
      setTilt({ x: -py * MAX_TILT_DEG * 2, y: px * MAX_TILT_DEG * 2 });
    },
    [reduceMotion],
  );

  if (!highlights.length) return null;
  const current = highlights[active];
  const currentScreen = current.screen as ScreenKey;

  return (
    <section
      id="screens"
      className="scroll-mt-[72px] border-t border-[#B9CFC3] section-band-wash px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto min-w-0 max-w-[1160px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {copy.highlightsLabel}
          </p>
          <h2 className="font-heading mt-3 text-[2rem] font-semibold tracking-[-0.85px] text-[#0F1A15] md:text-[2.65rem]">
            {copy.highlightsTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A5C53] md:text-lg">
            {copy.highlightsSubtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* Sticky phone — stays put while the highlights scroll */}
          <div className="sticky top-[76px] z-10 flex justify-center pb-4 lg:order-2 lg:top-[96px] lg:h-[min(78vh,640px)] lg:items-center lg:pb-0">
            <div style={{ perspective: "1200px" }} onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
              <motion.div
                className="relative w-[150px] sm:w-[190px] lg:w-[272px]"
                style={{ transformStyle: "preserve-3d" }}
                animate={
                  reduceMotion ? undefined : { rotateX: tilt.x, rotateY: tilt.y }
                }
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[60px] bg-brand/20 blur-3xl"
                />

                <div className="rounded-[26px] bg-gradient-to-b from-[#26362E] via-[#16241D] to-[#0B140F] p-1.5 shadow-[0_30px_60px_-28px_rgba(15,31,24,0.75)] ring-1 ring-black/20 sm:rounded-[32px] sm:p-2 lg:rounded-[36px] lg:p-2.5">
                  <div className="relative overflow-hidden rounded-[20px] bg-white sm:rounded-[26px] lg:rounded-[28px]">
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-1.5 z-20 h-1 w-8 -translate-x-1/2 rounded-full bg-black/15 sm:w-10 lg:top-2 lg:w-12"
                    />

                    <div className="relative aspect-[642/1319] w-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentScreen}
                          className="absolute inset-0"
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 24, scale: 1.02 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={
                            reduceMotion ? undefined : { opacity: 0, y: -24, scale: 0.99 }
                          }
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Image
                            src={SCREEN_SOURCES[currentScreen]}
                            alt={copy.items[currentScreen].alt}
                            width={SCREEN_WIDTH}
                            height={SCREEN_HEIGHT}
                            sizes="(min-width: 1024px) 272px, (min-width: 640px) 190px, 150px"
                            className="h-full w-full object-cover object-top"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 mix-blend-screen"
                    />
                  </div>
                </div>

                {/* step dots */}
                <div className="mt-4 hidden justify-center gap-1.5 lg:flex">
                  {highlights.map((item, idx) => (
                    <span
                      key={item.screen}
                      aria-hidden
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === active ? "w-6 bg-brand" : "w-1.5 bg-[#B9CFC3]",
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Highlights — each block owns a slice of the scroll */}
          <ol className="lg:order-1">
            {highlights.map((item, idx) => {
              const isActive = idx === active;
              return (
                <li
                  key={item.screen}
                  ref={(node) => {
                    itemRefs.current[idx] = node;
                  }}
                  className="flex min-h-[46vh] flex-col justify-center py-6 lg:min-h-[62vh]"
                >
                  <div
                    className={cn(
                      "rounded-2xl border px-5 py-5 transition-all duration-300 sm:px-6",
                      isActive
                        ? "border-brand/45 bg-white shadow-card-mint"
                        : "border-transparent bg-white/30 opacity-70",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors",
                          isActive
                            ? "bg-brand text-[#052E1C]"
                            : "bg-brand/15 text-brand-deep",
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-lg font-semibold text-[#0F1A15] sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#4A5C53] sm:text-base">
                          {item.desc}
                        </p>
                        <p className="mt-3 text-xs text-[#4A5C53]">
                          {copy.items[item.screen as ScreenKey].caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
