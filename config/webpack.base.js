var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// webpack配置变量
var CONFIG = require('./webpack.config');

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
    alias: {
      'assets': path.resolve(__dirname, '../src/assets'),
    },
    // 进行路径搜索，简化模块的查找，提升构建的速度
    modules: [
      CONFIG.ALL_PATH.NODE_MODULES,
      'node_modules'
    ],
    // 补全后缀名查找
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: CONFIG.ALL_PATH.SRC,
      exclude: CONFIG.ALL_PATH.NODE_MODULES,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  plugins: [
    // https://doc.webpack-china.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: CONFIG.ALL_PATH.TEMPLATE_HTML,
      favicon: CONFIG.ALL_PATH.TEMPLATE_FAVICON,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
    new ExtractTextPlugin('[name][contenthash].css'),
  ]
}