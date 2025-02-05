/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', // If your files are inside the `app` folder
    './pages/**/*.{js,jsx,ts,tsx}', // If you have a `pages` directory
    './components/**/*.{js,jsx,ts,tsx}', // If you have a `components` directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
