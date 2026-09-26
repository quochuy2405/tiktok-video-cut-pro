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
      className="relative overflow-hidden border-t border-[#B9CFC3] bg-[#0F1A15] py-10 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0F1A15] to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0F1A15] to-transparent sm:w-28"
      />

      <div className="flex w-max marquee-track gap-5 sm:gap-7">
        {items.map((screen, idx) => (
          <div
            key={`${screen}-${idx}`}
            className="w-[124px] shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-white shadow-[0_18px_36px_-20px_rgba(0,0,0,0.8)] sm:w-[156px] sm:rounded-[22px]"
          >
            <Image
              src={SCREEN_SOURCES[screen]}
              alt={idx < STRIP.length ? copy.items[screen].alt : ""}
              aria-hidden={idx >= STRIP.length}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              sizes="(min-width: 640px) 156px, 124px"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
