import type { Metadata } from 'next';
import { AboutHero } from '@/components/sections/AboutHero';
import { AboutBio } from '@/components/sections/AboutBio';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { AboutCta } from '@/components/sections/AboutCta';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dale Nirvani Pfeifer is the CEO of Giving Compass, co-founder of Goodworld, and author of Artificial Intelligence for Nonprofit Fundraising.',
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
