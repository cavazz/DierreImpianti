/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#111827',
        surface:    '#1a2436',
        card:       '#1f2d42',
        dark:       '#0d1520',
        'dark-2':   '#111b28',
        'text-p':   '#f0f4f8',
        'text-s':   '#8aa4c0',
        'text-xs':  '#546e89',
        accent:     '#38bdf8',
        'accent-h': '#0ea5e9',
        border:     '#1f2d42',
        'border-2': '#2a3d54',
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
