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
             *  1、基本js兼容处理 --> @babel/preset-env
             *    问题： 只能转换基本语法， 如promise高级语法不能转换
             *  2、全部js兼容性处理 --> @babel/polyfill
             *     问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
             *  3、需要做兼容性处理的就做： 按需加载  core-js
             *   
             * 
             * 1和3结合就可以完成全部的js处理，2因为打包后体积过大，不推荐
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设： 指示babel做怎么样的兼容性处理
                    // 例如这个可以转换箭头函数为普通函数 可以在ie低版本上执行 
                    // presets: ['@babel/preset-env']
                    
                    // core-js的用法
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到那个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
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