/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#fff1ee",
          100: "#ffe1da",
          200: "#ffc7b9",
          300: "#ffa48c",
          400: "#ff7a57",
          500: "#f9552f", // primary brand coral
          600: "#e13d1a",
          700: "#bc2e13",
          800: "#992814",
          900: "#7d2615",
        },
      },
    },
  },
  plugins: [],
};