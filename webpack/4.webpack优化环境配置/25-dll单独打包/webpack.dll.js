
/**
 * 
 * 使用dll技术，对某些库（第三方库： jquery、react、vue...） 进行单独打包
 *      当你运行 webpack 时， 默认查找 webpack.config.js 配置文件
 *      需求： 需要运行 webpack.dll.js文件
 *         -->  webpack --config webpack.dll.js
 * 
 *  已经被摒弃，详情可以看下面这个文章
 *  https://blog.csdn.net/weixin_40906515/article/details/109396476?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163636032416780255296780%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163636032416780255296780&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~times_rank-3-109396476.first_rank_v2_pc_rank_v29&utm_term=webpack%E7%9A%84dll&spm=1018.2226.3001.4187
 */



const { resolve } = require('path')
const webpack = require('webpack')
 
module.exports = {
    entry: {
        // 最后打包生成的[name] --> jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]'  // 打包库里面向外暴露出去的内容的名字
    },
    plugins: [
        // 打包生成一个manifest.json --> 提供与jquery映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',  // 映射库暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json') // 输出的文件路径
        })
    ],
    mode: 'production'
}