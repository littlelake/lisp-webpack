var webpack = require('webpack');
// 用于合并webpack.base.js中的配置
var merge = require('webpack-merge');

var base = require('./webpack.base');

module.exports = merge(base, {});