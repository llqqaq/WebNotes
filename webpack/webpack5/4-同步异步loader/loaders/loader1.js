

// 同步写法1
// module.exports = function(content, map, meta) {
//     console.log(1111);
//     return content
// }

// 同步写法2
module.exports = function(content, map, meta) {
    console.log(1111);

    this.callback(null, content, map, meta)
}


module.exports.pitch = function() {
    console.log('pitch111');
}