const {
    resolve
} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')





module.exports = {
    // 单入口 -> 单页应用
    // entry: './src/index.js',
    entry: {
        // 这两个文件都依赖了jquery
        main: './src/index.js',
        test: './src/test.js'
    },
    output: {
        // [name]: 取文件名，就是入口设置的别名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
    ],
    /**
     * 
     * 1、（单、多）可以将node_modules中代码单独打包成一个chunk最终输出
     * 2、自动分析多入口chunk中，有没有公共的依赖，
     * 如果有，这会单独打包成一个chunk，大于30kb才会分割
     * 
     */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'development'
}