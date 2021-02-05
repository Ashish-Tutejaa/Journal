module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'bgCol' : '#DDD',
      'navCol' : '#ABC'
     })

  },
  variants: {
    extend: {},
  },
  plugins: [],
}