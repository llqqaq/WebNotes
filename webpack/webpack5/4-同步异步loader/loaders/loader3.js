
module.exports = function(content, map, meta) {
    console.log(3333);

    this.callback(null, content, map, meta)
}


module.exports.pitch = function() {
    console.log('pitch333');
}