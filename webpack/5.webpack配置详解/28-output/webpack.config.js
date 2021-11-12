

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 *  
 */         



module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径前缀 --> 'imgs/a.jpg'(当前文件同级目录查找)
        //                        --> '/imgs/a.jpg'(根路径下查找)
        // publicPath: '/',
        
        // 非入口chunk的名称，比如通过import的chunk， opti..的chunk
        // 如果这个不声明 这会按上面的filename命名，默认chunk的name 是 0 1 2 3
        chunkFilename: '[name]_chunk.js',
        library: '[name]', // 整个库向外暴露的变量名
        // libraryTarget: 'window' // 变量名添加到那个上 browser
        // libraryTarget: 'global' // 变量名添加到那个上 node
        libraryTarget: 'commonjs' // 通过commonjs暴露出去 exports["main"] = ...(详情看main.js)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}