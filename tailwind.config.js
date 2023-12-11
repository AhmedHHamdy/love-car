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
          "primary": "#E45A00",
          "secondary": "#111111",
          "accent": "#ffffff",
          "neutral": "#8A8585",
          "base-100": "#1E1E1E",
        },
      },
    ],
	},
}