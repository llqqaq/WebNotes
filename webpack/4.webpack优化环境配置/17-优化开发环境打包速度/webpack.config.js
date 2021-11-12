

/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 *  作用： 一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 *      极大提升构建速度
 *         
 *      样式文件： 可以使用HMR功能，因为style-loader内部实现了
 *      js文件： 默认没有HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
            注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。因为你处理了入口文件，其实也就相当于处理了所有模块--
 *      html： 默认不能使用HMR功能，同时导致问题，html不能热更新了（本地发生改变，页面没有重新更新），不用做HMR功能
 *          解决： 修改entry入口，将html文件引入
 */


const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/index.js', './src/index.html'],
    output: {
        filename: 'js/built.js',
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
                // 使用多个loader写法
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 369 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs'
                }
            },
             {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(html|css|less|js|png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'common'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 运行指令  npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        // 开启HMR功能
        // 当我们修改webpack配置，新配置要想生效，就必须重启webpack服务
        hot: true
    }
}