const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './index.js',

    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                // 使用多个loader写法
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 问题：默认处理不了html中img图片  
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                // 使用一个loader
                // 下载 url-loader file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于369kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会变更大（文件请求速度更慢）
                    limit: 369 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是common.js
                    // 解析时会出现问题：src路径变为[object Module]
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片进行重命名
                    // [hash: 10]取图片的hash的前10位
                    // [ext]取文件原来拓展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    mode: 'development'
}