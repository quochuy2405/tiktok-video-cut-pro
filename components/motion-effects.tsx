"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

/** Brand-coloured reading progress line pinned above the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-[#6FF0C4] to-brand-deep"
    />
  );
}

/**
 * Card wrapper with a glow that follows the pointer. Pure CSS paint driven by
 * two custom properties, so it costs nothing until someone hovers.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [spot, setSpot] = useState({ x: "50%", y: "50%", opacity: 0 });

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || event.pointerType === "touch") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      setSpot({
        x: `${event.clientX - bounds.left}px`,
        y: `${event.clientY - bounds.top}px`,
        opacity: 1,
      });
    },
    [reduceMotion],
  );

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={() => setSpot((s) => ({ ...s, opacity: 0 }))}
      style={
        {
          "--spot-x": spot.x,
          "--spot-y": spot.y,
          "--spot-opacity": spot.opacity,
        } as React.CSSProperties
      }
      className={cn("spotlight-surface", className)}
    >
      <span aria-hidden className="spotlight-glow" />
      <div className="relative z-[1] flex h-full w-full flex-col">{children}</div>
    </div>
  );
}

/** Headline that reveals word by word on first paint. */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className={cn("inline-block", wordClassName)}
          initial={{ opacity: 0, y: "0.5em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + idx * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {idx < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </span>
  );
}
