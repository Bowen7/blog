/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  daisyui: {
    darkTheme: false
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './demos/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      flexBasis: {
        auto: 'auto'
      },
      maxHeight: {
        144: '36rem'
      }
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' }
      // => @media (max-width: 639px) { ... }
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0px 0.8px 2px rgba(0, 0, 0, 0.032), 0px 2.7px 6.7px rgba(0, 0, 0, 0.048), 0px 12px 30px rgba(0, 0, 0, 0.08)',
      'lg-dark':
        '0 0 0 1px rgba(255,255,255,.15), 0px 0.8px 2px rgba(0, 0, 0, 0.032), 0px 2.7px 6.7px rgba(0, 0, 0, 0.048), 0px 12px 30px rgba(0, 0, 0, 0.08)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.05)',
      none: 'none'
    }
  },
  plugins: [require('daisyui')]
}
