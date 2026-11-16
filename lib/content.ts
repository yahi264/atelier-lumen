import type { T } from "./i18n";

// ── Photos ──────────────────────────────────────────────────────────────────
// `src` is an Unsplash photo id (served via lib/image-loader.ts) or a local path like "/work/01.jpg".
// Replace them with the studio's own work. By request, no photos of women are used on this site:
// only details, venues, décor and grooms.
export type Category = "ceremony" | "details" | "reception" | "groom";
export type Photo = { src: string; alt: string; cat: Category; w: number; h: number };

export const categories: { id: Category; label: T }[] = [
  { id: "ceremony", label: { en: "Ceremony", tr: "Tören", ar: "المراسم" } },
  { id: "reception", label: { en: "Reception", tr: "Davet", ar: "الحفل" } },
  { id: "details", label: { en: "Details", tr: "Detaylar", ar: "التفاصيل" } },
  { id: "groom", label: { en: "The groom", tr: "Damat", ar: "العريس" } },
];

const p = (src: string, alt: string, cat: Category, w = 4, h = 5): Photo => ({ src, alt, cat, w, h });

export const photos: Photo[] = [
  p("1607861884586-c7cfaed16290", "Aisle of lights between rows of white chairs at night", "ceremony", 4, 5),
  p("1606800052052-a08af7148866", "Gold wedding bands resting on white linen", "details", 3, 2),
  p("1769107260117-ef5fe84b48c9", "Groom in a pinstripe suit adjusting his tie", "groom", 4, 5),
  p("1763560836989-d3636e2f82d8", "Floral arch facing the mountains", "ceremony", 3, 2),
  p("1769812343353-ae6ca1250bc2", "Table with candelabra and white flowers", "reception", 4, 5),
  p("1535254973040-607b474cb50d", "Four-tier wedding cake", "details", 4, 5),
  p("1782372159696-1c12a8d71ed2", "Groom standing on a misty hill", "groom", 4, 5),
  p("1641834919507-b0271fe5186b", "Wedding arch with flowers and greenery", "ceremony", 4, 5),
  p("1622398925373-3f91b1e275f5", "Interlocking gold bands on cream fabric", "details", 3, 2),
  p("1536392706976-e486e2ba97af", "Long dinner table with flowers and candles", "reception", 3, 2),
  p("1774660810100-d329b3a9f37e", "Groom in a dark blue suit adjusting his vest", "groom", 4, 5),
  p("1523438885200-e635ba2c371e", "Garden gazebo prepared for a ceremony", "ceremony", 4, 5),
  p("1758825178518-ca48833a6c57", "Stationery suite with ribbon and dried flowers", "details", 3, 2),
  p("1754466511458-26a1d96d1c45", "Candles lighting a table of flowers at night", "reception", 4, 5),
  p("1600091166971-7f9faad6c1e2", "Groom in a black suit jacket", "groom", 4, 5),
  p("1772127822562-a898d9f5733c", "Outdoor ceremony seating", "ceremony", 3, 2),
  p("1768587732215-7630a6d1c057", "Rings casting a heart-shaped shadow on a book", "details", 4, 5),
  p("1511795409834-ef04bbd61622", "Floral centrepiece on a reception table", "reception", 3, 2),
  p("1529635229076-82fefed713c4", "Groom fastening his jacket button", "groom", 4, 5),
  p("1670529776180-60e4132ab90c", "White floral archway with gold chairs", "ceremony", 4, 5),
  p("1771305145464-01a595836294", "Tiered cake with calla lilies", "details", 4, 5),
  p("1754466511580-03faa14e8dd5", "Candles and lanterns at an outdoor reception", "reception", 4, 5),
  p("1606216769898-c88daccaa479", "Groom seated in a blue armchair", "groom", 4, 5),
  p("1700304096367-dae5ae5e5401", "White wedding arch on a sandy beach", "ceremony", 4, 5),
  p("1633037773384-27d7ac0491e7", "Invitation suite with flowers and ribbon", "details", 4, 5),
  p("1772127822525-7eda37383b9f", "Reception under a draped canopy", "reception", 3, 2),
  p("1773688190249-a0a59de8639a", "Groom in a grey suit outdoors", "groom", 4, 5),
  p("1784822041171-13e87aebc1bf", "Two gold rings on a dark reflective surface", "details", 4, 5),
  p("1769812344081-92b3e2ac39c0", "Garden ceremony with floral aisle", "ceremony", 4, 5),
  p("1613068431228-8cb6a1e92573", "Pillar candles among eucalyptus", "reception", 4, 5),
  p("1604531826248-f0eca8eeb896", "Groom holding a bouquet", "groom", 4, 5),
  p("1561848355-890d054dc55a", "White and blush flowers", "details", 4, 5),
];

export const byId = (src: string) => photos.find((x) => x.src === src)!;

// Large, calm images for the opening slideshow
export const heroSlides = [
  "1763560836989-d3636e2f82d8",
  "1607861884586-c7cfaed16290",
  "1536392706976-e486e2ba97af",
  "1769812343890-4e406a33cfbe",
  "1754466511458-26a1d96d1c45",
];

// ── Featured weddings (horizontal gallery on the home page) ─────────────────
export const stories: { src: string; title: string; place: T; year: string }[] = [
  { src: "1763560836989-d3636e2f82d8", title: "Emir & Selin", place: { en: "Cappadocia", tr: "Kapadokya", ar: "كبادوكيا" }, year: "2026" },
  { src: "1769812343353-ae6ca1250bc2", title: "Omar & Layla", place: { en: "Bosphorus, Istanbul", tr: "Boğaziçi, İstanbul", ar: "البوسفور، إسطنبول" }, year: "2026" },
  { src: "1769107260117-ef5fe84b48c9", title: "Kerem & Defne", place: { en: "Bodrum", tr: "Bodrum", ar: "بودروم" }, year: "2025" },
  { src: "1607861884586-c7cfaed16290", title: "Yusuf & Mariam", place: { en: "Sapanca", tr: "Sapanca", ar: "سبانجا" }, year: "2025" },
  { src: "1535254973040-607b474cb50d", title: "Can & Elif", place: { en: "Ephesus, İzmir", tr: "Efes, İzmir", ar: "أفسس، إزمير" }, year: "2025" },
  { src: "1700304096367-dae5ae5e5401", title: "Ahmed & Noor", place: { en: "Fethiye", tr: "Fethiye", ar: "فتحية" }, year: "2024" },
];

// ── Collections ────────────────────────────────────────────────────────────
export const collections: { id: string; name: T; price: string; hours: T; items: T[]; featured?: boolean }[] = [
  {
    id: "essence",
    name: { en: "Essence", tr: "Essence", ar: "إسنس" },
    price: "€1,900",
    hours: { en: "6 hours · 1 photographer", tr: "6 saat · 1 fotoğrafçı", ar: "6 ساعات · مصوّر واحد" },
    items: [
      { en: "Ceremony & reception coverage", tr: "Tören ve davet çekimi", ar: "تغطية المراسم والحفل" },
      { en: "400+ edited images", tr: "400+ düzenlenmiş fotoğraf", ar: "أكثر من 400 صورة معدّلة" },
      { en: "Private online gallery", tr: "Özel çevrim içi galeri", ar: "معرض خاص على الإنترنت" },
      { en: "Delivery in 4 weeks", tr: "4 haftada teslim", ar: "التسليم خلال 4 أسابيع" },
    ],
  },
  {
    id: "signature",
    name: { en: "Signature", tr: "Signature", ar: "سيغنتشر" },
    price: "€3,400",
    hours: { en: "10 hours · 2 photographers", tr: "10 saat · 2 fotoğrafçı", ar: "10 ساعات · مصوّران" },
    featured: true,
    items: [
      { en: "Full day, from preparations to the last dance", tr: "Hazırlıktan son dansa tam gün", ar: "يوم كامل من التحضيرات حتى آخر رقصة" },
      { en: "700+ edited images", tr: "700+ düzenlenmiş fotoğraf", ar: "أكثر من 700 صورة معدّلة" },
      { en: "Linen-bound 30×30 heirloom album", tr: "Keten kaplı 30×30 aile albümü", ar: "ألبوم عائلي 30×30 بغلاف كتان" },
      { en: "Sneak peek within 72 hours", tr: "72 saat içinde ön izleme", ar: "معاينة أولى خلال 72 ساعة" },
    ],
  },
  {
    id: "heritage",
    name: { en: "Heritage", tr: "Heritage", ar: "هيريتج" },
    price: "€5,800",
    hours: { en: "Two days · full team", tr: "İki gün · tam ekip", ar: "يومان · فريق كامل" },
    items: [
      { en: "Henna / engagement + wedding day", tr: "Kına / nişan + düğün günü", ar: "ليلة الحناء / الخطوبة + يوم الزفاف" },
      { en: "Cinematic highlight film", tr: "Sinematik kısa film", ar: "فيلم سينمائي مختصر" },
      { en: "Two albums for the families", tr: "Aileler için iki albüm", ar: "ألبومان للعائلتين" },
      { en: "Destination travel included", tr: "Destinasyon ulaşımı dahil", ar: "السفر إلى الوجهة مشمول" },
    ],
  },
];

// ── Process ────────────────────────────────────────────────────────────────
export const process: { title: T; text: T }[] = [
  {
    title: { en: "Conversation", tr: "Tanışma", ar: "الحوار" },
    text: { en: "A relaxed call to hear your plans, traditions and wishes for privacy.", tr: "Planlarınızı, geleneklerinizi ve mahremiyet isteklerinizi dinlediğimiz rahat bir görüşme.", ar: "مكالمة هادئة نستمع فيها لخططكم وتقاليدكم ورغباتكم بشأن الخصوصية." },
  },
  {
    title: { en: "Planning", tr: "Planlama", ar: "التخطيط" },
    text: { en: "We visit the venue, build a timeline around the best light and agree on every detail.", tr: "Mekânı ziyaret eder, en iyi ışığa göre bir akış hazırlar ve her detayda anlaşırız.", ar: "نزور المكان ونضع جدولًا حول أفضل ضوء ونتفق على كل التفاصيل." },
  },
  {
    title: { en: "The day", tr: "Büyük gün", ar: "اليوم الكبير" },
    text: { en: "Calm, discreet coverage — present for everything, intrusive for nothing.", tr: "Sakin ve göze batmayan çekim — her şeyde varız, hiçbir şeye müdahale etmeyiz.", ar: "تغطية هادئة ومتكتّمة — حاضرون في كل لحظة دون أي إزعاج." },
  },
  {
    title: { en: "The heirloom", tr: "Miras", ar: "الإرث" },
    text: { en: "Hand-edited images and a linen album made to be opened for generations.", tr: "Elle düzenlenmiş fotoğraflar ve kuşaklar boyu açılacak keten bir albüm.", ar: "صور معدّلة يدويًا وألبوم كتان يُفتح جيلًا بعد جيل." },
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────
export const testimonials: { quote: T; name: string; place: T }[] = [
  {
    quote: {
      en: "They were invisible all day, and yet nothing was missed. Our families still cry over the album.",
      tr: "Bütün gün görünmezdiler ama hiçbir an kaçmadı. Ailelerimiz albüme hâlâ duygulanıyor.",
      ar: "كانوا غير مرئيين طوال اليوم، ومع ذلك لم تفتهم لحظة. ما زالت عائلاتنا تتأثر كلما فتحت الألبوم.",
    },
    name: "Omar & Layla",
    place: { en: "Istanbul", tr: "İstanbul", ar: "إسطنبول" },
  },
  {
    quote: {
      en: "They respected every one of our wishes on privacy without us having to ask twice.",
      tr: "Mahremiyetle ilgili tüm isteklerimize, iki kez söylememize gerek kalmadan saygı gösterdiler.",
      ar: "احترموا كل رغباتنا المتعلقة بالخصوصية دون أن نضطر لتكرار الطلب.",
    },
    name: "Yusuf & Mariam",
    place: { en: "Sapanca", tr: "Sapanca", ar: "سبانجا" },
  },
  {
    quote: {
      en: "The details, the light, the atmosphere — it feels like walking back into that evening.",
      tr: "Detaylar, ışık, atmosfer — o akşama geri dönmüş gibi hissediyoruz.",
      ar: "التفاصيل، الضوء، الأجواء — وكأننا نعود إلى تلك الأمسية.",
    },
    name: "Emir & Selin",
    place: { en: "Cappadocia", tr: "Kapadokya", ar: "كبادوكيا" },
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────
export const faq: { q: T; a: T }[] = [
  {
    q: { en: "How far in advance should we book?", tr: "Ne kadar önceden rezervasyon yapmalıyız?", ar: "متى يجب أن نحجز؟" },
    a: { en: "Most couples reserve 9–14 months ahead. Weekdays and winter dates are often available sooner.", tr: "Çoğu çift 9–14 ay önceden ayırtır. Hafta içi ve kış tarihleri genelde daha erken müsaittir.", ar: "يحجز معظم الأزواج قبل 9 إلى 14 شهرًا. أيام الأسبوع ومواعيد الشتاء تتوفر غالبًا بشكل أقرب." },
  },
  {
    q: { en: "Can our gallery stay completely private?", tr: "Galerimiz tamamen özel kalabilir mi?", ar: "هل يمكن أن يبقى معرضنا خاصًا تمامًا؟" },
    a: { en: "Yes. Galleries are password-protected and nothing is published without your written consent.", tr: "Evet. Galeriler şifre korumalıdır ve yazılı onayınız olmadan hiçbir şey yayınlanmaz.", ar: "نعم. المعارض محمية بكلمة مرور ولا يُنشر أي شيء دون موافقتكم الخطية." },
  },
  {
    q: { en: "Do you travel for destination weddings?", tr: "Destinasyon düğünlerine geliyor musunuz?", ar: "هل تسافرون لحفلات الزفاف خارج المدينة؟" },
    a: { en: "Gladly — across Türkiye, the Gulf, Europe and North Africa. Travel is included in Heritage.", tr: "Memnuniyetle — Türkiye, Körfez, Avrupa ve Kuzey Afrika genelinde. Heritage paketinde ulaşım dahildir.", ar: "بكل سرور — في تركيا والخليج وأوروبا وشمال أفريقيا. السفر مشمول في باقة هيريتج." },
  },
  {
    q: { en: "When will we receive our photographs?", tr: "Fotoğraflarımızı ne zaman alırız?", ar: "متى نستلم صورنا؟" },
    a: { en: "A sneak peek within 72 hours, and the full hand-edited gallery within 4–6 weeks.", tr: "72 saat içinde ön izleme, 4–6 hafta içinde elle düzenlenmiş tam galeri.", ar: "معاينة أولى خلال 72 ساعة، والمعرض الكامل المعدّل يدويًا خلال 4 إلى 6 أسابيع." },
  },
];

export const values: { title: T; text: T }[] = [
  { title: { en: "Discretion", tr: "Gizlilik", ar: "التكتّم" }, text: { en: "Quiet presence and private galleries by default.", tr: "Sessiz varlık ve varsayılan olarak özel galeriler.", ar: "حضور هادئ ومعارض خاصة بشكل افتراضي." } },
  { title: { en: "Craft", tr: "Zanaat", ar: "الإتقان" }, text: { en: "Every image is edited by hand, never by preset alone.", tr: "Her fotoğraf elle düzenlenir, sadece hazır ayarla değil.", ar: "كل صورة تُعدَّل يدويًا، لا بالإعدادات الجاهزة وحدها." } },
  { title: { en: "Respect", tr: "Saygı", ar: "الاحترام" }, text: { en: "Your traditions shape how and what we photograph.", tr: "Gelenekleriniz neyi ve nasıl çektiğimizi belirler.", ar: "تقاليدكم تحدد ما نصوّره وكيف نصوّره." } },
];
