import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Homepage case studies section (P3 rebuild).
 *
 * Light ivory band that breaks the indigo-heavy sequence and puts the
 * evidence into a "publication of record" reading register.
 *
 * Header is a two-column grid: left holds the "THE EVIDENCE" eyebrow +
 * H2 with a chartreuse highlighter running behind "in depth."; right
 * holds a large "12" numeral + "NAMED CASE STUDIES" olive label + intro
 * sentence, referencing the corrected book scope.
 *
 * Three white cards, one per real case study. Numbers are the P1
 * corrections (verified against the manuscript):
 *   - Save the Children Australia: +18% response rate  (Ch 7, Dataro)
 *   - Make-A-Wish Arizona:         $3.3M / 122% of goal (Ch 11, OneCause)
 *   - Center for Victims of Torture: 150+ grants        (Ch 8, Instrumentl)
 *
 * Footer band with the "plus nine more" sentence + a text link to a
 * future /case-studies hub and a dark pill CTA to /the-book.
 */

type Case = {
  organization: string;
  metric: string;
  metricCaption: string;
  body: string;
  chapter: string;
  vendor: string;
};

const cases: Case[] = [
  {
    organization: 'Save the Children Australia',
    metric: '+18%',
    metricCaption: 'response rate vs. traditional segmentation',
    body:
      'Predictive modeling ranked existing donors by upgrade readiness. Targeted outreach beat the traditional RFV segmentation with more gifts from fewer mail pieces sent.',
    chapter: 'Chapter 7',
    vendor: 'With Dataro',
  },
  {
    organization: 'Make-A-Wish Arizona',
    metric: '$3.3M',
    metricCaption: 'raised at the 2025 Wish Ball, 122% of goal',
    body:
      'The team consolidated the full event lifecycle on OneCause. $2M paddle raise, $526K auctions, $80K pre-event bidding, and check-in for nearly a thousand guests reduced by 30 minutes.',
    chapter: 'Chapter 11',
    vendor: 'With OneCause',
  },
  {
    organization: 'Center for Victims of Torture',
    metric: '150+',
    metricCaption: 'grants centralized in one system',
    body:
      'CVT moved 150-plus annual grants out of spreadsheets and into Instrumentl. Grant work shifted from reactive deadline management to a visible pipeline; the team secured new general operating funds.',
    chapter: 'Chapter 8',
    vendor: 'With Instrumentl',
  },
];

export function HomeCaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="bg-ivory text-on-ivory"
    >
      <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
        {/* Header: two-column split, aligned to the baseline */}
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16">
          <div>
            <Eyebrow surface="ivory" className="mb-4">
              The evidence
            </Eyebrow>
            <h2
              id="case-studies-heading"
              className="font-heading text-4xl font-bold leading-heading tracking-tightish text-indigo-base md:text-[40px]"
            >
              Twelve documented case studies.{' '}
              <span
                className="whitespace-nowrap"
                style={{
                  background:
                    'linear-gradient(transparent 62%, rgba(225,246,77,.7) 62%)',
                }}
              >
                In depth.
              </span>
            </h2>
          </div>
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-6xl font-extrabold leading-none tracking-tightish text-indigo-base md:text-[64px]">
                12
              </span>
              <span className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-olive">
                Named case studies
              </span>
            </div>
            <p className="mt-4 font-body text-[15px] leading-prose text-on-ivory-muted">
              Every chapter pairs a working framework with a named organization
              that tested it. Real teams, specific results, and the vendor stack
              they actually used.
            </p>
          </div>
        </div>

        {/* Three case cards */}
        <ul className="mt-14 grid gap-[22px] md:grid-cols-3">
          {cases.map((c) => (
            <li
              key={c.organization}
              className="flex flex-col rounded-[16px] border border-[color:var(--card-border-on-ivory)] bg-white p-[30px] transition duration-[250ms] ease-card hover:-translate-y-1 hover:border-indigo-base/20 hover:shadow-[0_18px_40px_-22px_rgba(24,26,58,0.3)]"
            >
              <p className="font-body text-[13px] font-bold uppercase tracking-eyebrow-wide text-olive">
                {c.organization}
              </p>

              <p className="mt-6 font-heading text-[58px] font-extrabold leading-none tracking-tightish text-indigo-base">
                {c.metric}
              </p>
              <p className="mt-3 font-body text-sm leading-snug text-on-ivory-muted">
                {c.metricCaption}
              </p>

              <p className="mt-6 flex-1 font-body text-[14.5px] leading-prose text-on-ivory">
                {c.body}
              </p>

              <p className="mt-6 border-t border-[color:var(--card-border-on-ivory)] pt-4 font-body text-xs font-medium uppercase tracking-eyebrow-wide text-on-ivory-muted">
                {c.chapter} <span aria-hidden>&middot;</span> {c.vendor}
              </p>
            </li>
          ))}
        </ul>

        {/* Tinted "plus nine more" footer band */}
        <div
          className="mt-10 flex flex-col gap-4 rounded-[14px] p-6 md:flex-row md:items-center md:justify-between md:px-7 md:py-6"
          style={{ background: 'rgba(24,26,58,.04)' }}
        >
          <p className="max-w-[62ch] font-body text-[14.5px] leading-prose text-on-ivory">
            Plus nine more, including ethical AI translation for 609,000-plus
            refugees, a $1M Bloomerang Penny match at Joe Nuxhall Miracle
            League Fields, and SBP&rsquo;s GoFundMe Pro predictive-ask lift of
            66% on average one-time gifts.{' '}
            <Link
              href="/case-studies"
              className="text-olive underline decoration-olive decoration-1 underline-offset-4 transition hover:text-indigo-base"
            >
              See all twelve
            </Link>
            .
          </p>
          <Link
            href="/the-book"
            className="inline-flex shrink-0 items-center rounded-pill bg-indigo-base px-5 py-[11px] font-body text-sm font-semibold text-on-dark transition hover:bg-indigo-elevated"
          >
            Explore the book
          </Link>
        </div>
      </div>
    </section>
  );
}
