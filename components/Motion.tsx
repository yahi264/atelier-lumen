"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUp } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const CURTAIN = [0.76, 0, 0.24, 1] as const;

type LenisWindow = Window & { __lenis?: Lenis };

// ── Weighted smooth scrolling (off for reduced-motion visitors) ──────────────
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });
    (window as LenisWindow).__lenis = lenis;
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete (window as LenisWindow).__lenis;
    };
  }, []);
  useEffect(() => {
    const lenis = (window as LenisWindow).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const lockScroll = (lock: boolean) => {
  const lenis = (window as LenisWindow).__lenis;
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = lock ? "hidden" : "";
};

// ── Thin champagne line that fills as you scroll ─────────────────────────────
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-champagne rtl:origin-right"
      aria-hidden
    />
  );
}

// ── Ring that fills with progress; click to glide back up ────────────────────
export function BackToTop({ label }: { label: string }) {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollYProgress.on("change", (v) => setShow(v > 0.1)), [scrollYProgress]);
  const up = () => {
    const lenis = (window as LenisWindow).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      onClick={up}
      aria-label={label}
      title={label}
      data-cursor="hover"
      className={`fixed bottom-5 end-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink/80 text-champagne-light backdrop-blur-md transition-all duration-700 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <motion.circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" style={{ pathLength: scrollYProgress }} />
      </svg>
      <ArrowUp className="h-4 w-4" strokeWidth={1.25} />
    </button>
  );
}

// ── Page transition: a curtain wipes across on every navigation ─────────────
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);
  const reduce = useReducedMotion();
  useEffect(() => {
    first.current = false;
  }, []);
  const animateIn = !first.current && !reduce;
  return (
    <div key={pathname}>
      {animateIn && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: CURTAIN }}
        />
      )}
      <motion.div
        initial={animateIn ? { opacity: 0, y: 40 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Fade and lift into view ──────────────────────────────────────────────────
export function Reveal({ children, delay = 0, className, y = 32 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Words rise out of masks, one after another ───────────────────────────────
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
  onView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  onView?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const show = onView ? inView : true;
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 4 }}
            animate={show ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

// ── Element gently follows the pointer when it comes near ────────────────────
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

// ── Photo revealed by a rising curtain, then drifting with the scroll ────────
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  amount = 12,
  priority,
  cursor = "view",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  amount?: number;
  priority?: boolean;
  cursor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      className={`relative overflow-hidden bg-paper-2 ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, ease: CURTAIN }}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Number counts up once it scrolls into view ───────────────────────────────
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// ── Custom cursor: a dot plus a ring that opens up with a label over photos ──
export function Cursor({ labels }: { labels: Record<string, string> }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const [mode, setMode] = useState<string | null>(null);
  const [on, setOn] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor], a, button, input, textarea, select, label") as HTMLElement | null;
      if (!el) return setMode(null);
      const m = el.dataset.cursor;
      setMode(m ?? (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) ? "text" : "hover"));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    const leave = () => x.set(-100);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!on) return null;
  const label = mode && labels[mode];
  const size = label ? 92 : mode === "hover" ? 56 : mode === "text" ? 4 : 34;
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{ width: size, height: size, scale: down ? 0.85 : 1, backgroundColor: label ? "rgba(247,243,236,1)" : "rgba(247,243,236,0)" }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70"
        >
          <motion.span
            animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
            className="eyebrow text-[0.55rem] text-ink"
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      >
        <div className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory transition-opacity ${label ? "opacity-0" : ""}`} />
      </motion.div>
    </>
  );
}
