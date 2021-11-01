/**
 * 开发环境配置：能让代码运行
 *  运行项目指令：
 *      webpack 会将打包结果输出出去
 *      npx webpack-dev-server 只会在内存中编译打包，没有输出
 */


const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 100 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(html|css|js|png|jpg|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
}