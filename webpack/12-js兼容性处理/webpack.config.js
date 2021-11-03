const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /**
             * js兼容性处理: babel-loader @babel/core @babel/preset-env
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设： 指示babel做怎么样的兼容性处理
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}