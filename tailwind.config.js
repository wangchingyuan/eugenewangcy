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
          NAV: "#3B3C3D",
          BG: "#2E2F31",
          TXT: "#F7F6F6",
        },
        myWarm: {
          NAV: "#F8D2B1",
          BG: "#F7F6F6",
          TXT: "#1A1A1A",
        },
        myLight: {
          NAV: "#D2D5DA",
          BG: "#FDF1E6",
          TXT: "#1A1A1A",
        },
      }
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
  ],
}