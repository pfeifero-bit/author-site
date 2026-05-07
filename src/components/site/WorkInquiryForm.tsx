'use client';

import { useState } from 'react';

/**
 * Advisory inquiry form for /work-with-us.
 *
 * Posts to /api/inquiry with type='advisory' so the existing inquiry
 * handler routes the email with an "advisory inquiry" subject line.
 * All fields beyond name/email are forwarded as-is and rendered in
 * the email body table.
 *
 * Fields per the content brief:
 *   name              required
 *   email             required (added beyond brief — needed for reply)
 *   organization      required
 *   role              required
 *   engagementType    required, dropdown
 *   timeline          required, dropdown
 *   message           required, textarea, max 500 chars
 *
 * On success, the form is replaced by a confirmation block. The
 * existing /api/inquiry endpoint already returns ok:true on the
 * Resend path; on partial misconfiguration (no provider) it returns
 * ok:true with dev:true — we treat both as success for the user-
 * facing UI and surface real failures via the error state.
 */

const ENGAGEMENT_OPTIONS = [
  { value: 'advisory', label: 'Advisory' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'not-sure', label: 'Not sure' },
] as const;

const TIMELINE_OPTIONS = [
  { value: 'within-30-days', label: 'Within 30 days' },
  { value: '1-3-months', label: '1 to 3 months' },
  { value: '3-6-months', label: '3 to 6 months' },
  { value: 'exploring', label: 'Exploring' },
] as const;

const MESSAGE_MAX = 500;

export function WorkInquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [engagementType, setEngagementType] = useState('');
  const [timeline, setTimeline] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'advisory',
          name,
          email,
          organization,
          role,
          engagementType,
          timeline,
          message,
        }),
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

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-md border border-ink/10 bg-cream-50/60 px-6 py-8 text-base leading-relaxed text-ink"
      >
        <p className="font-semibold">Thanks.</p>
        <p className="mt-2 text-ink/75">
          You will hear back within three business days.
        </p>
      </div>
    );
  }

  // Shared classes for input fields. Pulled out so changes to
  // border / focus / spacing apply to all fields at once.
  const fieldBase =
    'w-full rounded-md border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/45 focus:border-accent-on-cream focus:outline-none focus:ring-1 focus:ring-accent-on-cream';
  const labelBase = 'block text-xs font-semibold uppercase tracking-widest text-ink/65';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="advisory-name" className={labelBase}>
            Name
          </label>
          <input
            id="advisory-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-2 ${fieldBase}`}
          />
        </div>

        <div>
          <label htmlFor="advisory-email" className={labelBase}>
            Email
          </label>
          <input
            id="advisory-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${fieldBase}`}
          />
        </div>

        <div>
          <label htmlFor="advisory-organization" className={labelBase}>
            Organization
          </label>
          <input
            id="advisory-organization"
            name="organization"
            type="text"
            required
            autoComplete="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className={`mt-2 ${fieldBase}`}
          />
        </div>

        <div>
          <label htmlFor="advisory-role" className={labelBase}>
            Role
          </label>
          <input
            id="advisory-role"
            name="role"
            type="text"
            required
            autoComplete="organization-title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`mt-2 ${fieldBase}`}
          />
        </div>

        <div>
          <label htmlFor="advisory-engagement" className={labelBase}>
            What kind of engagement
          </label>
          <select
            id="advisory-engagement"
            name="engagementType"
            required
            value={engagementType}
            onChange={(e) => setEngagementType(e.target.value)}
            className={`mt-2 ${fieldBase}`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {ENGAGEMENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="advisory-timeline" className={labelBase}>
            Timeline
          </label>
          <select
            id="advisory-timeline"
            name="timeline"
            required
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={`mt-2 ${fieldBase}`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="advisory-message" className={labelBase}>
          One sentence on what you are trying to decide
        </label>
        <textarea
          id="advisory-message"
          name="message"
          required
          rows={4}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`mt-2 resize-none ${fieldBase}`}
        />
        <p className="mt-2 text-xs text-ink/55">
          {message.length} / {MESSAGE_MAX} characters
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-cream transition hover:bg-ink-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending' : 'Send'}
          {status !== 'loading' && <span aria-hidden>&rarr;</span>}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-sm text-red-600">
            {errorMessage || 'Something went wrong. Please try again.'}
          </p>
        )}
      </div>
    </form>
  );
}
