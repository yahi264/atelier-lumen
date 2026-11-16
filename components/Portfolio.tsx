"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { categories, photos, type Category } from "@/lib/content";
import { getT, tr, type Locale } from "@/lib/i18n";
import { CURTAIN, EASE, lockScroll } from "./Motion";

// Filterable masonry grid; photos rearrange with layout animation and open in a lightbox
// that grows out of the clicked thumbnail.
export function Portfolio({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.cat === filter)), [filter]);

  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    lockScroll(open !== null);
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(locale === "ar" ? -1 : 1);
      if (e.key === "ArrowLeft") go(locale === "ar" ? 1 : -1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, go, locale]);

  const tabs: { id: Category | "all"; label: string }[] = [{ id: "all", label: t("all") }, ...categories.map((c) => ({ id: c.id, label: tr(c.label, locale) }))];
  const current = open !== null ? list[open] : null;

  return (
    <section className="container-x pb-32">
      <LayoutGroup>
        <div className="sticky top-16 z-30 -mx-5 mb-12 flex gap-2 overflow-x-auto bg-paper/80 px-5 py-4 backdrop-blur-xl scrollbar-none sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`eyebrow relative shrink-0 rounded-full px-5 py-2.5 transition-colors duration-500 ${filter === tab.id ? "text-ivory" : "text-fg-muted hover:text-fg"}`}
            >
              {filter === tab.id && (
                <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink dark:bg-champagne" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <span className="relative">{tab.label}</span>
              <sup className="relative ms-1 text-[0.55rem] opacity-60">{tab.id === "all" ? photos.length : photos.filter((p) => p.cat === tab.id).length}</sup>
            </button>
          ))}
        </div>

        <motion.div layout className="columns-2 gap-3 sm:gap-5 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, k) => (
              <motion.button
                layout
                key={p.src}
                type="button"
                data-cursor="view"
                onClick={() => setOpen(k)}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: (k % 6) * 0.05, ease: EASE }}
                className="group relative mb-3 block w-full overflow-hidden bg-paper-2 sm:mb-5"
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
              >
                <motion.div layoutId={`ph-${p.src}`} className="absolute inset-0">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.08]"
                  />
                </motion.div>
                <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 translate-y-3 text-start text-xs font-light text-ivory opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="eyebrow block text-[0.58rem] text-champagne-light">{tr(categories.find((c) => c.id === p.cat)!.label, locale)}</span>
                  {p.alt}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {current && open !== null && (
            <motion.div
              className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal
              aria-label={current.alt}
            >
              <motion.div
                layoutId={`ph-${current.src}`}
                className="relative h-full max-h-[78vh] w-full max-w-6xl"
                transition={{ duration: 0.8, ease: CURTAIN }}
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div key={current.src} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={90} className="object-contain" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-6 text-ivory" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 hover:border-ivory">
                  <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.25} />
                </button>
                <span className="font-display tabular-nums text-ivory/70">
                  {String(open + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => go(1)} aria-label={t("next")} className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 hover:border-ivory">
                  <ChevronRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={1.25} />
                </button>
              </div>
              <button type="button" onClick={() => setOpen(null)} aria-label={t("close")} className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-transform duration-500 hover:rotate-90 hover:border-ivory">
                <X className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}
