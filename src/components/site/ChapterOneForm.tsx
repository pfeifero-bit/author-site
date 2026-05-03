'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Variant = 'cream' | 'navy';

/**
 * Inline Chapter 1 email-capture form. Posts to /api/subscribe with
 * source="sample-chapter" so any downstream segmentation in Resend stays
 * stable across all instances of the form. On success, redirects to
 * /thank-you (the Chapter 1 confirmation page) where conversion events
 * fire and a soft pre-order CTA lives.
 *
 * Two style variants:
 *   cream: ink-on-cream form for the Hero
 *   navy:  cream-on-navy form for the SampleChapter section
 */
export function ChapterOneForm({
  variant = 'cream',
  buttonLabel = 'Send me Chapter 1',
  placeholder = 'Your email address',
  className = '',
  source = 'sample-chapter',
}: {
  variant?: Variant;
  buttonLabel?: string;
  placeholder?: string;
  className?: string;
  source?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong');
      }
      router.push('/thank-you');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  const isNavy = variant === 'navy';
  const inputClasses = isNavy
    ? 'flex-1 rounded-md border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/55 focus:border-accent-on-navy focus:outline-none focus:ring-1 focus:ring-accent-on-navy'
    : 'flex-1 rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/45 focus:border-accent-on-cream focus:outline-none focus:ring-1 focus:ring-accent-on-cream';

  // Both variants: white pill button with navy text. Matches the Fix 3
  // pattern (high-contrast primary CTA on navy) and reads well on cream too.
  const buttonClasses =
    'inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-ink-700 disabled:opacity-50 sm:whitespace-nowrap';
  const buttonClassesOnNavy =
    'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-cream disabled:opacity-50 sm:whitespace-nowrap';

  return (
    <form onSubmit={handleSubmit} noValidate className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <label htmlFor={`ch1-email-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`ch1-email-${source}`}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClasses}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={isNavy ? buttonClassesOnNavy : buttonClasses}
      >
        {status === 'loading' ? 'Sending' : buttonLabel}
        {status !== 'loading' && <span aria-hidden>&rarr;</span>}
      </button>
      {status === 'error' && (
        <p
          role="alert"
          className={`text-xs sm:basis-full ${isNavy ? 'text-red-300' : 'text-red-600'}`}
        >
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      )}
    </form>
  );
}
