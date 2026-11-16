"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Runs before the page paints (see layout) so the saved mode never flashes.
export const themeScript = `(function(){try{var t=localStorage.getItem("lumen-theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

export function ThemeToggle({ labels }: { labels: { dark: string; light: string } }) {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");
    html.classList.add("theme-switching");
    html.classList.toggle("dark", next);
    setTimeout(() => html.classList.remove("theme-switching"), 700);
    try {
      localStorage.setItem("lumen-theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  const label = dark ? labels.light : labels.dark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-champagne hover:text-champagne"
    >
      <Sun className={`absolute h-4 w-4 transition-all duration-700 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} strokeWidth={1.25} />
      <Moon className={`absolute h-4 w-4 transition-all duration-700 ${dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} strokeWidth={1.25} />
    </button>
  );
}
