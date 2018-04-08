var webpack = require('webpack');
// 用于合并webpack.base.js中的配置
var merge = require('webpack-merge');
// 基础配置
var base = require('./webpack.base');
// webpack配置变量
var CONFIG = require('./webpack.config');

module.exports = merge(base, {
  // 定义resourceMap
  devtool: 'cheap-module-source-map',
  plugins: [
    // https://doc.webpack-china.org/plugins/define-plugin/
    // 定于全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(CONFIG.ALL_ENV.ENV_DEV)
    }),
    // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // 模块热更新插件(Hot Module Replacemant)
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // 启用gzip压缩
    compress: true,
    // 配置额外的静态文件内容的访问路径，即那些不经过 webpack 构建，但是需要在 webpack-dev-server 中提供访问的静态资源（如部分图片等）
    contentBase: CONFIG.ALL_PATH.SRC,
    // 当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面
    historyApiFallback: true,
    // 构建消息将会出现在浏览器控制台
    inline: true,
    // 告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载
    watchContentBase: true,
    // 与监视文件相关的控制选项
    watchOptions: {
      ignored: /node_modules/,
    },
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 指定使用一个 host
    host: CONFIG.ALL_PATH.SERVER_HOST,
    // 指定要监听请求的端口号
    port: CONFIG.ALL_PATH.SERVER_PORT,
    // 遮罩层提示错误
    overlay: true,
    quiet: true,
    disableHostCheck: true
  }
});