/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#fff5f8",
          100: "#ffe4ec",
          200: "#ffc1d7",
          300: "#ff96c2",
          400: "#ff6cb0",
          500: "#e73e8f",
          600: "#d6336c",
          700: "#c32352",
          800: "#a7163f",
          900: "#8c0e31",
        },
      },
      boxShadow: {
        "glow-pink": "0 0 10px 4px rgba(231,62,143,0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
