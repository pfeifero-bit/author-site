import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

/**
 * /for-companies-and-funders — advisory for AI + fundraising-tech
 * companies, platforms, and funders.
 *
 * Structure (top → bottom):
 *   1. Hero
 *   2. Advisory Sprint (6–8 weeks, fixed scope, 3 focus areas)
 *   3. Standing advisor (with independence disclosure)
 *   4. Foundations & funders (3 routes)
 *   5. Start-a-conversation mailto
 *   6. Praise (shared endorsements)
 *
 * Content is lifted verbatim from
 * design_handoff_site_restructure/design-reference/for-companies-and-funders.html.
 */

export const metadata: Metadata = buildMetadata({
  title: `AI Fundraising Advisor for Technology Companies & Funders | ${site.author.name}`,
  description:
    `${site.author.name} advises AI and fundraising-technology companies, platforms, and funders. Product and market strategy, positioning with nonprofit buyers, and portfolio/grantee strategy for foundations. Conducted independently of her role at Giving Compass.`,
  url: `${site.url}/for-companies-and-funders`,
});

const FOCUS_AREAS = [
  {
    letter: 'A',
    title: 'Product & market strategy',
    body:
      'Where an AI fundraising product fits, where it doesn’t, and what to build next.',
  },
  {
    letter: 'B',
    title: 'Positioning with nonprofit buyers',
    body:
      'Language and proof that lands with skeptical development teams and their boards.',
  },
  {
    letter: 'C',
    title: 'Credibility in a skeptical sector',
    body:
      'Building trust with a field that’s tired of being oversold on AI.',
  },
];

const FUNDER_ROUTES = [
  {
    title: 'Leadership briefings',
    body:
      'Brief your program officers and trustees on what AI is actually changing in fundraising, and what your grantees will ask you for next.',
  },
  {
    title: 'Grantee cohorts',
    body:
      'Run a program across a group of grantees at once: a shared briefing, a workshop series, or Sprints across several organizations. One contract, one point of contact, comparable results across the cohort.',
  },
  {
    title: 'Portfolio strategy',
    body:
      'Advise on how your portfolio should think about responsible adoption, from funding criteria to governance expectations.',
  },
];

export default function ForCompaniesAndFundersPage() {
  return (
    <div className="bg-indigo-base text-on-dark">
      {/* ───────── 1. Hero ───────── */}
      <section aria-labelledby="hero" className="mx-auto max-w-[1000px] px-8 pb-16 pt-24 md:pt-[96px]">
        <Eyebrow surface="dark" className="mb-6">
          For technology companies, platforms &amp; funders
        </Eyebrow>
        <h1
          id="hero"
          className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
        >
          For the people building the tools,{' '}
          <span className="text-chartreuse">not just buying them.</span>
        </h1>
        <p className="mt-6 max-w-[62ch] font-body text-[18px] leading-prose text-on-dark-muted">
          I advise a small number of AI and fundraising-technology companies, platforms,
          and funders each year. The brief is usually some mix of product and market
          strategy, positioning with nonprofit buyers, and earning credibility in a
          sector that has learned to distrust hype. Because I’ve documented the vendor
          landscape first-hand, the advice comes with receipts, not vibes.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={mailto('advisory')}
            className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-[13px] font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
          >
            Start an advisory conversation
          </Link>
          <Link
            href={mailto('advisory')}
            className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-[13px] font-body text-[15px] font-semibold text-on-dark transition hover:border-white/35"
          >
            Book a 20-minute intro call
          </Link>
        </div>
      </section>

      {/* ───────── 2. Advisory Sprint ───────── */}
      <section
        aria-labelledby="advisory-sprint"
        className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
      >
        <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
          <Eyebrow surface="dark" className="mb-6">
            The Advisory Sprint &middot; 6–8 weeks
          </Eyebrow>
          <h2
            id="advisory-sprint"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
          >
            A defined project with a defined answer.
          </h2>
          <p className="mt-6 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
            Most advisory relationships start here: a fixed-scope engagement built
            around one hard question your team needs answered before the next build
            cycle, launch, or raise.
          </p>

          <div className="mt-10">
            <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
              Where the work usually lands
            </p>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area.letter}
                  className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-7"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-chartreuse text-indigo-base font-heading text-sm font-extrabold"
                      aria-hidden
                    >
                      {area.letter}
                    </span>
                    <h3 className="font-heading text-lg font-bold leading-subhead tracking-micro-tight">
                      {area.title}
                    </h3>
                  </div>
                  <p className="mt-4 font-body text-[15px] leading-prose text-on-dark-muted">
                    {area.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-7 md:p-8">
            <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
              What you leave with
            </p>
            <p className="mt-4 font-body text-[16.5px] leading-prose text-on-dark">
              A written point of view your team can act on, tested against the vendor
              landscape and the buyers you’re selling to. Not a deck of options.{' '}
              <span className="font-semibold text-chartreuse">A recommendation.</span>
            </p>
            <Link
              href={mailto('advisory')}
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse"
            >
              Start an advisory conversation <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 3. Standing advisor ───────── */}
      <section aria-labelledby="standing-advisor" className="mx-auto max-w-[1000px] px-8 py-24 md:py-[96px]">
        <Eyebrow surface="dark" className="mb-6">
          Standing advisor
        </Eyebrow>
        <h2
          id="standing-advisor"
          className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
        >
          A seat across the build cycle.
        </h2>
        <p className="mt-6 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
          Platforms, companies, and foundations building over a longer horizon can
          retain a standing advisor seat. A few of these each year, and nearly all of
          them begin as an Advisory Sprint.
        </p>
        {/* Independence disclosure — required by the handoff */}
        <p className="mt-4 max-w-[62ch] border-l-2 border-chartreuse/60 pl-4 font-body text-[14.5px] leading-prose text-on-dark-muted">
          Engagements are conducted independently of Dale’s role at Giving Compass; any
          potential conflicts are disclosed in writing at the start.
        </p>
      </section>

      {/* ───────── 4. Foundations & funders ───────── */}
      <section
        aria-labelledby="funders-heading"
        className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
      >
        <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
          <Eyebrow surface="dark" className="mb-6">
            For foundations &amp; funders
          </Eyebrow>
          <h2
            id="funders-heading"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
          >
            If you fund the nonprofits navigating AI, fund the navigation too.
          </h2>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-on-dark-muted">
            Three ways funders bring this work to their portfolio.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {FUNDER_ROUTES.map((route) => (
              <li
                key={route.title}
                className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-7"
              >
                <h3 className="font-heading text-lg font-bold leading-subhead tracking-micro-tight">
                  {route.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-prose text-on-dark-muted">
                  {route.body}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href={mailto('advisory')}
              className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-[13px] font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
            >
              Tell me what you’re planning
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 5. Start-a-conversation mailto ───────── */}
      <section
        aria-labelledby="conversation-heading"
        className="mx-auto max-w-[860px] px-8 py-24 text-center md:py-[96px]"
      >
        <Eyebrow surface="dark" className="mb-6 justify-center">
          Start a conversation
        </Eyebrow>
        <h2
          id="conversation-heading"
          className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
        >
          Tell me what you’re building or funding.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
          A sentence or two is plenty. I respond within three business days.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href={mailto('advisory')}
            className="inline-flex items-center rounded-pill bg-chartreuse px-7 py-4 font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
          >
            Email about advisory
          </Link>
          <Link
            href={mailto('advisory')}
            className="font-body text-sm text-periwinkle underline decoration-periwinkle/40 decoration-1 underline-offset-4 transition hover:text-on-dark"
          >
            {site.contact.email}
          </Link>
        </div>
      </section>

      {/* ───────── 6. Praise (shared endorsements from site.ts) ───────── */}
      <section
        aria-labelledby="praise-heading"
        className="mx-auto max-w-standard border-t border-[color:var(--hairline-on-dark)] px-8 py-24 md:py-[96px]"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <h2
            id="praise-heading"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
          >
            Trusted by leaders in the field.
          </h2>
          <p className="mt-3 font-body text-[14px] text-on-dark-muted">
            Client references available on request.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {site.endorsements.map((e) => (
            <li
              key={e.name}
              className="flex flex-col rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7"
            >
              <blockquote className="flex-1 font-serif-italic text-[16.5px] italic leading-relaxed text-on-dark">
                “{e.quote}”
              </blockquote>
              <footer className="mt-6 border-t border-[color:var(--hairline-on-dark)] pt-4">
                <p className="font-body text-sm font-semibold text-on-dark">{e.name}</p>
                <p className="mt-1 font-body text-xs text-on-dark-muted">{e.title}</p>
              </footer>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
