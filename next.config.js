const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')

const dev = process.env.NODE_ENV !== 'production'

module.exports = withPlugins([
  withOffline,
], {
  target: 'serverless',
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    })

    return config
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst'
      },
      {
        urlPattern: /\.(jpe?g|png|gif|svg)$/i,
        handler: 'CacheFirst'
      }
    ]
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: (
      dev
        ? '[name]__[local]'
        : '[hash:base64:5]'
    )
  }
})
