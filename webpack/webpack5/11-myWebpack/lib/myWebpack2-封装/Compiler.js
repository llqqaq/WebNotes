
const { getAst, getDeps, getCode } = require('./parser')

class Compiler {
    constructor(options = {}) {
        this.options = options
    }


    // 启动webpack打包
    run() {
        // 读取入口文件的内容
        const filePath = this.options.entry
      
        const ast = getAst(filePath)
        const deps = getDeps(ast, filePath)
        const code = getCode(ast)

        console.log(ast);
        console.log(deps);
        console.log(code);
        
    }
}

module.exports = Compiler