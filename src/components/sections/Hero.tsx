'use client';

import { motion } from 'framer-motion';
import { site } from '@/lib/site';
import { BookCover } from '@/components/ui/BookCover';
import { WaitlistButton } from '@/components/site/WaitlistButton';
import { ChapterOneForm } from '@/components/site/ChapterOneForm';

// Trust strip data shown between the waitlist button and the author
// bio. Numbers reflect the actual book per the TOC on /the-book.
// Keep in sync if scope changes.
const TRUST_STATS: { value: string; label: string }[] = [
  { value: '15', label: 'chapters' },
  { value: '11', label: 'case studies' },
  { value: '2026', label: 'platform landscape' },
];

export function Hero() {
  return (
    <section className="relative">
      <div className="container-prose grid gap-12 pb-16 pt-14 md:grid-cols-12 md:gap-16 md:pb-20 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          {/* Eyebrow with hairline rule. Tighter than before — leans
              editorial. The middle dot replaces a period. */}
          <p className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-on-cream">
            <span aria-hidden className="h-px w-6 bg-accent-on-cream" />
            New book &middot; {site.publishMonth}
          </p>

          <h1 className="text-balance text-[2.75rem] leading-[1.02] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <span className="block font-extrabold text-ink">AI for Nonprofit</span>
            <span className="block font-medium text-accent-on-cream">Fundraising</span>
          </h1>

          {/* Author byline. Small uppercase line that sits between the
              headline and subtitle. Cheap credibility hit before the
              reader gets into the longer description. */}
          <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.08em] text-ink/55">
            By {site.author.name}
          </p>

          <p className="mt-5 max-w-[36rem] text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
            How to use AI to raise more money, ethically and effectively.
            A practical playbook for fundraisers and nonprofit leaders who carry both
            responsibility and care.
          </p>

          {/* Primary CTA: Chapter 1 download. Wired to the same backend
              as the SampleChapter form; submission triggers the 4-email
              welcome drip and redirect to /thank-you. */}
          <div className="mt-10 max-w-xl">
            <ChapterOneForm variant="cream" buttonLabel="Send me Chapter 1" />
            <p className="mt-3 text-xs text-ink/55">
              Free PDF of Chapter 1 to your inbox. You&rsquo;ll also receive the monthly dispatch.
            </p>
          </div>

          {/* Secondary CTA: waitlist for pre-order notification. */}
          <div className="mt-6">
            <WaitlistButton size="md" />
          </div>

          {/* Trust strip: a hairline-bordered row of mini-stats. Reads
              as "what's in the book" credibility before the reader
              scrolls into the deeper book description. */}
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink/10 pt-5 text-[11px] uppercase tracking-[0.06em] text-ink/55">
            {TRUST_STATS.map(({ value, label }) => (
              <span key={label}>
                <strong className="font-semibold text-ink">{value}</strong> {label}
              </span>
            ))}
          </div>

          <div className="mt-12 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">By the author</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              <span className="font-semibold text-ink">{site.author.name}</span> is the
              CEO of{' '}
              <a
                href={site.author.company.url}
                className="underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-ink"
              >
                Giving Compass
              </a>
              , a philanthropic intelligence platform. She co-founded Goodworld, the
              technology behind the #donate hashtag, and writes on AI and philanthropy
              with leaders including Jeff Raikes, former CEO of the Gates Foundation.
            </p>
          </div>

          {/* Retailer line. Pre-launch placeholder — once the Amazon
              listing is live, swap the <span> for an <a href="..."> with
              the real URL and update the copy from "Available soon" to
              "Available on" or "Pre-order on" depending on state. */}
          <p className="mt-14 text-xs font-semibold uppercase tracking-widest text-ink/65">
            Available soon on{' '}
            <span className="font-bold tracking-wider text-ink">AMAZON.COM</span>
          </p>
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
              Cover mockup &middot; final art coming soon
            </p>
          </div>
        </motion.div>
      </div>

      <div className="editorial-rule" aria-hidden />
    </section>
  );
}
