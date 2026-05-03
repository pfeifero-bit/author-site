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
        // Two surface-tuned accent blues. The single previous accent (a
        // washed-out periwinkle) had insufficient contrast on cream. Now:
        //   accent-on-cream: dark blue, WCAG AA on cream (~6.5:1 at 16px)
        //   accent-on-navy:  light blue, comfortable contrast on navy
        // Use the variant matching the surface the element sits on.
        accent: {
          'on-cream': '#2D5BA8',
          'on-navy': '#6B9FE0',
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
