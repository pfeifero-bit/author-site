/**
 * Schema.org JSON-LD builders.
 *
 * AI search engines (ChatGPT, Perplexity, Claude, Gemini, Google AI
 * Overviews) lean heavily on structured data to understand a page's
 * topic, author, and authority. We expose typed builders here so the
 * shape stays consistent across the layout (site-wide schemas), the
 * book page, the about page, and individual dispatch posts.
 *
 * Convention: every helper returns a plain object that should be
 * JSON.stringify-ed and inlined inside a <script type="application/ld+json">
 * tag in the relevant page.
 */
import { site } from '@/lib/site';

const SCHEMA = 'https://schema.org';
const OG_IMAGE = `${site.url}/images/og-default.jpg`;

/**
 * Organization schema for Giving Compass — the author's "worksFor".
 * Reused inside Person and as a standalone Organization node.
 */
export function buildOrganizationSchema() {
  return {
    '@context': SCHEMA,
    '@type': 'Organization',
    '@id': `${site.url}#giving-compass`,
    name: site.author.company.name,
    url: site.author.company.url,
    description: 'A philanthropic intelligence platform that helps donors, foundations, and nonprofits make better decisions with curated knowledge and data.',
  } as const;
}

/**
 * Person schema for the author. Includes topical authority signals
 * (knowsAbout) and external identity proofs (sameAs) so AI search can
 * confirm this is the same person referenced on LinkedIn / Giving
 * Compass / book retailers.
 */
export function buildPersonSchema() {
  return {
    '@context': SCHEMA,
    '@type': 'Person',
    '@id': `${site.url}#person`,
    name: site.author.name,
    jobTitle: site.author.role,
    description: site.authorBio,
    image: OG_IMAGE,
    url: site.url,
    sameAs: [site.author.linkedin, site.author.company.url],
    worksFor: {
      '@type': 'Organization',
      '@id': `${site.url}#giving-compass`,
      name: site.author.company.name,
      url: site.author.company.url,
    },
    knowsAbout: site.topics,
  } as const;
}

/**
 * Book schema for the upcoming book. Repeats the book's description
 * (rich keywords for classification) and lists the same topical tags
 * AI engines use to slot it into the right answer surface.
 */
export function buildBookSchema() {
  return {
    '@context': SCHEMA,
    '@type': 'Book',
    '@id': `${site.url}/the-book#book`,
    name: site.bookTitle,
    alternateName: site.bookSubtitle,
    description: site.bookDescription,
    abstract: site.bookDescription,
    inLanguage: 'en',
    bookFormat: 'https://schema.org/Hardcover',
    datePublished: site.publishDate,
    url: `${site.url}/the-book`,
    image: OG_IMAGE,
    author: {
      '@type': 'Person',
      '@id': `${site.url}#person`,
      name: site.author.name,
    },
    publisher: {
      '@type': 'Person',
      name: site.author.name,
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Fundraisers, development professionals, and nonprofit leaders',
    },
    about: site.topics.map((topic) => ({ '@type': 'Thing', name: topic })),
  } as const;
}

/**
 * WebSite schema with SearchAction. This earns the Google sitelinks
 * search box and signals to AI search the canonical entry point. The
 * SearchAction url-template is wired to a hypothetical /search?q=
 * surface; even without an in-site search page the schema is still
 * valid Schema.org and AI tools use it as a discovery hint.
 */
export function buildWebSiteSchema() {
  return {
    '@context': SCHEMA,
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    name: site.bookTitle,
    alternateName: `${site.author.name} — ${site.bookTitle}`,
    url: site.url,
    description: site.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      '@id': `${site.url}#person`,
      name: site.author.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/insights?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  } as const;
}

/**
 * ProfilePage schema for /about. AI search recognizes this as the
 * authoritative profile surface for the author and uses it to confirm
 * the canonical bio when answering questions about Dale.
 */
export function buildProfilePageSchema() {
  return {
    '@context': SCHEMA,
    '@type': 'ProfilePage',
    url: `${site.url}/about`,
    name: `About ${site.author.name}`,
    description: site.authorBio,
    mainEntity: {
      '@type': 'Person',
      '@id': `${site.url}#person`,
      name: site.author.name,
      jobTitle: site.author.role,
      description: site.authorBio,
      url: site.url,
      image: OG_IMAGE,
      sameAs: [site.author.linkedin, site.author.company.url],
      knowsAbout: site.topics,
    },
  } as const;
}

/**
 * Article schema for an individual dispatch post.
 *
 * @param post  The MDX post metadata + content excerpt to summarize.
 */
export function buildArticleSchema(post: {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}) {
  const url = `${site.url}/insights/${post.slug}`;
  return {
    '@context': SCHEMA,
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt ?? site.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en',
    image: OG_IMAGE,
    author: {
      '@type': 'Person',
      '@id': `${site.url}#person`,
      name: site.author.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Person',
      name: site.author.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${site.url}#website`,
    },
  } as const;
}

/**
 * Helper to render any of the above as a <script> tag's inner content.
 * Use like:
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: jsonLdScript(buildPersonSchema()) }} />
 */
export function jsonLdScript(schema: object): string {
  // JSON.stringify is sufficient for safe embedding inside a JSON-LD
  // script tag. Next does not double-encode JSON-LD content.
  return JSON.stringify(schema);
}
