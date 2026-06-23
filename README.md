# PaintCraft MN — Website

Marketing website for **PaintCraft MN**, a professional painting company serving the Twin Cities metro. Built with Astro 5 SSR and deployed on Vercel.

**Live site:** https://paintcraftmn.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) — SSR (`output: "server"`) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via Vite plugin |
| Deployment | [Vercel](https://vercel.com) via `@astrojs/vercel` adapter |
| Email | [Resend](https://resend.com) — estimate form delivery |
| Anti-spam | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) |
| Photo uploads | [Cloudinary](https://cloudinary.com) — customer project photos |
| Language | TypeScript + JavaScript |

---

## Features

- **Service pages** — Interior (walls, trim, cabinets, staining, popcorn texture removal) and exterior (siding, doors & windows, deck & fence, garage doors) with a detail page per service
- **Photo gallery** — Filterable project transformation gallery, scanned live from `public/Website Transformations/`, with lightbox, category filters, and pagination
- **Estimate form** — Multi-field form with optional room measurements, photo uploads (Cloudinary), Cloudflare Turnstile bot protection, and dual Resend emails (lead notification + customer auto-reply)
- **Service carousel** — Auto-playing full-bleed slide carousel on the home page with swipe support
- **FAQ accordions** — Interior and exterior FAQ sections with Schema.org `FAQPage` structured data
- **Logo splash screen** — Animated intro on home page first load
- **Responsive design** — Mobile-first; gallery is 2-column on mobile, 3-column on desktop

---

## Project Structure

```
src/
├── components/
│   ├── exterior/        # Exterior page sections (hero, process, services, FAQ)
│   ├── home/            # Home page sections (hero video, CoveredBand, TrustedPartners…)
│   ├── interior/        # Interior page sections (hero, process, services, FAQ)
│   ├── layout/          # Header, Footer, BannerFooter
│   ├── our-work/        # Gallery (WorkGallery, WorkCard, lightbox, AccoladesBanner)
│   ├── reviews/         # Review display components
│   ├── service-detail/  # Shared detail page components (hero, alternating rows, CTA, FAQ)
│   └── services/        # Home page service grid / slide carousel
├── config/
│   ├── siteConfig.js             # Nav links, service list, company contact info
│   ├── serviceThemes.ts          # Exterior service page data (colors, copy, sub-features)
│   └── interiorServiceThemes.ts  # Interior service page data
├── layouts/
│   └── Base.astro        # HTML shell — <head>, header, footer, Nextdoor pixel
├── pages/
│   ├── index.astro
│   ├── interior.astro
│   ├── interior/[slug].astro     # Per-service interior detail pages
│   ├── exterior.astro
│   ├── exterior/[slug].astro     # Per-service exterior detail pages
│   ├── our-work.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── thanks.astro
│   └── api/
│       ├── estimate.ts   # POST — Turnstile verify + Resend emails
│       └── reviews.ts    # Reviews endpoint
└── styles/
    └── global.css
public/
└── Website Transformations/  # Project photos — one subfolder per gallery category
scripts/
└── fix-image-rotation.mjs   # One-time EXIF rotation normalizer (uses sharp)
```

---

## Getting Started

### Prerequisites

- Node.js 20+

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root. The site renders without these, but estimate form submissions will fail.

```env
# Resend (email delivery)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=estimates@paintcraftmn.com   # must be a Resend-verified sender
ESTIMATE_TO_EMAIL=info@paintcraftmn.com        # where lead emails are delivered
REPLY_TO_EMAIL=info@paintcraftmn.com           # reply-to on customer auto-confirm
LEADS_BCC_EMAIL=                               # optional BCC on lead emails

# Cloudflare Turnstile (bot protection)
PUBLIC_TURNSTILE_SITE=0x...        # site key — sent to the browser
TURNSTILE_SECRET_KEY=0x...         # secret key — server only, never expose

# Cloudinary (customer photo uploads on the estimate form)
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

### Development

```bash
npm run dev
# → http://localhost:4321
```

### Build

```bash
npm run build
# Output: dist/ and .vercel/output/ (ready for Vercel deployment)
```

### Preview built output locally

```bash
npm run preview
```

---

## Adding and Updating Content

### Service copy, colors, and detail pages

Interior service data — titles, subtitles, alternating content rows, color palettes — lives in [src/config/interiorServiceThemes.ts](src/config/interiorServiceThemes.ts).

Exterior service data lives in [src/config/serviceThemes.ts](src/config/serviceThemes.ts).

Each service is keyed by its URL slug (`"cabinets"`, `"deck"`, etc.). To add a service:
1. Add an entry to the relevant config file.
2. Add the slug to the `INTERIOR_SLUGS` or `EXTERIOR_SLUGS` array in the same file.
3. The `[slug].astro` page picks it up automatically — no other files to edit.

### Navigation, phone, email, social links

Edit [src/config/siteConfig.js](src/config/siteConfig.js) for nav links (including dropdown items), the header CTA button, company contact info, and social URLs.

### Photo gallery

Drop subfolders of photos into `public/Website Transformations/`. Each subfolder name becomes a filter category. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`. File names and order within each folder determine display order.

After adding photos that were shot portrait but stored sideways (EXIF rotation), run the normalizer once:

```bash
node scripts/fix-image-rotation.mjs
```

This uses `sharp` to physically rotate and re-save each image so every browser displays it correctly regardless of EXIF support.

---

## Deployment

The site deploys via Vercel's Git integration. Pushing to `main` triggers a production deploy automatically.

Environment variables must be added in the Vercel project dashboard under **Settings → Environment Variables** — Vercel does not read from `.env` files in production.

---

## Configuration

The Vercel adapter and Vite config live in [astro.config.mjs](astro.config.mjs). The Cloudflare Turnstile widget is loaded in [src/pages/contact.astro](src/pages/contact.astro). The Nextdoor pixel is in [src/layouts/Base.astro](src/layouts/Base.astro).

---

## Contributing

This is a private client site. There is no public contribution process.

For internal changes:
1. Work on a feature branch.
2. Run `npm run build` to confirm a clean build before merging.
3. Merge to `main` — Vercel deploys automatically.

---

## License

Private — all rights reserved.
