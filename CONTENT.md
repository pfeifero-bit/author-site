# Content placeholders

Every item below is a placeholder waiting on real content. Replace as it arrives.

## Site-wide

- **Final book cover image.** The site currently uses a CSS-rendered cover that mirrors the comp\u2019s typography and color. Drop the final cover at `public/images/book-cover.jpg` and replace the `BookCover` component usages in `src/components/sections/Hero.tsx` and `src/components/sections/BookHero.tsx` with `<Image src="/images/book-cover.jpg" ... />`.
- **Author headshot (high-resolution).** Currently `public/images/author-about-primary.jpg` is in place from the previous static site. Replace with a high-resolution version when available.
- **Open Graph card.** `public/og-image.png` (1200 \u00d7 630). Composition notes in `public/og-image.placeholder.txt`.
- **Favicon set.** `public/favicon.ico`, `public/icon.png`. A simple wordmark (\u201cDP\u201d) or the cover crop both work.
- **Confirmed publish date.** Currently `April 2026` in `src/lib/site.ts` (`publishMonth` and `publishDate`). Used in the hero, the schema.org JSON-LD, and the announcement bar.
- **Retailer URLs.** Currently `#` in `src/lib/site.ts` for Amazon, Barnes & Noble, Bookshop.org, Audible. Replace with real product URLs when listings go live.
- **Designer-confirmed font and hex codes.** Mulish stands in for the cover\u2019s sans-serif (best-fit guess from the comp). When the designer confirms the actual face and exact navy + pale-blue hex, swap in `src/app/layout.tsx` and `tailwind.config.ts`.

## Home page (`src/app/page.tsx`)

Built and live:

- Hero (announcement, headline, subhead, two CTAs, by-the-author panel, retailer wordmarks)
- Pull-quote thesis from Chapter 1
- Inside the book: three case studies (Save the Children Australia, oneMESSAGE.tv, Center for Victims of Torture)
- Foreword endorsement (Meena Das)
- The first chapter, on the house: gated sample chapter capture
- Footer dispatch newsletter signup

To finalize:

- **Endorsement quotes.** Replace placeholders with confirmed endorsers as they land.
- **Sample chapter PDF.** `public/downloads/sample-chapter.pdf` was carried over from the prior static site. Confirm this is still the right sample, or swap it.

## The Book (`src/app/the-book/page.tsx`)

Built and live:

- Hero with cover, subtitle, three-paragraph positioning
- About-the-book description grounded in the manuscript
- Who it\u2019s for: six reader profiles
- Table of contents: three parts, fifteen chapters, with case-study annotations
- The first chapter, on the house: same component as the home page
- Endorsements: Meena Das featured, plus an honest grid of dashed-border placeholder slots
- Pre-order retailer cluster

To finalize:

- **Endorsement copy** for the additional cards (replace dashed placeholders with real names, titles, organizations, headshots, quotes).
- **Final retailer URLs** in `src/lib/site.ts`.

## About (`src/app/about/page.tsx`)

Built and live:

- Hero with portrait
- Five-paragraph long-form bio (Goodworld \u2192 Giving Compass \u2192 why this book \u2192 Raikes co-author)
- Selected work: three editorial-line items
- Working-together CTA with three buttons

To finalize:

- **Confirmed press list** for Selected work. The Raikes essay needs a real URL. Add or swap items with verified links.
- **Final headshot** at `public/images/author-about-primary.jpg`.

## Speaking (`src/app/speaking/page.tsx`)

Built and live:

- Hero with two CTAs
- Four named keynote topics with audience targeting
- Past Venues: eight placeholder tiles
- Inquiry form: name, email, organization, event name, event date, audience size, format, budget range, topic interest, message. Submits to `/api/inquiry`.

To finalize:

- **Past venues**: replace placeholders with logos or named events. Update `src/components/sections/PastVenues.tsx` once you have the list.
- **Topic descriptions**: tighten the four current topics if any read off-message, or add a fifth.
- **Inquiry recipient**: set `INQUIRY_RECIPIENT` in `.env.local` so submissions actually email someone.

## Insights (`src/app/insights/page.tsx`)

Built and live:

- Index page lists posts with date, title, excerpt, reading time
- Post template renders MDX with full styling
- One inaugural post: `content/posts/the-game-changed.mdx`

To finalize:

- **Inaugural post copy review.** The current post is adapted from the manuscript Introduction. If you\u2019d rather lead with something else, replace `content/posts/the-game-changed.mdx`.
- **Future posts**: drop additional `.mdx` files into `content/posts/` with the frontmatter shown in `README.md`.

## Contact (`src/app/contact/page.tsx`)

Built and live:

- Two-column layout with editorial heading and direct-link list (LinkedIn, Giving Compass, Newsletter)
- Form: name, email, subject, message. Submits to `/api/inquiry`.

To finalize:

- **LinkedIn handle**: currently `@dalepfeifer` in the direct-link list. Adjust if your handle differs.
- **PR or assistant email**: optional. Add as a fourth direct link if useful.
- **Inquiry recipient**: same as Speaking. Configure `INQUIRY_RECIPIENT` so messages actually arrive.

## Endorsement wishlist (for outreach)

Already in the book or in your circle:

- **Meena Das** (Namaste Data). Foreword author. Quote already pulled and live on the home page and Book page.
- **Jeff Raikes** (former CEO, Bill & Melinda Gates Foundation). Co-author with you on the AI bias piece.
- Featured case-study organizations: **Save the Children Australia**, **Center for Victims of Torture**, **oneMESSAGE.tv**. Their leaders may be willing to provide a line.

The site visibly improves the moment four to six named endorsements land. Until then, the Meena Das foreword pull quote leads, and the placeholder grid signals \u201cmore coming\u201d without faking it.

## Verification checklist before launch

- [ ] All retailer URLs in `src/lib/site.ts` point to real product pages.
- [ ] `INQUIRY_RECIPIENT` is set in production env.
- [ ] `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` are set.
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain.
- [ ] OG image at `public/og-image.png` exists.
- [ ] Final cover replaces the CSS placeholder in `Hero.tsx` and `BookHero.tsx`.
- [ ] Selected work links on About are real URLs, not `#`.
- [ ] Endorsement placeholders on the Book page are replaced.
- [ ] Past Venues placeholders on Speaking are replaced.
- [ ] Submitted a Speaking and Contact form yourself end-to-end and confirmed the email arrives.
