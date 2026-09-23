"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { MarketingBannerSlide } from "@/lib/marketing-api";
import { cn } from "@/lib/utils";

type Props = {
  slides: MarketingBannerSlide[];
  title: string;
  subtitle?: string;
  steps?: string[];
  className?: string;
};

const SWIPE_THRESHOLD = 48;

/**
 * Wide explore strip — campaign creatives from `common_banner` (20:9).
 * Login-slot banners (`banner_login`) are intentionally excluded on web.
 */
export function MarketingBannerCarousel({
  slides,
  title,
  subtitle,
  steps = [],
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    lastX: number;
    pointerId: number | null;
    moved: boolean;
  }>({ startX: 0, lastX: 0, pointerId: null, moved: false });
  const frameRef = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const goTo = (index: number) => {
    if (count <= 0) return;
    setActive(((index % count) + count) % count);
  };

  useEffect(() => {
    if (reduceMotion || count <= 1 || isDragging) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, count, isDragging]);

  if (!count) return null;

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (count <= 1 || event.button !== 0) return;
    dragRef.current = {
      startX: event.clientX,
      lastX: event.clientX,
      pointerId: event.pointerId,
      moved: false,
    };
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragRef.current.pointerId !== event.pointerId) return;
    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 6) dragRef.current.moved = true;
    dragRef.current.lastX = event.clientX;
    const width = frameRef.current?.offsetWidth ?? 1;
    const clamped = Math.max(-width * 0.35, Math.min(width * 0.35, delta));
    setDragOffset(clamped);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragRef.current.pointerId !== event.pointerId) return;
    const delta = dragRef.current.lastX - dragRef.current.startX;
    const moved = dragRef.current.moved;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
    dragRef.current.pointerId = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      goTo(active + (delta < 0 ? 1 : -1));
    }

    // Block click-through after a drag
    if (moved) {
      event.preventDefault();
    }
  };

  return (
    <section
      id="campaigns"
      className={cn(
        "relative border-y border-[#C5D9CE] section-band-wash px-4 py-12 sm:px-6 md:py-14 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1a14] via-[#0f1f18] to-[#14532d] p-4 shadow-[0_28px_64px_-28px_rgba(15,31,24,0.65)] ring-1 ring-brand/30 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-base font-bold leading-snug text-white sm:text-lg">
                {title}
              </h2>
              {subtitle ? (
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {subtitle}
                </p>
              ) : null}
            </div>
            {count > 1 ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Banner trước"
                  onClick={() => goTo(active - 1)}
                  className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-brand hover:border-brand"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Banner sau"
                  onClick={() => goTo(active + 1)}
                  className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-brand hover:border-brand"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            ) : null}
          </div>

          {steps.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {steps.map((step, idx) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#00C48C] text-[10px] font-bold text-[#052E1C]">
                    {idx + 1}
                  </span>
                  {step}
                </span>
              ))}
            </div>
          ) : null}

          <div
            ref={frameRef}
            className={cn(
              "relative mt-4 aspect-[20/9] w-full touch-pan-y overflow-hidden rounded-xl bg-black/50 select-none",
              count > 1 && "cursor-grab active:cursor-grabbing",
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            role="region"
            aria-roledescription="carousel"
            aria-label={title}
          >
            {slides.map((slide, idx) => {
              const isActive = idx === active;
              const width = frameRef.current?.offsetWidth ?? 800;
              const offsetPct =
                (idx - active) * 100 + (isDragging ? (dragOffset / width) * 100 : 0);

              const frame = (
                <Image
                  src={slide.imageUrl}
                  alt={slide.title || title}
                  fill
                  draggable={false}
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="pointer-events-none object-cover"
                  priority={idx === 0}
                />
              );

              const shellClass = cn(
                "absolute inset-0 will-change-transform",
                !isDragging && "transition-transform duration-500 ease-out",
              );
              const style = {
                transform: `translate3d(${offsetPct}%, 0, 0)`,
              };

              if (slide.actionUrl) {
                return (
                  <a
                    key={`${slide.imageUrl}-${idx}`}
                    href={slide.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={shellClass}
                    style={style}
                    aria-hidden={!isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => {
                      if (dragRef.current.moved) {
                        e.preventDefault();
                        dragRef.current.moved = false;
                      }
                    }}
                    draggable={false}
                  >
                    {frame}
                  </a>
                );
              }

              return (
                <div
                  key={`${slide.imageUrl}-${idx}`}
                  className={shellClass}
                  style={style}
                  aria-hidden={!isActive}
                >
                  {frame}
                </div>
              );
            })}

            {count > 1 ? (
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/35 to-transparent" />
            ) : null}
            {count > 1 ? (
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/35 to-transparent" />
            ) : null}

            {count > 1 ? (
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {slides.map((slide, idx) => (
                  <button
                    key={`dot-${slide.imageUrl}-${idx}`}
                    type="button"
                    aria-label={`Banner ${idx + 1}`}
                    aria-current={idx === active}
                    onClick={() => goTo(idx)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      idx === active
                        ? "w-6 bg-[#00C48C]"
                        : "w-1.5 bg-white/45 hover:bg-white/80",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {count > 1 ? (
            <p className="mt-3 text-center text-[11px] font-medium text-white/45">
              Kéo chuột hoặc vuốt để xem thêm
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
