"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Camera, Mail, MessageCircle, Phone } from "lucide-react";
import { getT, studio, type Locale } from "@/lib/i18n";
import { Mark, RollText } from "./Header";
import { Magnetic, SplitText } from "./Motion";

export function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const big = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y }} className="container-x pb-10 pt-28 sm:pt-36">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-champagne">{t("contactEyebrow")}</p>
            <SplitText
              as="h2"
              text={`${t("ctaTitleA")} ${t("ctaTitleB")}`}
              className="mt-6 max-w-3xl font-display text-5xl font-light leading-[1.05] sm:text-7xl"
            />
            <Magnetic className="mt-12">
              <Link
                href={`/${locale}/contact`}
                data-cursor="hover"
                className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-champagne/50 text-center sm:h-44 sm:w-44"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-champagne transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-100" />
                <span className="eyebrow relative flex flex-col items-center gap-2 transition-colors duration-500 group-hover:text-ink">
                  <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" strokeWidth={1.25} />
                  {t("checkDate")}
                </span>
              </Link>
            </Magnetic>
          </div>
          <div className="flex flex-col justify-end gap-6 text-sm font-light text-ivory/70">
            <p className="max-w-sm leading-relaxed">{t("footerLine")}</p>
            <a href={`mailto:${studio.email}`} className="group flex items-center gap-3 hover:text-ivory">
              <Mail className="h-4 w-4 text-champagne" strokeWidth={1.25} /> <RollText>{studio.email}</RollText>
            </a>
            <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 hover:text-ivory" dir="ltr">
              <Phone className="h-4 w-4 text-champagne" strokeWidth={1.25} /> <RollText>{studio.phone}</RollText>
            </a>
            <a href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-ivory">
              <MessageCircle className="h-4 w-4 text-champagne" strokeWidth={1.25} /> <RollText>WhatsApp</RollText>
            </a>
            <a href={studio.instagram} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-ivory">
              <Camera className="h-4 w-4 text-champagne" strokeWidth={1.25} /> <RollText>Instagram</RollText>
            </a>
          </div>
        </div>

        <motion.p
          style={{ y: big }}
          aria-hidden
          className="pointer-events-none mt-24 select-none whitespace-nowrap text-center font-display text-[17vw] font-light leading-none tracking-tight text-ivory/[0.06]"
        >
          {studio.name}
        </motion.p>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pb-16 pt-8 text-xs text-ivory/45 sm:flex-row sm:pb-0 sm:pe-16">
          <span className="flex items-center gap-3">
            <Mark className="h-5 w-5 text-champagne" /> © {new Date().getFullYear()} {studio.name}. {t("rights")}
          </span>
          <span>{studio.city[locale]}</span>
        </div>
      </motion.div>
    </footer>
  );
}
