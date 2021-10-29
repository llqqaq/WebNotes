// 订阅器 => (添加订阅者 发通知)
let Dep = {
    clientList: {}, // 容器
    // 添加订阅者
    listen: function (key, fn) {
        // if (!this.clientList[key]) {
        //     this.clientList[key] = []
        // }
        // this.clientList[key].push(fn)
        (this.clientList[key] || (this.clientList[key] = [])).push(fn)
        console.log('clientList', this.clientList);
    },
    // 发布
    trigger: function() {
        // 类数组转数组
        let key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key]
        console.log(key);
        console.log(fns);
        if(!fns || fns.length === 0) {
            return false 
        }

        for(let i =0, fn; fn = fns[i++];) {
            console.log('argument', arguments);
            fn.apply(this, arguments)
        }
    } 
}

// 劫持方法
let dataHi = function({data, tag, datakey, selector}) {
    console.log('data', data);
    console.log('tag', tag);
    console.log('datakey', datakey);
    console.log('selector', selector);
    let value = '',
        el = document.querySelector(selector)
    
    Object.defineProperty(data, datakey, {
        get: function() {
            console.log('取值');
            return value
        },
        set: function(val) {
            console.log('设置值');
            value = val
            // 发布信息
            Dep.trigger(tag, val)
        }
    })
    // 添加订阅者
    Dep.listen(tag, function(text) {
        console.log(this);
        el.innerHTML = text
    })
}