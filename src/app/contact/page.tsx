import Link from 'next/link';
import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site, mailto } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

/**
 * /contact — P5 rebuild. Forms removed sitewide per the handoff.
 *
 * Structure (per handoff contact.html):
 *   - Header block: "Get in touch." + intro
 *   - Email address rendered as large prominent copyable text
 *   - Primary mailto CTA
 *   - Reference rows: LinkedIn, Giving Compass
 *
 * The Dispatch newsletter row used to live here as a mailto row, but the
 * footer now carries a Kit signup form on every page (including this one),
 * so keeping it here duplicated the same call-to-action twice.
 */

export const metadata: Metadata = buildMetadata({
  title: `Contact ${site.author.name}`,
  description:
    `Email ${site.author.name} about speaking, programs, advisory, press, or bulk book orders. Response within three business days.`,
  url: `${site.url}/contact`,
});

const REFERENCES: { label: string; value: string; href: string }[] = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/dale-pfeifer',
    href: site.author.linkedin,
  },
  {
    label: 'Giving Compass',
    value: 'givingcompass.org',
    href: site.author.company.url,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-indigo-base text-on-dark">
      {/* ───────── Header ───────── */}
      <section aria-labelledby="contact-heading" className="mx-auto max-w-[860px] px-8 pb-16 pt-24 md:pt-[96px]">
        <Eyebrow surface="dark" className="mb-6">
          Contact
        </Eyebrow>
        <h1
          id="contact-heading"
          className="font-heading text-4xl font-bold leading-display tracking-tightest md:text-[52px]"
        >
          Get in touch.
        </h1>
        <p className="mt-6 max-w-[62ch] font-body text-[17px] leading-prose text-on-dark-muted md:text-[18px]">
          For speaking, programs, advisory, press, or bulk book orders, email is the
          fastest path. I respond within three business days.
        </p>
      </section>

      {/* ───────── Email (prominent) + primary mailto ───────── */}
      <section
        aria-labelledby="email-heading"
        className="border-y border-[color:var(--hairline-on-dark)] bg-indigo-elevated"
      >
        <div className="mx-auto max-w-[860px] px-8 py-20 text-center md:py-24">
          <h2 id="email-heading" className="sr-only">
            Email {site.author.name}
          </h2>

          {/* Large, prominent, copyable email address */}
          <a
            href={mailto('contact')}
            className="inline-block break-all font-heading text-3xl font-bold leading-tight tracking-tightish text-chartreuse transition hover:text-chartreuse-hover md:text-[44px]"
          >
            {site.contact.email}
          </a>

          <div className="mt-10">
            <a
              href={mailto('contact')}
              className="inline-flex items-center rounded-pill bg-chartreuse px-7 py-4 font-body text-base font-bold text-indigo-base transition hover:bg-chartreuse-hover"
            >
              Email Dale
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Reference rows ───────── */}
      <section aria-labelledby="other-ways" className="mx-auto max-w-[860px] px-8 py-24 md:py-[96px]">
        <h2
          id="other-ways"
          className="font-body text-xs font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted"
        >
          Other places to find Dale
        </h2>
        <ul className="mt-6 divide-y divide-[color:var(--hairline-on-dark)] border-y border-[color:var(--hairline-on-dark)]">
          {REFERENCES.map((r) => {
            const external = r.href.startsWith('http');
            const linkProps = external
              ? { target: '_blank', rel: 'noopener noreferrer' as const }
              : {};
            const Tag = external ? 'a' : Link;
            return (
              <li key={r.label}>
                <Tag
                  href={r.href}
                  {...linkProps}
                  className="grid grid-cols-[10rem_1fr_auto] items-center gap-4 py-5 font-body text-[15.5px] text-on-dark transition hover:text-chartreuse"
                >
                  <span className="font-semibold uppercase tracking-widest text-on-dark-muted text-xs">
                    {r.label}
                  </span>
                  <span>{r.value}</span>
                  <span aria-hidden className="text-chartreuse">
                    &rarr;
                  </span>
                </Tag>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
