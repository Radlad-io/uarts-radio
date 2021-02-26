// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
      extend: {
        colors: {
          rose: colors.rose,
        }
      }
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      // ...
    ],

  }