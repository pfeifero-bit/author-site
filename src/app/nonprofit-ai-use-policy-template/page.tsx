import type { Metadata } from 'next';
import Link from 'next/link';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { PrintButton } from '@/components/ui/PrintButton';

/**
 * /nonprofit-ai-use-policy-template — the actual template document.
 *
 * Print-optimized: opens as a normal web page, but Cmd/Ctrl+P
 * produces a clean PDF with:
 *   - No site chrome (nav, footer, print button)
 *   - Ivory paper background swapped to white
 *   - Serif-free 11pt body copy, generous margins
 *   - A repeating page footer with author + template name
 *   - Browser page date/URL chrome suppressed via @page CSS
 *
 * Eight sections, each with [bracketed fields] for the reader to
 * complete. Content verbatim from
 * design_handoff_site_restructure/design-reference/nonprofit-ai-use-policy-template.html
 */

export const metadata: Metadata = buildMetadata({
  title: `Nonprofit AI Use Policy Template | ${site.author.name}`,
  description:
    'A fill-in-the-blank nonprofit AI use policy your team can adopt in one meeting. Eight sections covering purpose, approved uses, human review, donor data, disclosure, tool approval, ownership, and review cadence. Adapted from Artificial Intelligence for Nonprofit Fundraising.',
  url: `${site.url}/nonprofit-ai-use-policy-template`,
});

/**
 * Helper to render a bracketed placeholder field, styled so the reader
 * knows what to fill in. Uses a chartreuse underline in screen mode,
 * plain black brackets in print.
 */
const Field = ({ children }: { children: React.ReactNode }) => (
  <span className="policy-field">[{children}]</span>
);

export default function NonprofitAIUsePolicyTemplatePage() {
  return (
    <div className="policy-document bg-ivory text-on-ivory">
      {/* Print-only style block — kept here (not in globals.css) so it
          only applies when this route is being printed. */}
      <style>{`
        /* Screen: chartreuse underlined bracketed fields */
        .policy-field {
          color: #6E7A2E;
          background: rgba(225, 246, 77, 0.18);
          padding: 0 3px;
          border-radius: 3px;
          font-style: normal;
        }

        /* Print: paper-friendly */
        @media print {
          @page {
            size: letter;
            margin: 0.75in;
          }
          /* Kill the header + footer inserted by the RootLayout */
          header, footer, nav, .no-print { display: none !important; }
          .policy-document {
            background: #fff !important;
            color: #000 !important;
            font-size: 11pt;
            line-height: 1.5;
          }
          .policy-field {
            color: #000 !important;
            background: transparent !important;
            padding: 0 !important;
            text-decoration: underline;
          }
          h1, h2, h3 {
            color: #000 !important;
            page-break-after: avoid;
          }
          h2 { page-break-before: auto; margin-top: 24pt; }
          table { page-break-inside: avoid; }
          a { color: #000 !important; text-decoration: underline; }
          /* Running footer via CSS paged media (works in Chrome/Safari) */
          .print-footer {
            display: block !important;
            position: fixed;
            bottom: 0.25in;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 8pt;
            color: #666;
          }
        }
      `}</style>

      {/* ───────── Screen-only utility bar (hidden on print) ───────── */}
      <div className="no-print border-b border-[color:var(--card-border-on-ivory)] bg-white/70 py-3">
        <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-between gap-3 px-6 text-sm">
          <p className="font-body text-on-ivory-muted">
            <Link
              href="/ai-policy-template"
              className="text-olive underline decoration-olive/50 decoration-1 underline-offset-4 transition hover:text-indigo-base"
            >
              &larr; About this template
            </Link>
          </p>
          <div className="flex gap-3">
            <a
              href={mailto('aiPolicy')}
              className="font-body text-olive underline decoration-olive/50 decoration-1 underline-offset-4 transition hover:text-indigo-base"
            >
              Email me an editable copy
            </a>
            <span aria-hidden className="text-on-ivory-muted/40">|</span>
            <PrintButton className="font-body font-semibold text-olive underline decoration-olive/50 decoration-1 underline-offset-4 transition hover:text-indigo-base">
              Print / Save as PDF
            </PrintButton>
          </div>
        </div>
      </div>

      {/* ───────── Document body ───────── */}
      <article className="mx-auto max-w-[720px] px-6 py-16 font-body md:py-24">
        {/* Document header */}
        <header className="border-b border-[color:var(--card-border-on-ivory)] pb-8">
          <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-olive">
            Template
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tightish text-indigo-base md:text-[36px]">
            Nonprofit AI Use Policy
          </h1>
          <p className="mt-3 font-body text-[15px] leading-prose text-on-ivory">
            A fill-in-the-blank policy your team can adopt in one meeting.
          </p>
          <p className="mt-2 font-body text-[13px] italic leading-relaxed text-on-ivory-muted">
            Adapted from{' '}
            <em className="font-serif-italic italic">{site.bookTitle}</em> by{' '}
            {site.author.name}.
          </p>
          <p className="mt-6 font-body text-[14px] leading-prose text-on-ivory">
            Replace every <Field>bracketed field</Field> with your own answer. Delete
            anything that does not apply. Keep it short: a policy people read is worth
            more than a policy people file.
          </p>
        </header>

        {/* Before you start callout */}
        <section
          aria-labelledby="before"
          className="mt-10 rounded-[8px] border-l-4 border-olive bg-white/60 p-6"
        >
          <h2 id="before" className="font-heading text-lg font-bold text-indigo-base">
            Before you start
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            Write this with staff, not for them. When the International Center for
            Journalists built its AI policy, a cross-functional group anchored the work
            in four principles before naming a single tool: do no harm, protect rights
            and privacy, use content with consent, and be transparent about AI use.
            Drafts circulated widely over about six months. The result did not slow
            experimentation. It made it possible.
          </p>
        </section>

        {/* Section 1 */}
        <section aria-labelledby="s1" className="mt-12">
          <h2
            id="s1"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            1. Purpose and scope
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            This policy governs how staff, contractors, and volunteers at{' '}
            <Field>Organization name</Field> use artificial intelligence tools in
            fundraising and communications work. It exists so that our team can adopt
            useful tools with confidence, and so that our donors can trust how we
            work.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">What counts as AI under this policy:</strong>{' '}
            any tool that generates text, images, audio, or video, or that scores,
            ranks, predicts, or recommends actions about people. This includes general
            assistants, AI features inside our CRM or email platform, and AI built into
            tools we already pay for.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Guiding principles.</strong> We commit to:{' '}
            <Field>
              do no harm / protect rights and privacy / use content with consent / be
              transparent about AI use / add or amend
            </Field>
            .
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Effective date:</strong> <Field>date</Field>.<br />
            <strong className="text-indigo-base">Applies to:</strong>{' '}
            <Field>all staff / development team / named roles</Field>.
          </p>
        </section>

        {/* Section 2 */}
        <section aria-labelledby="s2" className="mt-12">
          <h2
            id="s2"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            2. Approved and prohibited uses
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Approved.</strong> Staff may use approved AI
            tools to: draft first versions of appeals, thank-you letters, and social
            copy; summarize documents and meeting notes; research funders and prospects
            from public information; clean and structure data; and generate ideas and
            outlines.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Prohibited.</strong> AI may not be used to:
            send any donor-facing communication without human review; make a final
            decision to solicit, decline, or deprioritize a specific person; generate
            impact claims, statistics, or beneficiary stories that are not
            independently verified; create synthetic images or voices of real
            beneficiaries, staff, or donors; or process the data listed in Section 4 in
            an unapproved tool.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Additional prohibitions for our context:</strong>{' '}
            <Field>
              add any specific to your mission, for example clinical, legal,
              immigration, or safeguarding contexts
            </Field>
            .
          </p>
        </section>

        {/* Section 3 with table */}
        <section aria-labelledby="s3" className="mt-12">
          <h2
            id="s3"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            3. Human review
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            A named person reviews and approves AI-assisted work before it leaves the
            organization. AI drafts. A human decides.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse font-body text-[13.5px]">
              <thead>
                <tr className="border-b-2 border-indigo-base/70 text-left text-indigo-base">
                  <th className="py-2 pr-4 font-semibold">Work</th>
                  <th className="py-2 pr-4 font-semibold">Review required</th>
                  <th className="py-2 font-semibold">Approver</th>
                </tr>
              </thead>
              <tbody className="text-on-ivory">
                {[
                  ['Donor communications', 'Every item, before sending'],
                  ['Grant applications and reports', 'Every item, plus fact check'],
                  ['Prospect scores and segments', 'Reviewed before outreach'],
                  ['Public content and impact claims', 'Every item, sources verified'],
                  ['Internal notes and summaries', 'Spot check'],
                ].map(([work, review]) => (
                  <tr key={work} className="border-b border-[color:var(--card-border-on-ivory)]">
                    <td className="py-3 pr-4 align-top">{work}</td>
                    <td className="py-3 pr-4 align-top">{review}</td>
                    <td className="py-3 align-top">
                      <Field>role</Field>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 font-body text-[14.5px] leading-prose text-on-ivory">
            The reviewer is accountable for accuracy, tone, and fairness, the same as
            for any other work that carries our name.
          </p>
        </section>

        {/* Section 4 */}
        <section aria-labelledby="s4" className="mt-12">
          <h2
            id="s4"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            4. Donor data and privacy
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Never entered into a general AI tool:</strong>{' '}
            donor names paired with giving history, contact details, health or
            beneficiary information, payment data, passwords, unpublished financials,
            or anything a donor shared in confidence.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Permitted:</strong> aggregated or anonymized
            data, published information, and our own already-public materials. Donor
            data may be processed inside <Field>named approved systems</Field>, which
            are covered by our contracts and data agreements.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Vendor requirements.</strong> Before approval,
            a tool must confirm in writing that our data is not used to train its
            models, state where data is stored, and offer deletion on request.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">If donor data is exposed:</strong> notify{' '}
            <Field>role</Field> within <Field>24 hours</Field> and follow our existing
            data-incident procedure.
          </p>
        </section>

        {/* Section 5 */}
        <section aria-labelledby="s5" className="mt-12">
          <h2
            id="s5"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            5. Disclosure and transparency
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            We disclose AI involvement when it materially shaped something a donor
            would reasonably want to know about. Silence costs more than candor:
            donors who discover undisclosed AI use lose trust in the organization, not
            the tool.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">We disclose when:</strong> AI generated a
            substantial portion of a published piece; AI features in imagery or audio;
            or AI is used in a decision process a donor is entitled to understand.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">We do not routinely disclose:</strong> spelling
            and grammar assistance, internal summarization, or list cleanup.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Standard language we use:</strong> “
            <Field>
              Draft your one sentence here, for example: This message was drafted with
              AI assistance and reviewed by our team.
            </Field>
            ”
          </p>
        </section>

        {/* Section 6 */}
        <section aria-labelledby="s6" className="mt-12">
          <h2
            id="s6"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            6. Approving a new tool
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            Adoption should be a decision, not a drift. Before a new AI tool is used
            for organizational work, the requester submits it to <Field>role</Field>{' '}
            with answers to five questions:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 font-body text-[14.5px] leading-prose text-on-ivory">
            <li>What specific task does this replace or improve, and how will we know it worked?</li>
            <li>What data does it need, and is that data permitted under Section 4?</li>
            <li>Where does human review sit in the workflow?</li>
            <li>What does the vendor commit to on training, storage, and deletion?</li>
            <li>What does it cost, including staff time to adopt it?</li>
          </ol>
          <p className="mt-5 font-body text-[14.5px] leading-prose text-on-ivory">
            Approved tools are listed in <Field>shared location</Field>. Anything not
            on that list is not approved for organizational work.
          </p>
        </section>

        {/* Section 7 */}
        <section aria-labelledby="s7" className="mt-12">
          <h2
            id="s7"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            7. Ownership and accountability
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            One person owns this policy: <Field>name, role</Field>. Committees may
            advise; a named person is accountable for keeping it current and answering
            questions about it.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Staff responsibilities.</strong> Use approved
            tools only, follow the review requirements, and raise anything uncertain
            rather than guessing. Nobody is penalized for asking.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Leadership sign-off:</strong>{' '}
            <Field>name, role, date</Field>.
          </p>
        </section>

        {/* Section 8 */}
        <section aria-labelledby="s8" className="mt-12">
          <h2
            id="s8"
            className="font-heading text-xl font-bold leading-tight text-indigo-base"
          >
            8. Review cadence
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            This policy is reviewed <strong className="text-indigo-base">quarterly for the
            first year</strong>, then twice a year. AI tools change faster than annual
            policy cycles, and staff practice shifts as new tools appear.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            Each review asks: what are people actually using, what went wrong or nearly
            wrong, what has changed with our vendors, and what needs to be added or
            removed.
          </p>
          <p className="mt-4 font-body text-[14.5px] leading-prose text-on-ivory">
            <strong className="text-indigo-base">Next review date:</strong> <Field>date</Field>.
            <br />
            <strong className="text-indigo-base">Owner:</strong> <Field>name</Field>.
          </p>
        </section>

        {/* Closing method */}
        <section
          aria-labelledby="close"
          className="mt-14 rounded-[8px] border-l-4 border-olive bg-white/60 p-6"
        >
          <h2 id="close" className="font-heading text-lg font-bold text-indigo-base">
            Adopting this in one meeting
          </h2>
          <p className="mt-3 font-body text-[14.5px] leading-prose text-on-ivory">
            Send the draft ahead. Spend the meeting on three questions only: what
            should AI never touch here, who signs off on donor-facing work, and when
            do we tell donors. Fill the brackets live, name the owner, set the review
            date, and publish it the same week. You can refine it at the first
            quarterly review.
          </p>
        </section>

        {/* Attribution + disclaimer */}
        <footer className="mt-14 border-t border-[color:var(--card-border-on-ivory)] pt-6 font-body text-[13px] leading-prose text-on-ivory-muted">
          <p>
            This template accompanies{' '}
            <em className="font-serif-italic italic text-indigo-base">
              {site.bookTitle}
            </em>{' '}
            by {site.author.name}, which covers governance, disclosure, and human
            accountability in depth, including the full ICFJ policy case study in
            Chapter 13. It is a starting point, not legal advice. Have counsel review
            before adoption if your context requires it.
          </p>
        </footer>
      </article>

      {/* Print-only running footer (hidden on screen) */}
      <div className="print-footer" style={{ display: 'none' }}>
        {site.author.name} · Nonprofit AI Use Policy Template ·{' '}
        {new URL(site.url).host}/nonprofit-ai-use-policy-template
      </div>
    </div>
  );
}
