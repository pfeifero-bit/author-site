'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site';

/**
 * Sticky site header (P7 rebuild).
 *
 * From the handoff:
 *   Wordmark with lime heart glyph, left. Nav centred: For Nonprofits,
 *   Speaking, The Book, AI Policy Template, Contact. Lime pill button
 *   right: "Work with Dale". Background rgba(24,26,58,.86) with
 *   backdrop-filter: blur(14px), bottom border 1px solid rgba(192,216,255,.18).
 *
 * The blur+alpha background sits above indigo hero sections cleanly
 * and stays legible over the occasional ivory band as the page scrolls.
 */

// The "Work with Dale" pill lives in the header on every page and
// anchors down to /#ways-to-work on the homepage (where the three
// audience cards live). On any other route it lands on the homepage
// and scrolls to the same section.
const WORK_WITH_DALE_HREF = '/#ways-to-work';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[color:var(--hairline-on-dark)] backdrop-blur-[14px]"
      style={{ backgroundColor: 'rgba(24, 26, 58, 0.86)' }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-4">
        {/* Wordmark with chartreuse heart glyph */}
        <Link
          href="/"
          aria-label={`${site.author.name} home`}
          className="flex flex-none items-center gap-[10px] font-heading text-[17px] font-bold leading-none tracking-tightish text-on-dark transition hover:text-chartreuse"
        >
          <span aria-hidden className="inline-flex h-6 w-6 items-center justify-center">
            {/* Chartreuse heart. The book cover has heart glyphs scattered
                across it; the wordmark echoes them. */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-chartreuse">
              <path d="M12 21s-7.5-4.5-9.5-9.5C1.2 8 3.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.3 3 4 6.5C19.5 16.5 12 21 12 21z" />
            </svg>
          </span>
          {site.author.name}
        </Link>

        {/* Centered nav (desktop) */}
        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-5 md:flex"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-body text-[13.5px] font-medium text-on-dark-muted transition hover:text-on-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA pill (desktop) */}
        <Link
          href={WORK_WITH_DALE_HREF}
          className="hidden flex-none items-center whitespace-nowrap rounded-pill bg-chartreuse px-4 py-[9px] font-body text-[13.5px] font-bold text-indigo-base transition hover:bg-chartreuse-hover md:inline-flex"
        >
          Work with Dale
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="text-on-dark md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 7h18" strokeLinecap="round" />
                <path d="M3 17h18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-[color:var(--hairline-on-dark)] md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4 font-body text-base">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-on-dark transition hover:text-chartreuse"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Link
                href={WORK_WITH_DALE_HREF}
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-pill bg-chartreuse px-4 py-2 font-body text-sm font-bold text-indigo-base transition hover:bg-chartreuse-hover"
              >
                Work with Dale
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
