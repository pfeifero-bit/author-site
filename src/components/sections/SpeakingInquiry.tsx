'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const budgetRanges = [
  'Under $5,000',
  '$5,000 to $10,000',
  '$10,000 to $25,000',
  '$25,000 and up',
  'Honoraria only',
  'Not sure yet',
];

const formats = ['Keynote', 'Workshop', 'Panel', 'Fireside chat', 'Custom'];

export function SpeakingInquiry() {
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
        body: JSON.stringify({ type: 'speaking', ...payload }),
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
    <section
      id="inquiry"
      aria-labelledby="inquiry-heading"
      className="border-t border-ink/10 bg-ink text-cream"
    >
      <div className="container-prose grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
            Speaking inquiry
          </p>
          <h2
            id="inquiry-heading"
            className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
          >
            <span className="block">Tell us about</span>
            <span className="block text-accent-300">your event.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-cream/75">
            The more context you can share now, the faster the reply. Dale or her team will get
            back to you within five business days, and sooner for time-sensitive events.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="md:col-span-7"
        >
          {status === 'success' ? (
            <div className="rounded-md border border-cream/15 bg-cream/[0.04] p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-300">
                Thank you
              </p>
              <p className="mt-3 text-2xl font-bold leading-snug">
                Your inquiry is in. We&rsquo;ll be in touch soon.
              </p>
              <p className="mt-3 text-sm text-cream/70">
                You&rsquo;ll receive a confirmation email at the address you provided. If you do not
                see it within an hour, please check your spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 rounded-md border border-cream/10 bg-cream/[0.04] p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" type="text" required autoComplete="name" />
                <Field label="Email" name="email" type="email" required autoComplete="email" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Organization" name="organization" type="text" autoComplete="organization" />
                <Field label="Event name" name="eventName" type="text" />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Event date" name="eventDate" type="date" />
                <Field label="Audience size" name="audienceSize" type="number" min={0} placeholder="100" />
                <SelectField label="Format" name="format" options={formats} />
              </div>

              <SelectField label="Budget range" name="budget" options={budgetRanges} />

              <Field label="Topic interest" name="topic" type="text" placeholder="e.g. AI for small teams, donor trust, judgment under pressure" />

              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-cream/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Anything you want us to know about the audience, the moment, or the brief."
                  className="mt-2 w-full rounded-md border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/55 focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-300 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-200 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending' : 'Send inquiry'}
                {status !== 'loading' && <span aria-hidden>&rarr;</span>}
              </button>

              {status === 'error' && (
                <p role="alert" className="text-xs text-red-300">
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

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  min?: number;
}) {
  const id = `inq-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-cream/60">
        {label}
        {required && <span aria-hidden className="ml-1 text-accent-300">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className="mt-2 w-full rounded-md border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/55 focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const id = `inq-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-cream/60">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-md border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream focus:border-accent-300 focus:outline-none focus:ring-1 focus:ring-accent-300"
      >
        <option value="" className="bg-ink">Select</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
