
import './common/css/iconfont.css'
import './common/css/index.less'
import print from './print.js'
console.log('重新编译1111');
print()

// 一旦module.hot 为true，说明开启了HMR功能 --> 让HMR功能代码生效
if(module.hot) {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他默认不会重新打包构建
    // 会执行后面的回调函数
    // 如果有其他模块，则继续写下面这个监听
    module.hot.accept('./print.js', function() {
        print()
    })
}