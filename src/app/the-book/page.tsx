import type { Metadata } from 'next';
import { BookHero } from '@/components/sections/BookHero';
import { BookDescription } from '@/components/sections/BookDescription';
import { WhoItsFor } from '@/components/sections/WhoItsFor';
import { TableOfContents } from '@/components/sections/TableOfContents';
import { SampleChapter } from '@/components/sections/SampleChapter';
import { BookEndorsements } from '@/components/sections/BookEndorsements';
import { RetailerStrip } from '@/components/sections/RetailerStrip';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The Book',
  description: site.description,
  openGraph: {
    title: site.bookTitle,
    description: site.description,
    type: 'book',
    url: `${site.url}/the-book`,
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
      <BookEndorsements />
      <RetailerStrip />
    </>
  );
}
