const path = require('path')
const { validate } = require('schema-utils')
const schema = require('./copyWebpackPluginSchema.json')
// 匹配输出目标目录下的所有文件路径数组
const globby = require('globby');

class copyWebpackPlugin {
    constructor(option = {}) {
        
        console.log('copyWebpackPlugin');
        validate(schema, option, {
            name: 'copyWebpackPlugin'
        })
        this.option = option
    }
    apply(compiler) {
        // 初始化complilation
        compiler.hooks.thisCompilation.tap('copyWebpackPlugin', compilation  => {
            // 添加资源的hooks
            compilation.hooks.additionalAssets.tapAsync('copyWebpackPlugin', async (cb) => {
                const { from, ignore } = this.option
                const to = this.option.to? to : '.'

                // 1、过滤ignore后的文件目录
                
                // 执行指令的位置，context是webpack的配置
                const context = compiler.options.context
                // 判断from是不是绝对路径
                let absolteFrom = path.isAbsolute(from)? from : path.resolve(context, from)
                // 将所有的反斜杠替换成正斜杠
                absolteFrom = absolteFrom.replace(/\\/g, '/')
                console.log(absolteFrom);
                console.log(ignore);
                // 使用globby获取要处理的文件夹
                // globby(from, options)
                const paths = await globby(absolteFrom, { ignore })
                console.log(paths)
                // 2、读取from的所有资源
                
                // 3、生成webpack格式的资源
                // 4、添加到complilation中，输出出去
            })
        })
    }
}


module.exports = copyWebpackPlugin
