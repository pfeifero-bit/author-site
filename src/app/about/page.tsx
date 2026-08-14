import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildProfilePageSchema, jsonLdScript } from '@/lib/jsonLd';

/**
 * /about — restyled in P5 with the new brand system.
 *
 * Changes from the prior version (per handoff about.html):
 *   - Framing line leads with "Speaker, author, and advisor" BEFORE the
 *     Giving Compass CEO credential (was reversed in the old copy).
 *   - Honors strip added: "Recognized as a New Zealand Woman of the Year
 *     and one of the Washington Business Journal's 40 Under 40."
 *   - Closing paragraph with a chartreuse left border retargets the
 *     "Work With Us" link to /speaking (the old /work-with-us route now
 *     redirects there anyway).
 *   - Any "coming soon" language about the book is removed. It's out.
 */

export const metadata: Metadata = buildMetadata({
  title: `About ${site.author.name} | AI, Fundraising, and Philanthropy`,
  description:
    `${site.author.name} is a speaker, author, and advisor. CEO of Giving Compass and author of ${site.bookTitle}.`,
  url: `${site.url}/about`,
  ogType: 'profile',
});

const profileSchema = buildProfilePageSchema();

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(profileSchema) }}
      />

      <div className="bg-indigo-base text-on-dark">
        {/* ───────── 1. Hero ───────── */}
        <section aria-labelledby="about-hero" className="mx-auto max-w-hero px-8 pb-16 pt-24 md:pt-[96px]">
          <div className="grid gap-14 md:grid-cols-[1fr_0.7fr] md:items-center md:gap-16">
            <div>
              <Eyebrow surface="dark" className="mb-6">
                About
              </Eyebrow>
              <h1
                id="about-hero"
                className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
              >
                {site.author.name} on AI and philanthropy.
              </h1>
              {/* Framing line — NEW ordering per handoff: speaker, author,
                  and advisor BEFORE the CEO credential. */}
              <p className="mt-6 max-w-[62ch] font-body text-[17px] leading-prose text-on-dark-muted md:text-[18px]">
                Speaker, author, and advisor. CEO of{' '}
                <a
                  href={site.author.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
                >
                  {site.author.company.name}
                </a>
                , a philanthropic intelligence platform. Co-founder of Goodworld, the
                technology behind the #donate hashtag. Author of{' '}
                <Link
                  href="/the-book"
                  className="text-on-dark underline decoration-on-dark/40 decoration-1 underline-offset-4 transition hover:text-chartreuse"
                >
                  <em className="font-serif-italic italic">{site.bookTitle}</em>
                </Link>
                .
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/images/dale-portrait.jpg"
                  alt={`${site.author.name}, portrait`}
                  width={340}
                  height={425}
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
          </div>

          {/* Honors strip — NEW per handoff */}
          <div className="mt-14 border-t border-[color:var(--hairline-on-dark)] pt-8">
            <p className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted">
              Recognized as
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-2 font-body text-[15px] text-on-dark">
              <li>
                <span className="text-chartreuse">✦</span> New Zealand Woman of the Year
              </li>
              <li>
                <span className="text-chartreuse">✦</span> Washington Business Journal
                40 Under 40
              </li>
            </ul>
          </div>
        </section>

        {/* ───────── 2. Long bio ───────── */}
        <section
          aria-labelledby="bio-heading"
          className="bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)]"
        >
          <div className="mx-auto max-w-[880px] px-8 py-24 md:py-[96px]">
            <Eyebrow surface="dark" className="mb-6" id="bio-eyebrow">
              The long version
            </Eyebrow>
            <h2
              id="bio-heading"
              className="font-heading text-3xl font-bold leading-heading tracking-tightish md:text-[36px]"
            >
              From the giving moment to the giving system.
            </h2>
            <div className="mt-8 space-y-5 font-body text-[16.5px] leading-prose text-on-dark-muted">
              <p>
                {site.author.name} co-founded Goodworld, the technology behind the
                #donate hashtag, which lets people give on Instagram, Facebook, and X
                with a single comment. Goodworld made giving frictionless. It also
                surfaced a harder question: did frictionless generosity actually improve
                outcomes for the communities donations were meant to serve?
              </p>
              <p>
                That question carried her into the CEO role at Giving Compass, a
                philanthropic intelligence platform that helps people give purposefully
                and with impact. Giving Compass elevates high-impact, often local
                nonprofits, breaks down complex issues, and surfaces signals of trust
                and accountability so donors can move money where it matters.
              </p>
              <p>
                Across both companies, the throughline is the same. The mechanics of
                giving are now easy. The judgment behind giving is harder than ever. AI
                accelerates both. Used poorly, it amplifies noise and erodes trust.
                Used deliberately, it creates space for the human work that fundraising
                has always rested on: connection, stewardship, and the patient
                construction of long-term relationships.
              </p>
              <p>
                <em className="font-serif-italic italic text-on-dark">
                  {site.bookTitle}
                </em>{' '}
                is the book she wished existed when she first started talking to
                nonprofit leaders about AI. It is written for fundraisers who want
                practical answers, not hype, and who hold trust as seriously as targets.
              </p>
              <p>
                Dale writes and speaks on AI and philanthropy with leaders including
                Jeff Raikes, former CEO of the Bill &amp; Melinda Gates Foundation,
                with whom she co-authored the widely cited piece{' '}
                <em className="font-serif-italic italic">
                  Reducing AI Bias: A Path Forward
                </em>
                . Her work has been featured by Stanford Social Innovation Review,
                Alliance Magazine, and the Bridgespan Group.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── 3. Working together (closing paragraph with lime border) ───────── */}
        <section
          aria-labelledby="working-heading"
          className="mx-auto max-w-[880px] px-8 py-24 md:py-[96px]"
        >
          <div className="border-l-[3px] border-chartreuse pl-6 md:pl-8">
            <Eyebrow surface="dark" className="mb-4">
              Working together
            </Eyebrow>
            <h2
              id="working-heading"
              className="font-heading text-2xl font-bold leading-heading tracking-tightish md:text-[28px]"
            >
              The most useful next step depends on where you are.
            </h2>
            <p className="mt-5 max-w-[62ch] font-body text-[16.5px] leading-prose text-on-dark-muted">
              Dale works with conference organizers, nonprofit networks, and fundraising
              technology companies. Nonprofit teams can{' '}
              <Link
                href="/for-nonprofits"
                className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
              >
                start here
              </Link>
              ; companies and funders{' '}
              <Link
                href="/for-companies-and-funders"
                className="text-chartreuse underline decoration-chartreuse/40 decoration-1 underline-offset-4 transition hover:text-chartreuse-hover"
              >
                here
              </Link>
              . The book is the deepest answer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Handoff explicitly retargets the old "Work With Us" CTA
                  to /speaking — the primary way to work with Dale. */}
              <Link
                href="/speaking"
                className="inline-flex items-center rounded-pill bg-chartreuse px-6 py-3 font-body text-[15px] font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                See the ways to work together <span aria-hidden className="ml-1">&rarr;</span>
              </Link>
              <Link
                href="/the-book"
                className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-3 font-body text-[15px] font-semibold text-on-dark transition hover:border-white/35"
              >
                Read the book
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
