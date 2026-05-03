'use client';

import { useState } from 'react';

/**
 * Inline pre-order notification capture used on /thank-you. Posts to
 * /api/subscribe with source="preorder-notify" so the email platform can
 * route this to a separate "Pre-order announcement" segment in Resend.
 * That segment should be created in Resend before launch and used for
 * the day-of announcement.
 */
export function PreorderNotifyForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'preorder-notify' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className="rounded-md border border-ink/10 bg-cream px-4 py-3 text-sm font-medium text-ink"
      >
        You&rsquo;re on the pre-order list. Watch your inbox the day pre-orders open.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="preorder-email" className="sr-only">
        Email address
      </label>
      <input
        id="preorder-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/45 focus:border-accent-on-cream focus:outline-none focus:ring-1 focus:ring-accent-on-cream"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-ink-700 disabled:opacity-50 sm:whitespace-nowrap"
      >
        {status === 'loading' ? 'Sending' : 'Notify me'}
        {status !== 'loading' && <span aria-hidden>&rarr;</span>}
      </button>
      {status === 'error' && (
        <p role="alert" className="text-xs text-red-600 sm:basis-full">
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      )}
    </form>
  );
}
