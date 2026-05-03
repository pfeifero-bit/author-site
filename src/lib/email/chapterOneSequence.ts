/**
 * Chapter 1 welcome drip sequence.
 *
 * Triggered by /api/subscribe when source === 'sample-chapter'. Sends
 * Email 1 immediately, schedules Emails 2/3/4 via Resend's scheduled_at
 * parameter so the entire sequence is committed at signup time. No
 * cron jobs, no Resend dashboard automations, works on any Resend plan.
 *
 * Architecture trade-offs:
 * - Each contact's emails are scheduled at signup time. Body content
 *   is captured then; subsequent edits to copy here only affect new
 *   signups.
 * - Resend's scheduled_at supports up to ~30 days ahead. Email 4 sits
 *   right at the limit, so if Resend's policy tightens we may need to
 *   schedule it via a Vercel cron instead.
 * - Email 4 has exclusion rules in the marketing brief (skip if
 *   pre-ordered, skip if replied) that aren't implemented here yet —
 *   they're future work that requires reply tracking and pre-order
 *   detection. For now Email 4 sends to everyone; the copy soft-handles
 *   the cases where it's mistargeted.
 */
import {
  buildEditorialEmail,
  type EditorialEmailContent,
} from '@/lib/email/editorialTemplate';

export type SendResult = { ok: true } | { ok: false; error: string; status?: number };

const PDF_PATH = '/downloads/chapter-1.pdf';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifundraisingfornonprofits.com';

const PREORDERS_LIVE = process.env.NEXT_PUBLIC_PREORDERS_LIVE === 'true';

function getPdfUrl(): string {
  return `${SITE_URL}${PDF_PATH}`;
}

/**
 * Where the pre-order CTA points when pre-orders are live. The book
 * page itself shows the retailer cluster, so we link there rather than
 * to a single retailer.
 */
function getPreorderUrl(): string {
  return `${SITE_URL}/the-book#preorder`;
}

/* -------------------------------------------------------------------------- */
/* Email content builders. Each returns subject, preheader, html, and text.   */
/* Copy follows the marketing brief — voice and structure should not drift    */
/* from what was approved.                                                    */
/* -------------------------------------------------------------------------- */

type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
};

function renderEmail(
  subject: string,
  content: EditorialEmailContent,
): RenderedEmail {
  const { html, text } = buildEditorialEmail(content);
  return { subject, html, text };
}

/** Day 0 — Welcome + Chapter 1 (sent immediately). */
function buildDay0(): RenderedEmail {
  const pdfUrl = getPdfUrl();
  return renderEmail(
    "Your free chapter, plus the question I'm watching closely",
    {
      eyebrow: 'Your free chapter',
      headline: { ink: 'Chapter 1,', accent: 'on the house.' },
      preheader: 'Chapter 1, on the house. And one thing worth thinking about this week.',
      cta: { text: 'Download Chapter 1 (PDF)', url: pdfUrl },
      bodyHtml: [
        'Hi,',
        'Thanks for grabbing the first chapter of <em style="font-style:italic;">Artificial Intelligence for Nonprofit Fundraising</em>.',
        'Chapter 1, <em style="font-style:italic;">Why Judgment Is Becoming the Differentiator</em>, sets up the central argument of the book and the three workflow shifts that are quietly redefining fundraising work in 2026.',
        '<strong>One thing to watch for as you read it.</strong>',
        'When I started this book, the dominant question in the sector was <em style="font-style:italic;">should we adopt AI?</em> Eighteen months later, that question is mostly settled. The real question now is <em style="font-style:italic;">which decisions are we comfortable letting AI shape, and which ones do we protect?</em> That shift, from adoption to allocation, is what the rest of the book is built around.',
        'I would love to know what resonates and what you push back on. Just reply to this email. I read everything.',
        'Two more emails coming over the next ten days. One on what we are seeing in donor behavior right now. One with a short exercise you can run with your team this week.',
        'You will also receive my monthly dispatch on AI and philanthropy. Unsubscribe anytime.',
      ],
      bodyText: [
        'Hi,',
        'Thanks for grabbing the first chapter of Artificial Intelligence for Nonprofit Fundraising.',
        'Chapter 1, Why Judgment Is Becoming the Differentiator, sets up the central argument of the book and the three workflow shifts that are quietly redefining fundraising work in 2026.',
        'One thing to watch for as you read it.',
        'When I started this book, the dominant question in the sector was should we adopt AI? Eighteen months later, that question is mostly settled. The real question now is which decisions are we comfortable letting AI shape, and which ones do we protect? That shift, from adoption to allocation, is what the rest of the book is built around.',
        'I would love to know what resonates and what you push back on. Just reply to this email. I read everything.',
        'Two more emails coming over the next ten days. One on what we are seeing in donor behavior right now. One with a short exercise you can run with your team this week.',
        'You will also receive my monthly dispatch on AI and philanthropy. Unsubscribe anytime.',
      ],
    },
  );
}

/** Day 4 — Donors are using AI to vet you. */
function buildDay4(): RenderedEmail {
  return renderEmail('Your donors are using AI to vet you', {
    eyebrow: 'Field note',
    headline: {
      ink: 'Your donors are using AI',
      accent: 'to vet you.',
    },
    preheader: 'What we found inside 22,000 AI-powered nonprofit searches.',
    bodyHtml: [
      'Hi,',
      'Here is something most fundraisers have not fully absorbed yet.',
      'Donors are no longer starting their research on Google. They are starting it inside ChatGPT, Claude, and Perplexity. They are asking those tools things like <em style="font-style:italic;">"what is the most effective nonprofit working on youth mental health in Chicago"</em> and trusting the answer enough to act on it.',
      '<strong>We have data on this.</strong>',
      'Last year we ran an AI-powered nonprofit search experience inside Charity Navigator, the largest nonprofit evaluator in the country. Over 22,000 donors used it. What we saw changed how I think about donor behavior.',
      'A few things stood out:<br><br>&bull; <strong>80 percent of the searches were cause-based, not organization-based.</strong> Donors were not looking up nonprofits they already knew. They were asking AI to find them.<br>&bull; Donors who used the AI search converted to the donate page at <strong>twice the rate</strong> of donors who browsed the traditional way.<br>&bull; <strong>Intent to give</strong>, measured by donate-button clicks, jumped <strong>64 percent</strong>.',
      'The implication for fundraising is bigger than it sounds. For the last twenty years, nonprofit visibility was a function of brand recognition, search engine optimization, and direct-response marketing budgets. Large legacy nonprofits dominated all three. AI-powered discovery is starting to flatten that. A small, well-run nonprofit with clear outcomes and clean data can now surface in front of a donor who would never have found them on Google.',
      'That is the shift Chapter 1 is really about. The structural advantage is moving from organizations that can afford visibility to organizations that can be clearly understood by a model.',
      '<strong>Two questions worth sitting with this week:</strong>',
      '1. If a donor asked an AI tool today to recommend nonprofits in your cause area, would your organization show up?<br>2. If it did, would the description match what you actually do?',
      'If you have a view on either, reply and tell me. I am collecting examples for ongoing research.',
    ],
    bodyText: [
      'Hi,',
      'Here is something most fundraisers have not fully absorbed yet.',
      'Donors are no longer starting their research on Google. They are starting it inside ChatGPT, Claude, and Perplexity. They are asking those tools things like "what is the most effective nonprofit working on youth mental health in Chicago" and trusting the answer enough to act on it.',
      'We have data on this.',
      'Last year we ran an AI-powered nonprofit search experience inside Charity Navigator, the largest nonprofit evaluator in the country. Over 22,000 donors used it. What we saw changed how I think about donor behavior.',
      'A few things stood out:\n\n- 80 percent of the searches were cause-based, not organization-based. Donors were not looking up nonprofits they already knew. They were asking AI to find them.\n- Donors who used the AI search converted to the donate page at twice the rate of donors who browsed the traditional way.\n- Intent to give, measured by donate-button clicks, jumped 64 percent.',
      'The implication for fundraising is bigger than it sounds. For the last twenty years, nonprofit visibility was a function of brand recognition, search engine optimization, and direct-response marketing budgets. Large legacy nonprofits dominated all three. AI-powered discovery is starting to flatten that. A small, well-run nonprofit with clear outcomes and clean data can now surface in front of a donor who would never have found them on Google.',
      'That is the shift Chapter 1 is really about. The structural advantage is moving from organizations that can afford visibility to organizations that can be clearly understood by a model.',
      'Two questions worth sitting with this week:',
      '1. If a donor asked an AI tool today to recommend nonprofits in your cause area, would your organization show up?\n2. If it did, would the description match what you actually do?',
      'If you have a view on either, reply and tell me. I am collecting examples for ongoing research.',
    ],
  });
}

/** Day 10 — The 20-minute team exercise. */
function buildDay10(): RenderedEmail {
  // Pre-order CTA only when pre-orders are live; otherwise soft fallback
  // copy invites a reply.
  const preorderHtml = PREORDERS_LIVE
    ? `It comes out in June. You can <a href="${getPreorderUrl()}" style="color:#2D5BA8; text-decoration:underline;">pre-order here</a>.`
    : 'Pre-orders open this month. Reply with "notify me" and I will send the link the moment they go live.';
  const preorderText = PREORDERS_LIVE
    ? `It comes out in June. You can pre-order here: ${getPreorderUrl()}`
    : 'Pre-orders open this month. Reply with "notify me" and I will send the link the moment they go live.';

  return renderEmail('A 20-minute exercise to do with your team this week', {
    eyebrow: 'Field note',
    headline: {
      ink: 'A 20-minute exercise',
      accent: 'for your team this week.',
    },
    preheader: 'The cheapest piece of AI readiness work you can do.',
    bodyHtml: [
      'Hi,',
      'Last email I shared what we are seeing in donor behavior. Donors are using AI to find and vet nonprofits, and the organizations that are clearly understood by a model are starting to win discovery in ways that did not exist two years ago.',
      'The natural next question is <em style="font-style:italic;">what do I actually do about this.</em>',
      'Here is the exercise I recommend running with your team before you evaluate a single tool. It takes about twenty minutes. You need a whiteboard or a shared doc and the people who actually do the donor work in the room. Skip the IT department for this one. The conversation is about judgment, not technology.',
      '<strong>1. Name one part of your fundraising workflow that currently runs on instinct or lagging data.</strong><br>Examples: who to re-engage this quarter, when to follow up with a mid-level donor, how to prioritize prospect research time, which lapsed donors are worth a personal call. Pick one. Be specific.',
      '<strong>2. Inside that workflow, identify the decisions where human judgment has to stay.</strong><br>This is the most important step and the one most teams skip. AI can surface the list of at-risk donors. A human still needs to decide which of them gets the personal call versus the templated email. Map those judgment moments before you automate around them. Once a workflow is automated, the judgment moments are much harder to put back in.',
      '<strong>3. Document one guardrail you would need in place before letting AI touch that workflow.</strong><br>A few that come up often: human review on every donor-facing message, clear consent rules on how donor data is used, a documented escalation path for when the model gets it wrong, and a written policy on what donor data can and cannot leave your systems.',
      'If your team can finish those three steps with real answers, you are ready to start evaluating tools. If you cannot, the conversation you need to have is internal, not with a vendor. That conversation is also the one that will save you the most money over the next twelve months. Most of the AI tooling regret I see in the sector comes from teams that bought before they had this conversation.',
      'This exercise sits at the end of Chapter 1 for a reason. It is the cheapest, fastest piece of AI readiness work you can do, and it does not require a single new piece of software.',
      `The book goes much deeper. It includes the vendor questions to ask, a redline checklist for AI tool contracts, the governance frameworks that boards are starting to ask about, and what an AI-native fundraising operation actually looks like in practice.`,
      preorderHtml,
      'Thanks for reading along these last ten days. If the book is useful to you, the highest-leverage thing you can do is forward it to the one person on your team who needs it most.',
    ],
    bodyText: [
      'Hi,',
      'Last email I shared what we are seeing in donor behavior. Donors are using AI to find and vet nonprofits, and the organizations that are clearly understood by a model are starting to win discovery in ways that did not exist two years ago.',
      'The natural next question is what do I actually do about this.',
      'Here is the exercise I recommend running with your team before you evaluate a single tool. It takes about twenty minutes. You need a whiteboard or a shared doc and the people who actually do the donor work in the room. Skip the IT department for this one. The conversation is about judgment, not technology.',
      '1. Name one part of your fundraising workflow that currently runs on instinct or lagging data.\nExamples: who to re-engage this quarter, when to follow up with a mid-level donor, how to prioritize prospect research time, which lapsed donors are worth a personal call. Pick one. Be specific.',
      '2. Inside that workflow, identify the decisions where human judgment has to stay.\nThis is the most important step and the one most teams skip. AI can surface the list of at-risk donors. A human still needs to decide which of them gets the personal call versus the templated email. Map those judgment moments before you automate around them. Once a workflow is automated, the judgment moments are much harder to put back in.',
      '3. Document one guardrail you would need in place before letting AI touch that workflow.\nA few that come up often: human review on every donor-facing message, clear consent rules on how donor data is used, a documented escalation path for when the model gets it wrong, and a written policy on what donor data can and cannot leave your systems.',
      'If your team can finish those three steps with real answers, you are ready to start evaluating tools. If you cannot, the conversation you need to have is internal, not with a vendor. That conversation is also the one that will save you the most money over the next twelve months. Most of the AI tooling regret I see in the sector comes from teams that bought before they had this conversation.',
      'This exercise sits at the end of Chapter 1 for a reason. It is the cheapest, fastest piece of AI readiness work you can do, and it does not require a single new piece of software.',
      'The book goes much deeper. It includes the vendor questions to ask, a redline checklist for AI tool contracts, the governance frameworks that boards are starting to ask about, and what an AI-native fundraising operation actually looks like in practice.',
      preorderText,
      'Thanks for reading along these last ten days. If the book is useful to you, the highest-leverage thing you can do is forward it to the one person on your team who needs it most.',
    ],
  });
}

/** Day 30 — What did you do with it. */
function buildDay30(): RenderedEmail {
  const pdfUrl = getPdfUrl();
  const preorderHtml = PREORDERS_LIVE
    ? `And if the chapter was useful, the book has a lot more of it. Pre-orders are open <a href="${getPreorderUrl()}" style="color:#2D5BA8; text-decoration:underline;">here</a>.`
    : 'Pre-orders open soon. Reply with "notify me" and I will send the link the moment they go live.';
  const preorderText = PREORDERS_LIVE
    ? `And if the chapter was useful, the book has a lot more of it. Pre-orders are open here: ${getPreorderUrl()}`
    : 'Pre-orders open soon. Reply with "notify me" and I will send the link the moment they go live.';

  return renderEmail('It has been a month. What did you do with it?', {
    eyebrow: 'Checking in',
    headline: {
      ink: 'It has been a month.',
      accent: 'What did you do with it?',
    },
    preheader: 'A short question, and one offer if you want it.',
    bodyHtml: [
      'Hi,',
      'It has been about a month since you downloaded Chapter 1.',
      'I am curious what happened next.',
      'Most people who download a free chapter do one of three things. They read it the day it arrives, get something out of it, and move on. They save it for later and never get back to it. Or they actually try one of the ideas with their team and something shifts.',
      'If you are in that third group, I want to hear about it. What did you try, what worked, what did not, and what surprised you. Reply to this email. Even one or two sentences is useful.',
      '<strong>Two reasons I am asking.</strong>',
      'First, the patterns in those replies become the next thing I write. The most useful pieces I have published in the last year started with a sentence somebody emailed me. Your experience is more valuable than another report.',
      'Second, if you are doing something interesting with AI in your fundraising work, I would like to feature a handful of stories around the book launch in June. Real teams, real workflows, real results. Anonymous if you prefer. If that is you, just say so in your reply and I will follow up.',
      `If you have not had a chance to read the chapter yet, no judgment. Here it is again: <a href="${pdfUrl}" style="color:#2D5BA8; text-decoration:underline;">${pdfUrl}</a>. The exercise at the end is still the highest-leverage twenty minutes you can spend on AI readiness this quarter.`,
      preorderHtml,
      'Thanks for being on this list.',
    ],
    bodyText: [
      'Hi,',
      'It has been about a month since you downloaded Chapter 1.',
      'I am curious what happened next.',
      'Most people who download a free chapter do one of three things. They read it the day it arrives, get something out of it, and move on. They save it for later and never get back to it. Or they actually try one of the ideas with their team and something shifts.',
      'If you are in that third group, I want to hear about it. What did you try, what worked, what did not, and what surprised you. Reply to this email. Even one or two sentences is useful.',
      'Two reasons I am asking.',
      'First, the patterns in those replies become the next thing I write. The most useful pieces I have published in the last year started with a sentence somebody emailed me. Your experience is more valuable than another report.',
      'Second, if you are doing something interesting with AI in your fundraising work, I would like to feature a handful of stories around the book launch in June. Real teams, real workflows, real results. Anonymous if you prefer. If that is you, just say so in your reply and I will follow up.',
      `If you have not had a chance to read the chapter yet, no judgment. Here it is again: ${pdfUrl}. The exercise at the end is still the highest-leverage twenty minutes you can spend on AI readiness this quarter.`,
      preorderText,
      'Thanks for being on this list.',
    ],
  });
}

/* -------------------------------------------------------------------------- */
/* Resend send + schedule helpers                                             */
/* -------------------------------------------------------------------------- */

const RESEND_EMAILS_URL = 'https://api.resend.com/emails';

type ResendPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
  scheduled_at?: string; // ISO 8601 UTC
  tags?: { name: string; value: string }[];
};

async function postToResend(
  apiKey: string,
  payload: ResendPayload,
): Promise<SendResult> {
  try {
    const res = await fetch(RESEND_EMAILS_URL, {
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

/**
 * Compute an ISO 8601 UTC timestamp `days` from now. Used to schedule
 * subsequent emails in the drip via Resend's scheduled_at parameter.
 */
function inDays(days: number): string {
  const ms = days * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + ms).toISOString();
}

/**
 * Send the full Chapter 1 welcome drip to a single recipient.
 *
 * Email 1 sends immediately. Emails 2/3/4 are scheduled with Resend's
 * scheduled_at parameter for 4, 10, and 30 days later respectively.
 *
 * Returns an aggregate SendResult. If Email 1 fails, the function
 * stops and returns the error (most important to surface). If a later
 * email fails to schedule, we still report success for Email 1 and
 * tag the partial failure in the error string.
 */
export async function sendChapterOneSequence(toEmail: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY not set' };
  if (!from) return { ok: false, error: 'RESEND_FROM_EMAIL not set' };

  const replyTo = process.env.INQUIRY_RECIPIENT;

  // Build all four emails up front so we don't half-send if any
  // template rendering throws.
  const day0 = buildDay0();
  const day4 = buildDay4();
  const day10 = buildDay10();
  const day30 = buildDay30();

  const baseTags = [{ name: 'sequence', value: 'chapter-one-drip' }];

  // Email 1 — immediate
  const day0Payload: ResendPayload = {
    from,
    to: [toEmail],
    subject: day0.subject,
    text: day0.text,
    html: day0.html,
    tags: [...baseTags, { name: 'step', value: 'day-0-welcome' }],
  };
  if (replyTo) day0Payload.reply_to = replyTo;
  const day0Result = await postToResend(apiKey, day0Payload);
  if (!day0Result.ok) return day0Result;

  // Emails 2/3/4 — scheduled. Failures here are logged by the caller
  // but do not roll back the immediate Day 0 send.
  const scheduled: { step: string; at: string; email: RenderedEmail }[] = [
    { step: 'day-4-donor-data', at: inDays(4), email: day4 },
    { step: 'day-10-team-exercise', at: inDays(10), email: day10 },
    { step: 'day-30-checkin', at: inDays(30), email: day30 },
  ];

  const scheduleErrors: string[] = [];
  for (const { step, at, email } of scheduled) {
    const payload: ResendPayload = {
      from,
      to: [toEmail],
      subject: email.subject,
      text: email.text,
      html: email.html,
      scheduled_at: at,
      tags: [...baseTags, { name: 'step', value: step }],
    };
    if (replyTo) payload.reply_to = replyTo;
    const result = await postToResend(apiKey, payload);
    if (!result.ok) {
      scheduleErrors.push(`${step}: ${result.error}`);
    }
  }

  if (scheduleErrors.length > 0) {
    return {
      ok: false,
      error: `Day 0 sent OK; schedule failures: ${scheduleErrors.join('; ')}`,
    };
  }

  return { ok: true };
}
