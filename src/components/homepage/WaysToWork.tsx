import { ElevatedCard } from '@/components/ui/ElevatedCard';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * "Three ways to work with Dale" (P3, new).
 *
 * Dark indigo-base section with three linked cards. Each card:
 *   - Icon tile at top (42px, rounded, chartreuse tint bg, lime stroke)
 *   - Audience eyebrow (12px uppercase muted)
 *   - H3 (Bricolage 24px)
 *   - Body copy (Source Sans 15px muted)
 *   - Lime "→" affordance at the base
 *
 * Cards link to /for-nonprofits, /speaking, /for-companies-and-funders.
 *
 * ⚠ Interim state (P3 through P4):
 *   /speaking currently returns 404 — will get real content in P4.
 *   /for-nonprofits + /for-companies-and-funders don't exist yet — same.
 *   The section id `ways-to-work` matches the Hero's "Work with Dale"
 *   scroll anchor.
 */

type Route = {
  audience: string;
  title: string;
  body: string;
  href: string;
  icon: React.ReactNode;
};

// Small utility to render each icon consistently. Chartreuse 1.8px
// stroke on a rounded tile, per handoff.
const iconTileClass =
  'flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-chartreuse/[0.14]';

const IconStroke = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-chartreuse"
    aria-hidden
  >
    {children}
  </svg>
);

const routes: Route[] = [
  {
    audience: 'For nonprofits',
    title: 'Workshops, sprints, coaching',
    body:
      'Half- and full-day workshops, six-week AI Fundraising Sprints, and monthly coaching. Grounded in the fundraising P&L, not generic AI literacy.',
    href: '/for-nonprofits',
    icon: (
      <IconStroke>
        {/* People group */}
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        <circle cx="17" cy="6" r="2.5" />
        <path d="M22 18c0-2.5-2.2-4.5-5-4.5" />
      </IconStroke>
    ),
  },
  {
    audience: 'Speaking',
    title: 'Keynotes and panels',
    body:
      'Three signature talks for nonprofit conferences, funder gatherings, and industry stages. Select sessions are CFRE-accredited.',
    href: '/speaking',
    icon: (
      <IconStroke>
        {/* Microphone */}
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </IconStroke>
    ),
  },
  {
    audience: 'For companies & funders',
    title: 'Advisory for platforms and foundations',
    body:
      'Product and market strategy for AI + fundraising-tech companies. Grantee-cohort programs and portfolio strategy for foundations and DAF platforms.',
    href: '/for-companies-and-funders',
    icon: (
      <IconStroke>
        {/* Compass */}
        <circle cx="12" cy="12" r="9" />
        <polygon points="14.5,9.5 12,15 9.5,14.5 12,9" />
      </IconStroke>
    ),
  },
];

export function WaysToWork() {
  return (
    <section
      id="ways-to-work"
      aria-labelledby="ways-to-work-heading"
      className="bg-indigo-base text-on-dark"
    >
      <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow surface="dark" className="mb-4 justify-center">
            Work with Dale
          </Eyebrow>
          <h2
            id="ways-to-work-heading"
            className="font-heading text-4xl font-bold leading-heading tracking-tightish md:text-[40px]"
          >
            Three ways to bring the book&rsquo;s ideas into your work.
          </h2>
          <p className="mt-5 font-body text-[16.5px] leading-prose text-on-dark-muted">
            One relationship, three surfaces &mdash; pick the one that matches how you
            want to move.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {routes.map((r) => (
            <li key={r.href}>
              <ElevatedCard surface="dark" href={r.href} ariaLabel={r.audience}>
                {/* Icon tile */}
                <span className={iconTileClass}>{r.icon}</span>

                {/* Audience eyebrow */}
                <p className="mt-6 font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
                  {r.audience}
                </p>

                {/* Title */}
                <h3 className="mt-3 font-heading text-[24px] font-bold leading-subhead tracking-micro-tight text-on-dark">
                  {r.title}
                </h3>

                {/* Body */}
                <p className="mt-3 font-body text-[15px] leading-prose text-on-dark-muted">
                  {r.body}
                </p>

                {/* Lime "→" affordance */}
                <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse">
                  Learn more <span aria-hidden>&rarr;</span>
                </span>
              </ElevatedCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
