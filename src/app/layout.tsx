import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
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

// Single family across display and body, matching the book cover.
// If the designer used Manrope, Plus Jakarta Sans, or Hanken Grotesk
// instead, swap the import and the variable name in tailwind.config.ts.
const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
    <html lang="en" className={mulish.variable}>
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
