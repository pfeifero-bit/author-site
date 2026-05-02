import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `About the Book | ${site.name}`,
  description: 'Table of contents, chapter guide, and full breakdown of Artificial Intelligence for Nonprofit Fundraising by Dale Nirvani Pfeifer.',
};

export default function AboutTheBookPage() {
  return (
    <main id="main">
      <section className="container-prose py-24 md:py-32">
        <header className="mb-16">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent-600">
            <span className="h-px w-8 bg-accent-600" />
            Table of contents
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Three parts. Fifteen chapters. Eleven case studies.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink/70">
            The book opens with a foreword by{' '}
            <span className="font-medium text-ink">Meena Das</span> and closes with a glossary plus the 2026 AI Fundraising Platform Landscape, a vendor-by-vendor map of the tooling ecosystem.
          </p>
        </header>

        {/* Part One */}
        <div className="mb-20">
          <header className="mb-10 border-b border-ink/10 pb-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-600">Part one · I</p>
            <h2 className="text-3xl font-bold text-ink">Understand</h2>
            <p className="mt-3 max-w-xl text-base text-ink/70">
              Where AI is reshaping fundraising decisions, the donor mindset shifts behind it, and how to keep human judgment at the center.
            </p>
          </header>
          <ol className="space-y-8">
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">01</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Why Judgment Is Becoming the Differentiator</h3>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">02</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">How AI Is Being Built into Fundraising Systems</h3>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">03</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Building Trust as You Scale</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Ethical AI translation in humanitarian response</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">04</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Preparing Your Data to Work Smarter</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Smart fundraising, lasting impact</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">05</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI and Donor Trust. Maintaining Donor Confidence</h3>
              </div>
            </li>
          </ol>
        </div>

        {/* Part Two */}
        <div className="mb-20">
          <header className="mb-10 border-b border-ink/10 pb-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-600">Part two · II</p>
            <h2 className="text-3xl font-bold text-ink">Apply</h2>
            <p className="mt-3 max-w-xl text-base text-ink/70">
              Specific AI applications across donor stewardship, major gifts, grants, impact reporting, storytelling, and events.
            </p>
          </header>
          <ol className="space-y-8" start={6}>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">06</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Stewarding Donor Relationships that Last</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Video personalization at scale</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">07</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Major Gifts. From Prospecting to Stewardship</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Save the Children Australia, with Dataro</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">08</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Grant Funding with Less Effort</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Center for Victims of Torture, with Instrumentl</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">09</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI Enabled Impact Reporting</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Dashboards that unite teams and inform action</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">10</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI and Storytelling. Crafting Messages that Inspire Giving</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Personalized outreach without losing the human voice</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">11</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI-Enabled Events. Make Every Moment Count</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Make-A-Wish, the 2025 Wish Ball</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Part Three */}
        <div>
          <header className="mb-10 border-b border-ink/10 pb-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-600">Part three · III</p>
            <h2 className="text-3xl font-bold text-ink">Implement</h2>
            <p className="mt-3 max-w-xl text-base text-ink/70">
              How small and mid-sized teams move from pilot to practice, measure ROI, and run AI without a technology department.
            </p>
          </header>
          <ol className="space-y-8" start={12}>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">12</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI in Daily Practice. Preserving Judgment at Scale</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Practice at scale without chaos</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">13</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI Implementation. From Pilot to Practice</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Building an ethical AI use policy</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">14</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">Measuring ROI. Proving the Value of AI in Fundraising</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. Intelligent ask amounts increase gift size and conversion</p>
              </div>
            </li>
            <li className="grid gap-2 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm font-semibold tabular-nums text-accent-600 md:col-span-1">15</span>
              <div className="md:col-span-11">
                <h3 className="text-lg font-semibold text-ink">AI and Small Teams. Using AI Without a Technology Department</h3>
                <p className="mt-1 text-sm text-ink/60">Case study. oneMESSAGE.tv, with Keela</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
