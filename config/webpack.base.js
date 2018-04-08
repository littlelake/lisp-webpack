var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js' // 这里可以修改，暂时默认入口文件为src下的index.js文件
  },
  output: {
    filename: '[name].js', // 根据入口文件名来生成文件
    path: path.resolve(__dirname, '../dist') // 输出的文件夹
  },
  resolve: {
    // 用于简化import时的路径
    alias: {},
    // 进行路径搜索，简化模块的查找，提升构建的速度
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ],
    // 补全后缀名查找
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  },
  plugins: [
    // https://doc.webpack-china.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'src/favicon.ico'
    }),
  ]
}