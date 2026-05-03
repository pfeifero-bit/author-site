import type { Metadata } from 'next';
import { BookHero } from '@/components/sections/BookHero';
import { BookDescription } from '@/components/sections/BookDescription';
import { WhoItsFor } from '@/components/sections/WhoItsFor';
import { TableOfContents } from '@/components/sections/TableOfContents';
import { SampleChapter } from '@/components/sections/SampleChapter';
import { Endorsement } from '@/components/sections/Endorsement';
import { site } from '@/lib/site';

// BookEndorsements (the larger section with the placeholder grid for
// forthcoming endorsements) is intentionally not used here. Just the
// Meena Das foreword pull-quote via Endorsement. To restore the full
// section, swap Endorsement for BookEndorsements below.
//
// RetailerStrip (the dark navy "Available everywhere books are sold"
// pre-order section) is hidden for now. To restore, re-import
// RetailerStrip and add <RetailerStrip /> after Endorsement below.

const TITLE = 'The Book | Artificial Intelligence for Nonprofit Fundraising';
const DESCRIPTION =
  'Eleven case studies, named teams, specific results. The practical AI playbook for fundraisers and nonprofit leaders. Publishing June 2026.';
const URL = `${site.url}/the-book`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'book',
    siteName: site.author.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BookPage() {
  return (
    <>
      <BookHero />
      <BookDescription />
      <WhoItsFor />
      <TableOfContents />
      <SampleChapter />
      <Endorsement />
    </>
  );
}
