import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ParallaxImage, Reveal } from "@/components/Motion";
import { DetailMosaic, Stats, VelocityMarquee } from "@/components/HomeSections";
import { values } from "@/lib/content";
import { getT, tr, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getT((await params).locale as Locale)("navAbout") };
}

export default async function AboutPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const t = getT(locale);
  return (
    <>
      <PageHero eyebrow={t("aboutEyebrow")} title={t("aboutTitle")} />
      <section className="container-x">
        <ParallaxImage src="1769812344081-92b3e2ac39c0" alt="Garden ceremony with a floral aisle" className="aspect-[16/9] w-full" priority amount={10} />
      </section>
      <section className="container-x grid gap-12 py-28 sm:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-3xl font-light leading-snug sm:text-4xl">{t("aboutText1")}</p>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <p className="font-light leading-loose text-fg-muted">{t("aboutText2")}</p>
        </Reveal>
      </section>
      <VelocityMarquee text={t("marquee")} />
      <section className="container-x py-28 sm:py-36">
        <Reveal>
          <h2 className="font-display text-4xl font-light sm:text-6xl">{t("valuesTitle")}</h2>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {values.map((v, k) => (
            <Reveal key={k} delay={k * 0.12} className="group border-t border-line pt-8">
              <span className="font-display text-sm text-champagne">0{k + 1}</span>
              <h3 className="mt-4 font-display text-3xl font-light transition-transform duration-700 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">{tr(v.title, locale)}</h3>
              <p className="mt-3 font-light leading-relaxed text-fg-muted">{tr(v.text, locale)}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <DetailMosaic />
      <Stats locale={locale} />
    </>
  );
}
