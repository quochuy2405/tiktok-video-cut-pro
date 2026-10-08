import Image from "next/image";

import { FadeIn } from "@/components/fade-in";
import {
  SCREEN_HEIGHT,
  SCREEN_SOURCES,
  SCREEN_WIDTH,
  type ScreenKey,
} from "@/lib/screenshots";
import { cn } from "@/lib/utils";

export type ScreenHighlight = {
  screen: ScreenKey;
  title: string;
  desc: string;
};

export type ScreenCopy = {
  label: string;
  title: string;
  subtitle: string;
  brandTitle: string;
  brandSubtitle: string;
  highlightsLabel: string;
  highlightsTitle: string;
  highlightsSubtitle: string;
  highlights: ScreenHighlight[];
  items: Record<ScreenKey, { caption: string; alt: string }>;
};

/** A screenshot in a phone-ish frame. */
export function PhoneScreen({
  screen,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 260px, (min-width: 640px) 45vw, 70vw",
}: {
  screen: ScreenKey;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[30px] bg-gradient-to-b from-white/20 via-emerald-500/10 to-black/90 p-[2.5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(0,245,160,0.12)] ring-1 ring-emerald-500/30 sm:rounded-[34px]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[27px] bg-[#0d1611] sm:rounded-[31px]">
        {/* speaker slit, so a cropped capture still reads as a phone */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[6px] z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25 sm:top-2 sm:w-12 shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        />
        <Image
          src={SCREEN_SOURCES[screen]}
          alt={alt}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

/** Proof strip for brand surfaces: where the brand actually appears. */
export function BrandScreens({
  copy,
  screens,
}: {
  copy: ScreenCopy;
  screens: ScreenKey[];
}) {
  return (
    <div>
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl">
          {copy.brandTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {copy.brandSubtitle}
        </p>
      </FadeIn>

      <div className="mx-auto mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:max-w-[760px] sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {screens.map((screen, idx) => (
          <FadeIn
            key={screen}
            delay={idx * 0.06}
            className="flex w-[min(78vw,280px)] shrink-0 snap-center flex-col sm:w-auto"
          >
            <PhoneScreen
              screen={screen}
              alt={copy.items[screen].alt}
              sizes="(min-width: 640px) 230px, 78vw"
            />
            <p className="mt-3 text-center text-sm leading-snug text-slate-400">
              {copy.items[screen].caption}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
