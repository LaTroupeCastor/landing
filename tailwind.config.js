/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
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
        },
        black: {
          100: "#140E00",
          80: "#413C31",
          60: "#6E6B62",
          40: "#9B9993",
          20: "#C8C7C4",
          10: "#EAEAE9",
          5: "#F7F7F7",
        },
        secondary: {
          100: "#0A385C",
          80: "#395E7B",
          60: "#688499",
          40: "#97A9B8",
          20: "#C6CFD6",
          10: "#EAECEE",
          5: "#F3F5F7",
        }
      }
    },
  },
  plugins: [],
}

