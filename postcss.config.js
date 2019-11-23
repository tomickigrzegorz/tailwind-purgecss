const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

// configure Cssnano
const configureCssnano = () => {
  return {
    safe: true,
  }
}

module.exports = {
  plugins: [
    // cssnano
    cssnano(configureCssnano()),
    // autoprefixer
    autoprefixer,
  ]
}