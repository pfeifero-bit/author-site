'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function SampleChapter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sampleUrl = process.env.NEXT_PUBLIC_SAMPLE_CHAPTER_URL ?? '/downloads/sample-chapter.pdf';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'sample-chapter' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Subscription failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Subscription failed');
    }
  }

  return (
    <section
      id="sample"
      aria-labelledby="sample-title"
      className="border-t border-ink/10 bg-ink text-cream"
    >
      <div className="container-prose grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Read before you order
          </p>
          <h2
            id="sample-title"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
          >
            <span className="block">The first chapter,</span>
            <span className="block text-accent-300">on the house.</span>
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
            {status === 'success' ? (
              <div className="flex flex-col items-start">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-300">
                  Thank you
                </p>
                <p className="mt-3 text-lg font-medium leading-snug text-cream">
                  Your sample chapter is ready. The link is below, and a copy is on its way to your
                  inbox.
                </p>
                <a
                  href={sampleUrl}
                  download
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-300 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-200"
                >
                  Download Chapter 1
                  <span aria-hidden>&darr;</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="sample-email" className="text-xs font-semibold uppercase tracking-widest text-cream/60">
                  Email address
                </label>
                <input
                  id="sample-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@nonprofit.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-md border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/55 focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-300 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-accent-200 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending' : 'Send me Chapter 1'}
                  {status !== 'loading' && <span aria-hidden>&rarr;</span>}
                </button>

                <p className="mt-4 text-xs text-cream/70">
                  You&rsquo;ll also receive the monthly dispatch. Unsubscribe anytime.
                </p>

                {status === 'error' && (
                  <p role="alert" className="mt-3 text-xs text-red-300">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
