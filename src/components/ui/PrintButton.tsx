'use client';

/**
 * Tiny client-side print trigger. Kept as its own component so the
 * hosting page (e.g. the printable policy template) can stay a
 * server component and remain 0-JS everywhere else.
 */
export function PrintButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      {children}
    </button>
  );
}
