'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { site } from '@/lib/site';
import { BookCover } from '@/components/ui/BookCover';
import { WaitlistButton } from '@/components/site/WaitlistButton';

export function BookHero() {
  return (
    <section id="preorder" className="relative">
      <div className="container-prose grid gap-12 pb-20 pt-16 md:grid-cols-12 md:gap-16 md:pb-24 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink/75">
            <span aria-hidden className="h-px w-6 bg-accent-on-cream" />
            The book. Publishing {site.publishMonth}.
          </p>

          <h1 className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-[4rem]">
            <span className="block">AI for Nonprofit</span>
            <span className="block font-medium text-accent-on-cream">Fundraising</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base font-medium leading-relaxed text-ink/80 md:text-lg">
            How to Use AI to Raise More Money, Ethically and Effectively.
          </p>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink/70 md:text-lg">
            Three parts. Fifteen chapters. Eleven named case studies. A working playbook for
            nonprofit leaders who want clear judgment in the age of AI, not faster versions of the
            wrong work.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WaitlistButton size="md" />
            <Link
              href="#sample"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60"
            >
              Read a sample chapter
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="md:col-span-5"
        >
          <div className="md:sticky md:top-28">
            <BookCover size="md" />
            <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-widest text-ink/65">
              Cover mockup. Final art coming soon.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="editorial-rule" aria-hidden />
    </section>
  );
}
