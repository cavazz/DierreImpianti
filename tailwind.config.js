/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#F8FAFC',
        surface:    '#FFFFFF',
        card:       '#FFFFFF',
        dark:       '#0F172A',
        'dark-2':   '#1E293B',
        'text-p':   '#1E293B',
        'text-s':   '#64748B',
        'text-xs':  '#94A3B8',
        accent:     '#F97316',
        'accent-h': '#EA6C00',
        primary:    '#2563EB',
        'primary-h':'#1D4ED8',
        border:     '#E2E8F0',
        'border-2': '#CBD5E1',
      },
      fontFamily: {
        sans:    ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['Poppins',    'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.8rem,8vw,6rem)', { lineHeight: '1.08', letterSpacing: '-0.04em' }],
        'h2':   ['clamp(2rem,4vw,3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.03em' }],
        'h3':   ['clamp(1.25rem,2vw,1.5rem)', { lineHeight: '1.3' }],
      },
      boxShadow: {
        card:        '0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.07)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.1),0 2px 6px rgba(0,0,0,0.05)',
        btn:         '0 4px 16px rgba(249,115,22,0.38)',
        'btn-hover': '0 8px 24px rgba(249,115,22,0.48)',
      },
      borderRadius: {
        card: '16px',
        btn:  '9999px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      },
    },
  },
  plugins: [],
}
