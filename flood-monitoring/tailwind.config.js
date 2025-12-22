/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        konkhmer: ['"Konkhmer Sleokchher"', 'sans-serif'],
        roboto: 'Roboto'
      },
      colors: {
        primary_white: 'rgba(245, 245, 245, 1)',
        brighter_white: 'rgba(255, 255, 255, 1)',
        secondary_white: 'rgba(255, 255, 255, 0.85)',
        pink_white: 'rgba(252, 252, 252, 1)',
        primary_black: 'rgba(18, 18, 18, 1)',
        secondary_black: 'rgba(18, 18, 18, 0.85)',
        tertiary_black: 'rgba(18, 18, 18, 0.5)',
        dark_blue: 'rgba(34, 90, 227, 1)',
        blur_blue: 'rgba(43, 106, 237, 0.81)',
        blur_white: 'rgba(255, 255, 255, 0.19)',
        primary_blue: 'rgba(43, 106, 237, 1)',
        alert: 'rgba(200, 50, 30, 1)',
        critical_red: 'rgba(200, 50, 30, 1)',
        critical_red_v2: 'rgba(200, 50, 30, 0.5)'
      },
      fontSize: {
        normal: '16px'
      }
    },
  },
  plugins: [],
}