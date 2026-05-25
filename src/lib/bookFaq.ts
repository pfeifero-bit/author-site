/**
 * FAQ content for the book page. Surfaced both as visible content (so
 * humans can read it) and as FAQPage JSON-LD (so AI search engines and
 * Google can cite individual Q&A pairs).
 *
 * AI-search optimization notes:
 * - Each question is phrased the way a real person would ask it.
 *   AI engines match user queries against `name` directly.
 * - Answers front-load the keyword phrase the question is asking
 *   about, then expand. This is the "answer engine" pattern that
 *   tends to get cited verbatim.
 * - Answers are 50-120 words. Long enough to be substantive, short
 *   enough to be quoted in full by AI tools without truncation.
 *
 * Edit freely as the book and Dale's positioning evolve. Order shown
 * here is the order the FAQ renders on the page.
 */
export const bookFaq = [
  {
    question: 'What is Artificial Intelligence for Nonprofit Fundraising about?',
    answer:
      'Artificial Intelligence for Nonprofit Fundraising is a practical guide to using AI fundraising tools and workflows to raise more money, work more efficiently, and engage donors more effectively. The book covers AI grant writing, prospect research, donor communications, impact storytelling, and the operational shifts development teams need to make to integrate AI responsibly into their fundraising work.',
  },
  {
    question: 'Who is the book for?',
    answer:
      'The audience for this book is nonprofit CEOs, chief development officers, fundraisers, grant writers, and operations leaders at organizations of any size. It is also useful for foundation program officers, philanthropic advisors, and consultants who want to understand how AI for nonprofit fundraising is reshaping the sector.',
  },
  {
    question: 'What workflow shifts does the book cover?',
    answer:
      'The book addresses how AI changes daily fundraising work, including AI-powered prospect research, donor segmentation, drafting and personalizing donor communications at scale, AI grant writing for foundation and federal proposals, building impact storytelling pipelines, and using AI for CRM data hygiene. Key takeaways include practical playbooks for each workflow and frameworks for restructuring team roles around AI capabilities.',
  },
  {
    question: 'What AI fundraising tools does the book cover?',
    answer:
      'The book reviews the current AI fundraising tools landscape as of 2026, including general-purpose tools like ChatGPT and Claude, specialized AI grant writing platforms, donor research tools, predictive AI for major gift identification, and CRM-integrated AI features. Appendix 2 provides a comprehensive directory of the AI fundraising platform landscape with use cases and price points.',
  },
  {
    question: 'Does the book require technical expertise?',
    answer:
      'No. The book is written for nonprofit and fundraising leaders without technical backgrounds. It explains core AI concepts in plain language, focuses on AI fundraising tools that are already accessible to nonprofits, and provides step-by-step examples any development team can implement immediately.',
  },
  {
    question: 'When does the book publish?',
    answer:
      'Artificial Intelligence for Nonprofit Fundraising publishes in June 2026.',
  },
  {
    question: 'Who is the author?',
    answer:
      'The book is written by Dale Nirvani Pfeifer, CEO of Giving Compass, a philanthropic intelligence platform serving more than two million donors annually. Pfeifer leads enterprise partnerships across foundations, donor-advised fund platforms, and wealth advisory firms, and writes and speaks regularly on AI for nonprofit fundraising and the future of philanthropy.',
  },
  {
    question: 'How is this book different from other AI books for nonprofits?',
    answer:
      "This book focuses specifically on AI for nonprofit fundraising rather than general AI adoption across the sector. It is grounded in operational outcomes from building AI-enabled philanthropic infrastructure, drawing on real performance data from Giving Compass's AI search products and enterprise partnerships with foundations and DAF platforms. Every recommendation ties back to outcomes a development team can measure: dollars raised, hours saved, conversion improved.",
  },
] as const;

export type BookFaqEntry = (typeof bookFaq)[number];
