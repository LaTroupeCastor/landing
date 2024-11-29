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
        primary: {
          100: "#F1AB0E",
          80: "#F4BC3E",
          60: "#F7CD6E",
          40: "#F9DD9F",
          20: "#FCEECF",
          10: "#FEF7E0",
          5: "#FEFBF3",
        }
      }
    },
  },
  plugins: [],
}

