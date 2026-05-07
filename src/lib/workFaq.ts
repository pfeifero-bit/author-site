/**
 * FAQ content for the /work-with-us advisory page. Surfaced both as
 * visible content (humans read it) and as FAQPage JSON-LD (AI search
 * engines and Google can cite individual Q&A pairs verbatim).
 *
 * Tone: first-person, direct. No em dashes. No throat-clearing. Each
 * answer opens with a sentence that directly addresses the question.
 *
 * This list mirrors the content brief approved by Dale. Edit as the
 * advisory practice evolves; the FAQPage schema regenerates from this
 * data on every build.
 */
export const workFaq = [
  {
    question: 'What does an advisory engagement actually look like?',
    answer:
      'Most engagements start with a two-week diagnostic: a review of your current fundraising operation, donor data, tool stack, team capacity, and one or two priority use cases. From there we agree on a 90-day or six-month plan with named deliverables. You will know exactly what is being decided, by whom, and when.',
  },
  {
    question: 'How long does a typical engagement run?',
    answer:
      'Advisory engagements run three to six months, occasionally extending to a senior advisor retainer for foundations or platforms with a longer build cycle.',
  },
  {
    question: 'How is this different from a generative AI workshop?',
    answer:
      "Most AI workshops teach prompt writing. This work starts from the fundraising P&L and works backward. The goal is not for your team to use ChatGPT more often. The goal is to identify the two or three workflows where AI changes your unit economics, and to build those out responsibly.",
  },
  {
    question: 'What size organizations do you work with?',
    answer:
      'Engagements range from $1M to $500M in annual revenue, plus foundations, DAF platforms, and advisor firms. The common thread is leadership that takes both fundraising performance and donor trust seriously.',
  },
  {
    question: 'Do you also speak and run workshops?',
    answer:
      'Yes. Keynotes and team workshops are available alongside advisory work. Use the contact form below and tell me what you are looking for.',
  },
  {
    question: 'Do you work with vendors or only nonprofits?',
    answer:
      'Both. I advise a small number of philanthropy platforms, fintechs, and foundation-backed initiatives where the work is genuinely useful to the field. Engagements are conducted independently of my role at Giving Compass. Any potential conflicts are disclosed in writing at engagement start.',
  },
  {
    question: 'How do you handle donor data and ethics?',
    answer:
      'Donor data does not leave your environment without a written agreement. Ethics is treated as an operational discipline, not a values statement, with named decisions about consent, transparency, model use, and human oversight. Every engagement produces a written AI use policy your board can review.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Use the contact form below or email directly. Briefly describe your organization, what you are trying to decide, and your rough timeline. You will hear back within three business days.',
  },
] as const;

export type WorkFaqEntry = (typeof workFaq)[number];
