/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#FFFFFF',
        surface:    '#F7F7F5',
        card:       '#FFFFFF',
        dark:       '#111111',
        'dark-2':   '#1C1C1C',
        'text-p':   '#111111',
        'text-s':   '#737373',
        'text-xs':  '#A3A3A3',
        accent:     '#F97316',
        'accent-h': '#EA580C',
        border:     '#E5E5E5',
        'border-2': '#D4D4D4',
      },
      fontFamily: {
        sans:    ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['Poppins',    'system-ui', 'sans-serif'],
      },
      animation: {
        marquee:  'marquee 30s linear infinite',
        'marquee2':'marquee2 30s linear infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0%)' },    '100%': { transform: 'translateX(-100%)' } },
        marquee2: { '0%': { transform: 'translateX(100%)' },  '100%': { transform: 'translateX(0%)' } },
      },
    },
  },
  plugins: [],
}
