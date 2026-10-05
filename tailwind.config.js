/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#64131C',
          dark: '#450B12',
          light: '#841B26',
          glow: 'rgba(100, 19, 28, 0.25)',
        },
        sand: {
          DEFAULT: '#F4F0E8',
          light: '#FAF7F2',
          dark: '#E8E1D5',
          muted: '#D8D1C4',
        },
        dark: {
          DEFAULT: '#11100F',
          pure: '#090808',
          card: '#181716',
          elevated: '#201E1D',
          border: 'rgba(244, 240, 232, 0.12)',
        },
        muted: {
          DEFAULT: '#817C76',
          light: '#A5A09A',
          dark: '#54504B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
      },
    },
  },
  plugins: [],
}
