'use client';

import { useEffect, useRef } from 'react';

/**
 * Embeds a Kit (formerly ConvertKit) form via its JavaScript embed
 * script.
 *
 * Kit's script must be attached to the DOM after React hydration in
 * order to render the form at the position we want. React strips
 * inline <script> tags in JSX and `dangerouslySetInnerHTML` doesn't
 * execute scripts, so we mount the script imperatively inside a
 * ref'd container. The script auto-discovers itself and injects the
 * form UI into the same location.
 *
 * Reused across the site for every Kit-backed signup surface. Currently:
 *   - Homepage HomeChapter1 section (Chapter 1 request form)
 *   - Footer Dispatch column (newsletter subscribe form)
 *
 * Each form has its own `uid` and `src` from the Kit dashboard
 * (Grow → Landing pages & forms → Publish → JavaScript).
 */
export function KitForm({
  uid,
  src,
  className = '',
  label,
}: {
  uid: string;
  src: string;
  className?: string;
  /**
   * Accessible label read by screen readers before the form. Kit's own
   * rendered form has visible labels, but for users landing on the
   * container while the script is still loading, this describes what
   * will appear.
   */
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Guard against double-mount in React strict mode / fast refresh —
    // if Kit's script is already in this container, do nothing.
    if (container.querySelector(`script[data-uid="${uid}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-uid', uid);
    script.src = src;
    container.appendChild(script);

    // No cleanup — Kit's script mutates surrounding DOM on load, and
    // removing it doesn't unwind those mutations reliably. Leaving the
    // script + rendered form in place across route changes is fine
    // because this component always mounts inside a static section.
  }, [uid, src]);

  return (
    <div
      ref={ref}
      aria-label={label}
      className={`kit-form-container ${className}`}
    />
  );
}
