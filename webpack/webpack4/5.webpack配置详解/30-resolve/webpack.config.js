

const { resolve } = require('path')
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
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
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
    }
}