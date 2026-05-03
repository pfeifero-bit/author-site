// Shared metadata helpers. Next.js does NOT deep-merge openGraph or
// twitter objects between a layout and a page — when a page sets its own
// openGraph object it fully replaces the layout's. So images, locale,
// siteName, etc. need to be re-included on every per-page openGraph.
// These helpers do that consistently.

import type { Metadata } from 'next';
import { site } from './site';

export const OG_IMAGE = {
  url: '/images/og-default.jpg',
  width: 1200,
  height: 630,
  alt: site.bookTitle,
};

export const OG_IMAGE_URL = OG_IMAGE.url;

type BuildArgs = {
  title: string;
  description: string;
  url: string;
  /** Defaults to 'website'. Use 'book' for /the-book, 'profile' for /about, 'article' for posts. */
  ogType?: 'website' | 'book' | 'profile' | 'article';
  /** Optional override for the social image URL. Defaults to the site OG image. */
  imageUrl?: string;
  /** Extra openGraph fields (e.g. publishedTime for articles). */
  openGraphExtras?: Record<string, unknown>;
};

/**
 * Build a complete Metadata object with title, description, canonical,
 * openGraph, and twitter all populated consistently.
 */
export function buildMetadata({
  title,
  description,
  url,
  ogType = 'website',
  imageUrl,
  openGraphExtras = {},
}: BuildArgs): Metadata {
  const image = imageUrl
    ? { url: imageUrl, width: 1200, height: 630, alt: title }
    : OG_IMAGE;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: ogType,
      siteName: site.author.name,
      locale: 'en_US',
      images: [image],
      ...openGraphExtras,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}
