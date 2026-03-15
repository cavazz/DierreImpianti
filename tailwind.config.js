/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#0e0e0e',
        surface:    '#161616',
        card:       '#1e1e1e',
        dark:       '#080808',
        'dark-2':   '#0c0c0c',
        'text-p':   '#f0f0f0',
        'text-s':   '#787878',
        'text-xs':  '#4f4f4f',
        accent:     '#f59e0b',
        'accent-h': '#d97706',
        border:     '#1e1e1e',
        'border-2': '#2b2b2b',
      },
      fontFamily: {
        sans:    ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['Poppins',    'system-ui', 'sans-serif'],
      },
      animation: {
        marquee:   'marquee 30s linear infinite',
        'marquee2':'marquee2 30s linear infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0%)' },   '100%': { transform: 'translateX(-100%)' } },
        marquee2: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0%)' } },
      },
    },
  },
  plugins: [],
}
