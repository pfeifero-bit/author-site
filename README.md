# Dale Nirvani Pfeifer | Author site

Marketing site for *Artificial Intelligence for Nonprofit Fundraising* by Dale Nirvani Pfeifer.

Stack: Next.js 14 (App Router) + TypeScript, Tailwind CSS, Framer Motion, MDX-powered Insights, Resend or Formspree for email + inquiry routing.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill keys as you have them
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` local dev server with hot reload
- `npm run build` production build (14 static pages + dynamic API routes)
- `npm run start` run the production build locally
- `npm run lint` ESLint with `next/core-web-vitals` ruleset
- `npm run typecheck` strict TypeScript without emit

## Environment variables

All optional in dev. Forms log to the server console if no provider is configured, so the UI stays usable end-to-end.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. Used for newsletter and inquiry emails. |
| `RESEND_AUDIENCE_ID` | Resend audience ID for the newsletter list. |
| `RESEND_FROM_EMAIL` | Sender address used by Resend transactional emails. |
| `FORMSPREE_ENDPOINT` | Newsletter fallback if Resend is not configured. |
| `INQUIRY_RECIPIENT` | Email address that receives Speaking and Contact form submissions. |
| `FORMSPREE_INQUIRY_ENDPOINT` | Inquiry fallback if Resend is not configured. |
| `SAMPLE_CHAPTER_URL` | Path or URL to the gated sample chapter PDF. Defaults to `/downloads/sample-chapter.pdf`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used by sitemap, OG, and JSON-LD. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain. Loads the script when set. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID. Loads gtag when set. |

Set one analytics variable, not both.

## What ships

Six pages plus the API routes and metadata.

```
/                                   home
/the-book                           full book page (description, TOC, sample, endorsements, retailers)
/about                              long-form bio + selected work + working-together CTA
/speaking                           topics, past venues, inquiry form
/insights                           MDX index
/insights/[slug]                    MDX post template
/contact                            contact form + direct links
/api/subscribe                      newsletter signup (Resend or Formspree)
/api/inquiry                        Speaking and Contact form handler (Resend or Formspree)
/sitemap.xml, /robots.txt           generated from src/app/sitemap.ts and robots.ts
```

JSON-LD for Person and Book is emitted from the root layout. Open Graph and Twitter cards are configured per-page via Next.js `metadata`. The OG image at `public/og-image.png` is a placeholder and should be replaced (composition notes in `public/og-image.placeholder.txt`).

## Project layout

```
src/
  app/                        routes (App Router)
    api/subscribe/route.ts    newsletter signup endpoint
    api/inquiry/route.ts      speaking + contact form endpoint
    [page]/page.tsx           one per route
    layout.tsx                fonts, JSON-LD, header, footer
    sitemap.ts, robots.ts     generated SEO files
  components/
    site/                     Header, Footer, EmailCapture, Analytics, MdxComponents, PlaceholderPage
    sections/                 home and per-page sections (Hero, BookHero, TableOfContents, ...)
    ui/                       reusable UI atoms (BookCover)
  lib/
    site.ts                   site-wide config (title, nav, retailers, author)
    posts.ts                  MDX post loader
content/
  posts/                      MDX blog posts (gray-matter frontmatter)
public/
  images/                     author photos
  downloads/                  sample chapter PDF and other assets
```

## Editorial system

- **Type**: Mulish (variable Google Font) across display and body. The cover comp drove this choice; the exact face used by the cover designer should replace it once confirmed (one-line swap in `src/app/layout.tsx` and `tailwind.config.ts`).
- **Color**: ink navy `#0E1B3F` (sampled from the cover), warm cream `#F7F3EC` body background, accent blue family with `accent-300` for use on dark surfaces and `accent-500` to `accent-600` for use on cream. Tokens live in `tailwind.config.ts`.
- **Motion**: Framer Motion fade-up only. No parallax, no scroll-jacking. Respects users' reduced-motion preferences via Framer's defaults.

## Blog workflow

Posts are plain MDX files in `content/posts/`. To add a post:

1. Create `content/posts/your-slug.mdx`
2. Frontmatter:
   ```
   ---
   title: Your title
   date: 2026-05-01
   excerpt: One-sentence summary that appears in the index and OG card.
   draft: false
   ---
   ```
3. Body in MDX. Markdown plus React components (use sparingly).
4. Save. The post appears at `/insights/your-slug` and in the `/insights` index immediately.

Set `draft: true` to keep a post out of the index and route. The MDX pipeline supports GFM tables, footnotes, and autolinked headings. Custom styling is in `src/components/site/MdxComponents.tsx`.

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, "New Project" -> import the repo.
3. Add environment variables from `.env.local.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Connect the custom domain.

That's it. Vercel auto-detects Next.js. Builds and previews on every push.

## Accessibility

- Skip-to-main link on every page
- Focus-visible outline using the accent color
- Semantic landmarks (`header`, `main`, `footer`, `nav` with labels)
- All forms have visible labels (or screen-reader-only labels with `sr-only`)
- All interactive elements meet WCAG 2.1 AA color-contrast targets
- Targets WCAG 2.1 AA

## Performance notes

Production build sizes (after `npm run build`):

```
/                                 138 kB First Load JS
/the-book                         140 kB
/about                            141 kB
/speaking                         136 kB
/contact                          126 kB
/insights, /insights/[slug]        96 kB
```

Framer Motion accounts for roughly 30 kB. If you remove it, those numbers drop to ~108 kB on the heaviest pages. The shared baseline is 87 kB.

Images use `next/image` for AVIF and WebP serving, lazy loading, and responsive sizing. The CSS-rendered book cover placeholder is zero bytes of image weight and ships to first paint instantly.

## Content placeholders

See [CONTENT.md](./CONTENT.md) for the per-page list of placeholders and where to drop final content.
