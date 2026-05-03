export const site = {
  name: 'Dale Nirvani Pfeifer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com',
  bookTitle: 'Artificial Intelligence for Nonprofit Fundraising',
  bookSubtitle: 'How to Use AI to Raise More Money, Ethically and Effectively',
  publishMonth: 'June 2026',
  publishDate: '2026-06-15', // placeholder, replace with confirmed date
  description:
    'A practical playbook for nonprofit leaders ready to use AI to raise more, work smarter, and stay deeply human. By Dale Nirvani Pfeifer, CEO of Giving Compass.',
  tagline: 'Use AI to stay human under pressure.',
  // Used for Book.about and Person.knowsAbout in JSON-LD. These are
  // topical authority signals that AI search engines and Google use to
  // map this site to the right query categories. Edit when expertise
  // scope shifts.
  topics: [
    'Artificial intelligence in philanthropy',
    'Nonprofit fundraising',
    'AI ethics for nonprofits',
    'Donor trust and transparency',
    'Fundraising operations',
    'Major gifts strategy',
    'Generative AI in development work',
    'Fundraiser judgment and decision-making',
  ],
  // Short author bio used in Person schema description. Keep under
  // ~320 chars so it renders well in AI-search snippet previews.
  authorBio:
    'Dale Nirvani Pfeifer is the CEO of Giving Compass, a philanthropic intelligence platform. She co-founded Goodworld, the technology behind the #donate hashtag, and writes on AI and philanthropy with leaders including Jeff Raikes, former CEO of the Gates Foundation.',
  // Longer book description for Book.description and the FAQ-adjacent
  // schema. Repeats key terms AI search uses to classify the work.
  bookDescription:
    'Artificial Intelligence for Nonprofit Fundraising is a practical playbook for fundraisers and nonprofit leaders. It explains how to use generative AI to raise more money ethically, build deeper donor trust, and protect the judgment-driven craft at the heart of fundraising. Covers prospect research, donor communication, major gift strategy, and AI-era ethics.',
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
