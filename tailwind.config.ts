import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy colors (preserved)
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          300: '#fdba74',
          500: '#FF9500',
          600: '#ea580c',
        },
        pink: {
          400: '#EC4899',
          100: '#fce7f3',
        },
        blue: {
          900: '#111E3F',
        },
        cream: {
          50: '#FFFAF0',
        },
        // Design system: light mode palette (imweb.me minimalist)
        // Light:  bg=white, text-primary=gray-800, text-secondary=gray-500,
        //         accent=gray-900, border=gray-200
        // Dark:   bg=slate-950, text-primary=gray-100, text-secondary=gray-300,
        //         accent=white, border=slate-800
        // All values below come from Tailwind's default palette — no extra plugin needed.
        // Usage examples:
        //   bg-white dark:bg-slate-950
        //   text-gray-800 dark:text-gray-100
        //   text-gray-500 dark:text-gray-300
        //   text-gray-900 dark:text-white
        //   border-gray-200 dark:border-slate-800
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Typography scale (imweb.me spec)
        // H1  → text-5xl  = 3rem by default; override to 3.5rem
        // H2  → text-3xl  = 1.875rem by default; override to 2.25rem
        // H3  → text-2xl  = 1.5rem (matches default, explicit for clarity)
        // Body → text-base = 1rem   (matches default)
        // Small → text-sm  = 0.875rem (matches default)
        '5xl': ['3.5rem', { lineHeight: '1.1' }],
        '3xl': ['2.25rem', { lineHeight: '1.2' }],
        '2xl': ['1.5rem',  { lineHeight: '1.3' }],
      },
    },
  },
  plugins: [],
}
export default config
