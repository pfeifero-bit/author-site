import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Homepage thesis pull quote (P3 rebuild).
 *
 * Standalone indigo-base section containing:
 *  - "THE THESIS" chartreuse eyebrow
 *  - Newsreader italic pull quote with the second sentence's key phrase
 *    ("where judgment lives.") in chartreuse
 *  - Attribution line naming the CORRECT source: the book's conclusion,
 *    not Chapter 1 (fact-checked in P1 against the manuscript)
 *
 * The wrapping <figure>/<blockquote> semantics are intentional so the
 * quote is machine-readable to screen readers and to AI crawlers.
 */
export function HomeThesis() {
  return (
    <section
      aria-labelledby="thesis-eyebrow"
      className="bg-indigo-base text-on-dark"
    >
      <div className="mx-auto max-w-[960px] px-8 py-24 text-center md:py-[96px]">
        <Eyebrow surface="dark" className="mb-8 justify-center" id="thesis-eyebrow">
          The thesis
        </Eyebrow>

        <figure>
          <blockquote className="font-serif-italic text-3xl italic leading-[1.34] text-on-dark md:text-[38px]">
            AI did not change fundraising because it made tasks faster. It changed
            fundraising because it changed{' '}
            <span className="text-chartreuse">where judgment lives.</span>
          </blockquote>

          <figcaption className="mt-8 font-body text-sm text-on-dark-muted md:text-[14.5px]">
            From the book&rsquo;s conclusion. Chapter 1 opens the argument:{' '}
            <span className="text-on-dark">Why Judgment Is Becoming the Differentiator.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
