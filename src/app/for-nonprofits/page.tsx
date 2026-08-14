import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ElevatedCard } from '@/components/ui/ElevatedCard';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

/**
 * /for-nonprofits — programmes for development teams and nonprofit leaders:
 * workshops (half or full day), the ~6-week AI Fundraising Sprint (the
 * flagship), and monthly coaching.
 *
 * Content and section order come from
 * design_handoff_site_restructure/design-reference/for-nonprofits.html.
 *
 * Structure (top → bottom):
 *   1. Hero
 *   2. Approach band (indigo-elevated)
 *   3. Three-programme cards (Workshops · Sprints · Coaching)
 *   4. Workshops detail
 *   5. Topics grid (nine topics in three lanes)
 *   6. Sprint detail on ivory (four-week timeline, Week 6 inverted)
 *   7. Coaching detail
 *   8. "Not sure which one fits?" band
 *   9. Cohort callout
 *  10. Programme enquiry (mailto)
 *  11. Praise (three endorsements from site.ts)
 */

export const metadata: Metadata = buildMetadata({
  title: `AI Fundraising Workshops, Sprints & Coaching for Nonprofits | ${site.author.name}`,
  description:
    'Workshops, sprints, and coaching for nonprofit development teams putting AI to work in their fundraising. No generic AI literacy, no tool demos. Every program starts from the fundraising numbers.',
  url: `${site.url}/for-nonprofits`,
});

/* -------------------------------------------------------------------------- */
/* Topic grid data — three lanes, three topics each, per handoff              */
/* -------------------------------------------------------------------------- */

type Topic = {
  lane: 'Governance' | 'Revenue' | 'Practice';
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

const TOPICS: Topic[] = [
  {
    lane: 'Governance',
    title: 'Creating an AI Charter',
    description:
      'A short, plain-language document that says what your organization will and won’t do with AI: the single most useful artifact most teams are missing.',
    href: '/ai-policy-template',
    linkLabel: 'Get the free template',
  },
  {
    lane: 'Governance',
    title: 'Disclosure & donor consent',
    description:
      'When to tell donors AI was involved, how to say it, and where silence costs you more than candor.',
  },
  {
    lane: 'Governance',
    title: 'Where judgment stays human',
    description:
      'Mapping your workflows to decide what AI drafts, what a person approves, and what AI never touches.',
  },
  {
    lane: 'Revenue',
    title: 'Donor retention & predictive modeling',
    description:
      'Ranking supporters by upgrade and lapse readiness, the approach behind Save the Children Australia’s 18 percent response lift in the book.',
  },
  {
    lane: 'Revenue',
    title: 'Grants: research to submission',
    description:
      'Turning grant work from reactive deadline management into a visible pipeline, and where AI drafting genuinely helps.',
  },
  {
    lane: 'Revenue',
    title: 'Prospect research & major gifts',
    description:
      'Using AI to surface and prioritize prospects without outsourcing the relationship judgment that closes them.',
  },
  {
    lane: 'Practice',
    title: 'Communications & stewardship',
    description:
      'Personalizing appeals and thank-yous at scale while keeping your organization’s actual voice intact.',
  },
  {
    lane: 'Practice',
    title: 'Choosing tools that actually work',
    description:
      'A working test for separating real products from demoware, based on documented evaluation of the vendor landscape.',
  },
  {
    lane: 'Practice',
    title: 'Small shops & one-person teams',
    description:
      'What to do first when you have no budget, no data team, and no time, including reactivating lapsed donors fast.',
  },
];

const LANE_STYLE: Record<Topic['lane'], string> = {
  Governance: 'text-chartreuse',
  Revenue:    'text-periwinkle',
  Practice:   'text-on-dark',
};

/* -------------------------------------------------------------------------- */
/* Sprint 4-week timeline data                                                */
/* -------------------------------------------------------------------------- */

type SprintWeek = {
  when: string;
  title: string;
  body: string;
  inverted?: boolean;
};

const SPRINT_WEEKS: SprintWeek[] = [
  {
    when: 'Week 1',
    title: 'Baseline',
    body:
      'A hard look at your fundraising operation, donor data, tool stack, and the one or two use cases worth chasing.',
  },
  {
    when: 'Weeks 2–3',
    title: 'Decide',
    body:
      'Evaluate real tools against your workflows, not a vendor demo, and choose what to pilot.',
  },
  {
    when: 'Weeks 4–5',
    title: 'Pilot',
    body:
      'Stand up a small pilot tied to a revenue, retention, or capacity hypothesis you can actually measure.',
  },
  {
    when: 'Week 6',
    title: 'Hand off',
    body:
      'A written AI use plan and policy, named owners, and a clear next ninety days.',
    inverted: true,
  },
];

export default function ForNonprofitsPage() {
  return (
    <div className="bg-indigo-base text-on-dark">
      {/* ───────── 1. Hero ───────── */}
      <section aria-labelledby="hero" className="mx-auto max-w-[1000px] px-8 pb-16 pt-24 md:pt-[96px]">
        <Eyebrow surface="dark" className="mb-6">
          For nonprofit organizations
        </Eyebrow>
        <h1
          id="hero"
          className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
        >
          Put AI to work in your fundraising,{' '}
          <span className="text-chartreuse">without guessing.</span>
        </h1>
        <p className="mt-6 max-w-[62ch] font-body text-[18px] leading-prose text-on-dark-muted">
          Workshops, sprints, and coaching for development teams and nonprofit leaders.
          No generic AI literacy, no tool demos. Every program starts from your
          fundraising numbers and works back to the two or three places AI genuinely
          moves them, without spending donor trust you can’t get back.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#sprint"
            className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-[13px] font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
          >
            See how the Sprint runs
          </Link>
          <Link
            href={mailto('nonprofit')}
            className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-[13px] font-body text-[15px] font-semibold text-on-dark transition hover:border-white/35"
          >
            Plan a program
          </Link>
        </div>
      </section>

      {/* ───────── 2. Approach band ───────── */}
      <section aria-labelledby="approach" className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]">
        <div className="mx-auto max-w-[1000px] px-8 py-14">
          <Eyebrow surface="dark" className="mb-4" id="approach">
            The approach
          </Eyebrow>
          <p className="font-body text-[17px] leading-prose text-on-dark">
            Every program decides who owns what, and where a human stays in the loop.
            It’s built on first-hand research into the vendor landscape, including the{' '}
            <Link
              href="/case-studies"
              className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
            >
              twelve documented case studies
            </Link>{' '}
            in the book, so you get named tools and real numbers, not a maturity model.
          </p>
        </div>
      </section>

      {/* ───────── 3. Three programme cards ───────── */}
      <section aria-labelledby="programs" className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2
            id="programs"
            className="font-heading text-4xl font-bold leading-heading tracking-tightish md:text-[40px]"
          >
            Three ways to bring AI into your fundraising.
          </h2>
          <p className="mt-5 font-body text-[16.5px] leading-prose text-on-dark-muted">
            Start with a room, a project, or a person. Each stands on its own, and most
            teams end up doing more than one.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Workshops */}
          <li>
            <ElevatedCard surface="dark" href="#workshops" ariaLabel="Workshops">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
                Half or full day
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold leading-subhead tracking-micro-tight">
                Workshops
              </h3>
              <p className="mt-3 font-body text-[15px] leading-prose text-on-dark-muted">
                Get your whole team to a shared understanding and an agreed shortlist, in
                one room, in one day.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse">
                See details <span aria-hidden>&rarr;</span>
              </span>
            </ElevatedCard>
          </li>
          {/* Sprints — most popular, lime-tinted */}
          <li>
            <Link
              href="#sprint"
              aria-label="Sprints — most popular"
              className="block rounded-card border border-chartreuse/40 bg-gradient-to-b from-chartreuse/[0.14] to-transparent p-8 md:p-9 transition duration-[250ms] ease-card hover:-translate-y-1 hover:border-chartreuse/70 hover:shadow-[0_18px_40px_-22px_rgba(225,246,77,0.35)]"
            >
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                ~6 weeks &middot; most popular
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold leading-subhead tracking-micro-tight text-on-dark">
                Sprints
              </h3>
              <p className="mt-3 font-body text-[15px] leading-prose text-on-dark-muted">
                Pick one or two workflows, test them against your own data, and finish
                with a live pilot and a written plan.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse">
                See how it runs <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          </li>
          {/* Coaching */}
          <li>
            <ElevatedCard surface="dark" href="#coaching" ariaLabel="Coaching">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
                Monthly, ongoing
              </p>
              <h3 className="mt-3 font-heading text-2xl font-bold leading-subhead tracking-micro-tight">
                Coaching
              </h3>
              <p className="mt-3 font-body text-[15px] leading-prose text-on-dark-muted">
                A standing seat for a leader or small team already in motion, somewhere
                to bring the hard calls.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse">
                See details <span aria-hidden>&rarr;</span>
              </span>
            </ElevatedCard>
          </li>
        </ul>
      </section>

      {/* ───────── 4. Workshops detail ───────── */}
      <section
        id="workshops"
        aria-labelledby="workshops-heading"
        className="mx-auto max-w-standard scroll-mt-24 px-8 pb-24 md:pb-[96px]"
      >
        <Eyebrow surface="dark" className="mb-6">
          Workshops &middot; half or full day
        </Eyebrow>
        <h2
          id="workshops-heading"
          className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
        >
          A working session, not a lecture.
        </h2>
        <p className="mt-5 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
          Built for development teams, leadership groups, and whole staffs. Everyone
          leaves speaking the same language about AI, and knowing what your organization
          will actually try first.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7">
            <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight">
              How it works
            </h3>
            <ol className="mt-5 space-y-4 font-body text-[15.5px] leading-prose text-on-dark-muted">
              {[
                'A short pre-call to understand your program, team, and current stack.',
                'A live session tailored to your fundraising, not a stock curriculum.',
                'Hands-on exercises against your real workflows and donor questions.',
                'A written recap with the decisions the room reached.',
              ].map((step, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm font-semibold text-chartreuse">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7">
            <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight">
              What you leave with
            </h3>
            <ul className="mt-5 space-y-4 font-body text-[15.5px] leading-prose text-on-dark-muted">
              {[
                'A shared, jargon-free language for AI across departments.',
                'A shortlist of tools matched to your actual fundraising workflows.',
                'Clear lines on where a human signs off, and where AI never does.',
                'A first ninety days everyone in the room has agreed to.',
              ].map((item) => (
                <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-2">
                  <span aria-hidden className="mt-[3px] text-chartreuse">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 font-body text-[15px] leading-prose text-on-dark-muted">
          <span className="font-semibold text-on-dark">Half day</span> maps the
          opportunities.{' '}
          <span className="font-semibold text-on-dark">Full day</span> adds hands-on
          tool work and a written plan.
        </p>
      </section>

      {/* ───────── 5. Topics grid ───────── */}
      <section
        aria-labelledby="topics-heading"
        className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
      >
        <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
          <Eyebrow surface="dark" className="mb-6">
            Topics we can cover
          </Eyebrow>
          <h2
            id="topics-heading"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
          >
            Drawn from the book, we pick what fits your program.
          </h2>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {TOPICS.map((topic) => (
              <li
                key={topic.title}
                className="flex flex-col rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-7"
              >
                <p
                  className={`font-body text-xs font-semibold uppercase tracking-eyebrow-wide ${LANE_STYLE[topic.lane]}`}
                >
                  {topic.lane}
                </p>
                <h3 className="mt-3 font-heading text-lg font-bold leading-subhead tracking-micro-tight text-on-dark">
                  {topic.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-[15px] leading-prose text-on-dark-muted">
                  {topic.description}
                </p>
                {topic.href && topic.linkLabel && (
                  <Link
                    href={topic.href}
                    className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse"
                  >
                    {topic.linkLabel} <span aria-hidden>&rarr;</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 6. Sprint detail (ivory) ───────── */}
      <section
        id="sprint"
        aria-labelledby="sprint-heading"
        className="scroll-mt-24 bg-ivory text-on-ivory"
      >
        <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
          <Eyebrow surface="ivory" className="mb-6">
            The AI Fundraising Sprint &middot; ~6 weeks
          </Eyebrow>
          <h2
            id="sprint-heading"
            className="font-heading text-4xl font-bold leading-heading tracking-tightish text-indigo-base md:text-[44px]"
          >
            Six weeks from “where do we start” to something running.
          </h2>
          <p className="mt-6 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-ivory">
            The Sprint is the core of how I work with nonprofits. We don’t boil the
            ocean. We pick one or two workflows where AI can move your numbers, test
            them against your own data, and leave you with a plan the whole organization
            can stand behind.
          </p>

          {/* Week timeline */}
          <ul className="mt-12 grid gap-5 md:grid-cols-4">
            {SPRINT_WEEKS.map((wk) => (
              <li
                key={wk.title}
                className={`rounded-[14px] p-6 ${
                  wk.inverted
                    ? 'bg-indigo-base text-on-dark border border-transparent'
                    : 'bg-white border border-[color:var(--card-border-on-ivory)] text-on-ivory'
                }`}
              >
                <p
                  className={`font-body text-xs font-semibold uppercase tracking-eyebrow-wide ${
                    wk.inverted ? 'text-chartreuse' : 'text-olive'
                  }`}
                >
                  {wk.when}
                </p>
                <h3
                  className={`mt-3 font-heading text-lg font-bold leading-subhead tracking-micro-tight ${
                    wk.inverted ? 'text-on-dark' : 'text-indigo-base'
                  }`}
                >
                  {wk.title}
                </h3>
                <p
                  className={`mt-3 font-body text-[14.5px] leading-prose ${
                    wk.inverted ? 'text-on-dark-muted' : 'text-on-ivory-muted'
                  }`}
                >
                  {wk.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[14px] border border-[color:var(--card-border-on-ivory)] bg-white p-7">
              <h3 className="font-heading text-lg font-bold leading-subhead tracking-micro-tight text-indigo-base">
                What you leave with
              </h3>
              <ul className="mt-5 space-y-3 font-body text-[15px] leading-prose text-on-ivory">
                {[
                  'A live pilot with real numbers, not a slide deck.',
                  'A written AI use policy your leadership can review and approve.',
                  'Named tools, named owners, and a measured ninety-day plan.',
                ].map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2">
                    <span aria-hidden className="mt-[2px] text-olive">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[14px] border border-[color:var(--card-border-on-ivory)] bg-white p-7">
              <h3 className="font-heading text-lg font-bold leading-subhead tracking-micro-tight text-indigo-base">
                Who it’s for
              </h3>
              <p className="mt-5 font-body text-[15px] leading-prose text-on-ivory">
                Development teams and nonprofit leaders who take both fundraising
                performance and donor trust seriously, from small shops to organizations
                raising at scale.
              </p>
              <Link
                href={mailto('nonprofit')}
                className="mt-6 inline-flex items-center rounded-pill bg-indigo-base px-5 py-[11px] font-body text-sm font-semibold text-on-dark transition hover:bg-indigo-elevated"
              >
                Plan a Sprint <span aria-hidden className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 7. Coaching detail ───────── */}
      <section
        id="coaching"
        aria-labelledby="coaching-heading"
        className="mx-auto max-w-standard scroll-mt-24 px-8 py-24 md:py-[96px]"
      >
        <Eyebrow surface="dark" className="mb-6">
          Coaching &middot; monthly, ongoing
        </Eyebrow>
        <h2
          id="coaching-heading"
          className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
        >
          Someone to think it through with.
        </h2>
        <p className="mt-6 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
          For leaders and small teams already in motion. Between the big decisions, you
          need a place to pressure-test a vendor, sanity-check a rollout, or work out
          what to tell your board. Coaching is that place.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7">
            <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight">
              How it works
            </h3>
            <ul className="mt-5 space-y-3 font-body text-[15.5px] leading-prose text-on-dark-muted">
              {[
                'A recurring monthly session with you or your core team.',
                'You set the agenda, whatever is live that month.',
                'Async access between sessions for time-sensitive calls.',
                'Reviewed quarterly, ended whenever it stops being useful.',
              ].map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2">
                  <span aria-hidden className="mt-[6px] block h-1 w-1 rounded-full bg-chartreuse" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7">
            <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight">
              What people bring to it
            </h3>
            <ul className="mt-5 space-y-3 font-serif-italic text-[15.5px] italic leading-prose text-on-dark">
              {[
                '“This vendor is pitching us, is it real?”',
                '“Our pilot worked. How do we scale it without losing control?”',
                '“Staff are using AI unofficially. What’s our policy?”',
                '“How do I explain this to a skeptical board?”',
              ].map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 font-body text-[15px] leading-prose text-on-dark-muted">
          A few coaching seats each year. Most begin after a workshop or sprint.{' '}
          <Link
            href={mailto('nonprofit')}
            className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
          >
            Ask about availability
          </Link>
          .
        </p>
      </section>

      {/* ───────── 8. Not-sure band ───────── */}
      <section
        aria-labelledby="not-sure-heading"
        className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
      >
        <div className="mx-auto max-w-standard px-8 py-14">
          <div className="grid gap-6 md:grid-cols-[1.4fr_auto] md:items-center">
            <div>
              <h2
                id="not-sure-heading"
                className="font-heading text-2xl font-bold leading-subhead tracking-micro-tight md:text-[26px]"
              >
                Not sure which one fits?
              </h2>
              <p className="mt-3 max-w-[54ch] font-body text-[15.5px] leading-prose text-on-dark-muted">
                Most conversations start with a short call. Tell me where your team is
                and I’ll tell you honestly which program makes sense, or whether you
                need one at all.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href={mailto('nonprofit')}
                className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-3 font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                Book a short call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 9. Cohort callout ───────── */}
      <section
        aria-labelledby="cohort-heading"
        className="mx-auto max-w-standard px-8 py-16"
      >
        <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base/60 p-8">
          <h2
            id="cohort-heading"
            className="font-heading text-2xl font-bold leading-subhead tracking-micro-tight"
          >
            Running a cohort of grantees?
          </h2>
          <p className="mt-3 max-w-[62ch] font-body text-[15.5px] leading-prose text-on-dark-muted">
            Foundations and networks can run any of these programs for a group: a shared
            workshop, a series, or Sprints across several grantees at once. That work
            lives on the companies and funders page.
          </p>
          <Link
            href="/for-companies-and-funders"
            className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse"
          >
            See cohort programs <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ───────── 10. Programme enquiry (mailto) ───────── */}
      <section
        aria-labelledby="enquiry-heading"
        className="bg-ivory text-on-ivory"
      >
        <div className="mx-auto max-w-standard px-8 py-24 text-center md:py-[96px]">
          <Eyebrow surface="ivory" className="mb-6 justify-center">
            Start here
          </Eyebrow>
          <h2
            id="enquiry-heading"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish text-indigo-base md:text-[36px]"
          >
            Plan a program for your team.
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] font-body text-[16.5px] leading-prose text-on-ivory">
            Email me about your organization and what you’re trying to solve. I’ll
            recommend the right program and respond within three business days.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href={mailto('nonprofit')}
              className="inline-flex items-center rounded-pill bg-indigo-base px-6 py-3 font-body text-[15px] font-bold text-on-dark transition hover:bg-indigo-elevated"
            >
              Email about a program
            </Link>
            <Link
              href={mailto('nonprofit')}
              className="font-body text-sm text-olive underline decoration-olive/50 decoration-1 underline-offset-4 transition hover:text-indigo-base"
            >
              {site.contact.email}
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 11. Praise ───────── */}
      <section aria-labelledby="praise-heading" className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow surface="dark" className="mb-4 justify-center">
            Praise
          </Eyebrow>
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
