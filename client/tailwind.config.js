/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
      colors: {
        customBlue: "#1AA1DC",
        customBlueLight: "#55B3E4",
        customBlack: "#130F26",
        customBrown: "#84675A",
        customCyan: "#00838F",
        customOrange: "#FF8F16",
        customPink: "#ED0B4C",
        customPurpleOpaque: "#6673FD",
        customPurple: "#7356F1",
        customPurpleLight: "#F3E3FA",
        customGreen: "#558B2F",
        customDarkGrayish: "#212529",
      },
    },
  },
  plugins: [],
};
