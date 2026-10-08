import Image from "next/image";

import type { ScreenCopy } from "@/components/app-screens";
import {
  SCREEN_HEIGHT,
  SCREEN_SOURCES,
  SCREEN_WIDTH,
  type ScreenKey,
} from "@/lib/screenshots";

const STRIP: ScreenKey[] = [
  "explore",
  "market",
  "recipe",
  "guide",
  "result",
  "merge",
  "brand",
];

/**
 * Edge-to-edge strip of app screens sliding past. The track holds the list
 * twice so the CSS translate loop never shows a seam.
 */
export function ScreenMarquee({ copy }: { copy: ScreenCopy }) {
  const items = [...STRIP, ...STRIP];

  return (
    <section
      aria-label={copy.title}
      className="relative overflow-hidden border-t border-emerald-500/15 bg-[#060907] py-10 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial from-emerald-500/5 via-transparent to-transparent -z-10" />

      {/* Mobile: swipe a still, readable capture. Auto-scroll hides the UI. */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {STRIP.map((screen) => (
          <figure key={screen} className="w-[min(78vw,300px)] shrink-0 snap-center">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0d1712] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(0,245,160,0.1)] ring-1 ring-emerald-500/20">
              <Image
                src={SCREEN_SOURCES[screen]}
                alt={copy.items[screen].alt}
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                sizes="78vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 px-1 text-center text-sm font-medium leading-snug text-slate-300">
              {copy.items[screen].caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-32 bg-gradient-to-r from-[#060907] via-[#060907]/80 to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-32 bg-gradient-to-l from-[#060907] via-[#060907]/80 to-transparent md:block"
      />

      <div className="hidden w-max marquee-track gap-7 md:flex">
        {items.map((screen, idx) => (
          <div
            key={`${screen}-${idx}`}
            className="w-[200px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-white shadow-[0_18px_36px_-20px_rgba(0,0,0,0.8)]"
          >
            <Image
              src={SCREEN_SOURCES[screen]}
              alt={idx < STRIP.length ? copy.items[screen].alt : ""}
              aria-hidden={idx >= STRIP.length}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              sizes="200px"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
