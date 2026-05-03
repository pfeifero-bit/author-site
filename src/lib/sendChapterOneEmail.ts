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
 * Design: matches the website's editorial style — cream background, navy
 * ink, accent blue for the eyebrow, thin horizontal rule divider, and a
 * rounded-pill CTA button that mirrors the in-site CTAs. The HTML uses
 * tables-only layout for cross-client compatibility (Gmail, Outlook,
 * Apple Mail, iOS Mail). All styling is inlined because Gmail's web
 * client strips <style> blocks.
 */
export type SendResult = { ok: true } | { ok: false; error: string; status?: number };

const PDF_PATH = '/downloads/chapter-1.pdf';

// Brand tokens lifted from tailwind.config (kept in sync manually since
// email cannot import Tailwind). If the site palette changes, mirror the
// hex values here. Comments capture the semantic meaning.
const COLOR = {
  cream: '#FAF7F1', // bg-cream — page background
  ink: '#0E1B3F', // text-ink — primary text and CTA background
  accentOnCream: '#2D5BA8', // accent-on-cream — eyebrow + secondary headline
  muted: '#5A6478', // ink at ~70% — secondary text
  ruleOnCream: '#0E1B3F26', // 15% navy on cream — editorial-rule divider
} as const;

// Font stack: Mulish first (rendered when the recipient has it locally,
// e.g. Apple Mail and many iOS clients with embedded webfonts), falling
// back to high-quality system sans-serif. Avoids loading a webfont over
// HTTP, which Gmail proxies inconsistently.
const FONT_STACK =
  "'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com';
}

function getPdfUrl(): string {
  return `${getSiteUrl()}${PDF_PATH}`;
}

function getSiteHost(): string {
  // Strip protocol for footer line ("you signed up at <site>"). Falls back
  // to the canonical domain if URL parsing fails for any reason.
  try {
    return new URL(getSiteUrl()).host;
  } catch {
    return 'aifundraisingfornonprofits.com';
  }
}

/**
 * Plain-text body. We send both text and HTML; mailbox providers use the
 * text body for spam scoring and accessibility tools fall back to it.
 * Keep tone identical to the HTML so previews match.
 */
function buildTextBody(pdfUrl: string): string {
  return [
    'Hi,',
    '',
    'Thanks for grabbing the first chapter of Artificial Intelligence for Nonprofit Fundraising.',
    '',
    'Your PDF is here:',
    pdfUrl,
    '',
    'Chapter 1, Why Judgment Is Becoming the Differentiator, sets up the book\'s central',
    'argument and the three workflow shifts redefining fundraising work. I would love to',
    'hear what resonates and what you push back on. Just reply to this email.',
    '',
    'You will also receive my monthly dispatch on AI and philanthropy. Unsubscribe anytime.',
    '',
    'Dale',
    '',
    'Dale Nirvani Pfeifer',
    'CEO, Giving Compass',
    'Author, Artificial Intelligence for Nonprofit Fundraising (June 2026)',
  ].join('\n');
}

/**
 * HTML body. Editorial layout matching the site:
 *
 *   [eyebrow: "Your free chapter"]
 *   [headline: "Chapter 1," / "on the house." (accent)]
 *   [thin rule]
 *   [body paragraph]
 *   [CTA button: "Download Chapter 1 (PDF) →"]
 *   [body continuation + sign-off]
 *   [footer with site host]
 */
function buildHtmlBody(pdfUrl: string): string {
  const host = getSiteHost();

  // Inline-only styles. Reused snippets pulled into consts to keep the
  // template scannable.
  const bodyText = `font-family:${FONT_STACK}; font-size:17px; line-height:1.6; color:${COLOR.ink};`;
  const muted = `font-family:${FONT_STACK}; font-size:13px; line-height:1.55; color:${COLOR.muted};`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>Your free chapter</title>
</head>
<body style="margin:0; padding:0; background:${COLOR.cream}; ${bodyText}">

<!-- Outer wrapper: full-bleed cream so iOS / Apple Mail dark-mode-disable
     looks intentional and Outlook backgrounds do not bleed white. -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="background:${COLOR.cream};">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <!-- Inner content. Capped at 560px to mirror the site's
           container-prose width on small surfaces. -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="560" border="0" style="max-width:560px; width:100%;">

        <!-- Eyebrow -->
        <tr>
          <td style="padding:24px 8px 0;">
            <p style="margin:0; font-family:${FONT_STACK}; font-size:11px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:${COLOR.accentOnCream};">
              Your free chapter
            </p>
          </td>
        </tr>

        <!-- Headline. Two-tone styling matches the site:
             extrabold ink line, then medium-weight accent line. -->
        <tr>
          <td style="padding:18px 8px 0;">
            <h1 style="margin:0; font-family:${FONT_STACK}; font-size:38px; line-height:1.05; font-weight:800; color:${COLOR.ink}; letter-spacing:-0.01em;">
              Chapter 1,
            </h1>
            <h1 style="margin:0; font-family:${FONT_STACK}; font-size:38px; line-height:1.05; font-weight:500; color:${COLOR.accentOnCream}; letter-spacing:-0.01em;">
              on the house.
            </h1>
          </td>
        </tr>

        <!-- Editorial rule divider. Matches the .editorial-rule below
             the hero on the website. -->
        <tr>
          <td style="padding:32px 8px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tr>
                <td style="border-top:1px solid ${COLOR.ruleOnCream}; height:1px; line-height:1px; font-size:0;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Opening paragraph -->
        <tr>
          <td style="padding:32px 8px 0; ${bodyText}">
            <p style="margin:0;">Hi,</p>
            <p style="margin:18px 0 0;">
              Thanks for grabbing the first chapter of <em style="font-style:italic;">Artificial Intelligence for Nonprofit Fundraising</em>.
            </p>
          </td>
        </tr>

        <!-- CTA button. Rounded-pill, ink background, cream text — same
             as the in-site WaitlistButton / primary CTAs. -->
        <tr>
          <td style="padding:32px 8px 0;" align="left">
            <a href="${pdfUrl}"
               style="display:inline-block; padding:14px 28px; background:${COLOR.ink}; color:${COLOR.cream}; text-decoration:none; border-radius:999px; font-family:${FONT_STACK}; font-size:15px; font-weight:600; letter-spacing:0.01em; mso-padding-alt:0;">
              Download Chapter 1 (PDF) &rarr;
            </a>
          </td>
        </tr>

        <!-- Plain link fallback. If the recipient's client blocks the
             button (some Outlook configs strip styled anchors), the URL
             is still right there. -->
        <tr>
          <td style="padding:14px 8px 0; ${muted}">
            <p style="margin:0;">
              Or paste this into your browser:
              <a href="${pdfUrl}" style="color:${COLOR.accentOnCream}; text-decoration:underline;">${pdfUrl}</a>
            </p>
          </td>
        </tr>

        <!-- Body continuation -->
        <tr>
          <td style="padding:36px 8px 0; ${bodyText}">
            <p style="margin:0;">
              Chapter 1, <em style="font-style:italic;">Why Judgment Is Becoming the Differentiator</em>, sets up the book&rsquo;s central argument and the three workflow shifts redefining fundraising work. I&rsquo;d love to hear what resonates and what you push back on. Just reply to this email.
            </p>
            <p style="margin:24px 0 0;">
              You&rsquo;ll also receive my monthly dispatch on AI and philanthropy. Unsubscribe anytime.
            </p>
          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td style="padding:40px 8px 0;">
            <p style="margin:0; ${bodyText}">Dale</p>
            <p style="margin:8px 0 0; ${muted}">
              Dale Nirvani Pfeifer<br>
              CEO, Giving Compass<br>
              Author, <em style="font-style:italic;">Artificial Intelligence for Nonprofit Fundraising</em> (June 2026)
            </p>
          </td>
        </tr>

        <!-- Footer with secondary editorial rule + signup attribution. -->
        <tr>
          <td style="padding:48px 8px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tr>
                <td style="border-top:1px solid ${COLOR.ruleOnCream}; height:1px; line-height:1px; font-size:0;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:20px 0 0; ${muted}">
              You&rsquo;re receiving this because you requested Chapter 1 at <a href="${getSiteUrl()}" style="color:${COLOR.muted}; text-decoration:underline;">${host}</a>.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
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
    subject: 'Chapter 1: AI for Nonprofit Fundraising',
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
