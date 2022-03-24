
// webpack提供的一个工具库
// 最新版的loader-utils没有提供这个方法
const { getOptions } = require('loader-utils')
// 校验api
const { validate } = require('schema-utils')

const schema = require('./schema.json')

module.exports = function(content, map, meta) {

    const options = getOptions(this)

    console.log(3333, options);

    // 校验options是否合法
    validate(schema, options, {
        name: 'loader3'
    })

    this.callback(null, content, map, meta)
}


module.exports.pitch = function() {
    console.log('pitch333');
}