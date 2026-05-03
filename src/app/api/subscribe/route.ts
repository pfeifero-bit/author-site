import { NextResponse } from 'next/server';
import { sendChapterOneEmail } from '@/lib/sendChapterOneEmail';

export const runtime = 'nodejs';

type Body = { email?: string; source?: string };

// Sources that should trigger the Chapter 1 PDF send. Currently only the
// hero + sample-chapter forms ask for the chapter; footer Dispatch
// signups and the preorder-notify form intentionally do NOT.
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
      // signup came from the Chapter 1 form, send the PDF email. We do
      // NOT fail the request if the email send fails — the user is
      // already in the audience, so a manual broadcast can recover.
      // The Vercel log will surface any failures for follow-up.
      if (CHAPTER_ONE_SOURCES.has(source)) {
        const sendResult = await sendChapterOneEmail(email);
        if (!sendResult.ok) {
          console.error('Chapter 1 email send failed:', sendResult);
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
