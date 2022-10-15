/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // experimenting
      typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.pink[800]'),
            '--tw-prose-headings': theme('colors.pink[900]'),
            '--tw-prose-lead': theme('colors.pink[700]'),
          }
        }
      }),
      colors: {
        myDark: {
          BG: "#1A1A1A",
          TXT: "#F7F6F6",
        },
        myLight: {
          BG: "#F7F6F6",
          TXT: "#1A1A1A",
        },
        myWarm: {
          BG: "#D4a373",
          TXT: "#1A1A1A",
        }
      }
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
  ],
}