import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Collections, Faq } from "@/components/Experience";
import { Process } from "@/components/HomeSections";
import { getT, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getT((await params).locale as Locale)("navExperience") };
}

export default async function ExperiencePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const t = getT(locale);
  return (
    <>
      <PageHero eyebrow={t("expEyebrow")} title={t("expTitle")} text={t("expText")} />
      <Collections locale={locale} />
      <Process locale={locale} />
      <Faq locale={locale} />
    </>
  );
}
