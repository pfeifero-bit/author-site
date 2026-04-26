import { Hero } from '@/components/sections/Hero';
import { PullQuote } from '@/components/sections/PullQuote';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Endorsement } from '@/components/sections/Endorsement';
import { SampleChapter } from '@/components/sections/SampleChapter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PullQuote />
      <CaseStudies />
      <Endorsement />
      <SampleChapter />
    </>
  );
}
