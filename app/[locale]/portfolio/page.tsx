import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Portfolio } from "@/components/Portfolio";
import { getT, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getT((await params).locale as Locale)("navPortfolio") };
}

export default async function PortfolioPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const t = getT(locale);
  return (
    <>
      <PageHero eyebrow={t("portfolioEyebrow")} title={t("portfolioTitle")} text={t("portfolioText")} />
      <Portfolio locale={locale} />
    </>
  );
}
