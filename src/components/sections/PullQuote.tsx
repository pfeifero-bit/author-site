'use client';

import { motion } from 'framer-motion';

export function PullQuote() {
  return (
    <section aria-labelledby="thesis" className="container-prose py-16 md:py-20">
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
          The thesis
        </p>
        <blockquote
          id="thesis"
          className="mt-5 font-light text-3xl leading-[1.2] text-balance text-ink md:text-[2.5rem] md:leading-[1.15]"
        >
          AI did not change fundraising because it made tasks faster.
          It changed fundraising because it changed where{' '}
          <span className="font-extrabold text-accent-on-cream">judgment</span> lives.
        </blockquote>
        <figcaption className="mt-6 text-sm text-ink/70">
          From Chapter 1, <span className="font-medium">Why Judgment Is Becoming the Differentiator</span>.
        </figcaption>
      </motion.figure>
    </section>
  );
}
