'use client';

import { motion } from 'framer-motion';

type Item = {
  kind: string;
  title: string;
  outlet: string;
  year: string;
  href: string;
};

const items: Item[] = [
  {
    kind: 'Essay',
    title: 'Reducing AI Bias: A Path Forward',
    outlet: 'Fidelity Charitable, with Jeff Raikes',
    year: '2024',
    href: 'https://www.fidelitycharitable.org/articles/reducing-ai-bias.html',
  },
  {
    kind: 'Book',
    title: 'Artificial Intelligence for Nonprofit Fundraising',
    outlet: 'Independently published',
    year: '2026',
    href: '/the-book',
  },
  {
    kind: 'Talk',
    title: 'Use AI to Stay Human Under Pressure',
    outlet: 'Keynote on judgment, trust, and fundraising at scale',
    year: 'Available now',
    href: '/speaking',
  },
];

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work" className="bg-cream-50/60">
      <div className="container-prose py-20 md:py-24">
        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Selected work
          </p>
          <h2
            id="selected-work"
            className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.5rem]"
          >
            Writing and speaking on AI and philanthropy.
          </h2>
        </header>

        <ul className="mt-12">
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="border-t border-ink/10 last:border-b"
            >
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group grid grid-cols-[5rem_1fr_auto] items-baseline gap-6 py-6 text-ink transition hover:bg-ink/[0.02] md:grid-cols-[6rem_1fr_8rem_3rem] md:py-7"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-ink/65">
                  {item.kind}
                </span>
                <span className="text-lg font-bold leading-snug md:text-xl">{item.title}</span>
                <span className="hidden text-sm text-ink/70 md:block">{item.outlet}</span>
                <span className="text-right text-sm text-ink/70 transition group-hover:text-accent-600">
                  <span className="md:hidden">{item.year}</span>
                  <span aria-hidden className="hidden md:inline">{item.year} &rarr;</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
