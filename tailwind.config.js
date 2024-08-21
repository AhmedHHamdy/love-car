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
        dark: {
          ...require("daisyui/src/theming/themes")["halloween"],
          "primary": "#D91C0B",
          "secondary": "#0D0D0D",
          "accent": "#ffffff",
          "neutral": "#8A8585",
          "base-100": "#1D1C1C",
        },
        light: {
          ...require("daisyui/src/theming/themes")["halloween"],
          "primary": "#D91C0B",
          "secondary": "#ffffff",
          "accent": "#ffffff",
          "neutral": "#8A8585",
          "base-100": "#ffffff",
          "base-300": "#ffeceb",
          
          // "primary": "#D91C0B",
          // "secondary": "#ffffff",
          // "accent": "#0D0D0D",
          // "neutral": "#0D0D0D",
          // "base-100": "#ffffff",
          // "base-300": "#ffeceb",
        },
      },
    ],
	},
}