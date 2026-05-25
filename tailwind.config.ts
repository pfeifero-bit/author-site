import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary navy, sampled from the book cover (#151a2d).
        ink: {
          DEFAULT: '#151a2d',
          50:  '#f1f2f6',
          100: '#dde0e9',
          200: '#b8bdce',
          300: '#8390a9',
          400: '#516288',
          500: '#2f436b',
          600: '#1f2e4e',
          700: '#192341',
          800: '#151a2d',
          900: '#0a0e1c',
        },
        // Warm off-white body background.
        cream: {
          DEFAULT: '#f7f3ec',
          50:  '#fbf9f4',
          100: '#f7f3ec',
          200: '#efe8db',
          300: '#e3d8c2',
          400: '#cfbf9f',
        },
        // Two surface-tuned accent greens, sampled from the book cover.
        // Use the variant matching the surface the element sits on:
        //   accent-on-cream: dark olive (#5b7000), darker variant of the
        //                    lime, picks up WCAG AA contrast on cream.
        //   accent-on-navy:  bright lime (#e6ff3f), the exact accent
        //                    from the book cover. High contrast on navy.
        accent: {
          'on-cream': '#5b7000',
          'on-navy': '#e6ff3f',
        },
      },
      fontFamily: {
        // Single family across display and body, matching the book cover.
        sans: ['var(--font-mulish)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-mulish)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      maxWidth: {
        'prose-wide': '72ch',
      },
      typography: ({ theme }: { theme: (k: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.DEFAULT'),
            '--tw-prose-links': theme('colors.accent.on-cream'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-quotes': theme('colors.ink.500'),
            '--tw-prose-quote-borders': theme('colors.accent.on-cream'),
            fontFamily: theme('fontFamily.sans')[0],
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
