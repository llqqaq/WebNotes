const {
    resolve
} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 定义nodejs环境变量，决定使用browerslist的哪个环境
process.env.NODE_ENV = 'production'


const commonCssLoader = [
    // 将css抽离出来
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 兼容css
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    },
]


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            // 以下loader只会匹配一个，匹配到了就跳出去
            // 注意： 不能有两个配置处理同一种类型文件
            // 所以我们把exlint-loader提取到外面
            oneOf: [{
                    test: /\.css$/,
                    use: [...commonCssLoader]
                },
                {
                    test: /\.less$/,
                    use: [...commonCssLoader, 'less-loader']
                },
                /**
                    正常来讲，一个文件只能被一个loader处理
                    当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
                        先执行eslint 再执行babel
                 */

                // 对js进行兼容性处理
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        /**
                         * 开启多进程打包
                         * 进程启动大概为600ms，进程通信也有开销
                         * 只有工作消耗比较大，才需要进行多进程打包
                         * 大项目开启  小项目不要
                         */
                        {
                            loader: 'thread-loader',
                            options: {
                                workers: 3 // 进程3个
                            }
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            useBuiltIns: 'usage',
                                            corejs: {
                                                version: 3
                                            },
                                            targets: {
                                                chrome: '60',
                                                firefox: '60',
                                                ie: '9',
                                                safari: '10',
                                                edge: '17'
                                            }
                                        }
                                    ]
                                ],
                                // 开启babel缓存
                                // 第二次构建时，如果文件没改动，会读取之前的缓存
                                cacheDirectory: true
                            }
                        }
                    ],

                },
                // 图片处理
                {
                    test: /\.(jpg|png|gif)/,
                    loader: 'url-loader',
                    options: {
                        limit: 8 * 1024,
                        name: '[hash:10].[ext]',
                        outputPath: 'imgs',
                        esModule: false
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media '
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production'
}