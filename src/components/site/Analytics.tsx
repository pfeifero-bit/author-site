import Script from 'next/script';

export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  // GA4 measurement ID for aifundraisingfornonprofits.com. A measurement
  // ID is public (it ships to the browser in the gtag URL), so we commit
  // it as the default rather than depending on a Vercel env var. Override
  // per-environment with NEXT_PUBLIC_GA_ID, or set NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  // to switch to Plausible (which takes precedence below).
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-0KL769VVB0';

  if (plausibleDomain) {
    return (
      <Script
        defer
        data-domain={plausibleDomain}
        src="https://plausible.io/js/script.js"
      />
    );
  }

  if (gaId) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </>
    );
  }

  return null;
}
