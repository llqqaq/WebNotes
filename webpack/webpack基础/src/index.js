/**
 * index.js: webpack入口文件
 *  
 * 1、运行指令
 * 
 *  开发环境: webpack ./src/index.js -o ./build/built.js --mode=development
 *  webpack 会以 ./src/index.js 作为入口文件开始打包
 *  -o 打包后输出到./build/built.js
 *  整体环境mode 是开发环境
 * 
 *  生产环境 webpack ./src/index.js -o ./build/built.js --mode=production
 *  webpack 会以 ./src/index.js 作为入口文件开始打包
 *  -o 打包后输出到./build/built.js
 *  整体环境mode 是生产环境
 * 
 * 
 *  打包后的js可以直接放在html中使用，或者node 直接使用
 * 
 * 2、结论
 *  1、webpack能处理js/json资源，不能处理css/img等其他资源
 *  2、生产环境和开发环境能将es6模块化编译成浏览器能识别的模块化
 *  3、生产环境比开发环境多一个压缩js代码
 * 
 */

// import './index.css'

// es6
import date from './data.json'
console.log(date);

function add(x, y) {
    return x + y
}

console.log(add(1, 2));