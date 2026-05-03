'use client';

import { motion } from 'framer-motion';

export function Endorsement() {
  return (
    <section aria-labelledby="endorsement" className="container-prose py-16 md:py-20">
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
          From the foreword
        </p>

        <blockquote
          id="endorsement"
          className="mt-6 text-balance text-3xl font-light leading-[1.25] text-ink md:text-[2.25rem] md:leading-[1.2]"
        >
          Can AI help us stay human in the work that matters most? This book answers
          that question with a{' '}
          <span className="font-extrabold text-accent-on-cream">resounding yes</span>.
        </blockquote>

        <figcaption className="mt-8 flex items-center gap-4">
          <div
            aria-hidden
            className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-bold text-cream"
          >
            MD
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Meena Das</p>
            <p className="text-sm text-ink/75">
              Founder &amp; CEO, Namaste Data. Foreword author.
            </p>
          </div>
        </figcaption>
      </motion.figure>
    </section>
  );
}
