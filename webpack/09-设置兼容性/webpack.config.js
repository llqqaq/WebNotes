const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量
process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                // 创建style标签，将js中的css放入插到页面中
                // 缺点：样式放在js中页面会出现闪屏
                // 'style-loader', 
                // 这个loader取代style-loader,作用：提取js中的css成单独文件
                miniCssExtractPlugin.loader,
                'css-loader',
                /**
                 * css兼容性处理： postcss --> postcss-loader postcss-preset-env
                 * 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                 * 
                 * "browserslist": {
                 * // 开发环境 --> 设置node环境变量：process.env.NODE_ENV
                    "development": [
                    "> 1%",
                    "last 4 versions"
                    ],
                    // 生产环境：默认生产环境
                    "procution": [
                    ">0.2%",
                    "not ie<=7",
                    "not op_mini all"
                    ]
                }
                 */
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('postcss-preset-env')()
                        ]
                    }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            // 对输出的文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development'
}