import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { ParallaxImage, Reveal } from "@/components/Motion";
import { getT, studio, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getT((await params).locale as Locale)("navContact") };
}

export default async function ContactPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  const t = getT(locale);
  return (
    <>
      <PageHero eyebrow={t("contactEyebrow")} title={t("contactTitle")} text={t("contactText")} />
      <section className="container-x grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Suspense>
              <InquiryForm locale={locale} />
            </Suspense>
          </Reveal>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <ParallaxImage src="1784822041171-13e87aebc1bf" alt="Two gold rings on a dark surface" className="aspect-[4/5]" />
          <Reveal delay={0.2}>
            <p className="eyebrow mt-10 text-champagne">{t("directly")}</p>
            <div className="mt-6 space-y-4 font-light">
              <a href={`mailto:${studio.email}`} className="flex items-center gap-3 hover:text-champagne">
                <Mail className="h-4 w-4 text-champagne" strokeWidth={1.25} /> {studio.email}
              </a>
              <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-champagne" dir="ltr">
                <Phone className="h-4 w-4 text-champagne" strokeWidth={1.25} /> {studio.phone}
              </a>
              <a href={`https://wa.me/${studio.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-champagne">
                <MessageCircle className="h-4 w-4 text-champagne" strokeWidth={1.25} /> WhatsApp
              </a>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
