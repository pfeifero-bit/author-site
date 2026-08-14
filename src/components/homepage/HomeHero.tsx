'use client';

import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Homepage hero (P3 rebuild).
 *
 * Dark indigo section with:
 *  - Radial periwinkle + chartreuse ambient gradients
 *  - 26px dot grid overlay, radially masked
 *  - Two-column grid (~1.15 / 0.85) on desktop, stacked on mobile
 *  - Left: SPEAKER · AUTHOR · ADVISOR eyebrow, two-tone Bricolage H1,
 *    subhead, primary lime pill + ghost pill
 *  - Right: book cover (300px wide, rotated -3deg, floating animation)
 *    over a radial lime glow (pulsing opacity animation)
 *
 * All animations respect `prefers-reduced-motion` (killed globally in
 * globals.css when the user opts out).
 */

const CHAPTER_ONE_MAILTO =
  'mailto:dale@aifundraisingfornonprofits.com?subject=Chapter%201%20request';

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-indigo-base text-on-dark"
    >
      {/* Ambient gradient wash — periwinkle + chartreuse radial. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(680px 520px at 76% 34%, rgba(192,216,255,.18), transparent 60%), radial-gradient(560px 460px at 78% 40%, rgba(225,246,77,.10), transparent 62%)',
        }}
      />

      {/* Dot-grid overlay, radially masked so it fades toward edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,.16) 1px, transparent 1.4px)',
          backgroundSize: '26px 26px',
          WebkitMaskImage:
            'radial-gradient(60% 60% at 50% 40%, #000, transparent 78%)',
          maskImage:
            'radial-gradient(60% 60% at 50% 40%, #000, transparent 78%)',
        }}
      />

      {/* Content grid */}
      <div className="relative mx-auto grid max-w-hero grid-cols-1 items-center gap-14 px-8 pb-[76px] pt-[84px] md:grid-cols-[1.15fr_0.85fr] md:gap-[56px]">
        <div>
          {/* Eyebrow */}
          <p className="mb-[26px] inline-flex items-center gap-[9px] font-body text-[12.5px] font-semibold uppercase leading-none tracking-eyebrow text-chartreuse">
            <span aria-hidden className="inline-block h-px w-eyebrow-rule bg-chartreuse" />
            Speaker &middot; Author &middot; Advisor
          </p>

          {/* Two-tone headline */}
          <h1
            id="hero-heading"
            className="mb-[22px] font-heading text-5xl font-bold leading-display tracking-tightest md:text-[56px]"
          >
            AI is changing how nonprofits raise money.{' '}
            <span className="text-chartreuse">I help you get ahead of it.</span>
          </h1>

          {/* Subhead */}
          <p className="mb-[34px] max-w-[540px] font-body text-[18.5px] leading-prose text-on-dark-muted">
            {site.author.name} speaks to nonprofit audiences on AI and the future of
            giving, and helps fundraising teams put it to work with confidence. Author
            of{' '}
            <Link
              href="/the-book"
              className="text-periwinkle transition hover:text-on-dark"
            >
              <em className="font-serif-italic italic">{site.bookTitle}</em>
            </Link>
            .
          </p>

          {/* CTA pair */}
          <div className="flex flex-wrap gap-[14px]">
            <Link
              href="#ways-to-work"
              className="inline-flex items-center rounded-pill bg-chartreuse px-7 py-[15px] font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
            >
              Work with Dale
            </Link>
            <a
              href={CHAPTER_ONE_MAILTO}
              className="inline-flex items-center rounded-pill border border-[color:var(--hairline-on-dark)] bg-white/[0.03] px-6 py-[15px] font-body text-base font-semibold text-on-dark transition hover:border-white/35"
            >
              Get Chapter 1 Free
            </a>
          </div>
        </div>

        {/* Right column: book cover + glow */}
        <div className="relative flex justify-center">
          {/* Radial chartreuse glow behind the cover. Pulses opacity. */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[340px] w-[340px] animate-glow-pulse rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(225,246,77,.22), transparent 66%)',
              filter: 'blur(10px)',
            }}
          />
          {/* Cover with gentle float animation. -3deg tilt matches the
              handoff reference; keeps the cover from feeling static. */}
          <div className="relative -rotate-[3deg] motion-safe:animate-cover-float">
            <Image
              src="/images/book-cover.jpg"
              alt={`${site.bookTitle}, by ${site.author.name}`}
              width={300}
              height={450}
              priority
              sizes="300px"
              className="rounded-lg"
              style={{
                boxShadow:
                  '0 40px 90px -22px rgba(0,0,0,.75), 0 0 0 1px rgba(192,216,255,.28)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
