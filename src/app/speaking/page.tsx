import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BandedStrip } from '@/components/ui/BandedStrip';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

/**
 * /speaking — event organizers and program chairs deciding whether to book.
 *
 * Restored from notFound() with the P4 restructure. Content comes verbatim
 * from design_handoff_site_restructure/design-reference/speaking.html.
 *
 * Tone constraints, from the handoff:
 *   - understated, book-jacket restraint
 *   - no superlatives ("renowned", "sought-after", "thought leader")
 *   - no exclamation points
 *   - short direct sentences
 *   - no speaker reel, video placeholder, poster frame, play button, or
 *     "coming soon" text
 */

export const metadata: Metadata = buildMetadata({
  title: `AI Fundraising Keynote Speaker | ${site.author.name}`,
  description: `${site.author.name} speaks to nonprofit audiences on AI and the future of giving. Signature talks on donor visibility, judgment in fundraising, and disclosure of AI use. Author of ${site.bookTitle}.`,
  url: `${site.url}/speaking`,
});

type Talk = {
  title: string;
  subtitle: string;
  description: string;
  proof: React.ReactNode;
};

const TALKS: Talk[] = [
  {
    title: 'The Invisible Middle',
    subtitle:
      'What happens to everyone who was findable in the search era and is not in the recommendation era.',
    description:
      'Donors increasingly meet causes through recommendations, not searches, and organizations that were easy to find are becoming easy to miss. This talk shows event audiences where the invisible middle is forming and what it takes to stay in the answer.',
    proof: 'Based on search behaviour across two million annual users of Giving Compass.',
  },
  {
    title: 'Where Judgment Lives',
    subtitle: 'AI did not make the work faster. It moved the decisions that matter.',
    description:
      'AI now drafts the appeal, ranks the prospects, and suggests the ask, which means the human work has moved to deciding what goes out and why. This talk maps where judgment sits now and which decisions should never leave human hands.',
    proof: (
      <>
        The central argument of{' '}
        <em className="font-serif-italic italic">{site.bookTitle}</em>.
      </>
    ),
  },
  {
    title: 'The Trust Test',
    subtitle: 'Whether to admit you used AI, and what it costs either way.',
    description:
      'Every organization using AI faces the same quiet question: do we tell donors, and how. This talk works through what disclosure earns, what silence risks, and how to set a standard before someone else sets it for you.',
    proof:
      'Drawn from funder and grantee interviews across the 2026 giving season.',
  },
];

const APPEARANCE_LOGOS = [
  { file: 'logo-tedx.png',      alt: 'TEDx',           maxHeight: 24, whiten: true },
  { file: 'logo-un.png',        alt: 'United Nations', maxHeight: 44, whiten: false },
  { file: 'logo-sxsw.png',      alt: 'SXSW',           maxHeight: 21, whiten: true },
  { file: 'logo-money2020.png', alt: 'Money 20/20',    maxHeight: 32, whiten: false },
];

export default function SpeakingPage() {
  return (
    <div className="bg-indigo-base text-on-dark">
      {/* ───────── Header block ───────── */}
      <header className="mx-auto max-w-[860px] px-8 pb-8 pt-24 md:pt-[96px]">
        <h1 className="font-heading text-4xl font-bold leading-heading tracking-tightish md:text-[48px]">
          {site.author.name}
        </h1>
        <p className="mt-3 font-body text-[16.5px] leading-prose text-on-dark-muted">
          Author of{' '}
          <em className="font-serif-italic italic text-on-dark">{site.bookTitle}</em>. CEO
          of Giving Compass.
        </p>
      </header>

      {/* ───────── Opening statement ───────── */}
      <section className="mx-auto max-w-[860px] px-8 py-16">
        <p className="font-serif-italic text-2xl italic leading-[1.35] text-on-dark md:text-[28px]">
          Two million donors a year come to Giving Compass to decide where to give. Dale
          speaks about what happens to that decision when an AI makes it first.
        </p>
      </section>

      {/* ───────── Signature talks ───────── */}
      <section aria-labelledby="signature-talks" className="mx-auto max-w-standard px-8 py-16 md:py-24">
        <Eyebrow surface="dark" className="mb-6" id="signature-talks">
          Signature talks
        </Eyebrow>
        <ul className="mt-8 divide-y divide-[color:var(--hairline-on-dark)] border-y border-[color:var(--hairline-on-dark)]">
          {TALKS.map((talk) => (
            <li key={talk.title} className="grid gap-4 py-10 md:grid-cols-[0.9fr_1.6fr] md:gap-14 md:py-12">
              <div>
                <h2 className="font-heading text-2xl font-bold leading-heading tracking-tightish md:text-[28px]">
                  {talk.title}
                </h2>
                <p className="mt-3 font-body text-[15.5px] leading-prose text-chartreuse/90">
                  {talk.subtitle}
                </p>
              </div>
              <div>
                <p className="font-body text-[16.5px] leading-prose text-on-dark-muted">
                  {talk.description}
                </p>
                <p className="mt-4 font-body text-[13.5px] italic leading-relaxed text-on-dark-muted/85">
                  {talk.proof}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Formats row ───────── */}
      <section className="mx-auto max-w-standard px-8 pb-16">
        <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated px-6 py-6 md:px-8">
          <p className="font-body text-[15.5px] leading-relaxed text-on-dark-muted">
            <span className="font-semibold text-on-dark">Formats:</span>{' '}
            Keynote, 30 to 45 minutes{' '}
            <span aria-hidden className="mx-2 text-on-dark-muted/50">&middot;</span>{' '}
            Moderated conversation or panel{' '}
            <span aria-hidden className="mx-2 text-on-dark-muted/50">&middot;</span>{' '}
            Board and leadership session{' '}
            <span aria-hidden className="mx-2 text-on-dark-muted/50">&middot;</span>{' '}
            Workshop, 90 minutes{' '}
            <span aria-hidden className="mx-2 text-on-dark-muted/50">&middot;</span>{' '}
            <span className="text-on-dark">Select sessions are CFRE-accredited</span>
          </p>
        </div>
      </section>

      {/* ───────── Workshops secondary section (visually lighter) ───────── */}
      <section
        aria-labelledby="workshops-heading"
        className="mx-auto max-w-standard px-8 py-16 md:py-20"
      >
        <div aria-hidden className="mb-14 h-px w-full bg-[color:var(--hairline-on-dark)]" />
        <h2
          id="workshops-heading"
          className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[32px]"
        >
          Workshops and working sessions
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          <li className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7">
            <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight">
              The AI Visibility Audit
            </h3>
            <p className="mt-3 font-body text-[15.5px] leading-prose text-on-dark-muted">
              90-minute working session. Teams run the audit live and leave with their
              own results.
            </p>
          </li>
          <li className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-7">
            <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight">
              Adopting AI Without Losing the Room
            </h3>
            <p className="mt-3 font-body text-[15.5px] leading-prose text-on-dark-muted">
              Governance for organizations without a compliance department.
            </p>
          </li>
        </ul>
      </section>

      {/* ───────── Selected appearances (banded strip) ───────── */}
      <BandedStrip aria-labelledby="appearances-label">
        <div className="mx-auto flex max-w-standard flex-col items-center gap-6 px-8 py-[34px]">
          <p
            id="appearances-label"
            className="font-body text-[12px] font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted"
          >
            Selected appearances
          </p>
          <ul className="grid w-full max-w-[720px] grid-cols-2 items-center gap-9 md:grid-cols-4">
            {APPEARANCE_LOGOS.map((logo) => (
              <li key={logo.file} className="flex h-14 items-center justify-center">
                <Image
                  src={`/images/press-logos/${logo.file}`}
                  alt={logo.alt}
                  width={200}
                  height={logo.maxHeight}
                  sizes="(min-width: 768px) 180px, 40vw"
                  className="block h-auto w-auto max-w-full opacity-[0.72]"
                  style={{
                    maxHeight: `${logo.maxHeight}px`,
                    filter: logo.whiten ? 'brightness(0) invert(1)' : undefined,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </BandedStrip>

      {/* ───────── Booking (mailto) ───────── */}
      <section
        aria-labelledby="booking-heading"
        className="mx-auto max-w-[860px] px-8 py-24 text-center md:py-[96px]"
      >
        <Eyebrow surface="dark" className="mb-6 justify-center">
          Booking
        </Eyebrow>
        <h2
          id="booking-heading"
          className="font-heading text-4xl font-bold leading-heading tracking-tightish md:text-[40px]"
        >
          Bring one of these talks to your event.
        </h2>
        <p className="mx-auto mt-6 max-w-[56ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
          Email Dale with your audience, date, and the moment you want the talk to
          create. Every session is shaped to the room, never a stock deck. She responds
          to every inquiry within three business days.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href={mailto('speaking')}
            className="inline-flex items-center rounded-pill bg-chartreuse px-7 py-4 font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
          >
            Email about speaking
          </Link>
          <Link
            href={mailto('speaking')}
            className="font-body text-sm text-periwinkle underline decoration-periwinkle/40 decoration-1 underline-offset-4 transition hover:text-on-dark"
          >
            {site.contact.email}
          </Link>
        </div>
      </section>
    </div>
  );
}
