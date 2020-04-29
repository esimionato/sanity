/* eslint-disable import/no-commonjs */

const {getStyleResolver} = require('@sanity/webpack-integration/v4')

module.exports = {
  modules: true,
  plugins: {
    'postcss-import': {
      resolve: getStyleResolver({from: __dirname})
    },
    'postcss-preset-env': {
      // importFrom: [
      //   'node_modules/sanity-web-styles/src/custom-media.css',
      //   'node_modules/sanity-web-styles/src/custom-properties.css'
      // ],
      stage: 3,
      features: {
        'color-mod-function': {unresolved: 'warn'},
        'custom-media-queries': {preserve: false},
        'custom-properties': {preserve: false},
        'nesting-rules': true
      }
    }
  }
}
