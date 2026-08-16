import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  // /work-with-us is deliberately excluded regardless of the
  // WORK_WITH_US_LIVE flag: next.config.mjs unconditionally 301s that
  // route to /speaking at the CDN, so listing it in the sitemap would
  // just point crawlers at a redirect chain.
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`,                          lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/speaking`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/for-nonprofits`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/for-companies-and-funders`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/the-book`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/case-studies`,              lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/ai-policy-template`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/nonprofit-ai-use-policy-template`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/about`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/press`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/insights`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ];

  // Insights posts (MDX files in /content/posts).
  const posts = getAllPosts().map<MetadataRoute.Sitemap[number]>((post) => ({
    url: `${base}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
