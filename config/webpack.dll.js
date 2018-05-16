const path = require('path');
const webpack = require('webpack');
// webpack配置变量
var CONFIG = require('./webpack.config');

module.exports = {
  entry: {
    vendor: CONFIG.VENDOR
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