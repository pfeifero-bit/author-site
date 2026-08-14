/**
 * BandedStrip — full-width `bg-indigo-elevated` (#232656) section with
 * a hairline border at top and bottom. Used for logo rows, credibility
 * strips, short callouts.
 *
 * From the handoff:
 *   Banded strip: full-width #232656 with top and bottom hairlines,
 *   for logo rows and short callouts.
 *
 * Renders a `<section>` by default; pass `as` to change the tag when
 * the strip is really a callout with its own heading.
 *
 * Usage:
 *   <BandedStrip aria-labelledby="stage-logos">
 *     <p id="stage-logos" className="...">As seen on stage & in print</p>
 *     ...logos...
 *   </BandedStrip>
 */
export function BandedStrip({
  children,
  as: Tag = 'section',
  className = '',
  ...rest
}: {
  children: React.ReactNode;
  as?: 'section' | 'div' | 'aside';
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      // Hairline borders use the standard on-dark hairline color from
      // globals.css. Inner padding is a section-y 56–72px so the strip
      // reads as its own beat.
      className={`w-full bg-indigo-elevated border-y border-[color:var(--hairline-on-dark)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
