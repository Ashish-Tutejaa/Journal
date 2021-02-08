module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'bgCol' : '#f2ebeb',
      'navCol' : '#ABC'
     })

  },
  variants: {
    extend: {},
  },
  plugins: [],
}