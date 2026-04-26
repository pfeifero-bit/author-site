'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function SpeakingHero() {
  return (
    <section className="relative">
      <div className="container-prose pb-16 pt-16 md:pb-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink/75">
            <span aria-hidden className="h-px w-6 bg-accent-500" />
            Speaking
          </p>

          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <span className="block">Keynotes and conversations</span>
            <span className="block font-medium text-accent-600">on AI in philanthropy.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
            Dale speaks to fundraising teams, foundation boards, and conferences on what AI is
            actually changing in nonprofit work, what to do this quarter, and how to keep human
            judgment at the center as automation scales.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700"
            >
              Send a speaking inquiry
              <span aria-hidden>&darr;</span>
            </Link>
            <Link
              href="#topics"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60"
            >
              Browse topics
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="editorial-rule" aria-hidden />
    </section>
  );
}
