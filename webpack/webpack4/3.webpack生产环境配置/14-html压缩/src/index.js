// 不用配置 直接引入
// import '@babel/polyfill'

const demo = (x, y) => {
    return x+y
}


const promise =  new Promise(resolve => {
    setTimeout(() => {
        console.log('定时器完了');
    }, 1000)
})

console.log(promise);
console.log(demo(1, 2));