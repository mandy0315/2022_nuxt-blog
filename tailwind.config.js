/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const customColors = {
  // Configure your color palette here
  'c-gray-800': '#323232',
  'c-gray-600': '#575757',
  'c-gray-400': '#D4D4D4',
  'c-orange-800': '#E98012',
  'c-orange-600': '#F7B168',
  'c-orange-200': '#FDF8F2',
  'c-brown-800': '#7A6A56'
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
  plugins: [require('@tailwindcss/forms'), plugin(addComponents => {})]
};
