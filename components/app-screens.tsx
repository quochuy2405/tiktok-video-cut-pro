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
        "rounded-[30px] bg-gradient-to-b from-[#1F2E27] to-[#0F1A15] p-[6px] shadow-[0_24px_50px_-26px_rgba(15,31,24,0.6)] ring-1 ring-black/10 sm:rounded-[34px] sm:p-2",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[24px] bg-white sm:rounded-[27px]">
        {/* speaker slit, so a cropped capture still reads as a phone */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[6px] z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/15 sm:top-2 sm:w-12"
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
        <h3 className="font-heading text-xl font-semibold text-[#0F1A15] sm:text-2xl">
          {copy.brandTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A5C53] sm:text-base">
          {copy.brandSubtitle}
        </p>
      </FadeIn>

      <div className="mx-auto mt-8 grid max-w-[760px] grid-cols-3 gap-4 sm:gap-6">
        {screens.map((screen, idx) => (
          <FadeIn key={screen} delay={idx * 0.06} className="flex flex-col">
            <PhoneScreen
              screen={screen}
              alt={copy.items[screen].alt}
              sizes="(min-width: 1024px) 230px, 30vw"
            />
            <p className="mt-3 text-center text-xs leading-snug text-[#4A5C53]">
              {copy.items[screen].caption}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
