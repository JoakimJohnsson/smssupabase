const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: {
                    1000: '#013246'
                },
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.coolGray,
            red: colors.red,
            blue: colors.sky,
            yellow: colors.amber,
            green: colors.lime,
            black: colors.black,
            white: colors.white
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
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('./src/assets/css/tw-plugins/headingFontSize'),
    ],
}
