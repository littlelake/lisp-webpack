const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

const paths = require('./paths');

const base = require('./webpack.config.base');

const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;

module.exports = webpackMerge(base, {
  // 打包模式
  mode: 'development',
  plugins: [
    // DllPlugin
    // https://webpack.docschina.org/plugins/dll-plugin/
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..', 'dll'),
      manifest: require('../dll/manifest.json'),
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // This plugin will cause the relative path of the module to be displayed when HMR is enabled. Suggested for use in development.
    new webpack.NamedModulesPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    // 启用gzip压缩
    compress: true,
    // 配置额外的静态文件内容的访问路径，即那些不经过 webpack 构建，但是需要在 webpack-dev-server 中提供访问的静态资源（如部分图片等）
    contentBase: paths.appSrc,
    // 当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面
    historyApiFallback: true,
    // 构建消息将会出现在浏览器控制台
    inline: true,
    // 告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载
    watchContentBase: true,
    // 与监视文件相关的控制选项
    watchOptions: {
      ignored: paths.appNodeModules,
    },
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 指定使用一个 host
    host: paths.appHost,
    // 指定要监听请求的端口号
    port: paths.appPort,
    // 遮罩层提示错误
    overlay: true,
    quiet: true,
    disableHostCheck: true
  }
});