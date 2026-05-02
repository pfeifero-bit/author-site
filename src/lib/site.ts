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
    { href: '/speaking', label: 'Speaking' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
  ],
};

export type SiteConfig = typeof site;
