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
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
