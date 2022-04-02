const {
    getAst,
    getDeps,
    getCode
} = require('./parser')

class Compiler {
    constructor(options = {}) {
        // webpack的配置
        this.options = options

        // 依赖总容器
        this.modules = []
    }


    // 启动webpack打包
    run() {
        // 读取入口文件的内容
        const filePath = this.options.entry

        // 入口文件的信息
        const fileInfo = this.build(filePath)

        this.modules.push(fileInfo)

        // 遍历所有的依赖 (这种方法不行，forEach遍历只会遍历原先数组内容，在遍历过程中加入新元素无效)
        // this.modules.forEach(fileInfo => {

        //     // 取出当前文件的所有依赖
        //     const deps = fileInfo.deps

        //     // 遍历
        //     for(let relativePath in deps) {
        //         const absolutePath = deps[relativePath]
        //         // 获取依赖文件的info
        //         const dependentFileInfo = this.build(absolutePath)
        //         // 将处理后的结果添加modules中，后面遍历就会继续遍历
        //         this.modules.push(dependentFileInfo)
        //     }
        // })

        // 使用for of 可以遍历新加入的元素
        // for (const val of this.modules) {
        //     // 取出当前文件的所有依赖
        //     const deps = val.deps

        //     // 遍历
        //     for (let relativePath in deps) {
        //         const absolutePath = deps[relativePath]
        //         // 获取依赖文件的info
        //         const dependentFileInfo = this.build(absolutePath)
        //         // 将处理后的结果添加modules中，后面遍历就会继续遍历
        //         this.modules.push(dependentFileInfo)
        //     }
        // }

        // 使用递归的方法推入新元素
        const loopDeps = filepath => {
            const fileInfo = this.build(filepath)
            const { deps } = fileInfo
            if (Object.keys(deps).length > 0) {
                for (const relativePath in deps) {
                    loopDeps(deps[relativePath])
                }
            }
            this.modules.push(fileInfo)
        }
        loopDeps(filePath)



        const depsGraph = this.modules.reduce((graph, module) => {
            return {
                ...graph,
                [module.filePath]: {
                    code: module.code,
                    deps: module.deps
                }
            }
        }, {})
        console.log('依赖关系图', depsGraph);
    }

    build(filePath) {
        const ast = getAst(filePath)
        const deps = getDeps(ast, filePath)
        const code = getCode(ast)

        return {
            filePath,
            deps,
            code
        }
    }
}

module.exports = Compiler