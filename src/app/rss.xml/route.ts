import { NextResponse } from 'next/server';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

/**
 * RSS 2.0 feed at /rss.xml.
 *
 * Why this matters:
 * 1. AI assistants (ChatGPT plugins, Perplexity, custom GPTs) often
 *    consume RSS to monitor sites for new content; an RSS feed makes
 *    this site eligible for those integrations.
 * 2. Traditional readers and aggregators (Feedly, Inoreader, NetNewsWire)
 *    still drive a meaningful share of dispatch readership for niche
 *    publications.
 * 3. Many newsletter platforms (Substack, Beehiiv, Buttondown) accept
 *    RSS as a syndication source if Dale ever wants to mirror posts
 *    elsewhere.
 *
 * Served as application/rss+xml so feed readers auto-detect.
 */

export const dynamic = 'force-static';

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss(): string {
  const posts = getAllPosts();
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${site.url}/insights/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const description = post.excerpt
        ? escapeXml(post.excerpt)
        : escapeXml(`${post.title} — a dispatch from ${site.author.name}.`);
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${description}</description>`,
        `      <author>${escapeXml(site.author.name)}</author>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.bookTitle} — Dispatch`)}</title>
    <link>${site.url}/insights</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(`Field notes on AI and philanthropy by ${site.author.name}.`)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>noreply@aifundraisingfornonprofits.com (${escapeXml(site.author.name)})</managingEditor>
    <webMaster>noreply@aifundraisingfornonprofits.com (${escapeXml(site.author.name)})</webMaster>
${items}
  </channel>
</rss>`;
}

export function GET() {
  return new NextResponse(buildRss(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
