const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const IS_DEV = (process.env.NODE_ENV === 'dev')

const dirNode = 'node_modules'
const dirApp = path.join(__dirname, 'src')
const dirAssets = path.join(__dirname, 'assets')

const appHtmlTitle = 'Webpack Boilerplate'

module.exports = {
  entry: {
    vendor: [
        'lodash'
    ],
    bundle: path.join(dirApp, 'index')
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      title: appHtmlTitle
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
        ]
      }
    ]
  }
}
