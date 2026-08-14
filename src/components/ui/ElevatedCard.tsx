import Link from 'next/link';

/**
 * ElevatedCard — the recurring card pattern from the new design system.
 *
 * From the handoff:
 *   Card: elevated background, hairline border, generous radius, icon
 *   tile at top where relevant, lime "→" affordance at the base.
 *
 * Two surface variants, matched to the section they sit inside:
 *
 *   `dark`  → indigo-elevated bg, hairline-on-dark border, on-dark text,
 *             chartreuse hover border
 *   `ivory` → white bg, card-border-on-ivory, on-ivory body text,
 *             indigo hover border shift
 *
 * If `href` is provided the whole card becomes a link with hover lift +
 * chartreuse/indigo border shift. Otherwise renders a static article.
 */
export type ElevatedCardSurface = 'dark' | 'ivory';

const surfaceStyles: Record<ElevatedCardSurface, string> = {
  dark:
    'bg-indigo-elevated border border-[color:var(--hairline-on-dark)] text-on-dark ' +
    'hover:border-chartreuse/50',
  ivory:
    'bg-white border border-[color:var(--card-border-on-ivory)] text-on-ivory ' +
    'hover:border-indigo/20',
};

type BaseProps = {
  children: React.ReactNode;
  surface?: ElevatedCardSurface;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  ariaLabel?: string;
};

type StaticProps = BaseProps & {
  href?: undefined;
};

export function ElevatedCard(props: LinkProps | StaticProps) {
  const { children, surface = 'dark', className = '' } = props;

  const shared =
    'block rounded-card p-8 md:p-9 transition duration-[250ms] ease-card ' +
    surfaceStyles[surface];

  // Linked variant: whole card is clickable, gets the hover lift + shadow.
  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        aria-label={props.ariaLabel}
        className={`${shared} hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(24,26,58,0.3)] ${className}`}
      >
        {children}
      </Link>
    );
  }

  // Static variant: no hover lift, no href.
  return <article className={`${shared} ${className}`}>{children}</article>;
}
