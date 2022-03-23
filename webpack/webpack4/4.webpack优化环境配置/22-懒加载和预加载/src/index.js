
console.log('index');


// 这里会提升
// import { mul } from './test'

/**
 * 懒加载： 当文件需要使用时才加载，如果文件太大，那加载效果会有延迟
 * 预加载 prefetch: 会在使用之前，提前加载js文件，两者效果一样
 * 正常加载可以认为是并行加载（同一时间加载多个文件，同一时间加载越多时间越慢）
 * 预加载是等其他资源加载完毕，浏览器空闲了，再偷偷加载
 * 
 * 预加载在pc端高版本浏览器可以，但是在移动端兼容行不好，慎用（2021年不知道会不会）
 */


document.querySelector('button').addEventListener('click', function() {
    // 还是会先
    // console.log(mul(2,4));

    // 懒加载 
    // 这种语法打包构建一定会生成一个单独的chunk，才能被懒加载
    // 点击按钮不会重复加载test，会用之前缓存的test

    // 预加载
    // 加载页面时，test就会预加载了，network可以看到，但是不会执行任何逻辑
    // 按钮点击后就会调用这个预加载的文件
    import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test.js').then(({ mul }) => {
        console.log(mul(3, 4));
    })
})