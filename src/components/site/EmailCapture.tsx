'use client';

import { useState } from 'react';

type Variant = 'footer' | 'inline';

export function EmailCapture({
  variant = 'footer',
  source = 'footer',
  buttonLabel = 'Subscribe',
  placeholder = 'Email address',
}: {
  variant?: Variant;
  source?: string;
  buttonLabel?: string;
  placeholder?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
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
        throw new Error(body.error ?? 'Subscription failed');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Subscription failed');
    }
  }

  const isFooter = variant === 'footer';
  const inputClasses = isFooter
    ? 'flex-1 rounded-md border border-cream/20 bg-cream/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/55 focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300'
    : 'flex-1 rounded-md border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/55 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500';
  const buttonClasses = isFooter
    ? 'rounded-md bg-accent-300 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-200 disabled:opacity-50'
    : 'rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-ink-700 disabled:opacity-50';

  if (status === 'success') {
    return (
      <p
        role="status"
        className={
          isFooter
            ? 'rounded-md border border-cream/20 bg-cream/5 px-4 py-3 text-sm text-cream/80'
            : 'rounded-md border border-ink/15 bg-cream px-4 py-3 text-sm text-ink/80'
        }
      >
        Thank you. Watch your inbox for a confirmation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
      <label htmlFor={`email-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`email-${source}`}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClasses}
      />
      <button type="submit" disabled={status === 'loading'} className={buttonClasses}>
        {status === 'loading' ? 'Subscribing' : buttonLabel}
      </button>
      {status === 'error' && (
        <p role="alert" className="text-xs text-red-300 sm:basis-full">
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      )}
    </form>
  );
}
