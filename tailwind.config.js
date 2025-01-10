/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      screens: {
        mb: { min: "0", max: "767px" }
      }
    },
  },
  plugins: [],
}

