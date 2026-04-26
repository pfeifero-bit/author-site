'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { site } from '@/lib/site';

export function AboutHero() {
  return (
    <section className="relative">
      <div className="container-prose grid gap-12 pb-16 pt-16 md:grid-cols-12 md:gap-16 md:pb-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink/75">
            <span aria-hidden className="h-px w-6 bg-accent-500" />
            About
          </p>

          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <span className="block">Dale Nirvani Pfeifer</span>
            <span className="block font-medium text-accent-600">on AI and philanthropy.</span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
            CEO of {''}
            <a
              href={site.author.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent-500 decoration-1 underline-offset-4 hover:text-ink"
            >
              Giving Compass
            </a>
            , a philanthropic intelligence platform. Co-founder of Goodworld, the technology
            behind the #donate hashtag. Author of <span className="italic">Artificial
            Intelligence for Nonprofit Fundraising</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="md:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm bg-ink/5 ring-1 ring-ink/10">
            <Image
              src="/images/author-about-primary.jpg"
              alt="Dale Nirvani Pfeifer"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 25vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-widest text-ink/65">
            Replace with high-resolution headshot
          </p>
        </motion.div>
      </div>

      <div className="editorial-rule" aria-hidden />
    </section>
  );
}
