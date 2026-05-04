import { AboutHero } from '@/components/sections/AboutHero';
import { AboutBio } from '@/components/sections/AboutBio';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { AboutCta } from '@/components/sections/AboutCta';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildProfilePageSchema, jsonLdScript } from '@/lib/jsonLd';

export const metadata = buildMetadata({
  title: 'Dale Nirvani Pfeifer | AI, Fundraising, and Philanthropy',
  description:
    'CEO of Giving Compass and author of AI for Nonprofit Fundraising. Writing and speaking on AI, judgment, and donor trust.',
  url: `${site.url}/about`,
  ogType: 'profile',
});

const profileSchema = buildProfilePageSchema();

export default function AboutPage() {
  return (
    <>
      {/* ProfilePage schema. AI search uses this to identify /about as
          the canonical bio surface for the author. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(profileSchema) }}
      />
      <AboutHero />
      <AboutBio />
      <SelectedWork />
      <AboutCta />
    </>
  );
}
