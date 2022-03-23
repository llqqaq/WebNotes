const {
    resolve
} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')




module.exports = {
    // 单入口 -> 单页应用
    entry: './src/index.js',
    output: {
        // [name]: 取文件名，就是入口设置的别名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
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