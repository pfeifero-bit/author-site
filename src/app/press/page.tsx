import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

/**
 * /press — new lightweight press & media kit page.
 *
 * Per handoff press.html:
 *   - Title "Press & Media"
 *   - Short bio paragraph
 *   - Headshot download (dale-portrait.jpg)
 *   - Book cover download (book-cover.jpg)
 *   - One-line book description
 *   - Contact link
 *   - Note: "For interview and review copy requests, get in touch."
 */

const AMAZON_URL = 'https://www.amazon.com/dp/B0H5TKL95T';

export const metadata: Metadata = buildMetadata({
  title: `Press & Media | ${site.author.name}`,
  description: `Press and media kit for ${site.author.name}, author of ${site.bookTitle}. Downloadable headshot, book cover, and one-line description for interview and review requests.`,
  url: `${site.url}/press`,
});

export default function PressPage() {
  return (
    <div className="bg-indigo-base text-on-dark">
      {/* ───────── 1. Hero ───────── */}
      <section aria-labelledby="press-hero" className="mx-auto max-w-[860px] px-8 pb-16 pt-24 md:pt-[96px]">
        <Eyebrow surface="dark" className="mb-6">
          Press &amp; Media
        </Eyebrow>
        <h1
          id="press-hero"
          className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
        >
          Press &amp; Media
        </h1>
        <p className="mt-6 max-w-[62ch] font-body text-[17px] leading-prose text-on-dark md:text-[18px]">
          {site.author.name} is an advisor, keynote speaker, and author on AI and
          nonprofit fundraising, and CEO of{' '}
          <a
            href={site.author.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
          >
            Giving Compass
          </a>
          . She has spoken at TEDx, the United Nations, SXSW, and Money 20/20.
        </p>
        <p className="mt-5 font-body text-[16.5px] leading-prose text-on-dark-muted">
          For interview and review copy requests,{' '}
          <a
            href={mailto('contact')}
            className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
          >
            get in touch
          </a>
          .
        </p>
      </section>

      {/* ───────── 2. Downloadable assets ───────── */}
      <section
        aria-labelledby="assets-heading"
        className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
      >
        <div className="mx-auto max-w-standard px-8 py-24 md:py-[96px]">
          <Eyebrow surface="dark" className="mb-4">
            Downloadable
          </Eyebrow>
          <h2
            id="assets-heading"
            className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
          >
            Assets.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Headshot */}
            <div className="flex flex-col">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                Headshots
              </p>
              <div className="mt-4 overflow-hidden rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base">
                <Image
                  src="/images/dale-portrait.jpg"
                  alt={`${site.author.name}, portrait`}
                  width={550}
                  height={688}
                  sizes="(min-width: 768px) 550px, 90vw"
                  className="h-auto w-full"
                />
              </div>
              <a
                href="/images/dale-portrait.jpg"
                download="dale-nirvani-pfeifer-headshot.jpg"
                className="mt-6 inline-flex items-center rounded-pill bg-chartreuse px-5 py-3 font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                Download headshot (high-res) <span aria-hidden className="ml-2">&rarr;</span>
              </a>
              <p className="mt-3 font-body text-xs text-on-dark-muted">
                1100 × 1375 · JPG · Suggested credit: Photograph by {site.author.name}.
              </p>
            </div>

            {/* Book cover */}
            <div className="flex flex-col">
              <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                Book cover
              </p>
              <div className="mt-4 overflow-hidden rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-base p-6">
                <Image
                  src="/images/book-cover.jpg"
                  alt={`${site.bookTitle}, by ${site.author.name}`}
                  width={340}
                  height={510}
                  sizes="(min-width: 768px) 340px, 60vw"
                  className="mx-auto h-auto w-full max-w-[340px]"
                />
              </div>
              <a
                href="/images/book-cover.jpg"
                download="ai-for-nonprofit-fundraising-cover.jpg"
                className="mt-6 inline-flex items-center rounded-pill bg-chartreuse px-5 py-3 font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                Download book cover <span aria-hidden className="ml-2">&rarr;</span>
              </a>
              <p className="mt-3 font-body text-xs text-on-dark-muted">
                831 × 1246 · JPG · Front cover, 2:3 aspect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 3. Book, in one line ───────── */}
      <section aria-labelledby="one-line" className="mx-auto max-w-[880px] px-8 py-24 md:py-[96px]">
        <Eyebrow surface="dark" className="mb-4">
          The book, in one line
        </Eyebrow>
        <blockquote
          id="one-line"
          className="font-serif-italic text-2xl italic leading-[1.35] text-on-dark md:text-[30px]"
        >
          “A practical playbook for using AI to raise more money, ethically and
          effectively, without losing donor trust.”
        </blockquote>
        <p className="mt-6 font-body text-[15px] text-on-dark-muted">
          <em className="font-serif-italic italic text-on-dark">{site.bookTitle}</em>{' '}
          <span aria-hidden className="mx-2 text-on-dark-muted/50">&middot;</span>{' '}
          {site.author.name}{' '}
          <span aria-hidden className="mx-2 text-on-dark-muted/50">&middot;</span>{' '}
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
          >
            Available on Amazon
          </a>
        </p>
      </section>

      {/* ───────── 4. Contact ───────── */}
      <section
        aria-labelledby="press-contact"
        className="mx-auto max-w-[860px] border-t border-[color:var(--hairline-on-dark)] px-8 py-24 text-center md:py-[96px]"
      >
        <h2
          id="press-contact"
          className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
        >
          Get in touch.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
          Interview requests, quotes, or a review copy of the book — Dale responds
          within three business days.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={mailto('contact')}
            className="inline-flex items-center rounded-pill bg-chartreuse px-7 py-4 font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
          >
            Email Dale
          </a>
          <Link
            href="/contact"
            className="font-body text-sm text-periwinkle underline decoration-periwinkle/40 decoration-1 underline-offset-4 transition hover:text-on-dark"
          >
            All the ways to reach me
          </Link>
        </div>
      </section>
    </div>
  );
}
