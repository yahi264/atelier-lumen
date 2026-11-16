"use client";

import { motion } from "motion/react";
import { EASE, SplitText } from "./Motion";

// Opening block for inner pages: eyebrow, large split title and an intro line.
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="container-x pb-16 pt-40 sm:pb-24 sm:pt-52">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="eyebrow flex items-center gap-4 text-champagne"
      >
        <motion.span
          className="h-px w-10 origin-left bg-champagne rtl:origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
        />
        {eyebrow}
      </motion.p>
      <SplitText as="h1" text={title} onView={false} delay={0.4} className="mt-6 max-w-5xl font-display text-5xl font-light leading-[1.02] sm:text-8xl" />
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="mt-8 max-w-xl font-light leading-relaxed text-fg-muted"
        >
          {text}
        </motion.p>
      )}
    </section>
  );
}
