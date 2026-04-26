import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Body = Record<string, unknown> & { type?: string; email?: string; name?: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fieldsToHtml(fields: Record<string, unknown>) {
  return Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;color:#0e1b3f">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#0e1b3f">${escapeHtml(String(v))}</td></tr>`,
    )
    .join('');
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const type = (body.type ?? 'general').toString();
  const email = (body.email ?? '').toString().trim();
  const name = (body.name ?? '').toString().trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }

  const subjectByType: Record<string, string> = {
    speaking: `New speaking inquiry from ${name}`,
    contact: `New contact form message from ${name}`,
    general: `New inquiry from ${name}`,
  };
  const subject = subjectByType[type] ?? subjectByType.general;

  const recipient = process.env.INQUIRY_RECIPIENT;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'hello@dalenpfeifer.com';
  const formspreeEndpoint = process.env.FORMSPREE_INQUIRY_ENDPOINT ?? process.env.FORMSPREE_ENDPOINT;

  // Resend path. Sends a transactional email to the configured recipient.
  if (resendKey && recipient) {
    try {
      const html = `
        <table style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;color:#0e1b3f;line-height:1.55">
          <tbody>${fieldsToHtml({ type, ...body })}</tbody>
        </table>
        <p style="margin-top:18px;color:#516494;font-size:12px">Sent from dalenpfeifer.com</p>
      `;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          reply_to: email,
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Resend inquiry failed:', res.status, text);
        return NextResponse.json({ error: 'Submission failed.' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error('Resend inquiry error:', err);
      return NextResponse.json({ error: 'Submission failed.' }, { status: 502 });
    }
  }

  // Formspree fallback path.
  if (formspreeEndpoint) {
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...body, _subject: subject }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: 'Submission failed.' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error('Formspree inquiry error:', err);
      return NextResponse.json({ error: 'Submission failed.' }, { status: 502 });
    }
  }

  // Dev mode. No provider configured. Log it and accept the submission.
  console.warn(
    `[inquiry] No provider configured. Captured ${type} from ${email}. ` +
      `Set RESEND_API_KEY + INQUIRY_RECIPIENT, or FORMSPREE_INQUIRY_ENDPOINT in .env.local.`,
    body,
  );
  return NextResponse.json({ ok: true, dev: true });
}
