'use strict';

const path = require('path');
const fs = require('fs');
const ip = require('ip');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  // 静态文件地址
  appHtml: resolveApp('public/index.html'),
  // 入口文件地址
  appIndexJs: resolveApp('src/index.tsx'),
  // package.json地址
  appPackageJson: resolveApp('package.json'),
  // src地址
  appSrc: resolveApp('src'),
  // node_modules地址
  appNodeModules: resolveApp('node_modules'),
  // tsconfig.json地址
  appTsConfig: resolveApp('tsconfig.json'),
  // tslint.json地址
  appTsLint: resolveApp('tslint.json'),
  // build地址
  appOutputPath: resolveApp('build'),
  // host主机地址
  appHost: ip.address() || 'localhost',
  // 端口号
  appPort: process.env.PORT || 3001,
  // vendor
  appVendor: [
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'react-router-redux',
    'antd',
    'axios',
    'moment',
    'antd-mobile'
  ]
};