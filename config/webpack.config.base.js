const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require('./paths');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // 入口
  // https://webpack.docschina.org/configuration/entry-context/#entry
  entry: [

    // 增加一个垫片文件，用于兼容
    require.resolve('./polyfills.js'),
    // 文件入口
    paths.appIndexJs
  ],
  // 输出
  // https://webpack.docschina.org/configuration/output
  output: {
    path: paths.appOutputPath,
    // 根据入口文件名来生成文件
    filename: '[name].[hash].bundle.js',
  },
  // 代码切割
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  // 模块
  // https://webpack.docschina.org/configuration/module/
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              'react-hot-loader/babel',
              ["import", {
                libraryName: "antd-mobile",
                style: "css"
              }]
            ]
          }
        }]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: [
                'react-hot-loader/babel',
              ],
            },
          },
          {
            loader: 'ts-loader', // (or awesome-typescript-loader)
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd-mobile',
                  style: 'css'
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            // loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader // 将 JS 字符串生成为 style 节点
            loader: MiniCssExtractPlugin.loader // 将 JS 字符串生成为 style 节点
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          },
          {
            // https://webpack.docschina.org/loaders/sass-loader/
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader ,
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            // loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff|ttf|woff2)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 小于8Kb则以base64的形式输出，大于8KB则还是以之前的形式输出(8KB = 8*1024)
            limit: 10000,
            name: 'images/[name][hash:8].[ext]'
          }
        }]
      }
    ],
  },
  // 代码模块路径解析的配置
  // https://webpack.docschina.org/configuration/resolve/
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
  },
  // 插件
  // https://webpack.docschina.org/configuration/plugins/
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    // 防止在 import 或 require 调用时，生成以下正则表达式匹配的模块
    // https://webpack.docschina.org/plugins/ignore-plugin/#src/components/Sidebar/Sidebar.jsx
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Webpack plugin that runs typescript type checker on a separate process.
    // https://github.com/Realytics/fork-ts-checker-webpack-plugin
    new ForkTsCheckerPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
}