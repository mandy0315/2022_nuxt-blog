/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const customColors = {
  'c-black-200': '#5E5D5D',
  'c-black-100': '#8B8B8B',
  'c-gray-200': '#BBBBBB',
  'c-gray-100': '#F4F4F4',
  'c-brown-200': '#BC9C73',
  'c-brown-100': '#F4EDE5',
  'c-red-100': '#A1001A',
  'c-pink-100': '#FFC0CA'
};
const customBackgroundColors = {
  'c-bg-light': '#FFFFFF',
  'c-bg-dark': '#483F3F',
  'c-bg-cream': '#F6F4F2'
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
        ...customBackgroundColors,
        ...customColors
      },
      borderColor: {
        ...customColors
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), plugin(addComponents => {})]
};
