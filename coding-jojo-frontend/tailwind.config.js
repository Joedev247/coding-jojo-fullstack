/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add the font families to Tailwind
        'montserrat': ['var(--font-montserrat)'],
        'geist': ['var(--font-geist)'],
        'geist-mono': ['var(--font-geist-mono)'],
      },
      // ...any other theme extensions
    },
  },
  plugins: [],
}
