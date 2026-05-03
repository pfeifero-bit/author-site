import { Hero } from '@/components/sections/Hero';
import { PullQuote } from '@/components/sections/PullQuote';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Endorsement } from '@/components/sections/Endorsement';
import { SampleChapter } from '@/components/sections/SampleChapter';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Artificial Intelligence for Nonprofit Fundraising | Dale Nirvani Pfeifer',
  description:
    'New book by Dale Nirvani Pfeifer, CEO of Giving Compass. Practical playbook for using AI in fundraising without losing donor trust.',
  url: site.url,
});

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
