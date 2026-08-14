import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ───────────────────────── LEGACY tokens (P1 and prior) ─────────────
         * The current homepage, book page, about, etc. are built against
         * these. They stay in place while the P3-P7 restructure lands. As
         * pages migrate to the new indigo/chartreuse/ivory system below,
         * their `bg-ink` / `text-cream` / `text-accent-*` references get
         * swapped, and eventually these blocks can be removed.
         * Do NOT use `ink`, `cream`, or `accent-*` in NEW work — use the
         * new tokens defined below.
         * ─────────────────────────────────────────────────────────────────── */
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
        cream: {
          DEFAULT: '#f7f3ec',
          50:  '#fbf9f4',
          100: '#f7f3ec',
          200: '#efe8db',
          300: '#e3d8c2',
          400: '#cfbf9f',
        },
        accent: {
          'on-cream': '#5b7000',
          'on-navy': '#e6ff3f',
        },

        /* ───────────────── NEW brand system (P2, from handoff brief) ─────
         * Sampled from the printed book cover so the site and the book
         * read as one object. Use these tokens in every P3+ page.
         *
         * Semantic pairings:
         *   Dark surfaces → text-on-dark / text-on-dark-muted
         *                   accent = chartreuse
         *                   borders = hairline
         *   Light surfaces → body-on-ivory / muted-on-ivory
         *                    accent = olive
         *                    borders = card-border-on-ivory
         * ─────────────────────────────────────────────────────────────────── */

        // Three indigo elevations — page bg, cards, rare third layer.
        indigo: {
          DEFAULT:  '#181A3A',
          base:     '#181A3A',
          elevated: '#232656',
          lifted:   '#2F3370',
        },

        // Primary accent (chartreuse) — CTAs, eyebrows, links on dark.
        chartreuse: {
          DEFAULT: '#E1F64D',
          hover:   '#ECFF70',
        },

        // Secondary color on dark — links, icon strokes, subheads.
        periwinkle: '#C0D8FF',

        // Light section background.
        ivory: '#FAF9F0',

        // Text tokens (kept flat so `text-on-dark` works as-is).
        'on-dark':        '#F1F3FF',   // body + headings on indigo
        'on-dark-muted':  '#AAB4DA',   // secondary text on indigo
        olive:            '#6E7A2E',   // eyebrows + labels on ivory
        'on-ivory':       '#3A3F63',   // paragraph text on light
        'on-ivory-muted': '#4B5175',   // secondary text on light
      },

      fontFamily: {
        /* Legacy: existing pages call `font-sans` / `font-display` which
         * still route to Mulish. Retire once P3-P7 replace those pages. */
        sans:    ['var(--font-mulish)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-mulish)', 'ui-sans-serif', 'system-ui', 'sans-serif'],

        /* NEW type system (P2). Reference by class name from any P3+
         * component: `font-heading` for Bricolage, `font-body` for Source
         * Sans, `font-serif-italic` for Newsreader. */
        heading:        ['var(--font-bricolage)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:           ['var(--font-source-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif-italic': ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
      },

      // Chartreuse rule length used in the eyebrow pattern (22 × 1px).
      width: {
        'eyebrow-rule': '22px',
      },

      letterSpacing: {
        widest:    '0.2em',
        eyebrow:   '0.14em',
        'eyebrow-wide': '0.16em',
        tightest:  '-0.025em',
        tightish:  '-0.02em',
        'micro-tight': '-0.01em',
      },

      lineHeight: {
        display:  '1.04',    // H1 range
        heading:  '1.15',    // H2
        subhead:  '1.35',    // H3
        prose:    '1.6',     // body
      },

      maxWidth: {
        'prose-wide': '72ch',
        // Content widths from the handoff.
        hero:     '1200px',
        standard: '1160px',
        mixed:    '1120px',
        narrow:   '1000px',
        prose:    '860px',
      },

      borderRadius: {
        pill: '999px',
        card: '18px',
      },

      transitionTimingFunction: {
        // Card hover ease, per the handoff.
        card: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      keyframes: {
        // Book-cover ambient float, 8s ease-in-out infinite, 0 to -14px.
        'cover-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        // Radial glow pulse behind the cover, 6s ease-in-out infinite.
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%':      { opacity: '0.9' },
        },
      },

      animation: {
        // Both are decorative — components that use these MUST also
        // respect prefers-reduced-motion (handled in globals.css).
        'cover-float': 'cover-float 8s ease-in-out infinite',
        'glow-pulse':  'glow-pulse 6s ease-in-out infinite',
      },

      typography: ({ theme }: { theme: (k: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':          theme('colors.ink.700'),
            '--tw-prose-headings':      theme('colors.ink.DEFAULT'),
            '--tw-prose-links':         theme('colors.accent.on-cream'),
            '--tw-prose-bold':          theme('colors.ink.DEFAULT'),
            '--tw-prose-quotes':        theme('colors.ink.500'),
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
