/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        tmdbDarkBlue: 'rgb(3,37,65)'
      }
    },
  },
  plugins: [],
};
