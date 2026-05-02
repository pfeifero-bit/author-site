import { notFound } from 'next/navigation';

// Speaking page is hidden for now. The components and content are kept in
// the codebase (SpeakingHero, SpeakingTopics, PastVenues, SpeakingInquiry)
// for an easy future restore: remove the notFound() call below and put the
// nav entry back in src/lib/site.ts.
export default function SpeakingPage() {
  notFound();
}

export const metadata = {
  robots: { index: false, follow: false },
};
