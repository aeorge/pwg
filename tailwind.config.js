module.exports = {
  purge: ['./pages/**/*.js'],
  theme: {
    extend: {
      screens: {
        hoverable: { raw: '(hover: hover) and (pointer: fine)' },
      },
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
    defaultLineHeights: true,
    standardFontWeights: true,
  },
}
