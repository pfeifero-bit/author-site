import type { CSSProperties } from 'react';

/**
 * Eyebrow — the recurring "chartreuse rule + uppercase label" pattern
 * that sits above every section heading in the new design system.
 *
 * From the handoff:
 *   short lime rule (22px × 1px) + uppercase label, above every section heading.
 *
 * Two surface variants because the same eyebrow shows up on both
 * indigo sections and ivory sections, and each surface wants a
 * different accent color:
 *
 *   `dark`  → chartreuse rule + chartreuse label   (used on indigo bg)
 *   `ivory` → olive rule       + olive label       (used on ivory bg)
 *
 * Usage:
 *   <Eyebrow surface="dark">THE THESIS</Eyebrow>
 *   <Eyebrow surface="ivory">THE EVIDENCE</Eyebrow>
 */
export type EyebrowSurface = 'dark' | 'ivory';

const surfaceStyle: Record<EyebrowSurface, { rule: string; label: string }> = {
  dark:  { rule: 'bg-chartreuse', label: 'text-chartreuse' },
  ivory: { rule: 'bg-olive',      label: 'text-olive' },
};

export function Eyebrow({
  children,
  surface = 'dark',
  as: Tag = 'p',
  className = '',
  style,
}: {
  children: React.ReactNode;
  surface?: EyebrowSurface;
  /** Wrap in a different element if the label is really a heading. */
  as?: 'p' | 'span' | 'h2' | 'h3';
  className?: string;
  style?: CSSProperties;
}) {
  const s = surfaceStyle[surface];
  return (
    <Tag
      className={`flex items-center gap-3 font-body text-[12.5px] font-semibold uppercase leading-none tracking-eyebrow ${s.label} ${className}`}
      style={style}
    >
      <span aria-hidden className={`inline-block h-px w-eyebrow-rule ${s.rule}`} />
      <span>{children}</span>
    </Tag>
  );
}
