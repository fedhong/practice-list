try {
    module.exports = Promise
} catch (e) { }

function Promise(executor) {
    var self = this

    self.status = 'pending'
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(function () { // 异步执行所有的回调函数
            console.log('Promise resolve')
            if (self.status === 'pending') {
                self.status = 'resolved'
                self.data = value
                for (var i = 0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value)
                }
            }
        })
    }

    function reject(reason) {
        setTimeout(function () { // 异步执行所有的回调函数
            console.log('Promise reject')
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.data = reason
                for (var i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](reason)
                }
            }
        })
    }

    try {
        console.log('Promise executor')
        executor(resolve, reject)
    } catch (reason) {
        reject(reason)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    var then
    var thenCalledOrThrow = false

    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if (x instanceof Promise) {
        if (x.status === 'pending') { //because x could resolved by a Promise Object
            x.then(function (v) {
                resolvePromise(promise2, v, resolve, reject)
            }, reject)
        } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
            x.then(resolve, reject)
        }
        return
    }

    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            then = x.then //because x.then could be a getter
            if (typeof then === 'function') {
                then.call(x, function rs(y) {
                    if (thenCalledOrThrow) return
                    thenCalledOrThrow = true
                    return resolvePromise(promise2, y, resolve, reject)
                }, function rj(r) {
                    if (thenCalledOrThrow) return
                    thenCalledOrThrow = true
                    return reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(e)
        }
    } else {
        resolve(x)
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this
    var promise2
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
        return v
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) {
        throw r
    }

    if (self.status === 'resolved') {
        console.log('then resolved')
        return promise2 = new Promise(function (resolve, reject) {
            console.log('then resolved promise2')
            setTimeout(function () { // 异步执行onResolved
                try {
                    console.log('then resolved promise2 onResolved')
                    var x = onResolved(self.data)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }

    if (self.status === 'rejected') {
        console.log('then rejected')
        return promise2 = new Promise(function (resolve, reject) {
            console.log('then rejected promise2')
            setTimeout(function () { // 异步执行onRejected
                try {
                    console.log('then rejected promise2 onRejected')
                    var x = onRejected(self.data)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }

    if (self.status === 'pending') {
        console.log('then pending')
        // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行
        return promise2 = new Promise(function (resolve, reject) {
            console.log('then pending resolve push')
            self.onResolvedCallback.push(function (value) {
                try {
                    console.log('then pending resolve run')
                    var x = onResolved(value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })

            console.log('then pending resolve push')
            self.onRejectedCallback.push(function (reason) {
                try {
                    console.log('then pending resolve run')
                    var x = onRejected(reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (r) {
                    reject(r)
                }
            })
        })
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

Promise.deferred = Promise.defer = function () {
    var dfd = {}
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}


var promise1 = new Promise((resolve, reject) => {
    resolve(111);
})

promise1.then((v) => {
    setTimeout(()=> {
        console.log(v);
    },300)
    
}, (e) => {
    console.log(e);
});

// var promise2 = promise1.then(function (value) {
//     return 4
// }, function (reason) {
//     throw new Error(reason)
//     //return reason
// })

// promise2.then(function (value) {
//     console.log(value);
// }, function (reason) {
//     console.log(reason)
// })

