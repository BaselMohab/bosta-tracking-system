/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mainText: "var(--main-text)",
        mainText2: "var(--main-text2)",
        searchBtn: "var(--search-btn)",
        border: "var(--border)",
        subText: "var(--sub-text)",
        focus: "var(--focus)",
      },
      
    },
  },
  plugins: [],
}

