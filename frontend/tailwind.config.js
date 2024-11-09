/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // This makes sure Tailwind CSS scans all your source files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Example of adding custom colors
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example of custom fonts
      },
    },
  },
  plugins: [],
};
