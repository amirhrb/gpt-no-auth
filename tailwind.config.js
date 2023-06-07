/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10a37f',
      },
      fontFamily: {
        colfax: 'var(--colfax-font)',
        yekan: 'var(--yekan-font)',
      },
      keyframes: {
        appear: {
          '0%': {
            transform: 'translateY(200px) scale(0)',
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
          },
        },
      },
      animation: {
        appear: 'appear 0.2s',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
