var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');

// webpack配置变量
var CONFIG = require('./webpack.config');

// 将ExtractTextPlugin定义部分抽离成公共，而且是在生产环境下使用
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === CONFIG.ALL_ENV.ENV_DEV
});

module.exports = {
  entry: {
    app: './src/index.jsx', // 这里可以修改，暂时默认入口文件为src下的index.js文件
    vendor: CONFIG.VENDOR
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
      'node_modules',
      'spritesmith-generated', // webpack-spritesmith 生成所需文件的目录
    ],
    // 补全后缀名查找
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: CONFIG.ALL_PATH.SRC,
      exclude: CONFIG.ALL_PATH.NODE_MODULES,
      use: ['babel-loader']
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          // 小于8Kb则以base64的形式输出，大于8KB则还是以之前的形式输出(8KB = 8*1024)
          limit: 8192,
          name: 'images/[name][hash:8].[ext]'
        }
      }]
    }, {
      test: /\.css$/,
      include: CONFIG.ALL_PATH.SRC,
      exclude: CONFIG.ALL_PATH.NODE_MODULES,
      use: extractSass.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.scss$/,
      include: CONFIG.ALL_PATH.SRC,
      exclude: CONFIG.ALL_PATH.NODE_MODULES,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader'
        }]
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
    extractSass,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // https://doc.webpack-china.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 使用 vendor 入口作为公共部分
      filename: 'vendor.js',
      minChunks: Infinity // 这个配置会让 webpack 不再自动抽离公共模块 
    }),
    // https://www.npmjs.com/package/webpack-spritesmith
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/assets/sprites'), // 多个图片所在的目录
        glob: '*.png' // 匹配图片路径
      },
      target: {
        image: path.resolve(__dirname, '../src/assets/images/sprite.png'),
        css: path.resolve(__dirname, '../src/assets/css/sprite.scss')
      },
      apiOptions: {
        cssImageRef: '~sprite.png'
      }
    })
  ],
}