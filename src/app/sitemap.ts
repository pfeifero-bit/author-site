import type { MetadataRoute } from 'next';
import { site, WORK_WITH_US_LIVE } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`,                          lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/speaking`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/for-nonprofits`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/for-companies-and-funders`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/the-book`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/case-studies`,              lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/ai-policy-template`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/nonprofit-ai-use-policy-template`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    // /work-with-us only listed when the live flag is on. Otherwise the
    // route returns 404 (or 301s to /speaking per next.config.mjs), and
    // its indexed-URL history is preserved via the 301 chain.
    ...(WORK_WITH_US_LIVE
      ? [{ url: `${base}/work-with-us`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.85 }]
      : []),
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
