import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site, WORK_WITH_US_LIVE } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import {
  buildProfessionalServiceSchema,
  buildFaqSchema,
  jsonLdScript,
} from '@/lib/jsonLd';
import { workFaq } from '@/lib/workFaq';
import { ChapterOneForm } from '@/components/site/ChapterOneForm';
import { WorkInquiryForm } from '@/components/site/WorkInquiryForm';

/**
 * /work-with-us — advisory landing page.
 *
 * Positioned as personal advisory work by Dale Nirvani Pfeifer, NOT
 * as Giving Compass services. Speaking and workshops surface through
 * the same intake form. Tone: first person, restrained, no em dashes.
 *
 * Page sections (single H1, scannable H2 hierarchy below):
 *   1. Hero
 *   2. What this is
 *   3. The thesis (pull quote)
 *   4. What we work on / will not do (table)
 *   5. How engagements run
 *   6. Who this is for
 *   7. Selected engagements (HIDDEN until permissions confirmed)
 *   8. What people are saying (HIDDEN until quotes gathered)
 *   9. Frequently asked questions (8 Q&As, accordion)
 *  10. Final CTA + intake form
 *
 * Sections 7 and 8 are gated by RENDER_PLACEHOLDERS (false in
 * production). Their JSX lives in this file commented OUT below the
 * main return so it can be uncommented once content lands.
 */

export const metadata: Metadata = WORK_WITH_US_LIVE
  ? buildMetadata({
      title: 'AI Fundraising Advisor & Speaker | Dale Nirvani Pfeifer',
      description:
        'Advisory work with Dale Nirvani Pfeifer, author of Artificial Intelligence for Nonprofit Fundraising. Strategy, governance, and AI adoption for nonprofits, foundations, and philanthropy platforms.',
      url: `${site.url}/work-with-us`,
    })
  : { robots: { index: false, follow: false } };

const professionalServiceSchema = buildProfessionalServiceSchema();
const faqSchema = buildFaqSchema(workFaq);

export default function WorkWithUsPage() {
  // Page is paused. Returns 404 when the flag is off so the route is
  // unreachable. Flip NEXT_PUBLIC_WORK_WITH_US_LIVE=true in Vercel +
  // redeploy to bring the page back. All content stays in the repo.
  if (!WORK_WITH_US_LIVE) notFound();

  return (
    <>
      {/* JSON-LD: ProfessionalService + FAQPage. Both rendered as
          <script> tags so AI search engines and Google can index the
          structured data without parsing rendered HTML. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema) }}
      />

      {/* ────────────────────────────── 1. Hero ────────────────────────────── */}
      <section className="relative">
        <div className="container-prose pb-12 pt-14 md:pb-16 md:pt-20">
          <p className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-on-cream">
            <span aria-hidden className="h-px w-6 bg-accent-on-cream" />
            Advisory
          </p>
          <h1 className="text-balance text-[2.5rem] leading-[1.05] tracking-tight md:text-5xl lg:text-[3.75rem]">
            <span className="block font-extrabold text-ink">
              I help fundraising leaders
            </span>
            <span className="block font-medium text-accent-on-cream">
              figure out what AI actually changes, and what to do about it.
            </span>
          </h1>
          <p className="mt-8 max-w-[42rem] text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
            Strategy and governance work for nonprofits, foundations, and
            philanthropy platforms putting AI to work without losing donor
            trust.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#start"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700"
            >
              Start a conversation
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="/#sample"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/60"
            >
              Read Chapter 1 free
            </Link>
          </div>
        </div>
        <div className="editorial-rule" aria-hidden />
      </section>

      {/* ──────────────────────────── 2. What this is ─────────────────────── */}
      <section
        aria-labelledby="what-this-is"
        className="container-prose py-20 md:py-24"
      >
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
              The work
            </p>
            <h2
              id="what-this-is"
              className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]"
            >
              What this is.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/80">
              <p>
                Most fundraising teams are trying to figure out two things at
                once: which AI tools are real, and how to adopt them without
                burning donor trust. Vendor decks do not answer either
                question. Generic AI workshops do not either.
              </p>
              <p>
                I work with a small number of organizations each year on what
                comes after the demo. Strategy, governance, and the specific
                decisions that move revenue or capacity in ninety days. Most
                engagements run three to six months. Every one produces a
                written AI use policy your board can sign off on, named tools,
                and measurable outcomes. Not a slide deck.
              </p>
              <p>
                I am the author of{' '}
                <Link
                  href="/the-book"
                  className="font-medium text-ink underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-accent-on-cream"
                >
                  <span className="italic">{site.bookTitle}</span>
                </Link>{' '}
                (June 2026). My operating background, including CEO of Giving
                Compass and co-founder of Goodworld, informs the work but does
                not define it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 3. The thesis ──────────────────────── */}
      <section
        aria-labelledby="thesis"
        className="bg-cream-50/60"
      >
        <div className="container-prose py-20 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-on-cream">
            The thesis
          </p>
          <h2 id="thesis" className="sr-only">
            The thesis
          </h2>
          <blockquote className="mt-6 max-w-3xl text-balance text-3xl font-light leading-[1.25] text-ink md:text-[2.25rem] md:leading-[1.2]">
            AI did not change fundraising because it made tasks faster. It
            changed fundraising because it changed where{' '}
            <span className="font-extrabold text-accent-on-cream">
              judgment lives
            </span>
            . The job of leadership is to redesign the workflow around that
            shift, not to bolt tools onto the old one.
          </blockquote>
          <p className="mt-8 text-sm font-medium uppercase tracking-widest text-ink/60">
            From <span className="italic normal-case font-medium">{site.bookTitle}</span>
          </p>
        </div>
      </section>

      {/* ──────────── 4. What we work on / What we will not do ───────────── */}
      <section
        aria-labelledby="scope"
        className="container-prose py-20 md:py-24"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Scope
          </p>
          <h2
            id="scope"
            className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl"
          >
            What we work on, and what we will not do.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-md border border-ink/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50/60 text-xs font-semibold uppercase tracking-widest text-ink/65">
              <tr>
                <th scope="col" className="border-b border-ink/10 px-5 py-4 align-bottom md:px-6">
                  Focus area
                </th>
                <th scope="col" className="border-b border-ink/10 px-5 py-4 align-bottom md:px-6">
                  What we work on
                </th>
                <th scope="col" className="border-b border-ink/10 px-5 py-4 align-bottom md:px-6">
                  What we will not do
                </th>
              </tr>
            </thead>
            <tbody className="text-ink/80">
              <tr className="border-b border-ink/10">
                <th scope="row" className="px-5 py-5 align-top text-base font-bold text-ink md:px-6">
                  Strategy
                </th>
                <td className="px-5 py-5 align-top md:px-6">
                  Specific decisions, named tools, measurable outcomes tied to
                  revenue or capacity.
                </td>
                <td className="px-5 py-5 align-top text-ink/60 md:px-6">
                  Generic frameworks or maturity models that do not produce a
                  decision.
                </td>
              </tr>
              <tr className="border-b border-ink/10">
                <th scope="row" className="px-5 py-5 align-top text-base font-bold text-ink md:px-6">
                  Ethics and governance
                </th>
                <td className="px-5 py-5 align-top md:px-6">
                  Donor consent, data residency, model risk, written policy
                  your board can sign off on.
                </td>
                <td className="px-5 py-5 align-top text-ink/60 md:px-6">
                  Slogans about &ldquo;responsible AI&rdquo; without
                  operational meaning.
                </td>
              </tr>
              <tr className="border-b border-ink/10">
                <th scope="row" className="px-5 py-5 align-top text-base font-bold text-ink md:px-6">
                  Implementation
                </th>
                <td className="px-5 py-5 align-top md:px-6">
                  Pilots tied to a revenue, retention, or capacity hypothesis
                  you can test in 90 days.
                </td>
                <td className="px-5 py-5 align-top text-ink/60 md:px-6">
                  Tool demos disconnected from your CRM, your data, and your
                  team.
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-5 py-5 align-top text-base font-bold text-ink md:px-6">
                  Measurement
                </th>
                <td className="px-5 py-5 align-top md:px-6">
                  Pre-AI baselines and post-pilot deltas, reported in the
                  language your board uses.
                </td>
                <td className="px-5 py-5 align-top text-ink/60 md:px-6">
                  Vanity metrics or vendor-supplied case studies.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────── 5. How engagements run ───────────────────── */}
      <section
        aria-labelledby="how-engagements-run"
        className="bg-cream-50/60"
      >
        <div className="container-prose py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
                Process
              </p>
              <h2
                id="how-engagements-run"
                className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]"
              >
                How engagements run.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink/80">
                <p>
                  Most engagements start with a two-week diagnostic. A review
                  of your current fundraising operation, donor data, tool
                  stack, team capacity, and one or two priority use cases.
                </p>
                <p>
                  From there we agree on a 90-day or six-month plan with named
                  deliverables. You will know exactly what is being decided,
                  by whom, and when.
                </p>
                <p>
                  Three-month strategy sprints are common. Six-month
                  implementation partnerships are more common. A small number
                  of foundations and platforms work with me on senior advisor
                  retainers across longer build cycles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 6. Who this is for ───────────────────── */}
      <section
        aria-labelledby="who-this-is-for"
        className="container-prose py-20 md:py-24"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Fit
          </p>
          <h2
            id="who-this-is-for"
            className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl"
          >
            Who this is for.
          </h2>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest text-accent-on-cream">
              This work fits best for
            </h3>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-ink/80">
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-on-cream" />
                <span>
                  Nonprofit CEOs and Chief Development Officers building a
                  credible AI strategy for the board.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-on-cream" />
                <span>
                  Foundations briefing grantees, program officers, or trustees
                  on responsible AI adoption.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-on-cream" />
                <span>
                  Donor advised fund platforms, wealth advisors, and fintechs
                  integrating AI into philanthropy products.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-on-cream" />
                <span>
                  Boards that want a serious, non-hype briefing on what is
                  actually changing in donor behavior.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest text-ink/65">
              It is not the right fit for
            </h3>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-ink/65">
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
                <span>
                  Organizations looking for a vendor to install software.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
                <span>
                  Teams seeking general &ldquo;AI literacy&rdquo; training
                  disconnected from fundraising.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
                <span>
                  Anyone hoping to outsource the judgment that AI is making
                  more important, not less.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────── 7. Selected engagements ──────────────────── */}
      {/*
       * Logo bar PLACEHOLDER. Hidden until permissions are gathered.
       * To restore: replace the contents of this section with a logo
       * grid, populated from a `clients` array in src/lib/site.ts.
       * Suggested categories per the brief:
       *   - A national nonprofit using AI for major gift prospecting
       *   - A community foundation rolling out AI guidance to grantees
       *   - A DAF platform or wealth advisor integrating donor intelligence
       *   - A federation training affiliate teams
       */}

      {/* ────────────────────── 8. What people are saying ─────────────────── */}
      {/*
       * Testimonials PLACEHOLDER. Hidden until 3+ quotes are gathered
       * AND attribution permissions are confirmed in writing.
       * To restore: render a 3-up grid of <blockquote> elements,
       * populated from a `testimonials` array in src/lib/site.ts.
       * Per the brief, do NOT publish to production with placeholder
       * "Testimonial pending" copy visible.
       */}

      {/* ─────────────────────── 9. FAQ (visible + schema) ────────────────── */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="bg-cream-50/60"
      >
        <div className="container-prose py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-on-cream">
              Frequently asked
            </p>
            <h2
              id="faq-title"
              className="mt-4 text-balance text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl"
            >
              Frequently asked questions.
            </h2>

            <dl className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
              {workFaq.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                    {/*
                     * H3 wrapping <dt> for SEO + AI search extraction
                     * (per the brief). The <dt> wraps it for
                     * description-list semantics. AI engines pick the
                     * H3 text as the question name.
                     */}
                    <h3 className="text-lg font-semibold leading-snug text-ink md:text-xl">
                      <dt>{question}</dt>
                    </h3>
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
          </div>
        </div>
      </section>

      {/* ─────────────────────── 10. Final CTA + form ─────────────────────── */}
      <section
        id="start"
        aria-labelledby="start-title"
        className="container-prose py-20 md:py-28"
      >
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-on-cream">
            Get in touch
          </p>
          <h2
            id="start-title"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
          >
            Ready to start?
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink/75">
            Tell me what you are working on. I respond within three business
            days.
          </p>
          <div className="mt-10">
            <WorkInquiryForm />
          </div>

          {/* Soft secondary path: anyone not ready for a paid engagement
              can still grab the chapter and join the dispatch. Keeps the
              page useful even for visitors whose timeline is longer. */}
          <div className="mt-16 border-t border-ink/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
              Or just exploring
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75">
              Read Chapter 1 of <span className="italic">{site.bookTitle}</span> for free
              and get the monthly dispatch on AI and philanthropy.
            </p>
            <div className="mt-5 max-w-xl">
              <ChapterOneForm
                variant="cream"
                buttonLabel="Send me Chapter 1"
                source="work-with-us"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
