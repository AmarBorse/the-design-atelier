/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F2EF',
        bone: '#FAF8F5',
        surface: '#FFFFFF',
        ink: '#1A1A1A',
        muted: '#6E6B67',
        subtle: '#8A8580',
        line: '#E4E0DB',
        accent: '#B39A6D',
        gold: '#FCB61D',
        night: '#1A1A1A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Tenor Sans"', '"Optima"', 'sans-serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
        mega: '0.32em',
      },
      maxWidth: {
        shell: '1280px',
      },
      transitionTimingFunction: {
        atelier: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        kenBurns: {
          '0%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.10)' },
        },
        /* Client logo ribbon. The track holds the list twice, so shifting by
           exactly half its width lands back on an identical frame. */
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        fadeIn: 'fadeIn 1.2s ease both',
        kenBurns: 'kenBurns 9s ease-out both',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};