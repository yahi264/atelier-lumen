"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { collections } from "@/lib/content";
import { getT, tr, type Locale } from "@/lib/i18n";
import { EASE } from "./Motion";

// Booking inquiry. Posts to /api/inquiry (Next.js) or, on cPanel hosting, to the PHP
// endpoint set in NEXT_PUBLIC_INQUIRY_ENDPOINT.
const ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || "/api/inquiry";

function Field({ label, name, type = "text", required, className }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={`group relative block ${className ?? ""}`}>
      <input name={name} type={type} required={required} placeholder={label} className="field peer" />
      <span className="pointer-events-none absolute start-0 top-6 text-fg-muted transition-all duration-500 ease-[var(--ease-lux)] peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.3em]">
        {label}
        {required && " *"}
      </span>
      <span className="absolute bottom-0 start-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-[var(--ease-lux)] peer-focus:scale-x-100 rtl:origin-right" />
    </label>
  );
}

export function InquiryForm({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const params = useSearchParams();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "") || !data.date) return setState("invalid");
    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, privateOnly: data.privateOnly === "on", locale }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state === "sent" ? (
        <motion.div key="sent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="flex flex-col items-start py-16">
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne text-ink"
          >
            <Check className="h-6 w-6" strokeWidth={1.5} />
          </motion.span>
          <h2 className="mt-8 font-display text-4xl font-light sm:text-5xl">{t("sentTitle")}</h2>
          <p className="mt-4 font-light text-fg-muted">{t("sentText")}</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <Field label={t("fName")} name="name" required />
          <Field label={t("fEmail")} name="email" type="email" required />
          <Field label={t("fPhone")} name="phone" type="tel" />
          <label className="relative block">
            <span className="absolute start-0 top-0 text-[0.65rem] uppercase tracking-[0.3em] text-fg-muted">{t("fDate")} *</span>
            <input name="date" type="date" required className="field" />
          </label>
          <Field label={t("fVenue")} name="venue" />
          <Field label={t("fGuests")} name="guests" type="number" />
          <label className="relative block sm:col-span-2">
            <span className="absolute start-0 top-0 text-[0.65rem] uppercase tracking-[0.3em] text-fg-muted">{t("fCollection")}</span>
            <select name="collection" defaultValue={params.get("collection") ?? ""} className="field appearance-none bg-transparent">
              <option value="">{t("fUndecided")}</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {tr(c.name, locale)} — {c.price}
                </option>
              ))}
            </select>
          </label>
          <label className="relative block sm:col-span-2">
            <textarea name="message" rows={4} placeholder={t("fMessage")} className="field peer resize-none" />
            <span className="pointer-events-none absolute start-0 top-6 text-fg-muted transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.3em]">
              {t("fMessage")}
            </span>
          </label>
          <label className="flex items-center gap-3 text-sm font-light text-fg-muted sm:col-span-2">
            <input type="checkbox" name="privateOnly" className="h-4 w-4 accent-[var(--color-champagne)]" />
            {t("fPrivacy")}
          </label>
          {/* Hidden field that only bots fill in */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <AnimatePresence>
              {(state === "error" || state === "invalid") && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm text-red-700 dark:text-red-300" role="alert">
                  {state === "invalid" ? t("required") : t("sendError")}
                </motion.p>
              )}
            </AnimatePresence>
            <button type="submit" disabled={state === "sending"} className="btn group ms-auto bg-fg text-paper disabled:opacity-60">
              <span className="absolute inset-0 origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-x-100 rtl:origin-right" />
              <span className="relative transition-colors duration-500 group-hover:text-ink">{state === "sending" ? t("sending") : t("send")}</span>
              <ArrowRight className="relative h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ink rtl:-scale-x-100" strokeWidth={1.25} />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
