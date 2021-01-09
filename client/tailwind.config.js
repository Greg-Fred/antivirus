module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'blue-custom-1': '#151A30',
      'blue-custom-2': '#0C2556'
    }),
    extend: {
      height: {
        'custom-calc': 'calc(100vh - 4rem)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
