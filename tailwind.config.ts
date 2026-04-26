import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary navy, sampled from the book cover.
        ink: {
          DEFAULT: '#0e1b3f',
          50:  '#f1f3f9',
          100: '#dde2ee',
          200: '#b9c2d9',
          300: '#8593b6',
          400: '#516494',
          500: '#2f4576',
          600: '#1f3056',
          700: '#142142',
          800: '#0e1b3f',
          900: '#08122c',
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
        // Cover pale-blue family. accent-300 matches the cover subtitle.
        // accent-500 is the safe-on-cream variant for hairlines, links, hovers.
        accent: {
          DEFAULT: '#4f7ac7',
          100: '#dee9f7',
          200: '#bdd2ed',
          300: '#a6bfe0',
          400: '#7ea0d4',
          500: '#4f7ac7',
          600: '#3a5fa8',
          700: '#2c4886',
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
            '--tw-prose-links': theme('colors.accent.600'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-quotes': theme('colors.ink.500'),
            '--tw-prose-quote-borders': theme('colors.accent.500'),
            fontFamily: theme('fontFamily.sans')[0],
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
