import type { MetadataRoute } from 'next';
import { site, WORK_WITH_US_LIVE } from '@/lib/site';

/**
 * Robots configuration.
 *
 * The wildcard rule (userAgent: '*') already allows all bots, but we
 * also list the major AI crawlers explicitly. This serves two purposes:
 *
 *  1. Some AI bots respect ONLY their named directive — listing them
 *     explicitly with `allow: '/'` ensures they crawl with confidence
 *     and surface this site in their answer engines.
 *  2. Future-proofing: if we ever want to opt OUT of any specific bot
 *     (e.g. block AI training while still allowing AI search), the
 *     per-agent rules already exist and can be flipped to
 *     `disallow: ['/']` per bot.
 *
 * Crawlers covered:
 *   - GPTBot               OpenAI training crawler
 *   - OAI-SearchBot        OpenAI search crawler (powers ChatGPT browsing)
 *   - ChatGPT-User         OpenAI on-demand fetcher when a user clicks
 *   - ClaudeBot            Anthropic crawler
 *   - anthropic-ai         Older Anthropic identifier (still in use)
 *   - Claude-Web           Anthropic on-demand fetcher
 *   - PerplexityBot        Perplexity search/answers
 *   - Perplexity-User      Perplexity on-demand
 *   - Google-Extended      Google's AI training opt-in/out lever
 *   - Bytespider           ByteDance / Doubao
 *   - Applebot-Extended    Apple Intelligence training opt-in/out
 *   - CCBot                Common Crawl, used for many AI training sets
 *   - DuckAssistBot        DuckDuckGo's AI assistant
 *   - cohere-ai            Cohere
 *   - Diffbot              Knowledge-graph crawler used by AI tools
 *   - YouBot               You.com search/AI
 *   - Amazonbot            Amazon's web crawler (Alexa, Q)
 *   - Meta-ExternalAgent   Meta AI training crawler
 *   - Meta-ExternalFetcher Meta AI on-demand
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Bytespider',
  'Applebot-Extended',
  'CCBot',
  'DuckAssistBot',
  'cohere-ai',
  'Diffbot',
  'YouBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
];

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');

  // Disallow list:
  //   /api/*        server endpoints, not pages.
  //   /thank-you    post-conversion destination (also noindex via metadata).
  //   /work-with-us added when paused via WORK_WITH_US_LIVE flag so
  //                 crawlers do not index a 404 that may come back later.
  //                 Also 301-redirects to /speaking via next.config.mjs.
  const disallow = [
    '/api/',
    '/thank-you',
    ...(WORK_WITH_US_LIVE ? [] : ['/work-with-us']),
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      // Explicit allows for AI crawlers. Each gets its own rule so we
      // can selectively disable any one in the future without touching
      // the others.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
