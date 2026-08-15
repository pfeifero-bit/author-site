import { Eyebrow } from '@/components/ui/Eyebrow';
import { KitForm } from '@/components/site/KitForm';

/**
 * Homepage Chapter 1 request section.
 *
 * Two-column indigo-elevated card. Left holds the pitch; right holds
 * the Kit signup form. Kit adds the subscriber to the "Chapter 1"
 * form / list, tags them, and (if a Kit incentive email or automation
 * is configured on that form in the Kit dashboard) sends the PDF.
 *
 * Anchor id `chapter-one-request` matches the Hero's ghost pill
 * scroll target so any Chapter 1 CTA elsewhere on the page lands on
 * this form.
 */

// Kit form UIDs — grab a new value from Kit dashboard if the form is
// swapped or a new one is created (Grow → Landing pages & forms →
// select form → Publish → JavaScript).
const KIT_CHAPTER_ONE_UID = '88b1b58791';
const KIT_CHAPTER_ONE_SRC =
  'https://ai-fundraising-for-nonprofits.kit.com/88b1b58791/index.js';

export function HomeChapter1() {
  return (
    <section
      id="chapter-one-request"
      aria-labelledby="chapter-one-heading"
      className="scroll-mt-24 bg-indigo-elevated text-on-dark"
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
            fundraising work in 2026. Drop your email and Dale sends the PDF.
          </p>
        </div>

        {/* Right column: the Kit form */}
        <div className="rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-8 md:p-9">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
            Request Chapter 1
          </p>
          <KitForm
            uid={KIT_CHAPTER_ONE_UID}
            src={KIT_CHAPTER_ONE_SRC}
            label="Sign up to receive Chapter 1 of AI for Nonprofit Fundraising"
          />
        </div>
      </div>
    </section>
  );
}
