/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const customColors = {
  // Configure your color palette here
  'c-gray-800': '#323232',
  'c-gray-600': '#575757',
  'c-gray-400': '#919191',
  'c-gray-200': '#D4D4D4',
  'c-gray-100': '#F5F5F5',
  'c-brown-900': '#3d2a20',
  'c-brown-800': '#4d3224',
  'c-brown-600': '#BC9C73',
  'c-yellow-200': '#FFF89E',
  'c-red-600': '#DC2626'
};
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // 留下預設
      textColor: {
        ...customColors
      },
      backgroundColor: {
        ...customColors
      },
      borderColor: {
        ...customColors
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), plugin(addComponents => {})]
};
