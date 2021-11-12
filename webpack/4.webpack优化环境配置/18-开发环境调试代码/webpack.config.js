


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
                // 这里也要给less排除，不然报错输出
                // export default __webpack_public_path__ + "49d0bda4e46bd0b0990cc76e3739a82b.less";
                // 输出这么一个文件，按理说less文件是由lessloader-cssloader-styleloader 转成js代码，不能输出文件
                // 此刻输出文件就说明 经过了file-loader处理，所以排错发现这里没有加入less
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
        hot: true,
    },
    // 开启source-map
    devtool: 'source-map'
}



/** 
    source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错，通过映射可以追踪源代码错误）
        错误代码准确信息 和 源代码的错误位置

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map: 外部

    inline-source-map: 内联
        1、只生成一个内联source-map
        2、错误代码准确信息 和 源代码的错误位置

    hidden-source-map: 外部
        错误代码错误原因，但是没有错误位置
        不能追踪到源代码，只能提示到构建后代码的错误位置
         
    eval-source-map: 内联
        1、每一个文件都生成对应的source-map， 都在eval
        2、错误代码准确信息 和 源代码的错误位置+hash值

    nosources-source-map： 外部
        错误代码准确信息，但是没有任何源代码信息

    cheap-source-map: 外部
        错误代码准确信息 和 源代码的错误位置
        只能精确到行（整行标红） 其他可以精确到行列（就是将错误的位置标红）

    cheap-module-source-map: 外部
        错误代码准确信息 和 源代码的错误位置
        module会将别人loader的source map加入


    内联 和 外部的区别： 1、外部生成了文件，内联没有 2、内联构建速度更快


    需求：
    开发环境： 速度快，调试更友好
        速度快（eval>inline>cheap...）
            eval-cheap-source-map
            eval-source-map
        调试更友好
            source-map
            cheap-module-source-map
            cheap-source-map 
        总结
            eval-source-map / eval-cheap-module-source-map
        
    生产环境： 源代码要不要隐藏？调试要不要更友好
        内联会让代码体积变大，所以在生产环境不要用内联
        隐藏： 
            nosources-source-map 全部隐藏
            hidden-source-map   隐藏源代码  会提示构建后代码错误信息

        调试友好
            source-map / cheap-module-source-map
        
 */