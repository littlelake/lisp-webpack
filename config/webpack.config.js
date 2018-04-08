/**
 * @description 定义一些变量
 */
var path = require('path');

module.exports = {
  // 所有关于环境的变量定义
  ALL_ENV: {
    ENV_DEV: 'development',
    ENV_PROD: 'production'
  },
  // 路径配置
  ALL_PATH: {
    NODE_MODULES: path.resolve(__dirname, 'node_modules'),
    // html-webpack-plugin中template的路径
    TEMPLATE_HTML: 'src/index.html',
    // html-webpack-plugin中favicon的路径
    TEMPLATE_FAVICON: 'src/favicon.ico',
    // src的路径
    SRC: path.resolve(__dirname, '../src')
  }

}