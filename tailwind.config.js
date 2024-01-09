/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "sans" : ["Poppins", "Cairo"],
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require('tailwindcss-rtl'),],
  
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["halloween"],
          "primary": "#D91C0B",
          "secondary": "#1D1C1C",
          "accent": "#ffffff",
          "neutral": "#8A8585",
          "base-100": "#0D0D0D",
        },
      },
    ],
	},
}