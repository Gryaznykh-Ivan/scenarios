/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontSize: {
      xs: ["10px"],
      sm: ["12px"],
      base: ["14px"],
      md: ["16px"],
      lg: ["20px"],
      xl: ["24px"],
    },
    extend: {
      colors: {
        primary: "#3f51b5",
        "dark-primary": "#223499",
      },
    },
  },
  plugins: [],
};
