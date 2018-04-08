# webpack3 的配置

## config配置目录

    - config
      - webpack.base.js // webpack的基本配置
      - webpack.config.js // 配置中的一些参数
      - webpack.dev.js // 开发环境下的配置
      - webpack.prod.js // 生产环境下的配置
      - webpack.test.js // 测试环境下的配置

## 主要用到的module

- css
- scss
- jsx
- url-loader

## 主要用到的plugin

- html-webpack-plugin
- extract-text-webpack-plugin
- webpack.IgnorePlugin
- webpack.optimize.CommonsChunkPlugin
- webpack-spritesmith
- uglify-js-plugin
- webpack.DefinePlugin
- webpack.NamedModulesPlugin
- webpack.HotModuleReplacementPlugin

## 还需实现的功能

- dll
- 按需加载
- tsx规则配置