import type { Metadata } from 'next';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { site } from '@/lib/site';

const TITLE = 'Contact | Dale Nirvani Pfeifer';
const DESCRIPTION = 'For speaking, press, and partnership inquiries.';
const URL = `${site.url}/contact`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    siteName: site.author.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return <ContactPanel />;
}
