import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { ConversionEvents } from '@/components/site/ConversionEvents';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Chapter 1 is on its way | Dale Nirvani Pfeifer',
    description:
      'Thanks for requesting Chapter 1. Check your inbox in the next few minutes.',
    url: `${site.url}/thank-you`,
  }),
  // Don't index the thank-you page — it's a post-conversion destination.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Conversion events fire on mount. Wired into GTM/GA4/Google Ads
          in a separate tracking ticket; this component is the placeholder
          that emits the event names listed in the spec. */}
      <ConversionEvents events={['chapter_download_complete']} />

      <section className="container-prose py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-on-cream">
          <span aria-hidden className="mr-3 inline-block h-px w-3 bg-accent-on-cream align-middle" />
          Thank you
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          Chapter 1 is on its way.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
          The PDF is in your inbox now. If it does not appear within a few
          minutes, check your spam folder or{' '}
          <Link
            href="/contact"
            className="underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-ink"
          >
            send a quick note
          </Link>
          . While you wait, two things you might enjoy.
        </p>
      </section>

      <section
        aria-labelledby="buy-the-book"
        className="container-prose pb-16 md:pb-24"
      >
        <div className="rounded-md border border-ink/10 bg-cream-50 p-8 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-on-cream">
            The book is out
          </p>
          <h2
            id="buy-the-book"
            className="mt-4 max-w-2xl text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-[1.75rem]"
          >
            Ready for the full playbook?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">
            <span className="italic">{site.bookTitle}</span> is available now on Amazon.
          </p>
          <a
            href="https://www.amazon.com/dp/B0H5TKL95T"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700"
          >
            Buy on Amazon &rarr;
          </a>
        </div>
      </section>

      <section className="container-prose pb-24 md:pb-32">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-base font-semibold text-ink underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-accent-on-cream"
        >
          Read recent dispatch posts <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </>
  );
}
