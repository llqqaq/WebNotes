const {
    resolve
} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')





module.exports = {
    // 单入口 -> 单页应用
    // entry: './src/index.js',
    entry: {
        // 多入口： 有一个入口，最终输出就有一个bundle -> 多页应用
        main: './src/index.js',
        test: './src/test.js'
    },
    output: {
        // [name]: 取文件名，就是入口设置的别名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
           {
               test: /css$/,
               use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
               ]
           }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
    ],
    mode: 'development'
}