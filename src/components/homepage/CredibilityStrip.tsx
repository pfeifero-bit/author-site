import Image from 'next/image';
import { BandedStrip } from '@/components/ui/BandedStrip';

/**
 * Homepage credibility strip (P3 rebuild).
 *
 * Full-width indigo-elevated band with a centered label above a 5-logo
 * grid. All logos rendered white at opacity .72; each logo has its own
 * `maxHeight` so the whole row is optically balanced (rather than the
 * naive "same pixel height" that would make squat logos look tiny and
 * tall logos overbearing).
 *
 * Logo files live in /public/images/press-logos/. Two of them (UN and
 * Money 20/20) ship already white with alpha; the other three (TEDx,
 * SXSW, Forbes) are dark artwork and need the CSS `brightness(0)
 * invert(1)` filter to render white. `whiten` toggles that per row.
 */

type PressLogo = {
  file: string;
  alt: string;
  maxHeight: number; // px — optical balance per handoff spec
  whiten?: boolean;  // true = apply brightness(0) invert(1) filter
};

const LOGOS: PressLogo[] = [
  { file: 'logo-tedx.png',       alt: 'TEDx',           maxHeight: 24, whiten: true },
  { file: 'logo-un.png',         alt: 'United Nations', maxHeight: 44 },
  { file: 'logo-sxsw.png',       alt: 'SXSW',           maxHeight: 21, whiten: true },
  { file: 'logo-money2020.png',  alt: 'Money 20/20',    maxHeight: 32 },
  { file: 'logo-forbes.png',     alt: 'Forbes',         maxHeight: 25, whiten: true },
];

export function CredibilityStrip() {
  return (
    <BandedStrip aria-labelledby="press-strip-label">
      <div className="mx-auto flex max-w-standard flex-col items-center gap-6 px-8 py-[34px]">
        <p
          id="press-strip-label"
          className="font-body text-[12px] font-semibold uppercase tracking-eyebrow-wide text-on-dark-muted"
        >
          As seen on stage &amp; in print
        </p>
        <ul className="grid w-full max-w-[900px] grid-cols-2 items-center gap-9 sm:grid-cols-3 md:grid-cols-5">
          {LOGOS.map((logo) => (
            <li key={logo.file} className="flex h-14 items-center justify-center">
              <Image
                src={`/images/press-logos/${logo.file}`}
                alt={logo.alt}
                width={200}
                height={logo.maxHeight}
                sizes="(min-width: 768px) 200px, 40vw"
                className="block h-auto w-auto max-w-full opacity-[0.72]"
                style={{
                  maxHeight: `${logo.maxHeight}px`,
                  filter: logo.whiten ? 'brightness(0) invert(1)' : undefined,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </BandedStrip>
  );
}
