const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } =  require('tapable')

class Demo {
    constructor() {
        // 初始化hooks容器
        this.hooks = {
            // 同步hooks，任务依次执行
            // go: new SyncHook(['address'])
            // 正常执行就跟SyncHook没有区别，但是遇到返回值就会中断执行后续事件
            go: new SyncBailHook(['address', 'day']),

            // 异步hooks
            // AsyncParallelHook: 异步并行
            leave: new AsyncParallelHook(['name', 'age'])
            // AsyncSeriesHook: 异步串行/同步
            // leave: new AsyncSeriesHook(['name', 'age'])
        }
    }
    tap() {
        // 往hooks容器中注册事件/添加回调函数
        this.hooks.go.tap('demo1', (address, day) => {
            console.log('demo1', address, day);
            return 111
        })
        this.hooks.go.tap('demo2', address => {
            console.log('demo2', address);
        })

        this.hooks.leave.tapAsync('demo2', (name, age, cb) => {
            setTimeout(() => {
                console.log('demo2', name, age);
                cb()
            }, 2000)
        })
        this.hooks.leave.tapPromise('demo2', (name, age, cb) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('demo3', name, age);
                    resolve()
                }, 1000)
            })
        })
    }
    start() {
        // 触发hooks里面所有的事件
        this.hooks.go.call('mo', 100)

        this.hooks.leave.callAsync('jack', 18, function() {
            // 代表所有的leave容器中的函数触发完了，才触发这个回调
            console.log('end');
        })
    }
}

const demo = new Demo()
demo.tap()
demo.start()