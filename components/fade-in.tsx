"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 18,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
