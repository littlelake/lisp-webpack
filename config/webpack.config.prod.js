const webpackMerge = require('webpack-merge');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const paths = require('./paths');

const base = require('./webpack.config.base');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = webpackMerge(base, {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  // devtool: shouldUseSourceMap ? 'source-map' : false,
  devtool: false,
  // 打包模式
  mode: 'production',
  // optimization: {
  //   minimizer: [new TerserPlugin({
  //     cache: true,
  //     parallel: true,
  //     sourceMap: false
  //   })]
  // },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, // 不需要格式化
          comments: false // 不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        // 避免 cssnano 重新计算 z-index
        safe: true,
        // cssnano 集成了autoprefixer的功能
        // 会使用到autoprefixer进行无关前缀的清理
        // 关闭autoprefixer功能
        // 使用postcss的autoprefixer功能
        autoprefixer: false
      },
      canPrint: true
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      // navigateFallback: publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
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
  // 输出信息 https://webpack.js.org/configuration/stats/
  stats: {
    timings: true,
    assets: true,
    assetsSort: 'size',
    env: true,
    performance: true,
    version: true,
    all: false,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  }
});