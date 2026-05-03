import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Analytics } from '@/components/site/Analytics';
import { site } from '@/lib/site';

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
  alternates: { canonical: site.url },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.author.name,
  jobTitle: site.author.role,
  worksFor: {
    '@type': 'Organization',
    name: site.author.company.name,
    url: site.author.company.url,
  },
  url: site.url,
  sameAs: [site.author.linkedin, site.author.company.url],
};

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: site.bookTitle,
  alternateName: site.bookSubtitle,
  author: { '@type': 'Person', name: site.author.name },
  bookFormat: 'https://schema.org/Hardcover',
  inLanguage: 'en',
  datePublished: site.publishDate,
  publisher: { '@type': 'Person', name: site.author.name },
  url: `${site.url}/the-book`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className="font-sans bg-cream text-ink antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
        />
      </body>
    </html>
  );
}
