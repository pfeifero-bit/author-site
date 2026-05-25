import { BookHero } from '@/components/sections/BookHero';
import { BookDescription } from '@/components/sections/BookDescription';
import { WhoItsFor } from '@/components/sections/WhoItsFor';
import { TableOfContents } from '@/components/sections/TableOfContents';
import { SampleChapter } from '@/components/sections/SampleChapter';
import { Endorsement } from '@/components/sections/Endorsement';
import { BookFaq } from '@/components/sections/BookFaq';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { buildFaqSchema, jsonLdScript } from '@/lib/jsonLd';
import { bookFaq } from '@/lib/bookFaq';

// BookEndorsements (the larger section with the placeholder grid for
// forthcoming endorsements) is intentionally not used here. Just the
// Meena Das foreword pull-quote via Endorsement. To restore the full
// section, swap Endorsement for BookEndorsements below.
//
// RetailerStrip (the dark navy "Available everywhere books are sold"
// pre-order section) is hidden for now. To restore, re-import
// RetailerStrip and add <RetailerStrip /> after Endorsement below.

export const metadata = buildMetadata({
  title: 'The Book | Artificial Intelligence for Nonprofit Fundraising',
  description:
    'Eleven case studies, named teams, specific results. The practical AI playbook for fundraisers and nonprofit leaders. Publishing June 2026.',
  url: `${site.url}/the-book`,
  ogType: 'book',
});

// FAQPage schema. Pulled from the same source as the visible <BookFaq>
// component so they cannot drift apart. Required by Google's rich-result
// policy: every Q&A in the schema must also appear in visible content.
const faqSchema = buildFaqSchema(bookFaq);

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema) }}
      />
      <BookHero />
      <BookDescription />
      <WhoItsFor />
      <TableOfContents />
      <SampleChapter />
      <Endorsement />
      <BookFaq />
    </>
  );
}
