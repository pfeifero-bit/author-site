import { AboutHero } from '@/components/sections/AboutHero';
import { AboutBio } from '@/components/sections/AboutBio';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { AboutCta } from '@/components/sections/AboutCta';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Dale Nirvani Pfeifer | AI, Fundraising, and Philanthropy',
  description:
    'CEO of Giving Compass and author of Artificial Intelligence for Nonprofit Fundraising. Writing and speaking on AI, judgment, and donor trust.',
  url: `${site.url}/about`,
  ogType: 'profile',
});

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
