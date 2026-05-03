'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { site } from '@/lib/site';
import { BookCover } from '@/components/ui/BookCover';
import { WaitlistButton } from '@/components/site/WaitlistButton';

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
            <span className="block font-extrabold text-ink">Artificial Intelligence</span>
            <span className="block font-medium text-accent-on-cream">for Nonprofit Fundraising</span>
          </h1>

          <p className="mt-8 max-w-[36rem] text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
            How to use AI to raise more money, ethically and effectively.
            A practical playbook for fundraisers and nonprofit leaders who carry both
            responsibility and care.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WaitlistButton size="md" />
            <Link
              href="/the-book#sample"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60"
            >
              Read a sample chapter
            </Link>
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

          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
              Available everywhere books are sold
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/70">
              {site.retailers.map((r, i) => (
                <li key={r.name} className="flex items-center gap-6">
                  <span>{r.name}</span>
                  {i < site.retailers.length - 1 && (
                    <span aria-hidden className="text-ink/20">/</span>
                  )}
                </li>
              ))}
            </ul>
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
