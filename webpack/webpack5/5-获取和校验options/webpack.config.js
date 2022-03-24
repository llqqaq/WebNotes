const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'loader1',
                    'loader2',
                    {
                        loader: 'loader3',
                        options: {
                            name: "name",
                            age: 15
                        }
                    }
                ]
            }
        ]
    },
    // 配置loader的解析规则
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    mode: 'development'
} 