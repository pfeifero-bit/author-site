import type { Metadata } from 'next';
import { ContactPanel } from '@/components/sections/ContactPanel';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dale Nirvani Pfeifer. Book inquiries, press, speaking, and partnership requests.',
};

export default function ContactPage() {
  return <ContactPanel />;
}
