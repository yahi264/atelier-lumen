import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Amiri, Cormorant_Garamond, Jost, Tajawal } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { BackToTop, Cursor, PageTransition, ScrollProgress, SmoothScroll } from "@/components/Motion";
import { themeScript } from "@/components/ThemeToggle";
import { dirOf, getT, isLocale, locales, studio, type Locale } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const jost = Jost({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], variable: "--font-jost" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-amiri" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500"], variable: "--font-tajawal" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  return {
    title: { default: `${studio.name} — ${t("heroEyebrow")}`, template: `%s · ${studio.name}` },
    description: t("heroText"),
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);

  return (
    <html lang={l} dir={dirOf(l)} className={`${cormorant.variable} ${jost.variable} ${amiri.variable} ${tajawal.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Preloader name={studio.name} caption={t("preloader")} />
        <ScrollProgress />
        <Cursor labels={{ view: t("view"), drag: t("drag") }} />
        <Header locale={l} />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={l} />
        <BackToTop label={t("backToTop")} />
      </body>
    </html>
  );
}
