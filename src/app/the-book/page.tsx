import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildBookSchema, buildFaqSchema, jsonLdScript } from '@/lib/jsonLd';
import { bookFaq } from '@/lib/bookFaq';

/**
 * /the-book — restyled in P5 to match the new brand system.
 *
 * Content order (per handoff the-book.html):
 *   1. Hero: cover + title + subtitle + author byline + primary Amazon
 *      pill + secondary "Get Chapter 1 Free" mailto
 *   2. Book stats row: 15 chapters · 12 case studies · 2026 landscape
 *   3. "Inside the book" description on ivory
 *   4. Praise / endorsements on indigo — Beth Kanter, Jim Fruchterman,
 *      Victoria Vrana, Meena Das (foreword)
 *   5. FAQ (kept from P2 — pulls from bookFaq.ts)
 *   6. "Bring the book to your organization" two-card block:
 *      keynotes & workshops (→ /speaking), bulk orders (→ /contact)
 *
 * Amazon link uses the confirmed ASIN B0H5TKL95T from site.retailers.
 */

const AMAZON_URL = 'https://www.amazon.com/dp/B0H5TKL95T';

export const metadata: Metadata = buildMetadata({
  title: `${site.bookTitle} | ${site.author.name}`,
  description: site.bookDescription,
  url: `${site.url}/the-book`,
  ogType: 'book',
});

const bookSchema = buildBookSchema();
const faqSchema = buildFaqSchema(bookFaq);

// Praise on /the-book includes an additional Meena Das foreword quote
// alongside the three site-wide endorsements. Kept inline here since
// the foreword-author variant is unique to this page.
const BOOK_PRAISE = [
  {
    quote:
      'This book is for every fundraiser who needs to leverage AI in their work. It offers a practical and ethical approach that fundraisers need right now.',
    name: 'Beth Kanter',
    title: 'Co-Author, The Smart Nonprofit',
  },
  {
    quote:
      'Organizations that follow her advice on governance, transparency, and keeping humans in the loop will raise more money while maintaining trust.',
    name: 'Jim Fruchterman',
    title: 'Founder, Tech Matters; Author, Technology for Good',
  },
  {
    quote:
      'A practical, honest, and deeply human guide for nonprofit leaders who know AI is here but aren’t sure where to start.',
    name: 'Victoria Vrana',
    title: 'CEO, GlobalGiving',
  },
  {
    quote:
      'Can AI help us stay human in the work that matters most? This book answers that question with a resounding yes.',
    name: 'Meena Das',
    title: 'Founder & CEO, Namaste Data · Foreword author',
    isForeword: true,
  },
] as const;

export default function BookPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(bookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema) }}
      />

      <div className="bg-indigo-base text-on-dark">
        {/* ───────── 1. Hero ───────── */}
        <section aria-labelledby="book-hero" className="mx-auto max-w-hero px-8 pb-16 pt-24 md:pt-[96px]">
          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16">
            <div>
              <Eyebrow surface="dark" className="mb-6">
                Available now on Amazon
              </Eyebrow>
              <h1
                id="book-hero"
                className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
              >
                {site.bookTitle}
              </h1>
              <p className="mt-5 max-w-[52ch] font-body text-lg leading-prose text-on-dark md:text-[18.5px]">
                How to use AI to raise more money, ethically and effectively.
              </p>
              <p className="mt-4 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
                A practical playbook for fundraisers and nonprofit leaders who carry
                both responsibility and care. By {site.author.name}.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-pill bg-chartreuse px-7 py-4 font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
                >
                  Buy on Amazon <span aria-hidden className="ml-2">&rarr;</span>
                </a>
                <Link
                  href="/#chapter-one-request"
                  className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-4 font-body text-base font-semibold text-on-dark transition hover:border-white/35"
                >
                  Get Chapter 1 Free
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/book-cover.jpg"
                alt={`${site.bookTitle}, by ${site.author.name}`}
                width={340}
                height={510}
                priority
                sizes="340px"
                className="rounded-lg"
                style={{
                  boxShadow:
                    '0 40px 90px -22px rgba(0,0,0,.75), 0 0 0 1px rgba(192,216,255,.28)',
                }}
              />
            </div>
          </div>

          {/* Book stats strip */}
          <ul className="mt-16 grid grid-cols-3 gap-6 border-t border-[color:var(--hairline-on-dark)] pt-8">
            {[
              { value: '15', label: 'chapters' },
              { value: '12', label: 'named case studies' },
              { value: '2026', label: 'platform landscape' },
            ].map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-extrabold leading-none text-chartreuse md:text-[40px]">
                  {stat.value}
                </p>
                <p className="mt-2 font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── 2. Inside the book (ivory) ───────── */}
        <section aria-labelledby="inside-heading" className="bg-ivory text-on-ivory">
          <div className="mx-auto max-w-[880px] px-8 py-24 md:py-[96px]">
            <Eyebrow surface="ivory" className="mb-6">
              Inside the book
            </Eyebrow>
            <h2
              id="inside-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish text-indigo-base md:text-[40px]"
            >
              Not a book about the future of AI. A book about using AI now.
            </h2>
            <div className="mt-8 space-y-5 font-body text-[16.5px] leading-prose text-on-ivory">
              <p>
                This is the practical playbook for fundraisers putting AI to work. Dale
                walks readers through the daily work of the job — donor retention,
                grant writing, prospect research, communications, and stewardship.
                You’ll see where AI can carry the weight, where human judgment has to
                lead, and how even one-person teams can move first.
              </p>
              <p>
                Ethics are treated as foundations, not afterthoughts. Disclosure,
                consent, governance, and human accountability run through every
                chapter, so you raise more money while protecting the trust your
                organization is built on.
              </p>
              <p>
                Each chapter pairs a working framework with a named organization that
                tested it: no stock vendors, no vague gains.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── 3. Praise ───────── */}
        <section
          aria-labelledby="praise-heading"
          className="mx-auto max-w-standard px-8 py-24 md:py-[96px]"
        >
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow surface="dark" className="mb-4 justify-center">
              What leaders are saying
            </Eyebrow>
            <h2
              id="praise-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              Praise for the book.
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {BOOK_PRAISE.map((p) => (
              <li
                key={p.name}
                className={`flex flex-col rounded-card border p-7 md:p-8 ${
                  'isForeword' in p && p.isForeword
                    ? 'border-chartreuse/40 bg-gradient-to-b from-chartreuse/[0.08] to-transparent md:col-span-2'
                    : 'border-[color:var(--hairline-on-dark)] bg-indigo-elevated'
                }`}
              >
                {'isForeword' in p && p.isForeword && (
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-chartreuse">
                    From the foreword
                  </p>
                )}
                <blockquote className="flex-1 font-serif-italic text-lg italic leading-relaxed text-on-dark md:text-[19px]">
                  “{p.quote}”
                </blockquote>
                <footer className="mt-6 border-t border-[color:var(--hairline-on-dark)] pt-4">
                  <p className="font-body text-sm font-semibold text-on-dark">
                    {p.name}
                  </p>
                  <p className="mt-1 font-body text-xs text-on-dark-muted">{p.title}</p>
                </footer>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── 4. FAQ (pulls from src/lib/bookFaq.ts) ───────── */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
        >
          <div className="mx-auto max-w-[880px] px-8 py-24 md:py-[96px]">
            <Eyebrow surface="dark" className="mb-4">
              Frequently asked
            </Eyebrow>
            <h2
              id="faq-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              Questions about the book.
            </h2>
            <dl className="mt-10 divide-y divide-[color:var(--hairline-on-dark)] border-y border-[color:var(--hairline-on-dark)]">
              {bookFaq.map((qa) => (
                <details
                  key={qa.question}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                    <dt className="font-body text-[17px] font-semibold leading-snug text-on-dark md:text-[18px]">
                      {qa.question}
                    </dt>
                    <span
                      aria-hidden
                      className="mt-1 flex-shrink-0 font-body text-xl text-chartreuse transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 font-body text-[15.5px] leading-prose text-on-dark-muted">
                    {qa.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────── 5. Bring the book to your organization ───────── */}
        <section
          aria-labelledby="bring-heading"
          className="mx-auto max-w-standard px-8 py-24 md:py-[96px]"
        >
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow surface="dark" className="mb-4 justify-center">
              Go further
            </Eyebrow>
            <h2
              id="bring-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              Bring the book to your organization.
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            <li>
              <Link
                href="/speaking"
                className="block rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-8 transition duration-[250ms] ease-card hover:-translate-y-1 hover:border-chartreuse/50 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.5)]"
              >
                <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight text-on-dark">
                  Keynotes &amp; workshops
                </h3>
                <p className="mt-3 font-body text-[15.5px] leading-prose text-on-dark-muted">
                  Bring the book’s argument to your conference or team, as a keynote or
                  a hands-on working session.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse">
                  See speaking &amp; workshops <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={mailto('contact')}
                className="block rounded-card border border-[color:var(--hairline-on-dark)] bg-indigo-elevated p-8 transition duration-[250ms] ease-card hover:-translate-y-1 hover:border-chartreuse/50 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.5)]"
              >
                <h3 className="font-heading text-xl font-bold leading-subhead tracking-micro-tight text-on-dark">
                  Bulk order inquiries
                </h3>
                <p className="mt-3 font-body text-[15.5px] leading-prose text-on-dark-muted">
                  Ordering copies for a team, board, or conference? Get in touch about
                  bulk orders.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-chartreuse">
                  Inquire about bulk orders <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
