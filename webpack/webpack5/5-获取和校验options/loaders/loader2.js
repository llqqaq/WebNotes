


// 异步loader，推荐，虽然会等待loader，但是其他事情也能继续做，整体性能好
module.exports = function(content, map, meta) {
    console.log(2222);

    const callback = this.async()

    // webpack会等待callback执行才会继续往下执行
    setTimeout(() => {
        // 等待三秒后才会执行loader1
        callback(null, content, map, meta)
    }, 3000)
}


module.exports.pitch = function() {
    console.log('pitch222');
}