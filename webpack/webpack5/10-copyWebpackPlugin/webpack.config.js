const copyWebpackPlugin = require('./plugins/copy-webpack-plugin')

module.exports = {
    plugins: [
        new copyWebpackPlugin({
            from: 'public',
            // to: '.'
            ignore: ['**/index.html']
        })
    ]
}