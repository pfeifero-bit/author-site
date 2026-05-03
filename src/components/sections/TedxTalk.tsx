'use client';

import { motion } from 'framer-motion';

const VIDEO_ID = 'VSwz4uaXVOc';
const TITLE = 'Creating a good world one # at a time';
const VENUE = 'TEDxAuckland';

export function TedxTalk() {
  return (
    <section aria-labelledby="tedx" className="container-prose py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-12 md:grid-cols-12 md:gap-16"
      >
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            On stage
          </p>
          <h2
            id="tedx"
            className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]"
          >
            <span className="block">{TITLE}.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            Dale&rsquo;s {VENUE} talk on Goodworld and the design of low-friction giving.
            The throughline that became Giving Compass and, later, this book.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="aspect-video w-full overflow-hidden rounded-md bg-ink/5 ring-1 ring-ink/10 shadow-[0_30px_80px_-25px_rgba(14,27,63,0.35)]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
              title={`${TITLE} | Dale Nirvani Pfeifer | ${VENUE}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
