const plugin = require('tailwindcss/plugin');
module.exports = plugin(function({ addBase, theme }) {
    addBase({
        'h1': { fontSize: theme('fontSize.3xl') },
        'h2': { fontSize: theme('fontSize.2xl') },
        'h3': { fontSize: theme('fontSize.xl') },
        'h4': { fontSize: theme('fontSize.lg') },
        'h5': { fontSize: theme('fontSize.l') },
        'h6': { fontSize: theme('fontSize.l') },
    });
});
