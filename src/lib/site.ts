export const site = {
  name: 'Dale Nirvani Pfeifer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com',
  bookTitle: 'AI for Nonprofit Fundraising',
  bookSubtitle: 'How to Use AI to Raise More Money, Ethically and Effectively',
  publishMonth: 'June 2026',
  publishDate: '2026-06-15', // placeholder, replace with confirmed date
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
    'Dale Nirvani Pfeifer is the CEO of Giving Compass, a philanthropic intelligence platform reaching more than two million donors annually and powering AI-enabled data infrastructure for foundations, donor-advised fund platforms, wealth advisors, and nonprofits. She is the author of AI for Nonprofit Fundraising (June 2026) and writes and speaks regularly on AI for nonprofit fundraising, AI fundraising tools, and how artificial intelligence is reshaping donor behavior and nonprofit visibility.',
  // Long-form book description used in Book.description and Book.abstract.
  // Front-loads the audience and outcomes — the AI-search-optimal pattern
  // for "is this book for me / what will I learn" queries.
  bookDescription:
    'AI for Nonprofit Fundraising is the practical guide for nonprofit CEOs, development directors, and grant writers who want to raise more money using AI. The audience will learn concrete workflows for AI grant writing, prospect research, donor communications, and impact storytelling, along with a current map of the AI fundraising tools landscape. Key takeaways include step-by-step playbooks for high-impact use cases, frameworks for measuring outcomes, and the team structures that make AI adoption stick.',
  author: {
    name: 'Dale Nirvani Pfeifer',
    role: 'CEO, Giving Compass',
    linkedin: 'https://www.linkedin.com/in/dalepfeifer/',
    company: { name: 'Giving Compass', url: 'https://givingcompass.org' },
  },
  retailers: [
    { name: 'Amazon', url: '#' },
    { name: 'Barnes & Noble', url: '#' },
    { name: 'Bookshop.org', url: '#' },
    { name: 'Audible', url: '#' },
  ],
  nav: [
    { href: '/the-book', label: 'The Book' },
    { href: '/about', label: 'About' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
  ],
};

export type SiteConfig = typeof site;
