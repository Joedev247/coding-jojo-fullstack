/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        // Professional White Theme Color Palette
        primary: {
          50: '#f8fafc',   // Very light gray-blue
          100: '#f1f5f9',  // Light gray-blue
          200: '#e2e8f0',  // Lighter gray
          300: '#cbd5e1',  // Light gray
          400: '#94a3b8',  // Medium gray
          500: '#64748b',  // Main primary color (slate gray)
          600: '#475569',  // Darker primary
          700: '#334155',  // Dark primary
          800: '#1e293b',  // Very dark primary
          900: '#0f172a',  // Darkest primary
        },
        secondary: {
          50: '#fafaf9',   // Off-white
          100: '#f5f5f4',  // Very light warm gray
          200: '#e7e5e4',  // Light warm gray
          300: '#d6d3d1',  // Medium light gray
          400: '#a8a29e',  // Medium gray
          500: '#78716c',  // Main secondary (warm gray)
          600: '#57534e',  // Darker secondary
          700: '#44403c',  // Dark secondary
          800: '#292524',  // Very dark secondary
          900: '#1c1917',  // Darkest secondary
        },
        accent: {
          50: '#eff6ff',   // Very light blue
          100: '#dbeafe',  // Light blue
          200: '#bfdbfe',  // Medium light blue
          300: '#93c5fd',  // Light blue
          400: '#60a5fa',  // Medium blue
          500: '#3b82f6',  // Main accent (blue)
          600: '#2563eb',  // Darker blue
          700: '#1d4ed8',  // Dark blue
          800: '#1e40af',  // Very dark blue
          900: '#1e3a8a',  // Darkest blue
        },
        success: {
          50: '#f0fdf4',   // Very light blue
          100: '#dcfce7',  // Light blue
          500: '#22c55e',  // Main success blue
          600: '#16a34a',  // Darker success blue
        },
        warning: {
          50: '#fffbeb',   // Very light amber
          100: '#fef3c7',  // Light amber
          500: '#f59e0b',  // Main warning amber
          600: '#d97706',  // Darker warning amber
        },
        error: {
          50: '#fef2f2',   // Very light red
          100: '#fee2e2',  // Light red
          500: '#ef4444',  // Main error red
          600: '#dc2626',  // Darker error red
        },
        // Background colors
        background: {
          primary: '#ffffff',     // Pure white
          secondary: '#fafafa',   // Very light gray
          tertiary: '#f5f5f5',    // Light gray
          card: '#ffffff',        // White cards
          hover: '#f8fafc',       // Subtle hover state
        },
        // Text colors
        text: {
          primary: '#0f172a',     // Dark text for high contrast
          secondary: '#475569',   // Medium text
          muted: '#64748b',       // Muted text
          inverse: '#ffffff',     // White text for dark backgrounds
        },
        // Border colors
        border: {
          light: '#f1f5f9',       // Very light border
          medium: '#e2e8f0',      // Medium border
          strong: '#cbd5e1',      // Strong border
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-white': 'linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beam': 'beam 8s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.5',
          },
        },
        beam: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateX(0%)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
