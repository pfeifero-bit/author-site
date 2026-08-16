// Feature flag: when true, /work-with-us is reachable and surfaces in
// nav, sitemap, llms.txt, and the /about CTA. When false (default),
// the page returns notFound(), the route is excluded from sitemaps,
// disallowed in robots.txt, hidden from nav, and the /about CTA falls
// back to the original two-button layout. Flip via Vercel env var:
// NEXT_PUBLIC_WORK_WITH_US_LIVE=true (then redeploy).
export const WORK_WITH_US_LIVE =
  process.env.NEXT_PUBLIC_WORK_WITH_US_LIVE === 'true';

export const site = {
  name: 'Dale Nirvani Pfeifer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com',
  bookTitle: 'Artificial Intelligence for Nonprofit Fundraising',
  bookSubtitle: 'How to Use AI to Raise More Money, Ethically and Effectively',
  publishMonth: 'June 2026',
  publishDate: '2026-06-21',
  description:
    'A practical playbook for nonprofit leaders ready to use AI to raise more, work smarter, and stay deeply human. By Dale Nirvani Pfeifer, CEO of Giving Compass.',
  tagline: 'Use AI to stay human under pressure.',
  // Used for Person.knowsAbout in JSON-LD. These are topical authority
  // signals that AI search engines and Google use to map the AUTHOR to
  // the right query categories. Editing this list shifts the topics
  // ChatGPT/Perplexity/etc. cite Dale on. Curated for keyword density
  // around AI fundraising specifically.
  topics: [
    'AI for nonprofit fundraising',
    'AI fundraising tools',
    'AI grant writing',
    'Artificial intelligence in philanthropy',
    'Nonprofit fundraising strategy',
    'Donor education',
    'Philanthropic data infrastructure',
    'AI-powered prospect research',
    'Predictive AI for major gift identification',
    'Donor segmentation',
    'Donor engagement',
    'Foundation strategy',
    'Donor-advised funds',
    'Enterprise partnerships in philanthropy',
    'Embedded data infrastructure for giving platforms',
    'Impact measurement',
    'AI for social impact',
    'Philanthropic intelligence',
    'Nonprofit technology',
    'Future of nonprofit fundraising',
  ],
  // Used for Book.about in JSON-LD. Shorter, more focused than `topics`
  // — these are the categories the BOOK itself slots into. Keep tight
  // so AI search confidently classifies the book under these queries.
  bookTopics: [
    'AI for nonprofit fundraising',
    'AI fundraising tools',
    'AI grant writing',
    'Nonprofit fundraising',
    'Artificial intelligence',
    'Donor engagement',
    'Prospect research',
    'Philanthropy',
  ],
  // Audience description used in Book.audience.audienceType. Kept as
  // a single comma-joined string so AI search can match against role
  // queries like "best AI fundraising book for development directors."
  bookAudience:
    'Nonprofit CEOs, development directors, grant writers, fundraisers, foundation program officers, philanthropic advisors',
  // Author bio used in Person.description. Mentions concrete reach
  // numbers and partner categories so AI search has factual hooks to
  // cite. Aim for ~600 chars — long enough for substance, short
  // enough to render fully in snippet previews.
  authorBio:
    'Dale Nirvani Pfeifer is the CEO of Giving Compass, a philanthropic intelligence platform reaching more than two million donors annually and powering AI-enabled data infrastructure for foundations, donor-advised fund platforms, wealth advisors, and nonprofits. She is the author of Artificial Intelligence for Nonprofit Fundraising (June 2026) and writes and speaks regularly on AI for nonprofit fundraising, AI fundraising tools, and how artificial intelligence is reshaping donor behavior and nonprofit visibility.',
  // Long-form book description used in Book.description and Book.abstract.
  // Front-loads the audience and outcomes — the AI-search-optimal pattern
  // for "is this book for me / what will I learn" queries.
  bookDescription:
    'Artificial Intelligence for Nonprofit Fundraising is the practical guide for nonprofit CEOs, development directors, and grant writers who want to raise more money using AI. The audience will learn concrete workflows for AI grant writing, prospect research, donor communications, and impact storytelling, along with a current map of the AI fundraising tools landscape. Key takeaways include step-by-step playbooks for high-impact use cases, frameworks for measuring outcomes, and the team structures that make AI adoption stick.',
  author: {
    name: 'Dale Nirvani Pfeifer',
    role: 'CEO, Giving Compass',
    linkedin: 'https://www.linkedin.com/in/dale-pfeifer/',
    company: { name: 'Giving Compass', url: 'https://givingcompass.org' },
  },
  // Only Amazon has a live retail URL today. When BN / Bookshop.org /
  // Audible go live, add them here — every component that renders
  // retailers filters this list, so partial coverage is fine.
  retailers: [
    { name: 'Amazon', url: 'https://www.amazon.com/dp/B0H5TKL95T' },
  ],
  /**
   * Primary header nav. Order matches the handoff spec: audience-first
   * (For Nonprofits) before topic (Speaking, The Book) before resource
   * (AI Policy Template) before Contact. /about and /insights are still
   * indexed but live in the footer rather than the primary header nav.
   */
  nav: [
    { href: '/for-nonprofits',    label: 'For Nonprofits' },
    { href: '/speaking',          label: 'Speaking' },
    { href: '/the-book',          label: 'The Book' },
    { href: '/ai-policy-template', label: 'AI Policy Template' },
    { href: '/contact',           label: 'Contact' },
    // /work-with-us is only surfaced in nav when the live flag is on.
    // In every other case the route 301-redirects to /speaking.
    ...(WORK_WITH_US_LIVE ? [{ href: '/work-with-us', label: 'Work with us' }] : []),
  ],

  /**
   * Full site link map used in the footer. Broader than `nav` on
   * purpose — footer surfaces every page (including About, Case
   * Studies, and For Companies & Funders that aren't in the header).
   */
  footerNav: {
    site: [
      { href: '/speaking',                  label: 'Speaking' },
      { href: '/for-nonprofits',            label: 'For Nonprofits' },
      { href: '/for-companies-and-funders', label: 'For Companies & Funders' },
      { href: '/the-book',                  label: 'The Book' },
      { href: '/case-studies',              label: 'Case Studies' },
      { href: '/ai-policy-template',        label: 'AI Policy Template' },
      { href: '/about',                     label: 'About' },
      { href: '/contact',                   label: 'Contact' },
    ],
    connect: [
      { href: 'https://www.linkedin.com/in/dale-pfeifer/', label: 'LinkedIn',        external: true },
      { href: 'https://givingcompass.org',                label: 'Giving Compass',  external: true },
      { href: '/press',                                   label: 'Press & Media',   external: false },
      { href: 'https://www.amazon.com/dp/B0H5TKL95T',     label: 'Buy on Amazon',   external: true },
    ],
  },

  /**
   * Contact channel used by every mailto CTA introduced in P3/P4.
   * `subjects` are the triage labels documented in the handoff so all
   * inbound mail is routable to the right pile.
   */
  contact: {
    email: 'dale@aifundraisingfornonprofits.com',
    subjects: {
      speaking:     'Speaking enquiry',
      nonprofit:    'Nonprofit program enquiry',
      advisory:     'Advisory enquiry',
      contact:      'Website contact',
      bulk:         'Bulk book order inquiry',
      aiPolicy:     'AI policy template request',
    },
  },

  /**
   * Foreword endorsements. Sourced from the printed paperback wrap and
   * from the handoff brief. Reused across /for-nonprofits and
   * /for-companies-and-funders (both surface the same three names) and
   * kept here so the wording stays consistent.
   */
  endorsements: [
    {
      quote:
        'A practical and ethical approach that fundraisers need right now.',
      name: 'Beth Kanter',
      title: 'Co-Author, The Smart Nonprofit',
    },
    {
      quote:
        'Teams that follow her advice on governance and keeping humans in the loop will raise more while keeping trust.',
      name: 'Jim Fruchterman',
      title: 'Founder, Tech Matters',
    },
    {
      quote:
        'A practical, honest, and deeply human guide for leaders who know AI is here but aren’t sure where to start.',
      name: 'Victoria Vrana',
      title: 'CEO, GlobalGiving',
    },
  ],
};

/**
 * Helper: build a mailto: URL with a URL-encoded subject line.
 *
 * Every CTA on the new site — speaking, program, advisory, chapter 1,
 * AI-policy template, general contact, dispatch subscribe — routes to
 * dale@aifundraisingfornonprofits.com with a per-topic subject so the
 * mailbox is triageable at a glance.
 */
export function mailto(subject: keyof typeof site.contact.subjects): string {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(
    site.contact.subjects[subject],
  )}`;
}

export type SiteConfig = typeof site;
