'use client';

import { motion } from 'framer-motion';

type Reader = { role: string; description: string };

const readers: Reader[] = [
  {
    role: 'Development directors',
    description:
      'You own the number. You want to know which AI moves actually lift retention and revenue, and which are noise.',
  },
  {
    role: 'Executive directors of small and mid-sized nonprofits',
    description:
      'You do not have a technology department. You need a sequenced plan that a lean team can execute without a consulting engagement.',
  },
  {
    role: 'Major-gifts officers',
    description:
      'You want sharper signal on who is ready to upgrade, without losing the relationship craft that closes the gift.',
  },
  {
    role: 'Grant writers and grant managers',
    description:
      'You are managing more applications and tighter deadlines. You want to compress the busywork while keeping voice and accuracy.',
  },
  {
    role: 'Marketing and communications leads',
    description:
      'You want personalization at scale that does not flatten your brand or strip the human voice out of your storytelling.',
  },
  {
    role: 'Boards, funders, and consultants',
    description:
      'You want a shared frame for asking the right questions, setting policy, and judging readiness without hype.',
  },
];

export function WhoItsFor() {
  return (
    <section aria-labelledby="who-its-for" className="bg-cream-50/60">
      <div className="container-prose py-24 md:py-28">
        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Who it&rsquo;s for
          </p>
          <h2
            id="who-its-for"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
          >
            For fundraisers and nonprofit leaders who carry both responsibility and care.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
            For people who make hard decisions under pressure, hold trust as seriously as targets,
            and keep showing up for communities even when the path forward is unclear.
          </p>
        </header>

        <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:gap-x-16">
          {readers.map((r, i) => (
            <motion.li
              key={r.role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.05 }}
              className="border-t border-ink/10 pt-6"
            >
              <h3 className="text-xl font-bold leading-snug text-ink">{r.role}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/70">{r.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
