import { site } from '@/lib/site';

type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, { container: string; subtitle: string; title: string; secondary: string; byline: string }> = {
  sm: {
    container: 'max-w-[14rem]',
    subtitle: 'text-[8px]',
    title: 'text-[3rem] md:text-[3.3rem]',
    secondary: 'text-[1rem] md:text-[1.1rem]',
    byline: 'text-[9px]',
  },
  md: {
    container: 'max-w-[20rem]',
    subtitle: 'text-[10px]',
    title: 'text-[4rem] md:text-[4.5rem]',
    secondary: 'text-[1.4rem] md:text-[1.55rem]',
    byline: 'text-[11px]',
  },
  lg: {
    container: 'max-w-[24rem]',
    subtitle: 'text-[11px]',
    title: 'text-[4.8rem] md:text-[5.4rem]',
    secondary: 'text-[1.7rem] md:text-[1.85rem]',
    byline: 'text-[12px]',
  },
};

export function BookCover({ size = 'md', className = '' }: { size?: Size; className?: string }) {
  const s = sizes[size];

  return (
    <div className={`relative mx-auto ${s.container} ${className}`}>
      <div
        className="aspect-[2/3] w-full overflow-hidden rounded-sm bg-ink shadow-[0_30px_80px_-25px_rgba(14,27,63,0.65)] ring-1 ring-ink/20"
        role="img"
        aria-label={`Cover mockup. ${site.bookTitle}, by ${site.author.name}.`}
      >
        <div className="flex h-full flex-col justify-between p-6 text-cream md:p-7">
          {/* Top tagline. The book's promise stated in two lines, set
              in small uppercase to read as a publisher's tagline. */}
          <div>
            <p className={`${s.subtitle} font-semibold uppercase leading-[1.5] tracking-widest text-cream/85`}>
              Raise More Money,
              <br />
              Ethically and Effectively
            </p>
          </div>

          {/* Title block. "AI" sits as the dominant element; a short
              hairline rule separates it from the qualifier "for Nonprofit
              / Fundraising" rendered in the accent color. */}
          <div className="flex flex-col items-start gap-1">
            <p className={`${s.title} font-extrabold leading-[0.9] tracking-[-0.02em] text-cream`}>AI</p>
            <span aria-hidden className="my-2 h-0.5 w-8 bg-accent-on-navy" />
            <p className={`${s.secondary} font-medium leading-[1.05] text-accent-on-navy`}>for Nonprofit</p>
            <p className={`${s.secondary} font-medium leading-[1.05] text-accent-on-navy`}>Fundraising</p>
          </div>

          <div>
            <p className={`${s.byline} font-medium uppercase tracking-widest text-cream/85`}>
              {site.author.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
