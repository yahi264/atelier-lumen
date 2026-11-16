# Atelier Lumen — wedding photographer website

Next.js 16 + Tailwind 4 + Motion + Lenis, in English, Türkçe and العربية (right-to-left).
By request, the site shows **no photos of women** — only details, venues, décor and grooms.

## Run it
Double-click `start-website.bat`, or:

    npm install
    npm run dev        # http://localhost:3000

## Change the content
- Studio name, email, phone, WhatsApp, Instagram: `lib/i18n.ts` → `studio`
- All interface text (3 languages): `lib/i18n.ts`
- Photos, featured weddings, collections & prices, process, testimonials, FAQ: `lib/content.ts`
  - Photos are Unsplash ids for now. Replace them with the studio's own work: put files in
    `public/work/` and use `"/work/01.jpg"` as the `src`. Keep the no-women rule when choosing.

## Booking inquiries
The form posts to `/api/inquiry`, which saves each request in `data/inquiries.json`.
To receive them by email, copy `.env.example` to `.env.local` and fill in the SMTP settings.

## Animations
Aperture intro (once per visit), page curtain transitions, smooth scrolling, custom cursor,
split-text reveals, magnetic buttons, parallax photo reveals, pinned horizontal gallery,
scroll-velocity marquee, self-drawing timeline, 3D tilt cards, shared-element lightbox.
Everything is switched off for visitors who ask their device for reduced motion.
