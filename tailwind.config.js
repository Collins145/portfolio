/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          green: "#18d26e",
          greenHover: "#35e888",
          greenDark: "#15bb62",
          accent: "#4ceb95",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        raleway: ['"Raleway"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
