'use client';

import { motion } from 'framer-motion';
import { site } from '@/lib/site';
import { BookCover } from '@/components/ui/BookCover';
import { WaitlistButton } from '@/components/site/WaitlistButton';
import { ChapterOneForm } from '@/components/site/ChapterOneForm';

// Pre-orders gating. When NEXT_PUBLIC_PREORDERS_LIVE === 'true', the
// retailer row shows clickable links. Default false (and any value other
// than the literal string "true" is treated as false).
const PREORDERS_LIVE = process.env.NEXT_PUBLIC_PREORDERS_LIVE === 'true';

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
          <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-accent-on-cream">
            <span aria-hidden className="h-px w-3 bg-accent-on-cream" />
            New book. Publishing {site.publishMonth}.
          </p>

          <h1 className="text-balance text-[2.75rem] leading-[1.02] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <span className="block font-extrabold text-ink">AI for Nonprofit</span>
            <span className="block font-medium text-accent-on-cream">Fundraising</span>
          </h1>

          <p className="mt-8 max-w-[36rem] text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
            How to use AI to raise more money, ethically and effectively.
            A practical playbook for fundraisers and nonprofit leaders who carry both
            responsibility and care.
          </p>

          {/* Primary CTA: Chapter 1 download. Inline on desktop, stacked
              on mobile. Submits to the same backend as the SampleChapter
              form and triggers the same /thank-you redirect. */}
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

          <div className="mt-14 max-w-md">
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

          {/* Retailer row. Hidden until pre-orders open. Toggled via
              NEXT_PUBLIC_PREORDERS_LIVE. When live, each retailer becomes
              a clickable link to that retailer's pre-order page (URLs
              live in src/lib/site.ts). */}
          {PREORDERS_LIVE && (
            <div className="mt-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
                Available everywhere books are sold
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {site.retailers.map((r, i) => (
                  <li key={r.name} className="flex items-center gap-6">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink/80 underline decoration-accent-on-cream decoration-1 underline-offset-4 transition hover:text-ink"
                    >
                      {r.name}
                    </a>
                    {i < site.retailers.length - 1 && (
                      <span aria-hidden className="text-ink/20">/</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
