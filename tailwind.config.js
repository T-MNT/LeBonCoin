/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lbcOrange: '#FE6E15',
      },
      fontFamily: {
        round: ['round', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
