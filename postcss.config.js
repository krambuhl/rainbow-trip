module.exports = {
  plugins: [
    'stylelint',
    'postcss-import',
    'postcss-simple-vars',
    'postcss-math',
    ['postcss-functions', {
      functions: {
        responsive(min, max, rangeMin, rangeMax) {
          return `
            calc(
              ${min} + (${parseFloat(max)} - ${parseFloat(min)}) *
              ((100vw - ${rangeMin}) / (${parseInt(rangeMax, 10)} - ${parseInt(rangeMin, 10)}))
            )
          `
        }
      }
    }],
    'postcss-nested',
    'postcss-responsive-type',
    ['postcss-preset-env', {
      stage: 1,
      importFrom: [
        'styles/variables/breakpoints.css'
      ],
      features: {
        'nesting-rules': false
      },
    }],
    'postcss-reporter'
  ]
}
