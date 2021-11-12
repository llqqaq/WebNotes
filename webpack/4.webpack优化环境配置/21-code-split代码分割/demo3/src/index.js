

/**
 * 单入口 想要让某个文件单独打包
 * 通过js代码，让某个文件被单独打包成一个chunk
 * import动态导入语法： 能将某个文件单独打包
 */
// 自定义打包后的文件名
import(/* webpackChunkName: 'test' */'./test')
    .then(({ mul }) => {
        console.log(mul(1, 3));
    })
    .catch(error => {
        console.log(error);
    }) 