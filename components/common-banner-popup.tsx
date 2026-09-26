"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { MarketingBannerSlide } from "@/lib/marketing-api";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "fcp_common_banner_dismissed_at";
const DISMISS_TTL_MS = 12 * 60 * 60 * 1000;
const SWIPE_THRESHOLD = 40;

type Props = {
  slides: MarketingBannerSlide[];
};

function wasRecentlyDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

/** Portrait launch popup — swipe / arrows / dots to change slides. */
export function CommonBannerPopup({ slides }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    lastX: number;
    pointerId: number | null;
    moved: boolean;
  }>({ startX: 0, lastX: 0, pointerId: null, moved: false });

  const count = slides.length;
  const goTo = (index: number) => {
    if (count <= 0) return;
    setActive(((index % count) + count) % count);
  };

  // The popup paints 600ms in, which made its banner the LCP element. Start the
  // download while the page is still parsing so the image is ready on open.
  if (slides[0]?.imageUrl) {
    preload(slides[0].imageUrl, { as: "image", fetchPriority: "high" });
  }

  useEffect(() => {
    if (!count || wasRecentlyDismissed()) return;
    const timer = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    if (!open || count <= 1 || isDragging) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [open, count, isDragging]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !count) return null;

  const dismiss = () => {
    markDismissed();
    setOpen(false);
  };

  const current = slides[active] ?? slides[0];

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
    setDragOffset(Math.max(-width * 0.4, Math.min(width * 0.4, delta)));
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
      return;
    }

    // Tap (no swipe): advance to next slide when multi
    if (!moved && count > 1) {
      goTo(active + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Banner Five Cut Pro"
      onClick={dismiss}
    >
      <div
        className="relative w-[min(82vw,360px)]"
        style={{ aspectRatio: "1 / 1.28" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={frameRef}
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[28px] bg-black shadow-2xl ring-1 ring-black/10 select-none",
            count > 1 && "cursor-grab active:cursor-grabbing",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          {slides.map((slide, idx) => {
            const width = frameRef.current?.offsetWidth ?? 360;
            const offsetPct =
              (idx - active) * 100 +
              (isDragging ? (dragOffset / width) * 100 : 0);
            return (
              <div
                key={`${slide.imageUrl}-${idx}`}
                className={cn(
                  "absolute inset-0 will-change-transform",
                  !isDragging && "transition-transform duration-450 ease-out",
                )}
                style={{ transform: `translate3d(${offsetPct}%, 0, 0)` }}
                aria-hidden={idx !== active}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.title || "Five Cut Pro"}
                  fill
                  draggable={false}
                  sizes="(max-width: 420px) 82vw, 360px"
                  className="pointer-events-none object-cover"
                  priority={idx === 0}
                  // Cloudinary already resizes and re-encodes these (see
                  // optimizeBannerUrl), so skip the Next optimizer — that keeps
                  // the URL identical to the one preloaded above.
                  unoptimized
                />
              </div>
            );
          })}

          {count > 1 ? (
            <>
              <button
                type="button"
                aria-label="Banner trước"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(active - 1);
                }}
                className="absolute left-2 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-brand"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Banner sau"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(active + 1);
                }}
                className="absolute right-2 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition hover:bg-brand"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
                {slides.map((slide, idx) => (
                  <button
                    key={`dot-${slide.imageUrl}-${idx}`}
                    type="button"
                    aria-label={`Slide ${idx + 1}`}
                    aria-current={idx === active}
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(idx);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      idx === active ? "w-5 bg-white" : "w-1.5 bg-white/50",
                    )}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        {current.actionUrl ? (
          <a
            href={current.actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-[#052E1C] shadow-button-mint"
          >
            Mở liên kết
          </a>
        ) : null}

        <button
          type="button"
          onClick={dismiss}
          aria-label="Đóng"
          className="absolute -right-2 -top-2 z-40 flex size-9 items-center justify-center rounded-full bg-white text-[#0F1A15] shadow-lg ring-1 ring-black/10 transition hover:bg-[#E5F8ED]"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
