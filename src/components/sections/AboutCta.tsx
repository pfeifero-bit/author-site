'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WORK_WITH_US_LIVE } from '@/lib/site';

export function AboutCta() {
  return (
    <section aria-labelledby="about-cta" className="container-prose py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2
          id="about-cta"
          className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
        >
          Working together.
        </h2>
        {/* Body copy adapts to whether /work-with-us is live: when on,
            we promote the dedicated advisory surface; when paused, we
            fall back to the original two-CTA framing. */}
        {WORK_WITH_US_LIVE ? (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
            The most useful next step depends on where you are. The book is the
            deepest answer. For advisory, speaking, and workshops, head to{' '}
            <Link
              href="/work-with-us"
              className="font-medium text-ink underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-accent-on-cream"
            >
              Work with us
            </Link>
            . The contact form is open for everything else.
          </p>
        ) : (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
            The most useful next step depends on where you are. The book is the deepest answer.
            The contact form is open for everything else.
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/the-book"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700"
          >
            Read the book
            <span aria-hidden>&rarr;</span>
          </Link>
          {WORK_WITH_US_LIVE && (
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60"
            >
              Work with us
            </Link>
          )}
          <Link
            href="/contact"
            className={
              WORK_WITH_US_LIVE
                ? 'inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold text-ink/70 underline decoration-ink/20 decoration-1 underline-offset-4 transition hover:text-ink hover:decoration-ink/60'
                : 'inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60'
            }
          >
            Get in touch
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
