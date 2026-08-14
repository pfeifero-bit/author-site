import { HomeHero } from '@/components/homepage/HomeHero';
import { CredibilityStrip } from '@/components/homepage/CredibilityStrip';
import { HomeThesis } from '@/components/homepage/HomeThesis';
import { HomeCaseStudies } from '@/components/homepage/HomeCaseStudies';
import { WaysToWork } from '@/components/homepage/WaysToWork';
import { HomeChapter1 } from '@/components/homepage/HomeChapter1';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

/**
 * Homepage (P3 restructure per design_handoff_site_restructure/README.md).
 *
 * Section order — alternating dark indigo and light ivory for section
 * rhythm, per the handoff's design tokens:
 *
 *   1. Hero                indigo   book cover + primary CTAs
 *   2. Credibility strip   indigo   press logos
 *   3. Thesis pull quote   indigo   Newsreader italic
 *   4. Case studies        ivory    ← the ivory beat
 *   5. Ways to work        indigo   three ElevatedCard routes
 *   6. Chapter 1 request   indigo   mailto CTA (no form)
 *
 * Retired from the homepage (still used elsewhere):
 *   - `<Endorsement />`, `<SampleChapter />` remain in /the-book but are
 *     no longer on the homepage. The new HomeCaseStudies + HomeChapter1
 *     cover their jobs on this surface.
 */

export const metadata = buildMetadata({
  title: `${site.author.name} | AI Fundraising Advisor, Speaker, and Author`,
  description:
    `${site.author.name} advises AI and fundraising technology companies and speaks on how artificial intelligence is reshaping nonprofit fundraising. Author of ${site.bookTitle}.`,
  url: site.url,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CredibilityStrip />
      <HomeThesis />
      <HomeCaseStudies />
      <WaysToWork />
      <HomeChapter1 />
    </>
  );
}
