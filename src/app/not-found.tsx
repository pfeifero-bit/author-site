import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-prose py-24 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
        404
      </p>
      <h1 className="mt-4 max-w-3xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        <span className="block">That page isn&rsquo;t here.</span>
        <span className="block font-medium text-accent-600">Try one of these instead.</span>
      </h1>
      <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
        The link you followed may be from an older version of this site. The current pages are
        all reachable below.
      </p>

      <ul className="mt-12 grid max-w-2xl gap-px overflow-hidden rounded-md bg-ink/10 sm:grid-cols-2">
        {site.nav.map((item) => (
          <li key={item.href} className="bg-cream">
            <Link
              href={item.href}
              className="block px-5 py-5 text-base font-bold text-ink transition hover:bg-ink/[0.02]"
            >
              {item.label}{' '}
              <span aria-hidden className="ml-1 text-ink/40 transition group-hover:text-accent-600">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
        <li className="bg-cream sm:col-span-2">
          <Link
            href="/"
            className="block px-5 py-5 text-base font-bold text-ink transition hover:bg-ink/[0.02]"
          >
            Home <span aria-hidden className="ml-1 text-ink/40">&rarr;</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
