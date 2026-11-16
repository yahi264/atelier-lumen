"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion } from "motion/react";
import { CURTAIN, EASE, lockScroll } from "./Motion";

// Opening sequence, once per visit: a camera aperture counts up while the studio name
// appears, then the blades open and the iris flies past the viewer to reveal the page.
const BLADES = 6;
const R = 150;

export function Preloader({ name, caption }: { name: string; caption: string }) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(0); // 0 closed → 1 open
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("lumen-intro") === "1";
      sessionStorage.setItem("lumen-intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    lockScroll(true);
    const c = animate(0, 100, { duration: 2, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setCount(Math.round(v)) });
    const timers = [
      setTimeout(() => animate(0, 1, { duration: 0.9, ease: EASE, onUpdate: setOpen }), 2150),
      setTimeout(() => setZoom(true), 2750),
      setTimeout(() => {
        setShow(false);
        lockScroll(false);
      }, 3900),
    ];
    return () => {
      c.stop();
      timers.forEach(clearTimeout);
      lockScroll(false);
    };
  }, []);

  const blades = Array.from({ length: BLADES }, (_, i) => {
    const a1 = (i * 360) / BLADES;
    const a2 = ((i + 1) * 360) / BLADES;
    const rad = (d: number) => (d * Math.PI) / 180;
    const mid = rad((a1 + a2) / 2);
    const pts = [
      [0, 0],
      [R * Math.cos(rad(a1)), R * Math.sin(rad(a1))],
      [R * Math.cos(rad(a2)), R * Math.sin(rad(a2))],
    ]
      .map((p) => p.join(","))
      .join(" ");
    const d = open * 118;
    return { pts, transform: `translate(${Math.cos(mid) * d} ${Math.sin(mid) * d}) rotate(${open * 32})` };
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[110]" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} aria-hidden>
          <svg className="absolute inset-0 h-full w-full" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <clipPath id="iris">
                <circle r="100" />
              </clipPath>
            </defs>
            <motion.g animate={{ scale: zoom ? 32 : 1 }} transition={{ duration: 1.15, ease: CURTAIN }}>
              <path
                fillRule="evenodd"
                fill="#100e0c"
                d="M-6000,-6000H6000V6000H-6000Z M0,-100 A100,100 0 1,0 0,100 A100,100 0 1,0 0,-100Z"
              />
              <g clipPath="url(#iris)">
                {blades.map((b, i) => (
                  <polygon key={i} points={b.pts} transform={b.transform} fill="#1b1815" stroke="#b89b72" strokeOpacity="0.55" strokeWidth="0.6" />
                ))}
              </g>
              <circle r="100" fill="none" stroke="#b89b72" strokeOpacity="0.5" strokeWidth="0.6" />
              <circle r="108" fill="none" stroke="#b89b72" strokeOpacity="0.18" strokeWidth="0.4" strokeDasharray="1 3" />
            </motion.g>
          </svg>

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[12%] flex justify-center text-ivory sm:top-[14%]"
            animate={{ opacity: open > 0.05 ? 0 : 1, y: open > 0.05 ? -20 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-4xl font-light tracking-wide sm:text-6xl">
              {name.split("").map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.25 + i * 0.045, ease: EASE }}
                  >
                    {ch === " " ? " " : ch}
                  </motion.span>
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-[10%] flex flex-col items-center gap-3 text-ivory"
            animate={{ opacity: open > 0.05 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-display text-5xl font-light tabular-nums text-champagne-light">{String(count).padStart(3, "0")}</span>
            <span className="eyebrow text-ivory/60">{caption}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
