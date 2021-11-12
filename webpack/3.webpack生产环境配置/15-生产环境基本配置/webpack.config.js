


const { resolve } = require('path')

// 将css从js代码中抽离出来 extract提炼
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css  optimize优化
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// html模板
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
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    [...commonCssLoader]
                ]
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
            {
                // 在package.json中eslintConfig --> airbnb
                // 规范js代码
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            // 对js进行兼容性处理
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
                    ]
                }
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
            // 对html文件引入的图片进行处理
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 其他资源处理
            {
                exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                 loader: 'file-loader',
                 options: {
                     outputPath: 'media '
                 }
            }
        ]
    },
    plugins: [
        // 提取css
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // 压缩css
        new optimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 压缩html
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'production'
}