import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  // Top-level pages. /speaking is intentionally excluded — that route
  // currently returns notFound() and is marked noindex (see
  // src/app/speaking/page.tsx). Add it back here when the speaking
  // page is restored.
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`,         lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/the-book`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
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
