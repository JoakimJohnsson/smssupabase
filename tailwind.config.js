const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      green: colors.lime
    },
    fontFamily: {
      'sans': ['Zen Kaku Gothic Antique', 'ui-sans-serif', 'system-ui'],
      'serif': ['Libre Baskerville', 'ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('./src/assets/css/tw-plugins/headingFontSize'),
  ],
}
