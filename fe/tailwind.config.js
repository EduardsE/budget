const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.svelte'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: (theme) => ({
        auth: "url('/images/auth-bg.jpg')",
      }),
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/forms')],
};
