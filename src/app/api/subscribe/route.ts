import { NextResponse } from 'next/server';
import { sendChapterOneSequence } from '@/lib/email/chapterOneSequence';

export const runtime = 'nodejs';

type Body = { email?: string; source?: string };

// Sources that should trigger the Chapter 1 welcome drip (4-email
// sequence: immediate + day 4 + day 10 + day 30). Footer Dispatch
// signups and the preorder-notify form intentionally do NOT trigger
// the drip.
const CHAPTER_ONE_SOURCES = new Set(['sample-chapter']);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = body.email?.trim();
  const source = body.source?.trim() ?? 'unknown';

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

  // Resend path (preferred). Adds the contact to a Resend audience.
  if (resendKey && audienceId) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (!res.ok && res.status !== 409 /* already exists */) {
        const text = await res.text().catch(() => '');
        console.error('Resend subscribe failed:', res.status, text);
        return NextResponse.json({ error: 'Subscription failed.' }, { status: 502 });
      }

      // Audience-add succeeded (or contact already existed). If this
      // signup came from the Chapter 1 form, kick off the 4-email
      // welcome drip: Day 0 sends immediately, Days 4 / 10 / 30 are
      // scheduled via Resend's scheduled_at parameter so they fire
      // automatically without cron jobs or dashboard automations.
      //
      // We do NOT fail the request if any email step fails — the user
      // is already in the audience, so a manual broadcast or resend
      // from the Resend dashboard can recover. Failures are logged to
      // Vercel for follow-up.
      if (CHAPTER_ONE_SOURCES.has(source)) {
        const sendResult = await sendChapterOneSequence(email);
        if (!sendResult.ok) {
          console.error('Chapter 1 sequence dispatch failed:', sendResult);
        }
      }

      return NextResponse.json({ ok: true, source });
    } catch (err) {
      console.error('Resend subscribe error:', err);
      return NextResponse.json({ error: 'Subscription failed.' }, { status: 502 });
    }
  }

  // Formspree fallback path.
  if (formspreeEndpoint) {
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: 'Subscription failed.' }, { status: 502 });
      }
      return NextResponse.json({ ok: true, source });
    } catch (err) {
      console.error('Formspree subscribe error:', err);
      return NextResponse.json({ error: 'Subscription failed.' }, { status: 502 });
    }
  }

  // Dev mode. No provider configured. Log it and accept the submission so the UI works.
  console.warn(
    `[subscribe] No email provider configured. Captured ${email} from ${source}. ` +
      `Set RESEND_API_KEY + RESEND_AUDIENCE_ID, or FORMSPREE_ENDPOINT in .env.local.`,
  );
  return NextResponse.json({ ok: true, source, dev: true });
}
