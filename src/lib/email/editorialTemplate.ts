/**
 * Shared editorial email template. Renders the same cream/navy/accent
 * design as the website (matched manually since email cannot import
 * Tailwind). All emails in the Chapter 1 drip sequence pass content
 * through this builder so the look stays consistent and design tokens
 * live in one place.
 */

export type Headline = string | { ink: string; accent: string };

export type Cta = { text: string; url: string };

export type EditorialEmailContent = {
  /** Tiny uppercase label above the headline. e.g. "Field note". */
  eyebrow: string;
  /**
   * Main heading. Pass a string for a single-line headline, or an
   * `{ink, accent}` object to render the two-tone style used on the
   * homepage and the Chapter 1 / sample-chapter section. The first
   * line renders in extrabold ink; the second in medium-weight accent.
   */
  headline: Headline;
  /**
   * Body paragraphs. Each item is HTML-safe (you may include <em>,
   * <strong>, <a>, etc. — write them inline since global stylesheets
   * are stripped by Gmail). Newlines inside an item are preserved as
   * <br>. Each item becomes one <p>.
   */
  bodyHtml: string[];
  /**
   * Plain-text version of the same content. Required because mailbox
   * spam scoring uses it and accessibility tools fall back to it.
   * Pass paragraphs as separate items; the builder joins with blank
   * lines.
   */
  bodyText: string[];
  /**
   * Optional rounded-pill CTA button. Renders below the body.
   */
  cta?: Cta;
  /**
   * Inbox preview text. Hidden in the email body itself, but shown
   * by Gmail / Apple Mail / Outlook in the inbox list. Strongly
   * recommended; without it the client falls back to the first body
   * line, which is often "Hi,".
   */
  preheader?: string;
  /**
   * Footer attribution shown below the sign-off. Defaults to the
   * standard "you signed up at <site>" line.
   */
  footerNote?: string;
};

// Brand tokens lifted from tailwind.config. Mirror manually if the
// site palette changes.
const COLOR = {
  cream: '#FAF7F1',
  ink: '#0E1B3F',
  accentOnCream: '#2D5BA8',
  muted: '#5A6478',
  ruleOnCream: '#0E1B3F26',
} as const;

const FONT_STACK =
  "'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com';

function getSiteHost(): string {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return 'aifundraisingfornonprofits.com';
  }
}

function renderHeadline(headline: Headline): string {
  const baseStyle = `margin:0; font-family:${FONT_STACK}; font-size:38px; line-height:1.05; letter-spacing:-0.01em;`;
  if (typeof headline === 'string') {
    return `<h1 style="${baseStyle} font-weight:800; color:${COLOR.ink};">${headline}</h1>`;
  }
  return `
    <h1 style="${baseStyle} font-weight:800; color:${COLOR.ink};">${headline.ink}</h1>
    <h1 style="${baseStyle} font-weight:500; color:${COLOR.accentOnCream};">${headline.accent}</h1>
  `;
}

/**
 * Plain-text version of a headline. Two-tone collapses to a single
 * line; ASCII-only.
 */
function headlineToText(headline: Headline): string {
  if (typeof headline === 'string') return headline;
  return `${headline.ink} ${headline.accent}`;
}

/**
 * Build both HTML and plain text bodies from a single content spec.
 */
export function buildEditorialEmail(content: EditorialEmailContent): {
  html: string;
  text: string;
} {
  const host = getSiteHost();
  const footerNote =
    content.footerNote ??
    `You're receiving this because you requested Chapter 1 at ${host}.`;

  const bodyText = `font-family:${FONT_STACK}; font-size:17px; line-height:1.6; color:${COLOR.ink};`;
  const muted = `font-family:${FONT_STACK}; font-size:13px; line-height:1.55; color:${COLOR.muted};`;

  const paragraphsHtml = content.bodyHtml
    .map((p) => `<p style="margin:18px 0 0;">${p}</p>`)
    .join('\n          ');

  const ctaHtml = content.cta
    ? `
        <tr>
          <td style="padding:32px 8px 0;" align="left">
            <a href="${content.cta.url}"
               style="display:inline-block; padding:14px 28px; background:${COLOR.ink}; color:${COLOR.cream}; text-decoration:none; border-radius:999px; font-family:${FONT_STACK}; font-size:15px; font-weight:600; letter-spacing:0.01em;">
              ${content.cta.text} &rarr;
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 8px 0; ${muted}">
            <p style="margin:0;">
              Or paste this into your browser:
              <a href="${content.cta.url}" style="color:${COLOR.accentOnCream}; text-decoration:underline;">${content.cta.url}</a>
            </p>
          </td>
        </tr>`
    : '';

  // Hidden preheader. The peer empty <span>s with white-space + non-breaking
  // hairspaces stop email clients from leaking visible body content into
  // the preview after the preheader text.
  const preheaderHtml = content.preheader
    ? `<div style="display:none; font-size:1px; color:${COLOR.cream}; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">${content.preheader}<span style="display:none !important;">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</span></div>`
    : '';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${headlineToText(content.headline)}</title>
</head>
<body style="margin:0; padding:0; background:${COLOR.cream}; ${bodyText}">
${preheaderHtml}
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0" style="background:${COLOR.cream};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="560" border="0" style="max-width:560px; width:100%;">

        <tr>
          <td style="padding:24px 8px 0;">
            <p style="margin:0; font-family:${FONT_STACK}; font-size:11px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; color:${COLOR.accentOnCream};">
              ${content.eyebrow}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 8px 0;">
            ${renderHeadline(content.headline)}
          </td>
        </tr>

        <tr>
          <td style="padding:32px 8px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tr>
                <td style="border-top:1px solid ${COLOR.ruleOnCream}; height:1px; line-height:1px; font-size:0;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 8px 0; ${bodyText}">
            ${paragraphsHtml}
          </td>
        </tr>
        ${ctaHtml}

        <tr>
          <td style="padding:40px 8px 0;">
            <p style="margin:0; ${bodyText}">Dale</p>
            <p style="margin:8px 0 0; ${muted}">
              Dale Nirvani Pfeifer<br>
              CEO, Giving Compass<br>
              Author, <em style="font-style:italic;">AI for Nonprofit Fundraising</em> (June 2026)
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:48px 8px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tr>
                <td style="border-top:1px solid ${COLOR.ruleOnCream}; height:1px; line-height:1px; font-size:0;">&nbsp;</td>
              </tr>
            </table>
            <p style="margin:20px 0 0; ${muted}">
              ${footerNote}
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  // Plain text. We don't render HTML inside the body lines (e.g. <em>,
  // <strong>) — strip them so the text version reads cleanly.
  const stripHtml = (s: string) =>
    s
      .replace(/<\/?(em|strong|b|i|a|span|br)[^>]*>/gi, '')
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .trim();

  const textParagraphs = content.bodyText.map(stripHtml).join('\n\n');
  const ctaText = content.cta ? `\n\n${content.cta.text}: ${content.cta.url}` : '';

  const text = `${headlineToText(content.headline)}

${textParagraphs}${ctaText}

Dale

Dale Nirvani Pfeifer
CEO, Giving Compass
Author, AI for Nonprofit Fundraising (June 2026)

${footerNote}`;

  return { html, text };
}
