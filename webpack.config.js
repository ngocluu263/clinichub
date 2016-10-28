
var webpack = require('webpack')
var path = require('path')
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  context: path.resolve(__dirname, 'src/js'),
  entry: {
    sessionCreator: './SessionCreator/index',
    vendors: ['react', 'react-dom', 'lodash']
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: DEBUG? []: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
