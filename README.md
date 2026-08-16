# Dale Nirvani Pfeifer | Author site

Marketing site for *Artificial Intelligence for Nonprofit Fundraising* by Dale Nirvani Pfeifer (published June 2026).

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · MDX for Insights · [Kit.com](https://kit.com) for newsletter and Chapter 1 delivery · Resend for advisory inquiries (currently dormant behind a feature flag).

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill keys as you have them
npm run dev
```

Open <http://localhost:3000>.

## Scripts

- `npm run dev` — local dev server with hot reload
- `npm run build` — production build (Next reports route count on success)
- `npm run start` — run the production build locally
- `npm run lint` — ESLint with `next/core-web-vitals`
- `npm run typecheck` — strict TypeScript without emit

## Environment variables

All optional in dev. Site renders end-to-end with empty values; the /api/inquiry route falls back to `console.log` when no Resend or Formspree key is set.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — sitemap, OG, JSON-LD, RSS. |
| `RESEND_API_KEY` | Resend API key for the (dormant) `/api/inquiry` route. |
| `RESEND_FROM_EMAIL` | Sender for Resend transactional emails. Domain must be verified in Resend. |
| `INQUIRY_RECIPIENT` | Address that receives WorkInquiryForm submissions. |
| `FORMSPREE_INQUIRY_ENDPOINT` | Fallback for /api/inquiry when Resend is not configured. |
| `NEXT_PUBLIC_PREORDERS_LIVE` | Reveal the retailer cluster on the site. Default `false`. |
| `NEXT_PUBLIC_WORK_WITH_US_LIVE` | Reveal /work-with-us. Default `false`. See caveat in `.env.local.example`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain. Loads the script when set. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID. Loads gtag when set. |

Set exactly one analytics variable, not both.

## Routes

Static app-router pages, all prerendered at build time:

```
/                                       home
/the-book                               book details, TOC, endorsements, FAQ, retailers
/about                                  bio + selected work + honors + CTA
/speaking                               keynotes, formats, past venues, inquiries
/for-nonprofits                         workshops, sprints, coaching
/for-companies-and-funders              advisory for AI + fundraising-tech companies
/case-studies                           twelve nonprofit AI case studies
/ai-policy-template                     lead-gen landing for the AI policy template
/nonprofit-ai-use-policy-template       the printable template document itself
/press                                  press kit + interview requests
/contact                                email-first contact page
/insights                               MDX index
/insights/[slug]                        MDX post template
/work-with-us                           advisory landing (gated OFF by default + 301'd to /speaking)
/sitemap.xml, /robots.txt, /llms.txt    generated
/rss.xml                                Insights feed
/api/inquiry                            WorkInquiryForm submissions (dormant)
```

The Kit-powered Chapter 1 form and The Dispatch newsletter form are embedded from Kit's JS bundle — no email routing lives in this codebase for those flows.

## Project layout

```
src/
  app/                             App Router routes
    api/inquiry/route.ts           WorkInquiryForm handler (Resend + Formspree fallback)
    <route>/page.tsx               one per route
    layout.tsx                     fonts, JSON-LD, header, footer
    icon.svg                       favicon
    sitemap.ts, robots.ts          generated SEO files
    llms.txt/route.ts              llms.txt for AI crawlers
    rss.xml/route.ts               RSS 2.0 feed
  components/
    homepage/                      per-section homepage components
    site/                          Header, Footer, KitForm, WorkInquiryForm, Analytics, MdxComponents
    ui/                            Eyebrow, BandedStrip, ElevatedCard (design primitives)
    sections/                      per-page sections (TedxTalk on Insights)
  lib/
    site.ts                        site-wide config (title, nav, retailers, author, subjects)
    seo.ts                         buildMetadata helper
    jsonLd.ts                      Book / Person / Organization / Article schemas
    posts.ts                       MDX post loader
    bookFaq.ts, workFaq.ts         FAQ content
content/
  posts/                           MDX blog posts (gray-matter frontmatter)
public/
  images/                          author portrait, book cover, press logos, OG default
  downloads/chapter-1.pdf          public PDF served by the Kit incentive email
```

## Editorial system

- **Type:** Bricolage Grotesque (headings), Source Sans 3 (body), Newsreader italic (pull quotes). Mulish remains as a legacy fallback for any pre-P3 surface still referencing it.
- **Color tokens** (in `src/app/globals.css` and `tailwind.config.ts`): `--indigo-base #181A3A`, `--indigo-elevated #232656`, `--chartreuse #E1F64D`, `--ivory #FAF9F0`, `--on-dark`, `--on-dark-muted`, `--olive`. Sampled from the printed book cover.
- **Motion:** Framer Motion fade-up only where used; declarative CSS animations respect `prefers-reduced-motion` globally.

## Blog workflow

Posts are plain MDX files in `content/posts/`. To add a post:

1. Create `content/posts/your-slug.mdx`.
2. Frontmatter:
   ```
   ---
   title: Your title
   date: 2026-05-01
   excerpt: One-sentence summary that appears in the index and OG card.
   draft: false
   ---
   ```
3. Body in MDX. Markdown plus React components (used sparingly).
4. Save. The post appears at `/insights/your-slug` and in the `/insights` index immediately.

Set `draft: true` to keep a post out of the index and route. MDX supports GFM tables, footnotes, and autolinked headings. Custom styling is in `src/components/site/MdxComponents.tsx`.

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, **New Project** → import the repo.
3. Add environment variables from `.env.local.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Connect the custom domain (currently `aifundraisingfornonprofits.com`).

Vercel auto-detects Next.js. Builds and previews on every push to `main`.

## Accessibility

- Skip-to-main link on every page (matches `<main id="main">`)
- `:focus-visible` chartreuse outline site-wide
- Semantic landmarks (`header`, `main`, `footer`, `nav` with labels)
- WorkInquiryForm inputs have visible labels; Kit forms use their own accessible markup
- Targets WCAG 2.1 AA color contrast (known borderlines flagged in the code review log)

## Kit.com forms

Two Kit forms are embedded via the client `<KitForm>` component:

| Form | UID | Where |
| --- | --- | --- |
| Chapter 1 request | `88b1b58791` | `HomeChapter1` (homepage) |
| The Dispatch newsletter | `e504d52d42` | `Footer` (every page) |

To swap a form: log in to Kit → Grow → Landing pages & forms → select form → Publish → JavaScript, and paste the new `data-uid` and `src` into the corresponding component.
