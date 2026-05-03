import Link from 'next/link';

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="container-prose py-24 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">{eyebrow}</p>
      <h1 className="mt-5 max-w-3xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        {title}
      </h1>
      <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70">
        {description}
      </p>
      <p className="mt-12 text-sm text-ink/50">
        This page is on the way. The home page is the current proof of design direction.{' '}
        <Link href="/" className="underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-ink">
          Return home
        </Link>
        .
      </p>
    </section>
  );
}
