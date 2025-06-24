/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in src
    "./app/**/*.{js,ts,jsx,tsx}", // Include app directory for Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
