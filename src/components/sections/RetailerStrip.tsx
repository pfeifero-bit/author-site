'use client';

import { motion } from 'framer-motion';
import { site } from '@/lib/site';

export function RetailerStrip() {
  return (
    <section
      id="retailers"
      aria-labelledby="retailers-heading"
      className="border-t border-ink/10 bg-ink text-cream"
    >
      <div className="container-prose py-24 md:py-32">
        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Pre-order
          </p>
          <h2
            id="retailers-heading"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
          >
            Available everywhere books are sold.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-cream/75">
            Pre-orders signal the book to retailers and reviewers. They make a real difference
            ahead of launch in {site.publishMonth}. Pick your retailer.
          </p>
        </header>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {site.retailers.map((r, i) => (
            <motion.li
              key={r.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between rounded-md border border-cream/15 bg-cream/[0.04] px-5 py-5 transition hover:border-accent-300 hover:bg-cream/[0.08]"
              >
                <span className="text-base font-semibold text-cream md:text-lg">{r.name}</span>
                <span
                  aria-hidden
                  className="text-cream/70 transition group-hover:translate-x-0.5 group-hover:text-accent-300"
                >
                  &rarr;
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-cream/70">
          Retailer links populate as listings go live. If your store is not here, ask your
          local independent bookseller to special-order through Bookshop.org.
        </p>
      </div>
    </section>
  );
}
