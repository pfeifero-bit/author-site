import { ContactPanel } from '@/components/sections/ContactPanel';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact | Dale Nirvani Pfeifer',
  description: 'For speaking, press, and partnership inquiries.',
  url: `${site.url}/contact`,
});

export default function ContactPage() {
  return <ContactPanel />;
}
