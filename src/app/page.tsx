import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PullQuote } from '@/components/sections/PullQuote';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Endorsement } from '@/components/sections/Endorsement';
import { SampleChapter } from '@/components/sections/SampleChapter';
import { site } from '@/lib/site';

const TITLE = 'Artificial Intelligence for Nonprofit Fundraising | Dale Nirvani Pfeifer';
const DESCRIPTION =
  'New book by Dale Nirvani Pfeifer, CEO of Giving Compass. Practical playbook for using AI in fundraising without losing donor trust.';
const URL = site.url;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    siteName: site.author.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

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
