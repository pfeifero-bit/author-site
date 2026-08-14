import type { Metadata } from 'next';
import { Mulish, Bricolage_Grotesque, Source_Sans_3, Newsreader } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Analytics } from '@/components/site/Analytics';
import { site } from '@/lib/site';
import {
  buildOrganizationSchema,
  buildPersonSchema,
  buildBookSchema,
  buildWebSiteSchema,
  jsonLdScript,
} from '@/lib/jsonLd';

/* LEGACY (Mulish) — still used by pre-P3 pages via `font-sans` /
 * `font-display` in tailwind.config.ts. Remove once P3-P7 migrate all
 * surfaces to the new type system below. */
const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

/* NEW TYPE SYSTEM (P2, from handoff brief).
 * Three families, referenced via CSS vars set on <html>. Each `variable`
 * matches the `fontFamily` entry in tailwind.config.ts so a component
 * can use `font-heading`, `font-body`, or `font-serif-italic`.
 *
 * All three are Google Fonts. `display: swap` shows a fallback until
 * the webfont downloads, avoiding a FOIT. `preload: false` on the
 * legacy Mulish means we don't preload two body-font stacks at once.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['italic'],
  weight: ['400', '500'],
});

// Site-wide social-share card. Generated typographic OG image at
// /public/images/og-default.jpg (1200 x 630). Replace if a final
// designed version is produced.
const OG_IMAGE = '/images/og-default.jpg';

// Site-wide metadata defaults. Every page MUST set its own title,
// description, openGraph.title/description/url, twitter.title/description,
// and alternates.canonical. The defaults below act as a safety net only.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    absolute: `${site.bookTitle} | ${site.author.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.author.name,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: site.bookTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: site.url,
    // Auto-discovery for RSS feed readers and AI aggregators that look
    // for <link rel="alternate" type="application/rss+xml"> in <head>.
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: `${site.bookTitle} — Dispatch` },
      ],
    },
  },
};

// Site-wide structured data. Builders live in src/lib/jsonLd.ts so all
// pages reference the same canonical schema shapes (and the same @id
// references for cross-linking, e.g. an Article on /insights/[slug]
// authored by the same Person node defined here).
const personSchema = buildPersonSchema();
const bookSchema = buildBookSchema();
const webSiteSchema = buildWebSiteSchema();
const organizationSchema = buildOrganizationSchema();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${bricolage.variable} ${sourceSans.variable} ${newsreader.variable}`}
    >
      <body className="font-sans bg-cream text-ink antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        {/* JSON-LD structured data. Order does not matter to crawlers but
            we group by domain — site, then author, then product. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(bookSchema) }}
        />
      </body>
    </html>
  );
}
