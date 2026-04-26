'use client';

import { motion } from 'framer-motion';

type Chapter = { number: number; title: string; caseStudy?: string };
type Part = { number: 'I' | 'II' | 'III'; subtitle: string; title: string; intent: string; chapters: Chapter[] };

const parts: Part[] = [
  {
    number: 'I',
    subtitle: 'Part one',
    title: 'Understand',
    intent:
      'Where AI is reshaping fundraising decisions, the donor mindset shifts behind it, and how to keep human judgment at the center.',
    chapters: [
      { number: 1, title: 'Why Judgment Is Becoming the Differentiator' },
      { number: 2, title: 'How AI Is Being Built into Fundraising Systems' },
      { number: 3, title: 'Building Trust as You Scale', caseStudy: 'Ethical AI translation in humanitarian response' },
      { number: 4, title: 'Preparing Your Data to Work Smarter', caseStudy: 'Smart fundraising, lasting impact' },
      { number: 5, title: 'AI and Donor Trust. Maintaining Donor Confidence' },
    ],
  },
  {
    number: 'II',
    subtitle: 'Part two',
    title: 'Apply',
    intent:
      'Specific AI applications across donor stewardship, major gifts, grants, impact reporting, storytelling, and events.',
    chapters: [
      { number: 6, title: 'Stewarding Donor Relationships that Last', caseStudy: 'Video personalization at scale' },
      { number: 7, title: 'Major Gifts. From Prospecting to Stewardship', caseStudy: 'Save the Children Australia, with Dataro' },
      { number: 8, title: 'Grant Funding with Less Effort', caseStudy: 'Center for Victims of Torture, with Instrumentl' },
      { number: 9, title: 'AI Enabled Impact Reporting', caseStudy: 'Dashboards that unite teams and inform action' },
      { number: 10, title: 'AI and Storytelling. Crafting Messages that Inspire Giving', caseStudy: 'Personalized outreach without losing the human voice' },
      { number: 11, title: 'AI-Enabled Events. Make Every Moment Count', caseStudy: 'Make-A-Wish, the 2025 Wish Ball' },
    ],
  },
  {
    number: 'III',
    subtitle: 'Part three',
    title: 'Implement',
    intent:
      'How small and mid-sized teams move from pilot to practice, measure ROI, and run AI without a technology department.',
    chapters: [
      { number: 12, title: 'AI in Daily Practice. Preserving Judgment at Scale', caseStudy: 'Practice at scale without chaos' },
      { number: 13, title: 'AI Implementation. From Pilot to Practice', caseStudy: 'Building an ethical AI use policy' },
      { number: 14, title: 'Measuring ROI. Proving the Value of AI in Fundraising', caseStudy: 'Intelligent ask amounts increase gift size and conversion' },
      { number: 15, title: 'AI and Small Teams. Using AI Without a Technology Department', caseStudy: 'oneMESSAGE.tv, with Keela' },
    ],
  },
];

export function TableOfContents() {
  return (
    <section aria-labelledby="toc" className="container-prose py-24 md:py-32">
      <header className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
          Table of contents
        </p>
        <h2
          id="toc"
          className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
        >
          Three parts. Fifteen chapters. Eleven case studies.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
          The book opens with a foreword by{' '}
          <span className="font-semibold text-ink">Meena Das</span> and closes with a glossary plus
          the 2026 AI Fundraising Platform Landscape, a vendor-by-vendor map of the tooling
          ecosystem.
        </p>
      </header>

      <div className="mt-16 space-y-20">
        {parts.map((part, i) => (
          <motion.section
            key={part.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            aria-labelledby={`part-${part.number}`}
            className="grid gap-10 md:grid-cols-12 md:gap-16"
          >
            <header className="md:col-span-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent-600">
                {part.subtitle} &middot; {part.number}
              </p>
              <h3
                id={`part-${part.number}`}
                className="mt-3 text-3xl font-extrabold leading-tight tracking-tight md:text-[2.25rem]"
              >
                {part.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/70">{part.intent}</p>
            </header>

            <ol className="md:col-span-8">
              {part.chapters.map((ch) => (
                <li
                  key={ch.number}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ink/10 py-5 md:gap-6"
                >
                  <span className="font-mono text-sm font-semibold text-ink/65">
                    {String(ch.number).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-lg font-bold leading-snug text-ink md:text-xl">
                      {ch.title}
                    </p>
                    {ch.caseStudy && (
                      <p className="mt-1 text-sm text-ink/75">
                        Case study. <span className="text-ink/80">{ch.caseStudy}</span>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </motion.section>
        ))}
      </div>
    </section>
  );
}
