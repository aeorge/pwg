module.exports = {
  purge: ['./pages/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
