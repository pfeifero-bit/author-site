import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildFaqSchema, jsonLdScript } from '@/lib/jsonLd';

/**
 * /ai-policy-template — lead-generation page for the free template.
 *
 * Built to rank + be cited for queries like "what should be in a
 * nonprofit AI policy". Opens with a direct-answer paragraph naming
 * all eight sections in the first 100 words. Eight-card grid summarizes
 * each section. Dual CTA (read full template / email me a copy).
 * Four-Q FAQ with matching FAQPage JSON-LD.
 */

export const metadata: Metadata = buildMetadata({
  title: `Free Nonprofit AI Policy Template | ${site.author.name}`,
  description:
    'A free template for building your nonprofit AI use policy. Covers eight sections: purpose, approved uses, human review, donor data, disclosure, tool approval, ownership, review cadence. Plain-language and adoptable in one meeting.',
  url: `${site.url}/ai-policy-template`,
});

const SECTIONS = [
  {
    n: '01',
    title: 'Purpose & scope',
    body: 'Why the policy exists, who it covers, and which tools count as AI under it.',
  },
  {
    n: '02',
    title: 'Approved & prohibited uses',
    body: 'What AI may draft, what it may inform, and what it never touches.',
  },
  {
    n: '03',
    title: 'Human review requirements',
    body: 'Where a person signs off before anything reaches a donor, funder, or the public.',
  },
  {
    n: '04',
    title: 'Donor data & privacy',
    body: 'What donor information may enter which tools, and what never leaves your CRM.',
  },
  {
    n: '05',
    title: 'Disclosure & transparency',
    body: 'When and how you tell donors AI was involved. Silence costs more than candor.',
  },
  {
    n: '06',
    title: 'Tool approval process',
    body: 'How a new tool gets vetted and approved, so adoption is a decision, not a drift.',
  },
  {
    n: '07',
    title: 'Ownership & accountability',
    body: 'One named owner. Committees advise; a person is accountable.',
  },
  {
    n: '08',
    title: 'Review cadence',
    body: 'Quarterly in year one, then twice a year. Tools change faster than annual cycles.',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ — mirrors <FAQPage> JSON-LD so answer engines quote verbatim          */
/* -------------------------------------------------------------------------- */

const FAQ = [
  {
    question: 'What should be in a nonprofit AI policy?',
    answer:
      'A nonprofit AI policy should cover eight sections: purpose and scope, approved and prohibited uses, human review requirements, donor data rules, disclosure standards, a tool approval process, named ownership, and a review cadence. The free template on this page covers all eight in plain language a whole staff can read in ten minutes.',
  },
  {
    question: 'Do we need to disclose AI use to donors?',
    answer:
      'Disclose when AI materially shaped a communication or decision a donor would reasonably want to know about. Donors who discover undisclosed AI use lose trust in the organization, not the tool. Routine spell-check or list cleanup does not require disclosure.',
  },
  {
    question: 'Who should own the policy?',
    answer:
      'One named person, typically the development director or a senior operations leader, with leadership sign-off. A policy without a named owner does not get enforced or updated. Committees may advise; a person is accountable.',
  },
  {
    question: 'How often should a nonprofit AI policy be updated?',
    answer:
      'Quarterly for the first year, then twice a year. AI tools change faster than annual policy cycles, and staff practice shifts as new tools appear. Each review asks: what are people actually using, what went wrong, what has changed with vendors, and what needs to be added or removed.',
  },
];

const faqSchema = buildFaqSchema(FAQ);

export default function AiPolicyTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema) }}
      />

      <div className="bg-indigo-base text-on-dark">
        {/* ───────── 1. Hero with direct-answer paragraph ───────── */}
        <section aria-labelledby="hero" className="mx-auto max-w-[960px] px-8 pb-16 pt-24 md:pt-[96px]">
          <Eyebrow surface="dark" className="mb-6">
            Free resource
          </Eyebrow>
          <h1
            id="hero"
            className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
          >
            The Nonprofit AI Policy Template.
          </h1>
          {/* Direct-answer for "what should be in a nonprofit AI policy" —
              kept under 100 words for AI-search verbatim quoting */}
          <p className="mt-8 font-body text-lg leading-prose text-on-dark md:text-[19px]">
            A nonprofit AI policy should cover eight things: purpose and scope, approved
            and prohibited uses, human review requirements, donor data rules,
            disclosure standards, a tool approval process, named ownership, and a
            review cadence. This free template covers all eight, in plain language your
            whole staff can read in ten minutes.
          </p>
          <p className="mt-6 max-w-[62ch] font-body text-[16px] leading-prose text-on-dark-muted">
            Most nonprofits have no AI governance policy while their staff already use
            AI individually. That gap, not the tools, is where donor trust gets spent.
            This template closes it.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/nonprofit-ai-use-policy-template"
              className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-[13px] font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
            >
              Read the full template
            </Link>
            <a
              href={mailto('aiPolicy')}
              className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-[13px] font-body text-[15px] font-semibold text-on-dark transition hover:border-white/35"
            >
              Email me a copy
            </a>
          </div>
        </section>

        {/* ───────── 2. Eight-section grid ───────── */}
        <section
          aria-labelledby="sections-heading"
          className="border-y border-[color:var(--hairline-on-dark)] bg-indigo-elevated"
        >
          <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
            <Eyebrow surface="dark" className="mb-4">
              What&rsquo;s in the template
            </Eyebrow>
            <h2
              id="sections-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              What should be in a nonprofit AI policy?
            </h2>
            <p className="mt-4 max-w-[62ch] font-body text-[16px] leading-prose text-on-dark-muted">
              The template has eight sections. Each comes with fill-in-the-blank
              language and an example of how a fundraising team would apply it.
            </p>

            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SECTIONS.map((s) => (
                <li
                  key={s.n}
                  className="flex flex-col rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-7"
                >
                  <p className="font-mono text-sm font-semibold text-chartreuse">
                    {s.n}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-subhead tracking-micro-tight text-on-dark">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-[14.5px] leading-prose text-on-dark-muted">
                    {s.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── 3. Get the template block ───────── */}
        <section
          aria-labelledby="get-template"
          className="mx-auto max-w-standard px-8 py-24 md:py-[96px]"
        >
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
            <div>
              <Eyebrow surface="dark" className="mb-4">
                Get the template
              </Eyebrow>
              <h2
                id="get-template"
                className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
              >
                Read it now, or email for an editable copy.
              </h2>
              <p className="mt-5 max-w-[54ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
                A fill-in-the-blank document your team can adopt in one meeting. Read it
                in full on this site (print or save as PDF), or email for an editable
                copy.
              </p>
            </div>
            <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-8">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                Prefer to read it now?
              </p>
              <p className="mt-4 font-body text-[16px] leading-prose text-on-dark">
                <Link
                  href="/nonprofit-ai-use-policy-template"
                  className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
                >
                  Open the full template
                </Link>{' '}
                and print or save it as a PDF.
              </p>
              <a
                href={mailto('aiPolicy')}
                className="mt-6 inline-flex w-full items-center justify-center rounded-pill bg-chartreuse px-6 py-3 font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                Email for the template
              </a>
              <p className="mt-4 text-center font-body text-[13px] text-on-dark-muted">
                or write to{' '}
                <a
                  href={mailto('aiPolicy')}
                  className="text-periwinkle underline decoration-periwinkle/40 decoration-1 underline-offset-4 transition hover:text-on-dark"
                >
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ───────── 4. FAQ ───────── */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="border-y border-[color:var(--hairline-on-dark)] bg-indigo-elevated"
        >
          <div className="mx-auto max-w-[880px] px-8 py-24 md:py-[96px]">
            <Eyebrow surface="dark" className="mb-4">
              Common questions
            </Eyebrow>
            <h2
              id="faq-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              About writing an AI policy.
            </h2>
            <dl className="mt-10 divide-y divide-[color:var(--hairline-on-dark)] border-y border-[color:var(--hairline-on-dark)]">
              {FAQ.map((qa) => (
                <details
                  key={qa.question}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                    <dt className="font-body text-[17px] font-semibold leading-snug text-on-dark md:text-[18px]">
                      {qa.question}
                    </dt>
                    <span
                      aria-hidden
                      className="mt-1 flex-shrink-0 font-body text-xl text-chartreuse transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 font-body text-[15.5px] leading-prose text-on-dark-muted">
                    {qa.answer}
                  </dd>
                </details>
              ))}
              {/* Extra Q as in the reference: "What if staff are already using
                  AI unofficially?" — kept here (not in FAQPage schema; it's a
                  routing question, not a knowledge-base answer). */}
              <details className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                  <dt className="font-body text-[17px] font-semibold leading-snug text-on-dark md:text-[18px]">
                    What if staff are already using AI unofficially?
                  </dt>
                  <span
                    aria-hidden
                    className="mt-1 flex-shrink-0 font-body text-xl text-chartreuse transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="mt-4 font-body text-[15.5px] leading-prose text-on-dark-muted">
                  That is the normal starting point, and the reason to write the policy
                  now. Start by making current usage visible, then set the lines. A
                  workshop is the fastest way to get a whole team onto one page; see{' '}
                  <Link
                    href="/for-nonprofits"
                    className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
                  >
                    programs for nonprofits
                  </Link>
                  .
                </dd>
              </details>
            </dl>
          </div>
        </section>

        {/* ───────── 5. Book cross-link ───────── */}
        <section aria-labelledby="book-link" className="mx-auto max-w-[880px] px-8 py-20 md:py-24">
          <p className="border-l-[3px] border-chartreuse pl-6 font-body text-[16px] leading-prose text-on-dark-muted md:pl-8">
            The governance thinking behind this template, including disclosure,
            consent, and human accountability, runs through every chapter of the book,
            including a full case study of the International Center for Journalists
            building its AI use policy (Chapter 13):{' '}
            <Link
              href="/the-book"
              className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
            >
              <em className="font-serif-italic italic">{site.bookTitle}</em>
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
