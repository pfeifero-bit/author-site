import Link from 'next/link';
import { EmailCapture } from './EmailCapture';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="container-prose grid gap-10 py-12 md:grid-cols-12 md:gap-12">
        {/* Inline Dispatch signup. No heading per spec — just a small
            label so users know what list they're subscribing to. The
            Chapter 1 form already enrolls everyone in this list, so
            this is the manual opt-in path for repeat visitors. */}
        <div className="md:col-span-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-on-navy">
            Subscribe to The Dispatch
          </p>
          <div className="mt-3 max-w-md">
            <EmailCapture source="footer" buttonLabel="Subscribe" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:col-span-6 md:justify-self-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/65">Site</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 transition hover:text-accent-on-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/65">Connect</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition hover:text-accent-on-navy"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.author.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition hover:text-accent-on-navy"
                >
                  Giving Compass
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 transition hover:text-accent-on-navy">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-prose flex flex-col items-start justify-between gap-2 py-6 text-xs text-cream/65 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} {site.author.name}. All rights reserved.</p>
          <p>Built quietly. Updated thoughtfully.</p>
        </div>
      </div>
    </footer>
  );
}
