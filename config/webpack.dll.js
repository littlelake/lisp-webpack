const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');

module.exports = {
  mode: 'development',
  entry: {
    vendor: paths.appVendor
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll', 'manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}