import { Hero } from "@/components/Hero";
import { ClosingCta, DetailMosaic, HorizontalStories, Intro, Process, Stats, Testimonials, VelocityMarquee } from "@/components/HomeSections";
import { getT, type Locale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = getT(locale);
  return (
    <>
      <Hero locale={locale} />
      <Intro locale={locale} />
      <VelocityMarquee text={t("marquee")} />
      <Stats locale={locale} />
      <HorizontalStories locale={locale} />
      <DetailMosaic />
      <Process locale={locale} />
      <Testimonials locale={locale} />
      <ClosingCta locale={locale} />
    </>
  );
}
