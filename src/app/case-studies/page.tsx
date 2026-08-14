import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { jsonLdScript } from '@/lib/jsonLd';

/**
 * /case-studies — hub built to be cited by AI assistants.
 *
 * The direct-answer paragraph in section 1 is designed to sit inside
 * the first 100 words so answer engines can quote it verbatim. Three
 * full cases (STC Australia, Make-A-Wish Arizona, CVT) follow in the
 * "The problem / The method / The result" structure recommended by
 * the handoff. The 9-more grid names every remaining case with its
 * tool, chapter, and headline stat.
 *
 * CollectionPage JSON-LD ties the three hero cases together as
 * hasPart entries so AI search can navigate the hub structure.
 */

export const metadata: Metadata = buildMetadata({
  title: `Nonprofit AI case studies — does AI increase donations? | ${site.author.name}`,
  description:
    'Twelve documented AI fundraising case studies from Artificial Intelligence for Nonprofit Fundraising. Save the Children Australia (+18% response), Make-A-Wish Arizona ($3.3M at 122% of goal), Center for Victims of Torture (150+ grants), plus nine more.',
  url: `${site.url}/case-studies`,
});

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${site.url}/case-studies#collection`,
  url: `${site.url}/case-studies`,
  name: `Nonprofit AI case studies — ${site.author.name}`,
  description:
    'Twelve documented AI fundraising case studies. Real organizations, named tools, verified results.',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
  },
  about: [
    { '@type': 'Thing', name: 'AI for nonprofit fundraising' },
    { '@type': 'Thing', name: 'AI fundraising tools' },
    { '@type': 'Thing', name: 'Donor retention' },
    { '@type': 'Thing', name: 'AI grant writing' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Three hero cases — full "Problem / Method / Result" format                */
/* -------------------------------------------------------------------------- */

type HeroCase = {
  slug: string;
  organization: string;
  headline: string;
  tool: string;
  useCase: string;
  result: string;
  problem: string;
  method: string;
  resultBody: string;
  chapter: number;
  chapterNote: string;
};

const HERO_CASES: HeroCase[] = [
  {
    slug: 'save-the-children-australia',
    organization: 'Save the Children Australia',
    headline: 'an 18% response lift from predictive upgrade modeling',
    tool: 'Dataro',
    useCase: 'donor upgrades',
    result: '+18% response rate vs. traditional segmentation',
    problem:
      'Recurring donors provide stability, but growth depends on knowing which of them are ready to give more. Traditional segmentation by recency, frequency, and gift size describes past behavior; it does not reliably predict who is ready to upgrade.',
    method:
      'Save the Children Australia partnered with Dataro to apply predictive modeling to its donor database. Trained on historical giving behavior and engagement data, the model scored supporters on upgrade readiness, and outreach went to the highest-ranked segments. Control-group testing validated performance, keeping a human decision between the score and the donor.',
    resultBody:
      'According to Dataro’s published case materials, the model generated an 18 percent increase in response rate compared to the organization’s traditional RFV segmentation, with more gifts from fewer mail pieces sent. The gain came from deciding who to ask, and when, not from asking more.',
    chapter: 7,
    chapterNote: 'Documented in Chapter 7 of the book, alongside Dataro’s published case study.',
  },
  {
    slug: 'make-a-wish-arizona',
    organization: 'Make-A-Wish Arizona',
    headline: 'a record $3.3 million Wish Ball on one platform',
    tool: 'OneCause (Bonterra)',
    useCase: 'event fundraising',
    result: '$3.3M raised, 122% of goal',
    problem:
      'The Wish Ball had grown into a signature event drawing nearly one thousand guests, and complexity grew faster than the team: long check-in lines, fragmented data across sponsorships and auctions, manual item procurement, and a two-week data cleanup before stewardship could begin.',
    method:
      'The team consolidated the full event lifecycle on the OneCause Fundraising Platform: auction items and bidding, sponsorship sales and invoicing, QR-code check-in with preregistration, and every supporter’s activity in a single record. Donor data stayed live in the platform, so post-event cultivation could start Monday morning.',
    resultBody:
      'The 2025 Wish Ball raised $3.3 million, 122 percent of the event goal. Auctions generated $526,000, the paddle raise drove $2 million toward Fund-A-Wish, pre-event bidding reached $80,000 before guests arrived, and check-in time dropped by 30 minutes. The organization has since expanded the platform to nearly all of its events.',
    chapter: 11,
    chapterNote: 'Documented in Chapter 11 of the book, alongside OneCause’s published case study (2025).',
  },
  {
    slug: 'center-for-victims-of-torture',
    organization: 'Center for Victims of Torture',
    headline: '150+ grants, one visible pipeline',
    tool: 'Instrumentl',
    useCase: 'grants management',
    result: 'new general operating funds',
    problem:
      "More than 150 grants a year managed across spreadsheets, with deadlines living in individual staff members' heads. Grant work was reactive: the next deadline set the agenda, and prospecting for new funders happened only when someone found spare hours.",
    method:
      'CVT moved its grants operation into Instrumentl: deadlines, tasks, documents, and funder research in one shared workspace, with historical data migrated for continuity. The team used structured filters and peer prospecting to surface aligned funders in new regions, and Instrumentl Apply to streamline application drafting. The team’s judgment still decided which opportunities to pursue; the system made the whole pipeline visible.',
    resultBody:
      'Grant work shifted from reactive deadline management to a managed pipeline. CVT expanded outreach into new geographic regions, pursued quick-turnaround opportunities it previously had to skip, and secured general operating funds in a new regional program: the hardest kind of money to raise and the most valuable kind to have.',
    chapter: 8,
    chapterNote: 'Documented in Chapter 8 of the book.',
  },
];

/* -------------------------------------------------------------------------- */
/* Nine more — card grid                                                       */
/* -------------------------------------------------------------------------- */

type NineMore = {
  organization: string;
  headline: string;
  body: string;
  chapter: number;
};

const NINE_MORE: NineMore[] = [
  {
    organization: 'Tarjimly',
    headline: 'ethical AI translation at scale',
    body: 'AI first-pass translation with human volunteers in the loop. Language assistance for more than 609,000 refugees in 2024.',
    chapter: 3,
  },
  {
    organization: 'Island Senior Resources',
    headline: 'finding hidden capacity',
    body: 'DonorSearch by EverTrue surfaced planned-giving and major-gift prospects a small human-services team had no way to spot.',
    chapter: 4,
  },
  {
    organization: 'Butler University',
    headline: 'video personalization at scale',
    body: 'Gravyty personalized video turned Giving Day outreach from a blast into a conversation.',
    chapter: 6,
  },
  {
    organization: 'Foundation Fighting Blindness',
    headline: 'one view of forty years of data',
    body: 'Virtuous Analytics replaced a fragmented legacy stack with real-time insight teams could act on.',
    chapter: 9,
  },
  {
    organization: 'Joe Nuxhall Miracle League Fields',
    headline: 'racing a $1M match',
    body: 'Bloomerang’s Penny helped a tiny team run personal outreach fast enough to capture a one-million-dollar matching gift.',
    chapter: 10,
  },
  {
    organization: 'Community Rebuilders',
    headline: 'AI in the daily workflow',
    body: 'Microsoft 365 Copilot embedded in everyday tools, saving roughly ten hours of staff time a week.',
    chapter: 12,
  },
  {
    organization: 'ICFJ',
    headline: 'building an ethical AI use policy',
    body: 'How the International Center for Journalists turned staff disagreement about AI into a shared, written standard.',
    chapter: 13,
  },
  {
    organization: 'SBP',
    headline: 'intelligent ask amounts',
    body: 'GoFundMe Pro’s predictive ask amounts during hurricane response: +66% average one-time gift, +59% donor conversion.',
    chapter: 14,
  },
  {
    organization: 'Suncoast Humane Society',
    headline: 'small team, intelligent growth',
    body: 'A lean shelter raised nearly $37,000 in an off-season campaign, re-engaging donors lapsed five and six years.',
    chapter: 15,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(collectionPageSchema) }}
      />

      <div className="bg-indigo-base text-on-dark">
        {/* ───────── 1. Hero + direct-answer paragraph ───────── */}
        <section aria-labelledby="hero" className="mx-auto max-w-[960px] px-8 pb-16 pt-24 md:pt-[96px]">
          <Eyebrow surface="dark" className="mb-6">
            Nonprofit AI case studies
          </Eyebrow>
          <h1
            id="hero"
            className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
          >
            Does AI actually increase donations?{' '}
            <span className="text-chartreuse">Here is the documented evidence.</span>
          </h1>
          {/* Direct-answer paragraph — kept under 100 words for AI-search
              verbatim quoting */}
          <p className="mt-8 font-body text-lg leading-prose text-on-dark md:text-[19px]">
            In documented cases, yes. Save the Children Australia lifted appeal response
            rates 18 percent with predictive upgrade modeling. Make-A-Wish Arizona
            raised $3.3 million, 122 percent of goal, at its 2025 Wish Ball.
            Disaster-recovery nonprofit SBP saw a 59 percent increase in donor
            conversion from AI-suggested ask amounts. Details below, with the
            organization, the tool, and the method named in each case.
          </p>
          <p className="mt-6 font-body text-[15px] leading-prose text-on-dark-muted">
            All twelve case studies are documented in full in{' '}
            <Link
              href="/the-book"
              className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
            >
              <em className="font-serif-italic italic">{site.bookTitle}</em>
            </Link>{' '}
            by {site.author.name}.
          </p>
        </section>

        {/* ───────── 2. Three hero cases ───────── */}
        {HERO_CASES.map((c, i) => {
          const isEven = i % 2 === 0;
          return (
            <section
              key={c.slug}
              id={c.slug}
              aria-labelledby={`${c.slug}-heading`}
              className={
                isEven
                  ? 'border-y border-[color:var(--hairline-on-dark)] bg-indigo-elevated'
                  : ''
              }
            >
              <div className="mx-auto max-w-[960px] px-8 py-24 md:py-[96px]">
                <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                  {c.organization}
                </p>
                <h2
                  id={`${c.slug}-heading`}
                  className="mt-3 font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
                >
                  {c.organization.split(' ').slice(0, 2).join(' ')}
                  {c.organization.split(' ').length > 2 ? ' ' + c.organization.split(' ').slice(2).join(' ') : ''}: {c.headline}
                </h2>

                {/* Tag row */}
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-body text-[13.5px] text-on-dark-muted">
                  <li>
                    <span className="font-semibold uppercase tracking-widest text-on-dark-muted/70">
                      Tool:
                    </span>{' '}
                    <span className="text-on-dark">{c.tool}</span>
                  </li>
                  <li>
                    <span className="font-semibold uppercase tracking-widest text-on-dark-muted/70">
                      Use case:
                    </span>{' '}
                    <span className="text-on-dark">{c.useCase}</span>
                  </li>
                  <li>
                    <span className="font-semibold uppercase tracking-widest text-on-dark-muted/70">
                      Result:
                    </span>{' '}
                    <span className="text-chartreuse">{c.result}</span>
                  </li>
                </ul>

                {/* Problem / Method / Result */}
                <div className="mt-12 space-y-8">
                  <div>
                    <h3 className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                      The problem.
                    </h3>
                    <p className="mt-3 font-body text-[16.5px] leading-prose text-on-dark">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                      The method.
                    </h3>
                    <p className="mt-3 font-body text-[16.5px] leading-prose text-on-dark">
                      {c.method}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                      The result.
                    </h3>
                    <p className="mt-3 font-body text-[16.5px] leading-prose text-on-dark">
                      {c.resultBody}
                    </p>
                  </div>
                </div>

                <p className="mt-10 font-body text-[13.5px] italic leading-relaxed text-on-dark-muted">
                  {c.chapterNote}
                </p>
              </div>
            </section>
          );
        })}

        {/* ───────── 3. Nine more grid ───────── */}
        <section
          aria-labelledby="nine-more"
          className="border-t border-[color:var(--hairline-on-dark)] bg-indigo-elevated"
        >
          <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
            <Eyebrow surface="dark" className="mb-4">
              And nine more
            </Eyebrow>
            <h2
              id="nine-more"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              Nine more, documented in the book.
            </h2>
            <p className="mt-4 max-w-[62ch] font-body text-[16px] leading-prose text-on-dark-muted">
              Each pairs a working framework with a named organization that tested it.
              Full write-ups will publish here; until then, the complete versions live
              in the book.
            </p>

            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {NINE_MORE.map((c) => (
                <li
                  key={c.organization}
                  className="flex flex-col rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-7"
                >
                  <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                    {c.organization}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-bold leading-subhead tracking-micro-tight text-on-dark">
                    {c.headline}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-[14.5px] leading-prose text-on-dark-muted">
                    {c.body}
                  </p>
                  <p className="mt-6 border-t border-[color:var(--hairline-on-dark)] pt-4 font-body text-xs font-medium uppercase tracking-eyebrow-wide text-on-dark-muted">
                    Chapter {c.chapter}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── 4. CTA row ───────── */}
        <section aria-labelledby="cta-heading" className="mx-auto max-w-standard px-8 py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2
                id="cta-heading"
                className="font-heading text-2xl font-bold leading-heading tracking-tightish md:text-[28px]"
              >
                Read all twelve. Run a pilot like these.
              </h2>
            </div>
            <div className="flex flex-wrap justify-start gap-4 md:justify-end">
              <Link
                href="/the-book"
                className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-3 font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                Read all twelve in the book <span aria-hidden className="ml-2">&rarr;</span>
              </Link>
              <Link
                href={mailto('nonprofit')}
                className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-3 font-body text-[15px] font-semibold text-on-dark transition hover:border-white/35"
              >
                Run a pilot like these <span aria-hidden className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
