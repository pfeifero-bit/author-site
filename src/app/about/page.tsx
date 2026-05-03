import type { Metadata } from 'next';
import { AboutHero } from '@/components/sections/AboutHero';
import { AboutBio } from '@/components/sections/AboutBio';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { AboutCta } from '@/components/sections/AboutCta';
import { site } from '@/lib/site';

const TITLE = 'Dale Nirvani Pfeifer | AI, Fundraising, and Philanthropy';
const DESCRIPTION =
  'CEO of Giving Compass and author of Artificial Intelligence for Nonprofit Fundraising. Writing and speaking on AI, judgment, and donor trust.';
const URL = `${site.url}/about`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'profile',
    siteName: site.author.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <SelectedWork />
      <AboutCta />
    </>
  );
}
