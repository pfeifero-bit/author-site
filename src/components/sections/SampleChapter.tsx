'use client';

import { motion } from 'framer-motion';
import { ChapterOneForm } from '@/components/site/ChapterOneForm';

export function SampleChapter() {
  return (
    <section
      id="sample"
      aria-labelledby="sample-title"
      className="bg-ink text-cream"
    >
      <div className="container-prose grid gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-on-navy">
            Read before you order
          </p>
          <h2
            id="sample-title"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
          >
            <span className="block">The first chapter,</span>
            <span className="block text-accent-on-navy">on the house.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cream/75">
            Chapter 1, <span className="italic">Why Judgment Is Becoming the Differentiator</span>,
            sets up the book&rsquo;s central argument and the three workflow shifts redefining
            fundraising. Drop your email and we&rsquo;ll send you a printable PDF, no marketing
            attached.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="md:col-span-5"
        >
          <div className="rounded-md border border-cream/10 bg-cream/[0.04] p-6 md:p-8">
            <label
              htmlFor="ch1-email-sample-chapter"
              className="text-xs font-semibold uppercase tracking-widest text-cream/60"
            >
              Email address
            </label>
            <div className="mt-2">
              <ChapterOneForm
                variant="navy"
                buttonLabel="Send me Chapter 1"
                placeholder="you@nonprofit.org"
                source="sample-chapter"
              />
            </div>
            <p className="mt-4 text-xs text-cream/70">
              You&rsquo;ll also receive the monthly dispatch. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
