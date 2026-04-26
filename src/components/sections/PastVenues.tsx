'use client';

const placeholderCount = 8;

export function PastVenues() {
  return (
    <section aria-labelledby="venues" className="bg-cream-50/60">
      <div className="container-prose py-20 md:py-24">
        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
            Past venues
          </p>
          <h2
            id="venues"
            className="mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]"
          >
            A short list of places this work has shown up.
          </h2>
        </header>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-ink/10 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <li
              key={i}
              aria-hidden
              className="grid h-24 place-items-center bg-cream text-ink/30"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest">
                Venue {String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-ink/70">
          Replace with logos or named events as we confirm release. Past venues will surface here
          alongside the year.
        </p>
      </div>
    </section>
  );
}
