/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        background1: "#F6FAFE",
        primary: "#F4BC3E",
        primary200: "#FCEECF",
        primary300: "#FAE1A8",
        primary400: "#FDF5E2",
        border: "#EDEDED"
      }
    },
  },
  plugins: [],
}

