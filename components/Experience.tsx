"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Check, Plus } from "lucide-react";
import { collections, faq } from "@/lib/content";
import { getT, tr, type Locale } from "@/lib/i18n";
import { EASE, Reveal } from "./Motion";

// Collection card that tilts toward the pointer with a moving sheen
function TiltCard({ children, featured }: { children: React.ReactNode; featured?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });
  const sheen = useTransform([mx, my] as never, ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(220 199 163 / 0.18), transparent 55%)`);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    mx.set(0.5);
    my.set(0.5);
  };
  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative flex h-full flex-col p-8 sm:p-10 ${featured ? "bg-ink text-ivory" : "border border-line bg-card"}`}
      >
        <motion.div style={{ background: sheen }} className="pointer-events-none absolute inset-0" />
        {children}
      </motion.div>
    </div>
  );
}

export function Collections({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="container-x grid gap-6 pb-28 lg:grid-cols-3">
      {collections.map((c, k) => (
        <Reveal key={c.id} delay={k * 0.12} className={c.featured ? "lg:-mt-8" : ""}>
          <TiltCard featured={c.featured}>
            {c.featured && <span className="eyebrow absolute end-8 top-8 text-[0.58rem] text-champagne">{t("popular")}</span>}
            <span className="font-display text-sm text-champagne">0{k + 1}</span>
            <h3 className="mt-6 font-display text-5xl font-light" style={{ transform: "translateZ(40px)" }}>
              {tr(c.name, locale)}
            </h3>
            <p className={`eyebrow mt-3 ${c.featured ? "text-ivory/55" : "text-fg-muted"}`}>{tr(c.hours, locale)}</p>
            <ul className="mt-10 flex-1 space-y-4 text-sm font-light">
              {c.items.map((it, j) => (
                <li key={j} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.25} />
                  {tr(it, locale)}
                </li>
              ))}
            </ul>
            <div className={`mt-12 flex items-end justify-between border-t pt-6 ${c.featured ? "border-ivory/15" : "border-line"}`}>
              <p>
                <span className={`block text-xs ${c.featured ? "text-ivory/50" : "text-fg-muted"}`}>{t("from")}</span>
                <span className="font-display text-4xl font-light">{c.price}</span>
              </p>
              <Link
                href={`/${locale}/contact?collection=${c.id}`}
                className={`btn group border px-5 py-3 ${c.featured ? "border-champagne text-champagne-light hover:bg-champagne hover:text-ink" : "border-fg/25 hover:border-fg hover:bg-fg hover:text-paper"}`}
              >
                {t("enquire")}
              </Link>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </section>
  );
}

export function Faq({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 sm:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-4xl font-light sm:text-6xl">{t("faqTitle")}</h2>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          {faq.map((f, k) => {
            const isOpen = open === k;
            return (
              <Reveal key={k} delay={k * 0.06} className="border-b border-line">
                <button type="button" onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-7 text-start">
                  <span className="font-display text-2xl font-light sm:text-3xl">{tr(f.q, locale)}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line">
                    <Plus className="h-4 w-4" strokeWidth={1.25} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} className="overflow-hidden">
                      <p className="max-w-xl pb-8 font-light leading-relaxed text-fg-muted">{tr(f.a, locale)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
