import Link from 'next/link';
import { site } from '@/lib/site';
import { KitForm } from '@/components/site/KitForm';

// Kit form for The Dispatch newsletter. Grab a new value from Kit
// dashboard if the form changes (Grow → Landing pages & forms →
// select form → Publish → JavaScript).
const KIT_DISPATCH_UID = 'e504d52d42';
const KIT_DISPATCH_SRC =
  'https://ai-fundraising-for-nonprofits.kit.com/e504d52d42/index.js';

/**
 * Site footer (P7 rebuild).
 *
 * From the handoff:
 *   Four columns (1.4fr / 1fr / 1fr / 1.2fr). Identity block with the
 *   wordmark and the line "Author of Artificial Intelligence for
 *   Nonprofit Fundraising. CEO of Giving Compass. Keynote speaker on
 *   AI and the future of giving." Site column, Connect column
 *   (LinkedIn, Giving Compass, Press & Media, Buy on Amazon), and The
 *   Dispatch column with the mailto subscribe button. Bottom row:
 *   copyright left, "Built quietly. Updated thoughtfully." in
 *   Newsreader italic right.
 *
 * No form: the old email input for The Dispatch was the last form on
 * the site; per handoff it is replaced with a mailto to
 * dale@aifundraisingfornonprofits.com subject "Subscribe to The Dispatch".
 */

const YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--hairline-on-dark)] bg-indigo-base text-on-dark-muted">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-14">
          {/* Identity block */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-[10px] font-heading text-[17px] font-bold leading-none tracking-tightish text-on-dark transition hover:text-chartreuse"
              aria-label={`${site.author.name} home`}
            >
              <span aria-hidden className="inline-flex h-6 w-6 items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-chartreuse">
                  <path d="M12 21s-7.5-4.5-9.5-9.5C1.2 8 3.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3 0 5.3 3 4 6.5C19.5 16.5 12 21 12 21z" />
                </svg>
              </span>
              {site.author.name}
            </Link>
            <p className="mt-5 max-w-[36ch] font-body text-[14px] leading-prose text-on-dark-muted">
              Author of{' '}
              <Link
                href="/the-book"
                className="text-on-dark transition hover:text-chartreuse"
              >
                <em className="font-serif-italic italic">{site.bookTitle}</em>
              </Link>
              . CEO of Giving Compass. Keynote speaker on AI and the future of giving.
            </p>
          </div>

          {/* Site links */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-eyebrow-wide text-on-dark">
              Site
            </p>
            <ul className="mt-5 space-y-3 font-body text-[14px]">
              {site.footerNav.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-dark-muted transition hover:text-chartreuse"
                  >
                    {link.label}
                  </Link>
                  {/* AI Policy Template gets a secondary sublink to the
                      printable template document (rendered outside the
                      parent Link to avoid nested anchor tags). */}
                  {link.href === '/ai-policy-template' && (
                    <span className="mt-0.5 block">
                      <Link
                        href="/nonprofit-ai-use-policy-template"
                        className="font-body text-[12px] text-on-dark-muted/70 underline decoration-on-dark-muted/40 decoration-1 underline-offset-2 transition hover:text-chartreuse"
                      >
                        Read the template
                      </Link>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-eyebrow-wide text-on-dark">
              Connect
            </p>
            <ul className="mt-5 space-y-3 font-body text-[14px]">
              {site.footerNav.connect.map((link) => {
                const external = link.external;
                const linkProps = external
                  ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                  : {};
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...linkProps}
                      className="text-on-dark-muted transition hover:text-chartreuse"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* The Dispatch — Kit-powered signup */}
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-eyebrow-wide text-on-dark">
              The Dispatch
            </p>
            <p className="mt-5 font-body text-[14px] leading-prose text-on-dark-muted">
              One thoughtful note a month on AI and philanthropy.
            </p>
            <div className="mt-5">
              <KitForm
                uid={KIT_DISPATCH_UID}
                src={KIT_DISPATCH_SRC}
                label="Subscribe to The Dispatch, a monthly newsletter on AI and philanthropy"
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--hairline-on-dark)] pt-6 font-body text-[12px] text-on-dark-muted md:flex-row md:items-center">
          <p>
            &copy; {YEAR} {site.author.name}. All rights reserved.
          </p>
          <p className="font-serif-italic italic">
            Built quietly. Updated thoughtfully.
          </p>
        </div>
      </div>
    </footer>
  );
}
