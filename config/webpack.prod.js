var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglify-js-plugin');

// 用于合并webpack.base.js中的配置
var merge = require('webpack-merge');

var base = require('./webpack.base');
// webpack配置变量
var CONFIG = require('./webpack.config');

module.exports = merge(base, {
  /**
   * 输出 (Output)
   * @see https://webpack.js.org/configuration/output/
   */
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的文件夹
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].bundle.map',
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    // https://doc.webpack-china.org/plugins/define-plugin/
    // 定于全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(CONFIG.ALL_ENV.ENV_PROD)
    }),
    // 通过计算模块出现次数来分配模块。通过这个插件webpack可以分析和优先考虑使用最多的模块，
    // 并为它们分配最小的ID。这个经常被使用可以较快地获得模块。这使得模块可以预读，建议这样可以减少总文件大小。
    new webpack.optimize.OccurrenceOrderPlugin(),
    // js压缩
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});