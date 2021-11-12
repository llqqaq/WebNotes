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
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules:[
            // 打包css
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },
            // 打包less
            {
                test: /\.less$/,
                // 使用多个loader写法
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 打包样式中引用的图片文件
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
            // 打包html中引用的图片资源
             {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 打包其他资源 需要exclude不需要打包的文件类型
            {
                // 这里也要给less排除，不然报错输出
                // export default __webpack_public_path__ + "49d0bda4e46bd0b0990cc76e3739a82b.less";
                // 输出这么一个文件，按理说less文件是由lessloader-cssloader-styleloader 转成js代码，不能输出文件
                // 此刻输出文件就说明 经过了file-loader处理，所以排错发现这里没有加入less
                exclude: /\.(html|css|less|js|png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    // 设置输出路径
                    outputPath: 'common'
                }
            }
        ]
    },
    plugins:[
        // 根据现有html模板 自动引入打包后的资源
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 开启devServer 方便打包调试
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
}