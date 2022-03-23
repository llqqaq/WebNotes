const {
    resolve
} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 定义nodejs环境变量，决定使用browerslist的哪个环境
process.env.NODE_ENV = 'production'

/**
 *  缓存：
 *   babel缓存：（打包时缓存有利于加快打包速度）
 *      cacheDirectory: true   
 *   --> 让第二次打包构建速度更快
 *   文件资源缓存:
 *      hash: 每次webpack构建时会给一个唯一的hash值（每次打包都不一样），浏览器就不会缓存
 *            具体看打包后的文件名
 *            问题：因为js跟css同时使用hash值
 *                如果重新打包，会导致所有缓存失效，浏览器就的重新请求服务器
 *                 （如果我就改动了一个css）
 *      chunkhash：根据chunk生成的hash值，如果打包来源同一个chunk，
 *                 那么hash值就一样
 *            问题：因为js跟css同时使用hash值
 *                  因为css是在js中被引入的，所以同属于一个chunk
 *             chunk： 一个js内引用的其他依赖，打包后同属于一个chunk
 *      contenthash: 根据文件的内容生成hash值，不同文件的hash一定不一样
 *                  只要内容不变，打包后的hash值不变，
 *                  比如css改变，js不改变，则打包后css的hash改变，js不变
 *                   所以有利于浏览器缓存
 *       --> 让代码上线运行缓存更好使用
 */


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
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
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
                            ],
                            // 开启babel缓存
                            // 第二次构建时，如果文件没改动，会读取之前的缓存
                            cacheDirectory: true
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
            }
        ]
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