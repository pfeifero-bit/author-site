'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '@/lib/site';

type Size = 'sm' | 'md';

const buttonClasses: Record<Size, string> = {
  sm: 'inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-ink-700',
  md: 'inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700',
};

/**
 * "Join the Waitlist" trigger that opens a centered modal email capture.
 * On submit it POSTs to /api/subscribe with source="waitlist", which is
 * already wired to Resend (preferred), Formspree (fallback), or dev-mode
 * console logging when no provider env vars are set.
 */
export function WaitlistButton({
  size = 'md',
  label = 'Join the Waitlist',
  className = '',
  withArrow = false,
}: {
  size?: Size;
  label?: string;
  className?: string;
  withArrow?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${buttonClasses[size]} ${className}`}
      >
        {label}
        {withArrow && <span aria-hidden>&rarr;</span>}
      </button>
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset modal state every time it opens.
  useEffect(() => {
    if (open) {
      setEmail('');
      setStatus('idle');
      setErrorMessage('');
      // focus the email input on the next tick so the focus ring isn't
      // captured by the trigger button.
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'waitlist' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="waitlist-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/60 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="waitlist-card"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-md border border-ink/10 bg-cream p-8 shadow-[0_30px_80px_-25px_rgba(14,27,63,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-ink/55 transition hover:bg-ink/[0.06] hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
              </svg>
            </button>

            {status === 'success' ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
                  Thank you
                </p>
                <h2
                  id="waitlist-title"
                  className="mt-3 text-balance text-2xl font-extrabold leading-snug tracking-tight text-ink md:text-[1.65rem]"
                >
                  You&rsquo;re on the list. We&rsquo;ll be in touch.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  Watch your inbox the week pre-orders open. You can close this window now.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className={`${buttonClasses.md} mt-6`}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
                  Waitlist
                </p>
                <h2
                  id="waitlist-title"
                  className="mt-3 text-balance text-2xl font-extrabold leading-snug tracking-tight text-ink md:text-[1.65rem]"
                >
                  Join the Waitlist
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-ink/70">
                  Be the first to know when{' '}
                  <span className="italic">{site.bookTitle}</span> is available to pre-order.
                </p>

                <form onSubmit={handleSubmit} className="mt-6" noValidate>
                  <label htmlFor="waitlist-email" className="sr-only">
                    Your email address
                  </label>
                  <input
                    ref={inputRef}
                    id="waitlist-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/45 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending' : 'Notify Me'}
                  </button>

                  {status === 'error' && (
                    <p role="alert" className="mt-3 text-xs text-red-600">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-ink/55">
                    We use your email only to notify you about the book. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
