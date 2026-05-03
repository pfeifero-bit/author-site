'use client';

import { useEffect } from 'react';

/**
 * Fires conversion events on mount. The actual analytics tags (GTM, GA4,
 * Google Ads, Meta Pixel, LinkedIn Insight Tag) are wired up in a
 * separate tracking ticket. This component is the placeholder that
 * pushes events to the dataLayer in a vendor-neutral way:
 *
 *   window.dataLayer.push({ event: 'chapter_download_complete' })
 *
 * Once GTM is installed it will pick these up automatically. If you'd
 * rather call gtag() directly, swap the dataLayer push for gtag('event').
 */
export function ConversionEvents({ events }: { events: string[] }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // dataLayer is the conventional GTM queue. Initialize if missing so
    // events are not lost when fired before the GTM script loads.
    type DLEvent = { event: string; timestamp: string };
    const w = window as unknown as { dataLayer?: DLEvent[] };
    w.dataLayer = w.dataLayer ?? [];
    for (const name of events) {
      w.dataLayer.push({ event: name, timestamp: new Date().toISOString() });
    }
  }, [events]);

  return null;
}
