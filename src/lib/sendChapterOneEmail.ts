/**
 * Sends the Chapter 1 PDF link to a single recipient via Resend's
 * /emails endpoint. Used by /api/subscribe when source === 'sample-chapter'.
 *
 * Env vars consumed:
 *   RESEND_API_KEY        Bearer token (required)
 *   RESEND_FROM_EMAIL     "Display Name <hello@yourdomain>" (required)
 *   INQUIRY_RECIPIENT     Reply-to address (optional but recommended)
 *   NEXT_PUBLIC_SITE_URL  Base URL for the PDF link (optional, falls back
 *                         to the production canonical)
 *
 * On success returns { ok: true }. On failure returns { ok: false, error }
 * — the caller decides whether to fail the whole request or just log.
 */
export type SendResult = { ok: true } | { ok: false; error: string; status?: number };

const PDF_PATH = '/downloads/chapter-1.pdf';

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com';
}

function getPdfUrl(): string {
  return `${getSiteUrl()}${PDF_PATH}`;
}

/**
 * Plain-text body. We send both text and HTML; mailbox providers use the
 * text body for spam scoring and accessibility tools fall back to it.
 */
function buildTextBody(pdfUrl: string): string {
  return [
    'Hi,',
    '',
    `Thanks for requesting Chapter 1 of "Artificial Intelligence for Nonprofit Fundraising."`,
    '',
    'Here is the PDF:',
    pdfUrl,
    '',
    'Chapter 1 — "Why Judgment Is Becoming the Differentiator" — opens the book and lays',
    'out the three workflow shifts the rest of the chapters build on. I would love to hear',
    'what resonates and what you push back on. Just reply to this email.',
    '',
    "You will also receive my monthly dispatch on AI and philanthropy. Unsubscribe anytime.",
    '',
    '— Dale',
    'Dale Nirvani Pfeifer',
    'CEO, Giving Compass',
    'Author, Artificial Intelligence for Nonprofit Fundraising (June 2026)',
  ].join('\n');
}

/**
 * HTML body. Kept intentionally minimal — single column, system fonts,
 * no images. Reads well in Gmail / Outlook / Apple Mail without rendering
 * surprises and keeps the spam score low.
 */
function buildHtmlBody(pdfUrl: string): string {
  // Inline styles only — many clients strip <style> blocks.
  const baseStyle = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.55; color: #0E1B3F;';
  const linkStyle = 'color: #2D5BA8;';
  const buttonStyle = 'display: inline-block; padding: 12px 22px; background: #0E1B3F; color: #FAF7F1; text-decoration: none; border-radius: 999px; font-weight: 600; font-size: 15px;';
  const muted = 'color: #5A6478; font-size: 13px; line-height: 1.5;';

  return `<!doctype html>
<html><body style="margin:0; padding:0; background:#FAF7F1;">
<div style="max-width: 560px; margin: 0 auto; padding: 32px 24px; ${baseStyle}">
  <p>Hi,</p>
  <p>Thanks for requesting Chapter 1 of <em>Artificial Intelligence for Nonprofit Fundraising</em>. Here is the PDF:</p>
  <p style="margin: 28px 0;">
    <a href="${pdfUrl}" style="${buttonStyle}">Download Chapter 1 (PDF)</a>
  </p>
  <p style="${muted}">Or paste this link into your browser: <a href="${pdfUrl}" style="${linkStyle}">${pdfUrl}</a></p>
  <p>Chapter 1 — <em>Why Judgment Is Becoming the Differentiator</em> — opens the book and lays out the three workflow shifts the rest of the chapters build on. I would love to hear what resonates and what you push back on. Just reply to this email.</p>
  <p style="${muted}">You will also receive my monthly dispatch on AI and philanthropy. Unsubscribe anytime.</p>
  <p style="margin-top: 32px;">— Dale</p>
  <p style="${muted}">
    Dale Nirvani Pfeifer<br>
    CEO, Giving Compass<br>
    Author, <em>Artificial Intelligence for Nonprofit Fundraising</em> (June 2026)
  </p>
</div>
</body></html>`;
}

export async function sendChapterOneEmail(toEmail: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY not set' };
  if (!from) return { ok: false, error: 'RESEND_FROM_EMAIL not set' };

  const replyTo = process.env.INQUIRY_RECIPIENT;
  const pdfUrl = getPdfUrl();

  // Resend payload. reply_to is optional; we set it to the inquiry
  // recipient so direct replies go to a real human inbox rather than
  // the no-reply-style address the email is sent from.
  const payload: Record<string, unknown> = {
    from,
    to: [toEmail],
    subject: 'Your free chapter — Why Judgment Is Becoming the Differentiator',
    text: buildTextBody(pdfUrl),
    html: buildHtmlBody(pdfUrl),
    tags: [{ name: 'source', value: 'sample-chapter' }],
  };
  if (replyTo) payload.reply_to = replyTo;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, error: text || res.statusText, status: res.status };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown error' };
  }
}
