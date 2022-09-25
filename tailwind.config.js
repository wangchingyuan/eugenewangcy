/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: {
            BG: "#1A1A1A",
            TXT: "#F7F6F6",
          },
          light: {
            BG: "#F7F6F6",
            TXT: "#1A1A1A",
          },
          warm: {
            BG: "#D4a373",
            TXT: "#1A1A1A",
          }
        },
      }
    },
  },
  darkMode: "class",
  plugins: [],
}