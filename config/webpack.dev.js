var webpack = require('webpack');
// 用于合并webpack.base.js中的配置
var merge = require('webpack-merge');
// 基础配置
var base = require('./webpack.base.js');

module.exports = merge(base, {

});