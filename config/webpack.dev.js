var webpack = require('webpack');
// 用于合并webpack.base.js中的配置
var merge = require('webpack-merge');
// 基础配置
var base = require('./webpack.base');
// webpack配置变量
var CONFIG = require('./webpack.config');

module.exports = merge(base, {
  plugins: [
    // https://doc.webpack-china.org/plugins/define-plugin/
    // 定于全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(CONFIG.ALL_ENV.ENV_DEV)
    })
  ]
});