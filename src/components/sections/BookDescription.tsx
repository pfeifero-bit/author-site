'use client';

import { motion } from 'framer-motion';

export function BookDescription() {
  return (
    <section aria-labelledby="about-the-book" className="container-prose py-24 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-16 md:grid-cols-12"
      >
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            About the book
          </p>
          <h2
            id="about-the-book"
            className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]"
          >
            A practical book for a moment that does not feel practical.
          </h2>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/80">
            <p>
              AI capability is racing ahead of nonprofit capacity. Across the sector, three quarters
              of organizations now use AI in some form, but only nine percent feel ready to use it
              responsibly, and just fifteen percent have any AI policy in place.{' '}
              <span className="text-ink/70">(AI Equity Project, 2025.)</span>
            </p>
            <p>
              That gap is where this book lives. Not a survey of tools, not a vision document, and
              not another warning. A working playbook for fundraisers and executive directors who
              are asked to do more, faster, and with the same small team, while protecting the trust
              that makes their work possible.
            </p>
            <p>
              Three parts walk you through the shift. <span className="font-semibold">Understand</span>{' '}
              what is actually changing in fundraising decisions, the donor mindset shifts behind it,
              and how to keep human judgment at the center.{' '}
              <span className="font-semibold">Apply</span> AI to the work fundraisers already do:
              donor stewardship, major gifts, grants, impact reporting, storytelling, and events.{' '}
              <span className="font-semibold">Implement</span> with the practices small and
              mid-sized teams need to run pilots, measure ROI, and scale without a technology
              department.
            </p>
            <p>
              Every chapter pairs a working framework with a named organization that tested it.
              Save the Children Australia, Center for Victims of Torture, Make-A-Wish, and others
              show up in their own words and numbers. The result is a book you can act on this
              week, not a future you have to wait for.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
