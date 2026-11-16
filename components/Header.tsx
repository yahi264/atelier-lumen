"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { getT, localeNames, locales, studio, type Locale } from "@/lib/i18n";
import { heroSlides } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";
import { CURTAIN, EASE, lockScroll, Magnetic } from "./Motion";

// Small aperture mark used beside the name
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="20" cy="20" r="18.5" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d="M20 6.5 L31.7 13.25" transform={`rotate(${i * 60} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5" />
    </svg>
  );
}

// Link whose text rolls up to a second copy on hover
export function RollText({ children }: { children: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[var(--ease-lux)] group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 translate-y-full text-champagne transition-transform duration-500 ease-[var(--ease-lux)] group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > 300 && v > prev);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    lockScroll(open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const nav = [
    { href: `/${locale}`, label: t("navHome") },
    { href: `/${locale}/portfolio`, label: t("navPortfolio") },
    { href: `/${locale}/experience`, label: t("navExperience") },
    { href: `/${locale}/about`, label: t("navAbout") },
    { href: `/${locale}/contact`, label: t("navContact") },
  ];
  const light = isHome && !scrolled && !open;
  const rest = pathname.replace(/^\/[a-z]{2}/, "");

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,color,border-color] duration-700 ${
          open ? "text-ivory" : scrolled ? "border-b border-line bg-paper/75 text-fg backdrop-blur-xl" : light ? "text-ivory" : "text-fg"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-700 ${scrolled ? "h-16" : "h-24"}`}>
          <Link href={`/${locale}`} className="group flex items-center gap-3" aria-label={studio.name}>
            <Mark className="h-7 w-7 shrink-0 transition-transform duration-[1.2s] ease-[var(--ease-lux)] group-hover:rotate-[120deg]" />
            <span className="whitespace-nowrap font-display text-xl font-light tracking-wide sm:text-2xl">{studio.name}</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.slice(1, 4).map((n) => (
              <Link key={n.href} href={n.href} className={`eyebrow group relative py-2 ${pathname.startsWith(n.href) ? "text-champagne" : ""}`}>
                <RollText>{n.label}</RollText>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden items-center gap-1 sm:flex">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${rest}`}
                  onClick={() => (document.cookie = `locale=${l};path=/;max-age=31536000`)}
                  className={`eyebrow px-1.5 py-1 text-[0.62rem] transition-opacity ${l === locale ? "opacity-100" : "opacity-45 hover:opacity-100"}`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
            <ThemeToggle labels={{ dark: t("darkMode"), light: t("lightMode") }} />
            <div className="hidden md:block">
            <Magnetic>
              <Link
                href={`/${locale}/contact`}
                className={`btn group border py-3 ${light || open ? "border-ivory/40 hover:border-ivory" : "border-fg/25 hover:border-fg"}`}
              >
                <RollText>{t("navContact")}</RollText>
              </Link>
            </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? t("close") : t("menu")}
              className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu: opens as an expanding circle with a photo preview */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] bg-ink text-ivory"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.9, ease: CURTAIN }}
          >
            <div className="absolute inset-y-0 end-0 hidden w-2/5 overflow-hidden sm:block">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={hover}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 0.55, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: EASE }}
                >
                  <Image src={heroSlides[hover % heroSlides.length]} alt="" fill sizes="40vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent rtl:bg-gradient-to-l" />
            </div>
            <nav className="container-x relative flex h-full flex-col justify-center gap-2 pt-16">
              {nav.map((n, i) => (
                <div key={n.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: EASE }}
                  >
                    <Link
                      href={n.href}
                      onMouseEnter={() => setHover(i)}
                      className="group flex items-baseline gap-5 py-1 font-display text-5xl font-light sm:text-7xl"
                    >
                      <span className="eyebrow text-champagne">0{i + 1}</span>
                      <span className="transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-champagne-light rtl:group-hover:-translate-x-3">
                        {n.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
              <motion.div
                className="mt-10 flex gap-4 sm:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {locales.map((l) => (
                  <Link key={l} href={`/${l}${rest}`} className={`eyebrow ${l === locale ? "text-champagne" : "text-ivory/60"}`}>
                    {localeNames[l]}
                  </Link>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
