'use client';

import { motion } from 'framer-motion';

type Case = {
  organization: string;
  metric: string;
  metricCaption: string;
  body: string;
  source: string;
};

const cases: Case[] = [
  {
    organization: 'Save the Children Australia',
    metric: '3×',
    metricCaption: 'upgrade conversion vs. control',
    body: 'Predictive modeling on the existing donor base ranked supporters by upgrade readiness. Targeted outreach to the highest-propensity segments converted at three times the rate of the control group, with no increase in appeal volume.',
    source: 'Chapter 7. With Dataro.',
  },
  {
    organization: 'oneMESSAGE.tv',
    metric: '+56%',
    metricCaption: 'fundraising revenue, year one',
    body: 'A small team unified donor management on Keela and turned on Smart Ask. Within twelve months: 56% revenue growth, 108% more donors acquired, 260% more recurring donors, and a 39% email open rate against a 17% benchmark.',
    source: 'Chapter 15. With Keela.',
  },
  {
    organization: 'Center for Victims of Torture',
    metric: '150+',
    metricCaption: 'grants centralized in one system',
    body: 'CVT moved 150-plus annual grants out of spreadsheets and into Instrumentl. Grant work shifted from reactive deadline management to a visible pipeline, and the team secured general operating funds for a new regional program.',
    source: 'Chapter 8. With Instrumentl.',
  },
];

export function CaseStudies() {
  return (
    <section aria-labelledby="inside-the-book" className="bg-cream-50/60">
      <div className="container-prose py-16 md:py-20">
        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Inside the book
          </p>
          <h2
            id="inside-the-book"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
          >
            Eleven case studies. Real teams. Specific results.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
            Each chapter pairs a working framework with a named organization that tested it. No
            stock vendors, no vague gains. A few examples drawn straight from the book.
          </p>
        </header>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md bg-ink/10 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.organization}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="flex flex-col bg-cream p-7 md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/70">
                {c.organization}
              </p>

              <div className="mt-8">
                <p className="text-[3.25rem] font-extrabold leading-none tracking-tight text-accent-on-cream md:text-[3.75rem]">
                  {c.metric}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink/70">
                  {c.metricCaption}
                </p>
              </div>

              <p className="mt-8 flex-1 text-[15px] leading-relaxed text-ink/75">{c.body}</p>

              <p className="mt-8 border-t border-ink/10 pt-4 text-xs font-medium uppercase tracking-widest text-ink/65">
                {c.source}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink/75">
          Plus eight more, including Make-A-Wish&rsquo;s 2025 Wish Ball, ethical AI translation in
          humanitarian response, and a one-person nonprofit that reactivated more than fifty
          lapsed donors in two weeks.
        </p>
      </div>
    </section>
  );
}
