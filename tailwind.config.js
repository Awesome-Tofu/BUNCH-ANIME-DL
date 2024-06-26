/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#374151',
        'custom-blue': '#111827'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}

