'use client';

import { motion } from 'framer-motion';
import { bookFaq } from '@/lib/bookFaq';

/**
 * Visible FAQ on /the-book. Mirrors the FAQPage JSON-LD content so the
 * page satisfies Google's "visible content matching the schema" rule
 * for FAQ rich snippets, and so AI search engines crawling the rendered
 * HTML see the same Q&A pairs they'll cite.
 *
 * Uses native <details>/<summary> for the accordion behavior — keyboard
 * accessible, no JS dependency, works perfectly with screen readers,
 * and the SR-relevant content stays in source order regardless of
 * open/closed state. AI crawlers rendering HTML see all answers.
 */
export function BookFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="container-prose py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-on-cream">
          Frequently asked
        </p>
        <h2
          id="faq-title"
          className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
        >
          Questions about the book.
        </h2>

        <dl className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
          {bookFaq.map(({ question, answer }) => (
            <details
              key={question}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="flex cursor-pointer list-none items-start justify-between gap-6 text-left"
              >
                <dt className="text-lg font-semibold leading-snug text-ink md:text-xl">
                  {question}
                </dt>
                <span
                  aria-hidden
                  className="mt-1 flex-shrink-0 text-xl text-ink/55 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="mt-4 text-pretty text-base leading-relaxed text-ink/75 md:text-lg">
                {answer}
              </dd>
            </details>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
