"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { photos, process, stories, testimonials, byId } from "@/lib/content";
import { getT, tr, type Locale } from "@/lib/i18n";
import { Counter, EASE, Magnetic, ParallaxImage, Reveal, SplitText } from "./Motion";

// ── Philosophy: large statement with overlapping parallax photos ─────────────
export function Intro({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="container-x grid gap-16 py-28 sm:py-40 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-6 lg:pt-20">
        <Reveal>
          <p className="eyebrow flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne" /> {t("introEyebrow")}
          </p>
        </Reveal>
        <SplitText as="h2" text={t("introTitle")} className="mt-8 font-display text-4xl font-light leading-[1.1] sm:text-6xl" stagger={0.045} />
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-lg text-base font-light leading-loose text-fg-muted">{t("introText")}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link href={`/${locale}/about`} className="group mt-10 inline-flex items-center gap-4 text-sm">
            <span className="relative">
              {t("navAbout")}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 group-hover:origin-right group-hover:scale-x-0" />
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2" strokeWidth={1.25} />
          </Link>
        </Reveal>
      </div>
      <div className="relative lg:col-span-6">
        <ParallaxImage src="1769812343890-4e406a33cfbe" alt="Floral ceremony arch in a garden" className="aspect-[4/5] w-[78%]" />
        <ParallaxImage
          src="1606800052052-a08af7148866"
          alt="Gold wedding bands on linen"
          className="absolute -bottom-16 end-0 aspect-[3/4] w-[46%] shadow-2xl shadow-ink/30"
          amount={20}
        />
        <motion.div
          className="absolute -top-8 end-[10%] hidden h-28 w-28 items-center justify-center lg:flex"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          <svg viewBox="0 0 100 100" className="h-full w-full text-champagne">
            <defs>
              <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-current text-[8.5px] uppercase tracking-[0.18em]">
              <textPath href="#ring" textLength="236" lengthAdjust="spacing">Atelier Lumen · Est. 2014 · Fine Art · </textPath>
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

// ── Marquee whose speed and slant react to scroll velocity ───────────────────
export function VelocityMarquee({ text }: { text: string }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 2000], [-8, 8]);
  const dir = useRef(1);
  const wrap = (v: number) => ((((v + 50) % 50) + 50) % 50) - 50; // keeps x within -50%..0%
  const x = useTransform(base, (v) => `${wrap(v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * -2.4 * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    base.set(base.get() + move);
  });

  const words = text.split("·").map((w) => w.trim()).filter(Boolean);
  const half = (
    <span className="flex shrink-0 items-center">
      {[...words, ...words].map((w, k) => (
        <span key={k} className="flex items-center">
          <span className={k % 2 ? "text-champagne" : ""}>{w}</span>
          <span className="mx-8 text-3xl not-italic text-champagne sm:mx-12">✦</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden border-y border-line py-8 sm:py-10" dir="ltr" aria-hidden>
      <motion.div style={{ x, skewX: skew }} className="flex w-max whitespace-nowrap font-display text-6xl font-light italic sm:text-8xl">
        {half}
        {half}
      </motion.div>
    </div>
  );
}

// ── Pinned section: featured weddings slide sideways as you scroll down ──────
export function HorizontalStories({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rtl = locale === "ar";
  const x = useTransform(scrollYProgress, [0, 1], [0, rtl ? distance : -distance]);
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative bg-ink text-ivory">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-champagne">{t("selectedEyebrow")}</p>
            <SplitText as="h2" text={t("selectedTitle")} className="mt-4 font-display text-4xl font-light sm:text-6xl" />
          </div>
          <Link href={`/${locale}/portfolio`} className="group hidden items-center gap-3 text-sm text-ivory/70 hover:text-ivory sm:flex">
            {t("seeAll")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.25} />
          </Link>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-5 sm:gap-10 sm:px-10">
          {stories.map((s, k) => (
            <StoryCard key={s.src} story={s} index={k} locale={locale} progress={scrollYProgress} />
          ))}
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-px w-full bg-ivory/15">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-champagne rtl:origin-right" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  story,
  index,
  locale,
  progress,
}: {
  story: (typeof stories)[number];
  index: number;
  locale: Locale;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each photo drifts inside its frame at a slightly different rate
  const inner = useTransform(progress, [0, 1], [index % 2 ? "-6%" : "6%", index % 2 ? "6%" : "-6%"]);
  return (
    <Link href={`/${locale}/portfolio`} data-cursor="view" className="group block w-[min(74vw,44vh)] shrink-0">
      <div className={`relative overflow-hidden ${index % 2 ? "aspect-[4/5]" : "aspect-[4/5] sm:mt-[5vh]"}`}>
        <motion.div style={{ x: inner }} className="absolute -inset-x-[8%] inset-y-0">
          <Image
            src={story.src}
            alt={story.title}
            fill
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
        <span className="absolute start-5 top-5 font-display text-sm text-ivory/80">0{index + 1}</span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl font-light transition-colors duration-500 group-hover:text-champagne-light">{story.title}</h3>
        <span className="eyebrow text-ivory/50">{story.year}</span>
      </div>
      <p className="mt-1 text-sm font-light text-ivory/60">{tr(story.place, locale)}</p>
    </Link>
  );
}

// ── Numbers ─────────────────────────────────────────────────────────────────
export function Stats({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const items = [
    { n: 320, s: "+", l: t("statsWeddings") },
    { n: 14, s: "", l: t("statsCountries") },
    { n: 12, s: "", l: t("statsYears") },
    { n: 9, s: "", l: t("statsAwards") },
  ];
  return (
    <section className="container-x grid grid-cols-2 gap-y-14 py-24 sm:py-32 lg:grid-cols-4">
      {items.map((it, k) => (
        <Reveal key={it.l} delay={k * 0.1} className="border-s border-line ps-6">
          <p className="font-display text-6xl font-light text-champagne sm:text-7xl">
            <Counter to={it.n} suffix={it.s} />
          </p>
          <p className="eyebrow mt-3 text-fg-muted">{it.l}</p>
        </Reveal>
      ))}
    </section>
  );
}

// ── Process: a line draws itself down the page as each step appears ─────────
export function Process({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  return (
    <section className="bg-paper-2 py-28 sm:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-champagne">{t("processEyebrow")}</p>
            <SplitText as="h2" text={t("processTitle")} className="mt-6 font-display text-4xl font-light leading-[1.1] sm:text-6xl" />
            <ParallaxImage src="1758825178518-ca48833a6c57" alt="Wedding stationery suite" className="mt-12 hidden aspect-[4/3] lg:block" />
          </div>
        </div>
        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute inset-y-0 start-[1.1rem] w-px bg-line" />
          <motion.div style={{ scaleY: line }} className="absolute inset-y-0 start-[1.1rem] w-px origin-top bg-champagne" />
          <ol className="space-y-20 sm:space-y-28">
            {process.map((s, k) => (
              <li key={k} className="relative ps-16">
                <motion.span
                  className="absolute start-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-champagne bg-paper-2 font-display text-sm text-champagne"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                >
                  {k + 1}
                </motion.span>
                <Reveal>
                  <h3 className="font-display text-3xl font-light sm:text-4xl">{tr(s.title, locale)}</h3>
                  <p className="mt-4 max-w-md font-light leading-relaxed text-fg-muted">{tr(s.text, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ── Mosaic of details that assembles at different speeds ─────────────────────
export function DetailMosaic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const c = useTransform(scrollYProgress, [0, 1], ["20%", "-35%"]);
  const pick = ["1622398925373-3f91b1e275f5", "1771305145464-01a595836294", "1774660810100-d329b3a9f37e", "1754466511580-03faa14e8dd5", "1633037773384-27d7ac0491e7", "1784822041171-13e87aebc1bf"].map(byId);
  const cols = [
    { y: a, items: [pick[0], pick[3]] },
    { y: b, items: [pick[1], pick[4]] },
    { y: c, items: [pick[2], pick[5]] },
  ];
  return (
    <section ref={ref} className="container-x overflow-hidden py-16">
      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        {cols.map((col, k) => (
          <motion.div key={k} style={{ y: col.y }} className="flex flex-col gap-3 sm:gap-6">
            {col.items.map((ph) => (
              <div key={ph.src} data-cursor="view" className="group relative aspect-[4/5] overflow-hidden">
                <Image src={ph.src} alt={ph.alt} fill sizes="33vw" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-110" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Testimonials: quotes cross-fade word by word ─────────────────────────────
export function Testimonials({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [i]);
  const q = testimonials[i];
  return (
    <section className="container-x py-28 text-center sm:py-40">
      <p className="eyebrow text-champagne">{t("testimonialsEyebrow")}</p>
      <div className="relative mx-auto mt-10 min-h-[16rem] max-w-4xl sm:min-h-[14rem]">
        <span aria-hidden className="absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[9rem] leading-none text-champagne/20">“</span>
        <AnimatePresence mode="wait">
          <motion.blockquote key={i} exit={{ opacity: 0, y: -20, filter: "blur(6px)" }} transition={{ duration: 0.6 }}>
            <p className="font-display text-3xl font-light italic leading-snug sm:text-5xl">
              {tr(q.quote, locale)
                .split(" ")
                .map((w, k) => (
                  <motion.span
                    key={k}
                    className="inline-block"
                    initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: k * 0.04, ease: EASE }}
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
            </p>
            <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
              <span className="font-display text-xl">{q.name}</span>
              <span className="eyebrow ms-4 text-fg-muted">{tr(q.place, locale)}</span>
            </motion.footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex justify-center gap-3">
        {testimonials.map((_, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            aria-label={`${k + 1}`}
            className={`h-2 rounded-full transition-all duration-700 ${k === i ? "w-10 bg-champagne" : "w-2 bg-fg/20 hover:bg-fg/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Closing invitation over a slowly zooming photo ───────────────────────────
export function ClosingCta({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const clip = useTransform(scrollYProgress, [0, 0.45], ["inset(12% 10% 12% 10%)", "inset(0% 0% 0% 0%)"]);
  return (
    <section ref={ref} className="relative h-[110vh]">
      <motion.div style={{ clipPath: clip }} className="sticky top-0 h-screen overflow-hidden bg-ink text-ivory">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src="1754466511458-26a1d96d1c45" alt="" fill sizes="100vw" className="object-cover opacity-55" />
        </motion.div>
        <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
          <SplitText as="h2" text={t("ctaTitleA")} className="font-display text-6xl font-light sm:text-8xl" />
          <SplitText as="p" text={t("ctaTitleB")} delay={0.2} className="font-display text-5xl font-light italic text-champagne-light sm:text-7xl" />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-md font-light leading-relaxed text-ivory/75">{t("ctaText")}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <Magnetic className="mt-10">
              <Link href={`/${locale}/contact`} className="btn group bg-ivory text-ink">
                <span className="absolute inset-0 origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-x-100 rtl:origin-right" />
                <span className="relative">{t("checkDate")}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100" strokeWidth={1.25} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

export const photoCount = photos.length;
