class Newpromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'
    constructor(executor) {
        this.status = Newpromise.PENDING
        this.value = null
        this.callback = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            this.reject()
        }
    }
    resolve(value) {
        if (this.status === Newpromise.PENDING) {
            this.status = Newpromise.FULFILLED
            this.value = value
            setTimeout(() => {
                this.callback.map(item => {
                    item.onFulfilled(value)
                })
            })
        }
    }
    reject(reason) {
        if (this.status === Newpromise.PENDING) {
            this.status = Newpromise.REJECTED
            this.value = reason
            setTimeout(() => {
                this.callback.map(item => {
                    item.onRejected(reason)
                })
            })
        }
    }
    then(onFulfilled, onRejected) {
        /* 外面可以不传，不传默认不处理*/
        if (typeof onFulfilled !== 'function') {
            /* 设置穿透 */
            onFulfilled = () => this.value
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => this.value
        }
        return new Newpromise((resolve, reject) => {
            if (this.status === Newpromise.PENDING) {
                this.callback.push({
                    onFulfilled: value => {
                        try {
                            let result = onFulfilled(value)
                            if (result instanceof Newpromise) {
                                result.then(resolve, reject)
                            } else {
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    },
                    onRejected: value => {
                        try {
                            let result = onRejected(value)
                            if (result instanceof Newpromise) {
                                result.then(resolve, reject)
                            } else {
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    }
                })
            }
            if (this.status === Newpromise.FULFILLED) {
                /* 将任务放入队列实现异步 */
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.value)
                        if (result instanceof Newpromise) {
                            result.then(resolve, reject)
                            /*  result.then(
                                 value => {
                                     resolve(value)
                                 },
                                 reason => {
                                     reject(reason)
                                 }
                             ) */
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === Newpromise.REJECTED) {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.value)
                        if (result instanceof Newpromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
    }
}