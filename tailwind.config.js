/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        marble: {
          base: '#f8f7f4',
          warm: '#f0ede8',
          grain: 'rgba(120, 115, 105, 0.04)',
        },
        stone: {
          dark: '#2d2926',
          accent: '#8b735b',
          medium: '#5a5550',
          light: '#9a9590',
        },
        gold: {
          warm: '#c9a87c',
          muted: '#d4cfc7',
          deep: '#6b5d4f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
