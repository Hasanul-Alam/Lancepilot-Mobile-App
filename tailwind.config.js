/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./*", "./components"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#e9e0ff",
          200: "#c8b3ff",
          300: "#a885ff",
          400: "#8858ff",
          500: "#6a30ff",
          600: "#5a26db",
          700: "#4a1cb7",
          800: "#3a1293",
          900: "#2a086f",
        },
        green: {
          "custom-500": "#22c065",
          "custom-600": "#1a9e4b",
          "custom-700": "#0f6f2e",
          "custom-800": "#0a4c1d",
        },
        main: {
          500: "#00b15e",
          600: "#008f4f",
        },
      },
    },
  },
  plugins: [],
};
