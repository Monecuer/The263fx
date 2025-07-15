/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'scroll-horizontal': 'scrollX 25s linear infinite reverse',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        scrollX: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
