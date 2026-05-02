'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { WaitlistButton } from './WaitlistButton';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-ink/10 bg-cream/85 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-prose flex items-center justify-between py-5">
        <Link
          href="/"
          className="text-base font-bold leading-none tracking-tight text-ink"
          aria-label={`${site.author.name} home`}
        >
          {site.author.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink/70 transition hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <WaitlistButton size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

      {open && (
        <div className="md:hidden">
          <nav aria-label="Mobile" className="container-prose pb-6">
            <ul className="flex flex-col gap-4 border-t border-ink/10 pt-4 text-base">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-1 text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <WaitlistButton size="sm" />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
