import type { Metadata } from 'next';
import { SpeakingHero } from '@/components/sections/SpeakingHero';
import { SpeakingTopics } from '@/components/sections/SpeakingTopics';
import { PastVenues } from '@/components/sections/PastVenues';
import { SpeakingInquiry } from '@/components/sections/SpeakingInquiry';

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Keynotes and conversations on AI in philanthropy. Topics, formats, past venues, and a speaking inquiry form.',
};

export default function SpeakingPage() {
  return (
    <>
      <SpeakingHero />
      <SpeakingTopics />
      <PastVenues />
      <SpeakingInquiry />
    </>
  );
}
