'use client';

import { motion } from 'framer-motion';

type Topic = {
  number: string;
  title: string;
  description: string;
  audiences: string;
};

const topics: Topic[] = [
  {
    number: '01',
    title: 'Use AI to Stay Human Under Pressure',
    description:
      'The central argument of the book. Why judgment, not automation, is becoming the differentiator in fundraising, and what to protect as AI gets embedded into your stack.',
    audiences: 'Conference keynote. Foundation boards. All-hands.',
  },
  {
    number: '02',
    title: 'AI for the Two-Person Development Team',
    description:
      'A working playbook for under-resourced teams. The smallest set of moves that lift retention, reactivate lapsed donors, and compress grant work, without a tech department.',
    audiences: 'Practitioner workshops. Regional conferences.',
  },
  {
    number: '03',
    title: 'Building Donor Trust as You Scale',
    description:
      'Personalization at scale done well strengthens relationships. Done poorly, it erodes trust faster than it builds. Practical guardrails from the field on disclosure, oversight, and ethics.',
    audiences: 'CDO and ED forums. Board education sessions.',
  },
  {
    number: '04',
    title: 'The Three Workflow Shifts Redefining Fundraising',
    description:
      'Data to insight in minutes. Insight to action at scale. Action to system to strategy. A framework for thinking about where AI fits in your team\u2019s decisions and where it does not.',
    audiences: 'Strategy offsites. CRM and platform user conferences.',
  },
];

export function SpeakingTopics() {
  return (
    <section aria-labelledby="topics" className="container-prose py-24 md:py-28">
      <header className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
          Topics
        </p>
        <h2
          id="topics"
          className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
        >
          Four working keynotes. Each one has been delivered, refined, and tightened.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
          Customizations welcome. If your audience needs a slightly different cut, say so in the
          inquiry form below and Dale will adapt the talk to your context, sector, and budget.
        </p>
      </header>

      <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:gap-x-16">
        {topics.map((t, i) => (
          <motion.li
            key={t.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.05 }}
            className="border-t border-ink/10 pt-6"
          >
            <p className="font-mono text-xs font-semibold tracking-widest text-accent-on-cream">
              {t.number}
            </p>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-[1.65rem]">
              {t.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink/75">{t.description}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-ink/65">
              Best fit. <span className="font-medium normal-case tracking-normal text-ink/75">{t.audiences}</span>
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
