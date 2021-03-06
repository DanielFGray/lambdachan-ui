module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 0,
      browsers: 'last 2 versions',
    }),
    require('postcss-fixes')({ preset: 'recommended' }),
  ],
  env: {
    production: {
      cssnano: {
        autoprefixer: false,
        safe: true,
        calc: false,
      },
    },
  },
}
