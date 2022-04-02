const fs = require('fs')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const path = require('path')
const {
    transformFromAst
} = require('@babel/core')



const parser = {
    // 生成抽象语法树
    getAst(filePath) {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        // 将其解析成ast抽象语法树
        const ast = babelParser.parse(fileContent, {
            sourceType: 'module' // 解析文件的模块方案是 ES Module
        })

        return ast
    },

    // 搜集依赖
    getDeps(ast, filePath) {
        /**
         * 搜集依赖
         *  ast.program.body = [...] 一行一个元素
         *  遍历ast.program.body
         *  判断ast.program.body[i].type === "ImportDeclaration" 说明该行代码是import语法
         *  通过ast.program.body[i].source.value 可以找到依赖文件的位置
         *  
         */
        // console.log(ast);

        // 获取当前入口文件的绝对路径
        const dirname = path.dirname(filePath)
        console.log('dirname', dirname);

        // 依赖图
        const deps = {}
        // 使用babelTraverse搜集依赖
        traverse(ast, {
            // 内部会遍历ast中的program.body， 判断里面语句类型
            // 如果type: ImportDeclaration 就会触发当前函数
            ImportDeclaration({ node }) {
                // 文件相对路径： './add.js'
                const relativePath = node.source.value
                // 生成基于入口文件的绝对路径
                const absolutePath = path.resolve(dirname, relativePath)
                // 添加依赖
                deps[relativePath] = absolutePath

            }
        })
        // console.log('deps', deps);
        return deps
    },

    // 编译代码
    getCode(ast) {
        // 编译代码： 将代码中浏览器不能识别的语法进行编译，这里是ast
        const { code } = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        })
        console.log(code);
        return code
    }
}

module.exports = parser