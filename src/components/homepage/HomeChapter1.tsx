import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Homepage Chapter 1 request section (P3, new).
 *
 * Two-column indigo-elevated card. Left holds the pitch; right holds
 * the mailto CTA with the address rendered as visible text below (so
 * it can be copied when a browser blocks `mailto:` handling).
 *
 * All forms across the site are being replaced with mailto per the
 * design brief. This section is the homepage's Chapter 1 capture.
 *
 * Subject line matches the handoff's triage table:
 *   `Chapter 1 request`
 *
 * The mailbox `dale@aifundraisingfornonprofits.com` was confirmed
 * monitored (May 2026) before shipping.
 */

const DALE_EMAIL = 'dale@aifundraisingfornonprofits.com';
const CHAPTER_ONE_MAILTO = `mailto:${DALE_EMAIL}?subject=${encodeURIComponent(
  'Chapter 1 request',
)}`;

export function HomeChapter1() {
  return (
    <section
      aria-labelledby="chapter-one-heading"
      className="bg-indigo-elevated text-on-dark"
    >
      <div className="mx-auto grid max-w-standard gap-14 px-8 py-24 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-[96px]">
        {/* Left column: the pitch */}
        <div>
          <Eyebrow surface="dark" className="mb-4">
            Chapter 1, free
          </Eyebrow>
          <h2
            id="chapter-one-heading"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish text-on-dark md:text-[34px]"
          >
            Read the argument the book is built on.
          </h2>
          <p className="mt-5 max-w-[46ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
            Chapter 1 opens with{' '}
            <em className="font-serif-italic italic">
              Why Judgment Is Becoming the Differentiator
            </em>{' '}
            — the shift from adoption to allocation and what it means for
            fundraising work in 2026. Email Dale and she&rsquo;ll send it back.
          </p>
        </div>

        {/* Right column: the request card */}
        <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-8 md:p-9">
          <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
            Request Chapter 1
          </p>

          <a
            href={CHAPTER_ONE_MAILTO}
            className="mt-6 inline-flex w-full items-center justify-center whitespace-nowrap rounded-pill bg-chartreuse px-7 py-4 font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
          >
            Email for Chapter 1
          </a>

          {/* Visible email address as fallback if mailto is blocked. */}
          <p className="mt-4 text-center font-body text-[13px] text-on-dark-muted">
            or write to{' '}
            <a
              href={CHAPTER_ONE_MAILTO}
              className="text-periwinkle underline decoration-periwinkle/40 decoration-1 underline-offset-4 transition hover:text-on-dark"
            >
              {DALE_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
