/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        tmdbDarkBlue: 'rgb(3,37,65)',
        tmdbLightGreen: 'rgb(30,213,169)',
        tmdbLightBlue: 'rgb(1,180,228)'
      },
      
    },
  },
  plugins: [],
};
