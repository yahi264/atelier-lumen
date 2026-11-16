export const locales = ["en", "tr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "EN", tr: "TR", ar: "عربي" };

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export type T = Record<Locale, string>;

// Studio details — change these in one place.
export const studio = {
  name: "Atelier Lumen",
  email: "hello@atelierlumen.com",
  phone: "+90 500 000 00 00",
  whatsapp: "905000000000",
  instagram: "https://instagram.com/",
  city: { en: "Istanbul · Worldwide", tr: "İstanbul · Dünya geneli", ar: "إسطنبول · حول العالم" } as T,
};

// Interface text, grouped by page.
const dict = {
  // navigation
  navHome: { en: "Home", tr: "Ana sayfa", ar: "الرئيسية" },
  navPortfolio: { en: "Portfolio", tr: "Portfolyo", ar: "الأعمال" },
  navExperience: { en: "Experience", tr: "Deneyim", ar: "التجربة" },
  navAbout: { en: "Studio", tr: "Stüdyo", ar: "الاستوديو" },
  navContact: { en: "Book a date", tr: "Tarih ayırt", ar: "احجز موعدك" },
  menu: { en: "Menu", tr: "Menü", ar: "القائمة" },
  close: { en: "Close", tr: "Kapat", ar: "إغلاق" },
  darkMode: { en: "Dark mode", tr: "Koyu mod", ar: "الوضع الداكن" },
  lightMode: { en: "Light mode", tr: "Açık mod", ar: "الوضع الفاتح" },
  backToTop: { en: "Back to top", tr: "Başa dön", ar: "العودة للأعلى" },
  view: { en: "View", tr: "Gör", ar: "عرض" },
  drag: { en: "Scroll", tr: "Kaydır", ar: "مرّر" },

  // hero
  heroEyebrow: { en: "Fine-art wedding photography", tr: "Sanatsal düğün fotoğrafçılığı", ar: "تصوير أعراس بلمسة فنية" },
  heroA: { en: "Light, held", tr: "Işığın", ar: "ضوءٌ" },
  heroB: { en: "forever", tr: "sonsuz hâli", ar: "يبقى للأبد" },
  heroText: {
    en: "Quiet, cinematic photographs of the day you will want to remember — the vows, the details, the light falling across the room.",
    tr: "Hatırlamak isteyeceğiniz günün sessiz, sinematik fotoğrafları — yeminler, detaylar ve odaya düşen ışık.",
    ar: "صور هادئة بروح سينمائية ليومٍ ستتمنى تذكّره دائمًا — العهود والتفاصيل والضوء المنساب في المكان.",
  },
  heroCta: { en: "View the work", tr: "Çalışmaları gör", ar: "شاهد الأعمال" },
  scroll: { en: "Scroll", tr: "Kaydır", ar: "مرّر" },
  preloader: { en: "Developing your story", tr: "Hikâyeniz banyo ediliyor", ar: "نُحمّض قصتكم" },

  // home sections
  introEyebrow: { en: "The approach", tr: "Yaklaşım", ar: "أسلوبنا" },
  introTitle: {
    en: "We photograph what is felt, not only what is seen.",
    tr: "Sadece görüleni değil, hissedileni fotoğraflıyoruz.",
    ar: "نصوّر ما يُحَسّ، لا ما يُرى فقط.",
  },
  introText: {
    en: "Unhurried, discreet and editorial. We work in natural light, guide gently when needed and otherwise stay out of the way — so the day remains yours and the photographs remain honest.",
    tr: "Acelesiz, göze batmayan ve editoryal. Doğal ışıkta çalışır, gerektiğinde nazikçe yönlendirir, geri kalan zamanda geri planda kalırız — gün sizin kalır, fotoğraflar dürüst.",
    ar: "بلا عجلة، وبتكتّم، وبأسلوب تحريري. نعمل بالضوء الطبيعي، ونوجّه بلطف عند الحاجة، ونبقى بعيدًا عن المشهد بقية الوقت — ليبقى اليوم لكم والصور صادقة.",
  },
  marquee: { en: "Vows · Details · Light · Celebration · Heritage ·", tr: "Yeminler · Detaylar · Işık · Kutlama · Miras ·", ar: "العهود · التفاصيل · الضوء · الاحتفال · الإرث ·" },
  selectedEyebrow: { en: "Selected stories", tr: "Seçilmiş hikâyeler", ar: "قصص مختارة" },
  selectedTitle: { en: "Recent celebrations", tr: "Son kutlamalar", ar: "احتفالات حديثة" },
  seeAll: { en: "See the full portfolio", tr: "Tüm portfolyoyu gör", ar: "شاهد كل الأعمال" },
  statsWeddings: { en: "Weddings", tr: "Düğün", ar: "حفل زفاف" },
  statsCountries: { en: "Countries", tr: "Ülke", ar: "دولة" },
  statsYears: { en: "Years", tr: "Yıl", ar: "عامًا" },
  statsAwards: { en: "Awards", tr: "Ödül", ar: "جائزة" },
  processEyebrow: { en: "How it works", tr: "Nasıl çalışıyoruz", ar: "كيف نعمل" },
  processTitle: { en: "From first hello to heirloom album", tr: "İlk merhabadan aile albümüne", ar: "من التحية الأولى إلى ألبوم يُورَّث" },
  testimonialsEyebrow: { en: "Kind words", tr: "Güzel sözler", ar: "كلمات طيبة" },
  ctaTitleA: { en: "Your date,", tr: "Tarihiniz,", ar: "موعدكم،" },
  ctaTitleB: { en: "our full attention", tr: "tüm dikkatimiz", ar: "كل اهتمامنا" },
  ctaText: {
    en: "We accept a limited number of weddings each season to give every couple our complete care.",
    tr: "Her çifte tüm özenimizi verebilmek için her sezon sınırlı sayıda düğün kabul ediyoruz.",
    ar: "نقبل عددًا محدودًا من الأعراس في كل موسم لنمنح كل عائلة عنايتنا الكاملة.",
  },
  checkDate: { en: "Check availability", tr: "Müsaitliği sor", ar: "تحقّق من التوفّر" },

  // portfolio
  portfolioEyebrow: { en: "Portfolio", tr: "Portfolyo", ar: "الأعمال" },
  portfolioTitle: { en: "A collection of moments", tr: "Anlardan bir koleksiyon", ar: "مجموعة من اللحظات" },
  portfolioText: {
    en: "Ceremonies, receptions, details and portraits from celebrations across Türkiye and beyond.",
    tr: "Türkiye ve ötesindeki kutlamalardan törenler, davetler, detaylar ve portreler.",
    ar: "مراسم وحفلات وتفاصيل وصور شخصية من احتفالات في تركيا وخارجها.",
  },
  all: { en: "All", tr: "Tümü", ar: "الكل" },
  prev: { en: "Previous", tr: "Önceki", ar: "السابق" },
  next: { en: "Next", tr: "Sonraki", ar: "التالي" },

  // experience
  expEyebrow: { en: "The experience", tr: "Deneyim", ar: "التجربة" },
  expTitle: { en: "Collections & investment", tr: "Paketler ve yatırım", ar: "الباقات والاستثمار" },
  expText: {
    en: "Every collection includes a pre-wedding consultation, a private online gallery and full-resolution images. Travel within Istanbul is always included.",
    tr: "Her paket düğün öncesi görüşme, özel çevrim içi galeri ve tam çözünürlüklü fotoğrafları içerir. İstanbul içi ulaşım her zaman dahildir.",
    ar: "تشمل كل باقة جلسة استشارة قبل الزفاف ومعرضًا خاصًا على الإنترنت وصورًا بدقة كاملة. التنقل داخل إسطنبول مشمول دائمًا.",
  },
  from: { en: "from", tr: "başlayan", ar: "ابتداءً من" },
  popular: { en: "Most chosen", tr: "En çok tercih edilen", ar: "الأكثر طلبًا" },
  enquire: { en: "Enquire", tr: "Bilgi al", ar: "استفسر" },
  faqTitle: { en: "Questions, answered", tr: "Sık sorulanlar", ar: "أسئلة وأجوبة" },

  // about
  aboutEyebrow: { en: "The studio", tr: "Stüdyo", ar: "الاستوديو" },
  aboutTitle: { en: "A small studio with a slow eye", tr: "Sakin bakışlı küçük bir stüdyo", ar: "استوديو صغير بعينٍ متأنّية" },
  aboutText1: {
    en: "Atelier Lumen began with a simple belief: a wedding is a family's history being written in a single day. Our job is to keep that history — honestly, elegantly and without interruption.",
    tr: "Atelier Lumen basit bir inançla başladı: düğün, bir ailenin tarihinin tek bir günde yazılmasıdır. Bizim işimiz bu tarihi dürüstçe, zarafetle ve araya girmeden saklamak.",
    ar: "بدأ أتيليه لومن بإيمان بسيط: الزفاف تاريخ عائلة يُكتب في يوم واحد. ومهمتنا أن نحفظ هذا التاريخ — بصدق وأناقة ودون إزعاج.",
  },
  aboutText2: {
    en: "We are a small team of photographers and editors. We respect every family's traditions and privacy: on request, we work with separate teams, photograph only details and spaces, or deliver galleries that are never shared publicly.",
    tr: "Fotoğrafçı ve editörlerden oluşan küçük bir ekibiz. Her ailenin geleneklerine ve mahremiyetine saygı duyarız: talep üzerine ayrı ekiplerle çalışır, sadece detayları ve mekânları fotoğraflar ya da hiçbir zaman paylaşılmayan galeriler teslim ederiz.",
    ar: "نحن فريق صغير من المصورين والمحررين. نحترم تقاليد كل عائلة وخصوصيتها: عند الطلب نعمل بفرق منفصلة، أو نصوّر التفاصيل والأماكن فقط، أو نسلّم معارض لا تُنشر أبدًا.",
  },
  valuesTitle: { en: "What we hold to", tr: "Bağlı kaldıklarımız", ar: "ما نلتزم به" },

  // contact
  contactEyebrow: { en: "Book a date", tr: "Tarih ayırt", ar: "احجز موعدك" },
  contactTitle: { en: "Tell us about your day", tr: "Bize gününüzü anlatın", ar: "حدّثونا عن يومكم" },
  contactText: {
    en: "Share a few details and we will reply within one working day with availability and a tailored proposal.",
    tr: "Birkaç detay paylaşın; bir iş günü içinde müsaitlik ve size özel bir teklifle dönelim.",
    ar: "شاركونا بعض التفاصيل وسنرد خلال يوم عمل واحد بالمواعيد المتاحة وعرض مخصص لكم.",
  },
  fName: { en: "Your name", tr: "Adınız", ar: "الاسم" },
  fEmail: { en: "Email", tr: "E-posta", ar: "البريد الإلكتروني" },
  fPhone: { en: "Phone / WhatsApp", tr: "Telefon / WhatsApp", ar: "الهاتف / واتساب" },
  fDate: { en: "Wedding date", tr: "Düğün tarihi", ar: "تاريخ الزفاف" },
  fVenue: { en: "Venue & city", tr: "Mekân ve şehir", ar: "المكان والمدينة" },
  fGuests: { en: "Guests (approx.)", tr: "Misafir (yaklaşık)", ar: "عدد الضيوف (تقريبًا)" },
  fCollection: { en: "Collection", tr: "Paket", ar: "الباقة" },
  fUndecided: { en: "Not sure yet", tr: "Henüz karar vermedik", ar: "لم نقرّر بعد" },
  fPrivacy: { en: "Private gallery only (no publishing)", tr: "Sadece özel galeri (yayınlanmasın)", ar: "معرض خاص فقط (دون نشر)" },
  fMessage: { en: "Tell us a little about your plans", tr: "Planlarınızdan biraz bahsedin", ar: "حدّثونا قليلًا عن خططكم" },
  send: { en: "Send inquiry", tr: "Gönder", ar: "إرسال الطلب" },
  sending: { en: "Sending…", tr: "Gönderiliyor…", ar: "جارٍ الإرسال…" },
  sentTitle: { en: "Thank you — it's on its way.", tr: "Teşekkürler — mesajınız ulaştı.", ar: "شكرًا لكم — وصلنا طلبكم." },
  sentText: { en: "We will be in touch within one working day.", tr: "Bir iş günü içinde size döneceğiz.", ar: "سنتواصل معكم خلال يوم عمل واحد." },
  sendError: { en: "Something went wrong. Please try again or write to us directly.", tr: "Bir sorun oluştu. Lütfen tekrar deneyin veya bize doğrudan yazın.", ar: "حدث خطأ ما. حاولوا مرة أخرى أو راسلونا مباشرة." },
  required: { en: "Please fill in your name, a valid email and the date.", tr: "Lütfen adınızı, geçerli bir e-posta ve tarihi girin.", ar: "يرجى إدخال الاسم وبريد إلكتروني صحيح والتاريخ." },
  directly: { en: "Or reach us directly", tr: "Ya da doğrudan ulaşın", ar: "أو تواصلوا معنا مباشرة" },

  // footer
  footerLine: { en: "Wedding photography for families who value elegance and privacy.", tr: "Zarafete ve mahremiyete önem veren aileler için düğün fotoğrafçılığı.", ar: "تصوير أعراس للعائلات التي تقدّر الأناقة والخصوصية." },
  rights: { en: "All rights reserved.", tr: "Tüm hakları saklıdır.", ar: "جميع الحقوق محفوظة." },
  notFound: { en: "This page drifted out of frame.", tr: "Bu sayfa kadrajın dışına kaydı.", ar: "خرجت هذه الصفحة من الإطار." },
} satisfies Record<string, T>;

export type Key = keyof typeof dict;
export const getT = (l: Locale) => (k: Key) => dict[k][l];
export const tr = (v: T, l: Locale) => v[l];
