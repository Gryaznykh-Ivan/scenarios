/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3f51b5',
        'dark-primary': '#223499',
      }
    },
  },
  plugins: [],
}

