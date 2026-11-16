"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { heroSlides } from "@/lib/content";
import { getT, studio, type Locale } from "@/lib/i18n";
import { CURTAIN, EASE, Magnetic } from "./Motion";

// Full-screen opening: slow cross-fading photos with a Ken Burns drift, pointer parallax,
// a letter-by-letter title and a progress bar per slide.
const DURATION = 7000;

export function Hero({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, (v) => v * -18), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, (v) => v * -12), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % heroSlides.length), DURATION);
    return () => clearInterval(id);
  }, [i]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const titleA = t("heroA");
  const titleB = t("heroB");
  const letters = (s: string, offset: number, cls?: string) =>
    s.split("").map((ch, k) => (
      <span key={k} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
        <motion.span
          className={`inline-block ${cls ?? ""}`}
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.2, delay: 0.5 + (offset + k) * 0.035, ease: EASE }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      </span>
    ));
  const isAr = locale === "ar";

  return (
    <section ref={ref} onPointerMove={onMove} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.div style={{ x: px, y: py }} className="absolute -inset-6">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0.999 }}
              transition={{ clipPath: { duration: 1.6, ease: CURTAIN }, opacity: { duration: 1.6 } }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.18 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: DURATION / 1000 + 1.6, ease: "linear" }}
              >
                <Image src={heroSlides[i]} alt="" fill priority={i === 0} sizes="100vw" quality={85} className="object-cover" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(16_14_12/0.55)_100%)]" />

      <motion.div style={{ opacity: fade, y: textY }} className="container-x relative flex h-full flex-col justify-end pb-28 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="eyebrow flex items-center gap-4 text-champagne-light"
        >
          <motion.span
            className="h-px w-12 origin-left bg-champagne-light rtl:origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          />
          {t("heroEyebrow")}
        </motion.p>
        <h1 className="mt-6 font-display text-[13vw] font-light leading-[0.95] sm:text-[9vw] lg:text-[8.5rem]" aria-label={`${titleA} ${titleB}`}>
          <span aria-hidden className="block">{isAr ? titleA : letters(titleA, 0)}</span>
          <span aria-hidden className="block ps-[8vw] italic">
            {isAr ? <span className="gold-text">{titleB}</span> : letters(titleB, titleA.length, "gold-text")}
          </span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-md text-base font-light leading-relaxed text-ivory/75"
          >
            {t("heroText")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}>
            <Magnetic>
              <Link href={`/${locale}/portfolio`} className="btn group border border-ivory/40 hover:border-ivory">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 ease-[var(--ease-lux)] group-hover:scale-y-100" />
                <span className="relative transition-colors duration-500 group-hover:text-ink">{t("heroCta")}</span>
                <ArrowRight className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ink rtl:-scale-x-100" strokeWidth={1.25} />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* slide progress + scroll cue */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between">
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="font-display text-sm tabular-nums text-champagne-light">0{i + 1}</span>
          {heroSlides.map((s, k) => (
            <button key={s} type="button" onClick={() => setI(k)} aria-label={`${k + 1}`} className="relative h-px w-8 bg-ivory/25 sm:w-12">
              {k === i && (
                <motion.span
                  className="absolute inset-0 origin-left bg-ivory rtl:origin-right"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                />
              )}
              {k < i && <span className="absolute inset-0 bg-ivory/70" />}
            </button>
          ))}
          <span className="font-display text-sm tabular-nums text-ivory/50">0{heroSlides.length}</span>
        </div>
        <span className="eyebrow hidden items-center gap-3 text-ivory/70 sm:flex">
          {t("scroll")}
          <span className="relative h-10 w-px overflow-hidden bg-ivory/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-ivory"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <ArrowDown className="sr-only" />
        </span>
      </div>
      <span className="sr-only">{studio.name}</span>
    </section>
  );
}
