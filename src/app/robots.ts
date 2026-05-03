import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /api/* are server endpoints, not pages.
        // /speaking currently returns notFound() and should not be crawled.
        disallow: ['/api/', '/speaking'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
