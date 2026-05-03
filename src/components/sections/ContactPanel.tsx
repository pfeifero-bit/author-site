'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { site } from '@/lib/site';

const subjects = [
  'Book inquiry',
  'Press or interview request',
  'Speaking inquiry',
  'Partnership',
  'General',
];

export function ContactPanel() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...payload }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Submission failed');
      }
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed');
    }
  }

  return (
    <section className="container-prose py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-12 md:gap-20">
        {/* Left column: heading + direct links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/75">
            Contact
          </p>
          <h1 className="mt-5 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            <span className="block">Get in</span>
            <span className="block text-accent-on-cream">touch.</span>
          </h1>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-ink/75">
            For book inquiries, press, speaking requests, or anything in between, the form is
            the fastest path. For shorter notes, the links below also work.
          </p>

          <div className="mt-10 space-y-5">
            <DirectLink
              label="LinkedIn"
              value="@dalepfeifer"
              href={site.author.linkedin}
            />
            <DirectLink
              label="Giving Compass"
              value="givingcompass.org"
              href={site.author.company.url}
            />
            <DirectLink
              label="Newsletter"
              value="The dispatch, monthly"
              href="/#dispatch"
            />
          </div>
        </motion.div>

        {/* Right column: form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="md:col-span-7"
        >
          {status === 'success' ? (
            <div className="rounded-md border border-ink/10 bg-cream-50 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-on-cream">
                Thank you
              </p>
              <p className="mt-3 text-2xl font-bold leading-snug text-ink">
                Your message is in. Watch your inbox.
              </p>
              <p className="mt-3 text-sm text-ink/65">
                You&rsquo;ll hear back within five business days, sooner for press and time-sensitive
                inquiries.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-5 rounded-md border border-ink/10 bg-cream p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" type="text" required autoComplete="name" />
                <Field label="Email" name="email" type="email" required autoComplete="email" />
              </div>

              <div>
                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-widest text-ink/70">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  defaultValue=""
                  className="mt-2 w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink focus:border-accent-on-cream focus:outline-none focus:ring-1 focus:ring-accent-on-cream"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-ink/70">
                  Message<span aria-hidden className="ml-1 text-accent-on-cream">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="A short note works."
                  className="mt-2 w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/55 focus:border-accent-on-cream focus:outline-none focus:ring-1 focus:ring-accent-on-cream"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending' : 'Send message'}
                {status !== 'loading' && <span aria-hidden>&rarr;</span>}
              </button>

              {status === 'error' && (
                <p role="alert" className="text-xs text-red-600">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function DirectLink({ label, value, href }: { label: string; value: string; href: string }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-baseline justify-between border-t border-ink/10 pt-4 text-ink transition hover:text-accent-on-cream"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-ink/65 group-hover:text-accent-on-cream">
        {label}
      </span>
      <span className="text-base font-semibold">{value}</span>
    </a>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-ink/70">
        {label}
        {required && <span aria-hidden className="ml-1 text-accent-on-cream">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/55 focus:border-accent-on-cream focus:outline-none focus:ring-1 focus:ring-accent-on-cream"
      />
    </div>
  );
}
