import { NextResponse } from 'next/server';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/posts';

/**
 * /llms.txt — emerging standard published at https://llmstxt.org for
 * making sites discoverable and digestible to large language models.
 *
 * Spec at the time of writing: a Markdown file at /llms.txt with a
 * top-level H1 (the site/project name), a one-line summary, optional
 * notes/quote block, and one or more H2 sections each listing curated
 * links in plain Markdown.
 *
 * AI search engines (ChatGPT, Perplexity, Claude, Gemini) increasingly
 * fetch this URL to build a fast, accurate model of the site without
 * crawling every page. We hand them the site's elevator pitch, the
 * canonical book and author surfaces, and an index of dispatch posts.
 *
 * Served as text/markdown (per spec) — not text/plain, because the
 * content is structured Markdown that LLMs parse semantically.
 */

export const dynamic = 'force-static';

function buildLlmsTxt(): string {
  const posts = getAllPosts();

  const lines: string[] = [];
  lines.push(`# ${site.bookTitle}`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push(
    `This site is the official home of *${site.bookTitle}* (${site.bookSubtitle}) by ${site.author.name}, ${site.author.role}. Publishing ${site.publishMonth}.`,
  );
  lines.push('');
  lines.push(`Author bio: ${site.authorBio}`);
  lines.push('');

  lines.push('## Core pages');
  lines.push('');
  lines.push(`- [Home](${site.url}/): Overview, free Chapter 1 download, author bio.`);
  lines.push(`- [The Book](${site.url}/the-book): Book details, sample chapter, key topics.`);
  lines.push(`- [About](${site.url}/about): Full bio of ${site.author.name}.`);
  lines.push(`- [Insights](${site.url}/insights): Field notes on AI and philanthropy.`);
  lines.push(`- [Contact](${site.url}/contact): Speaking, advisory, and press inquiries.`);
  lines.push('');

  lines.push('## Topics covered');
  lines.push('');
  for (const topic of site.topics) {
    lines.push(`- ${topic}`);
  }
  lines.push('');

  if (posts.length > 0) {
    lines.push('## Dispatch posts');
    lines.push('');
    for (const post of posts) {
      const summary = post.excerpt ? `: ${post.excerpt}` : '';
      lines.push(`- [${post.title}](${site.url}/insights/${post.slug})${summary}`);
    }
    lines.push('');
  }

  lines.push('## Free chapter');
  lines.push('');
  lines.push(
    `Chapter 1 of *${site.bookTitle}* is available as a free PDF: ${site.url}/downloads/chapter-1.pdf`,
  );
  lines.push('');
  lines.push(
    `Visitors can request the chapter via the homepage form, which delivers it by email and adds them to the monthly dispatch list.`,
  );
  lines.push('');

  lines.push('## About the author');
  lines.push('');
  lines.push(`- Name: ${site.author.name}`);
  lines.push(`- Role: ${site.author.role}`);
  lines.push(`- Company: ${site.author.company.name} (${site.author.company.url})`);
  lines.push(`- LinkedIn: ${site.author.linkedin}`);
  lines.push('');

  return lines.join('\n');
}

export function GET() {
  return new NextResponse(buildLlmsTxt(), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
