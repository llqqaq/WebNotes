let title = 1
function show() {
    console.log(document.querySelector('button'));
}
function test() { console.log('test'); }
// 这里会执行
console.log(1111);
// 具名导出  export default是默认导出
export {
    title,
    show,
    test
}