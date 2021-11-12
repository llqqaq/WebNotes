

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 *  entry: 入口七点
 *      1. string --> './src/index.js
 *         打包形成一个chunk，输出一个bundle文件
 *         此时chunk的名称默认是main
 * 
 *      2.array --> ['./src/index.js','./src/test.js'],
 *          多入口
 *          所有入口文件最终只会形成一个chunk（main），输出出去只有一个bundle文件
 *           ---> 只有在HMR功能中让html热更新生效~
 * 
 *      3.object
 *          多入口
 *          有几个入口文件就形成几个chunk，输出几个bundle文件
 *          此时chunk的名称是key
 * 
 *      --->  特殊用法(dll)
 *          {
 *              // 所有的入口文件都会形成一个chunk，输出出去只有一个bundle(index)文件
 *              index: ['./src/index.js','./src/test.js'],
 *              // 形成一个chunk，输出一个bundle文件
 *              add: './src/test.js'
 *         }
 */         



module.exports = {
    // string
    // entry: './src/index.js',
    
    // array
    // entry: [
    //     './src/index.js',
    //     './src/test.js'
    // ],

    // object
    entry: {
        index:  './src/index.js',
        test: './src/test.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}