import Link from 'next/link';
import { EmailCapture } from './EmailCapture';
import { site } from '@/lib/site';

export function Footer() {
  return (
            <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            The dispatch
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Field notes on AI and philanthropy.
          </h2>
          <p className="mt-3 max-w-md text-cream/70">
            One thoughtful note a month on AI, philanthropy, and the practice of fundraising. No noise, no spam.
          </p>
          <div className="mt-6 max-w-md">
            <EmailCapture source="footer" buttonLabel="Subscribe" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:justify-self-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/65">Site</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 transition hover:text-accent-300">
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
                  className="text-cream/80 transition hover:text-accent-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.author.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition hover:text-accent-300"
                >
                  Giving Compass
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 transition hover:text-accent-300">
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
