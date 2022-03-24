const { resolve } = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [],
    mode: 'development'
}