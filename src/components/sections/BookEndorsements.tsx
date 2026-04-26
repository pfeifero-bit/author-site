'use client';

import { motion } from 'framer-motion';

type Endorser = {
  initials: string;
  name: string;
  title: string;
  quote: string;
};

const featured: Endorser = {
  initials: 'MD',
  name: 'Meena Das',
  title: 'Founder & CEO, Namaste Data. Foreword author.',
  quote:
    'This book invites us to co-dream a world where AI, used wisely, can return our attention to what has always been the most human aspect of fundraising: connection, trust, and storytelling. Can AI help us stay human in the work that matters most? This book answers that question with a resounding yes.',
};

const placeholders: Endorser[] = Array.from({ length: 5 }).map(() => ({
  initials: '',
  name: '',
  title: '',
  quote: '',
}));

export function BookEndorsements() {
  return (
    <section aria-labelledby="endorsements" className="bg-cream-50/60">
      <div className="container-prose py-24 md:py-32">
        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Endorsements
          </p>
          <h2
            id="endorsements"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
          >
            Early readers, in their own words.
          </h2>
        </header>

        {/* Featured */}
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
            From the foreword
          </p>
          <blockquote className="mt-5 text-balance text-2xl font-light leading-[1.35] text-ink md:text-[1.75rem] md:leading-[1.3]">
            {featured.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div
              aria-hidden
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-bold text-cream"
            >
              {featured.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{featured.name}</p>
              <p className="text-sm text-ink/75">{featured.title}</p>
            </div>
          </figcaption>
        </motion.figure>

        {/* Placeholder grid for endorsements still to land */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Endorsements forthcoming
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((_, i) => (
              <li
                key={i}
                className="flex h-40 flex-col justify-between rounded-md border border-dashed border-ink/15 bg-cream p-5 text-ink/55"
                aria-hidden
              >
                <span className="font-mono text-xs uppercase tracking-widest">
                  Endorsement {String(i + 2).padStart(2, '0')}
                </span>
                <div>
                  <span className="block h-2 w-2/3 rounded-sm bg-ink/10" />
                  <span className="mt-2 block h-2 w-1/2 rounded-sm bg-ink/10" />
                  <span className="mt-4 block h-2 w-1/3 rounded-sm bg-ink/10" />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink/70">
            Foundation leaders, fundraisers, and AI-and-philanthropy researchers are reviewing
            the manuscript now. Endorsements appear here as they are confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
