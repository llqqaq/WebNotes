const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 *  
 */



module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名：优点简写路径  缺点路径没有提示
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名,从左到右依次匹配 
        extensions: ['.js', '.json', '.css'],
        // 
        modules: [
            resolve(__dirname, '../../../node_modules'), // 直接告诉node_modules的位置，减少查找时间,提高打包速度
            'node_module' // 如果上面的没找到，则从本目录依次往上查找node_modules
        ]
    },
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        // 监视contentBase 目录下的所有文件， 一旦文件变化就会reload
        watchContentBase: true,
        watchOptions: {
            // 忽略监视文件
            ignored: /node_modules/
        },
        // 开启gzip压缩
        compress: true,
        // 端口号
        port: 5000,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开启HRM功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息以外，其他内容都不要显示
        quiet: true,
        // 如果出错了，不要全屏提示
        overlay: false,
        // 服务器代理 --> 解决开发环境下的跨域问题
        // 服务器跟服务器之间请求是没有跨域问题的
        // 测试发现谷歌浏览器没办法看出是真正去请求替代后的地址
        // proxy: {
        //     // 一旦devServer（5000）服务器接收到/api/xxx 的请求，就会把请求转发到另一个服务器（3000）
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         // 在终端可以看真实请求地址
        //         logLevel: 'debug',
        //         // 发送请求时，请求路径重写： 将/api/xxx ---> /xxx(去掉/api)
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
        // 测试
        proxy: {
            '/csdn': {
                target: 'https://blog.csdn.net',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '^/csdn': ''
                }
            }
        }
    }
}