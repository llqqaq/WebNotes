const {
    getAst,
    getDeps,
    getCode
} = require('./parser')
const path = require('path')
const fs = require('fs')
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
            const {
                deps
            } = fileInfo
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
        this.generate(depsGraph)
    }
    //  开始构建
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

    // 生成输出资源
    /**
         * code结构
         *  '"use strict";\n' +
                '\n' +
                'Object.defineProperty(exports, "__esModule", {\n' +
                '  value: true\n' +
                '});\n' +
                'exports["default"] = void 0;\n' +
                '\n' +
                'var _third = _interopRequireDefault(require("./third.js"));\n' +
                '\n' +
                'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
                '\n' +
                'console.log(_third["default"]);\n' +
                '\n' +
                'var count = function count(a, b) {\n' +
                '  return a - b;\n' +
                '};\n' +
                '\n' +
                'var _default = count;\n' +
                'exports["default"] = _default;'
         * 
         */

        generate(depsGraph) {
            const bundle = `
                (function (depsGraph) {
                    // require目的： 为了加载入口文件
                    function require(module) {
                        // 定义模块内部的require函数
                        function localRequire(relative) {
                            // 为了找到要引入模块的绝对路径，通过require加载
                            return require(depsGraph[module].deps[relativePath])
                        }
                        // 定义暴露对象（将来我们模块要暴露的内容）
                        var exports = {}

                        (function(require, exports, code) {
                            eval(code);
                        })(localRequire, export, depsGraph[module].code)

                        // 作为require函数的返回值返回出去
                        // 后面的require函数能得到暴露的内容
                        return  exports;
                    }

                    // 加载入口文件
                    require('${this.options.entry}')
                } )(${JSON.stringify(depsGraph)})
            `

            const filePath = path.resolve(this.options.output.path, this.options.output.filename)

            fs.writeFileSync(filePath, bundle, 'utf-8')
        }
}

module.exports = Compiler