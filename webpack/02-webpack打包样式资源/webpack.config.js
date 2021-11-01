/**
 * 
 * webpack.config,js webpack的配置文件
 *    作用：指示webpack 干哪些活（当你运行webpack指令时候 会加载里面的配置）
 * 
 *  所有的构建工具都是基于node.js平台运行的~ 模块化默认采用common.js
 * 
 */

// resolve： 用来拼接绝对绝对路径的方法
const { resolve } = require('path')

module.exports = {
    // webpack的配置
    // 五个核心

    // 入口文件
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'built.js',
        // _dirname node.js的变量，代表当前文件目录的决绝对路径
        path: resolve(__dirname, 'build')
    }
}