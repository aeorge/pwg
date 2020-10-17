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
      colors: {
        'dark-gray': '#0E0E10',
      },
      boxShadow: {
        'outline-green': '0 0 0 3px rgba(56, 161, 105, 1)',
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
