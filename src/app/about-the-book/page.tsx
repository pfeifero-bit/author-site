import type { Metadata } from 'next';
import { BookDescription } from '@/components/sections/BookDescription';
import { WhoItsFor } from '@/components/sections/WhoItsFor';
import { TableOfContents } from '@/components/sections/TableOfContents';
import { SampleChapter } from '@/components/sections/SampleChapter';

export const metadata: Metadata = {
        title: 'About the Book | Dale Nirvani Pfeifer',
    description: 'Table of contents, chapter guide, and full breakdown of Artificial Intelligence for Nonprofit Fundraising by Dale Nirvani Pfeifer.',
};

export default function AboutTheBookPage() {
    return (
          <>
                <BookDescription />
                <WhoItsFor />
                <TableOfContents />
                <SampleChapter />
          </>>
        );
}
