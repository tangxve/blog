const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise(promise, x, resolve, reject) {
  
  // 2.3.1 promise2 返回结果 x 为自身，应直接执行 reject
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'))
  }
  
  // 2.3.3 判断 x 是不是对象或函数
  if (typeof x === 'object' || typeof x === 'function') {
    
    // x 为 null 直接返回，走后面的逻辑会报错
    if (!x) return resolve(x)
    
    // 2.3.3.1 让 x 作为 x.then
    let then
    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }
    
    if (typeof then === 'function') {
      
      // 防止重复调用
      let called = false
      
      /**
       * 2.3.3.3 如果 then 是一个方法，把 x 当作 this 来调用它
       * 其中第一个参数为 resolvePromise，第二个参数为 rejectPromise
       */
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            /**
             * 如果 resolvePromise 和 rejectPromise 均被调用
             * 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
             * 实现这条需要前面加一个变量 called
             */
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return
            called = true
            reject(r)
          })
      } catch (e) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return
        
        called = true
        // 否则以 error 为据因拒绝 promise
        reject(e)
      }
    } else {
      // 2.3.3.4 如果 then 不是一个函数，用 x 完成 promise
      resolve(x)
    }
  } else {
    // 2.3.4 x 是一个普通值就直接调用 resolve(x)
    resolve(x)
  }
  
}

class MyPromise {
  /**
   * 在 new Promise 的时候会传入一个执行器 (executor) 同时这个执行器是立即执行的
   * state                   Promise的状态，初始化为等待
   * value                   成功的值
   * reason                  错误的原因
   * onFulfilledCallbacks     成功函数的回调队列
   * onRejectedCallbacks     失败函数的回调队列
   */
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    
    /**
     * resolve 和 reject 函数中
     * 只有在等待状态（）下的 Promise 才会修改状态
     */
      // 成功函数
    const resolve = (value) => {
        if (this.state === PENDING) {
          this.state = FULFILLED
          this.value = value
          
          // 执行 resolve 回调队列
          this.onFulfilledCallbacks.forEach(fn => fn())
        }
      }
    
    // 失败函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        
        // 执行 reject 回调队列
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    
    /**
     * 执行器（executor）接受两个参数，分别是 resolve, reject
     * 防止执行器报错，需要捕获，并传入 reject 函数
     */
    
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  
  // then 方法
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的结果
            const x = onFulfilled(this.value)
            
            // x 判断下，如果是 promise 就执行 x.then 方法。如果不是返回正常的值
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      
      if (this.state === REJECTED) {
        queueMicrotask(() => {
          try {
            // 获取失败函数回调的结果
            const x = onRejected(this.reason)
            
            // x 判断下，如果是 promise 就执行 x.then 方法。如果不是返回正常的值
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      
      // 当 promise 状态为等待时（pending），将 onFulfilled 和 onRejected 存入对应的回调队列
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的结果
              const x = onFulfilled(this.value)
              
              // x 判断下，如果是 promise 就执行 x.then 方法。如果不是返回正常的值
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 获取失败函数回调的结果
              const x = onRejected(this.reason)
              
              // x 判断下，如果是 promise 就执行 x.then 方法。如果不是返回正常的值
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    
    return promise2
  }
  
  /**
   * Promise.prototype.catch() 实现
   * catch 用于发生错误是的回调函数，实际上是 .then(null, rejection)或.then(undefined, rejection)的别名
   * https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-catch
   */
  
  catch(cb) {
    return this.then(null, cb)
  }
  
  /**
   * Promise.prototype.finally() 实现
   * finally 用于指定不管 promise 最后的状态如何 都会执行操作
   * 在 finally 后面还可以继续 then ，并将值原封不动的传递下去
   * finally 本质上是 then 方法的特例
   * 该方法由 ES2018 引入
   * https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-finally
   */
  finall(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => {throw  reason})
    )
  }
  
  /**
   * Promise.resolve() 实现
   * 将现有对象转为 Promise 实例，该实例的状态为 resolved
   * https://es6.ruanyifeng.com/#docs/promise#Promise-resolve
   */
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }
    
    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }
  
  /**
   * Promise.reject() 实现
   * 将现有对象转为 promise 实例，该实例状态为 reject
   * https://es6.ruanyifeng.com/#docs/promise#Promise-reject
   */
  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  
  /**
   * Promise.all()
   * 用于多个 Promise 实例，包装成一个新的 Promise 实例
   * 只有所有的 Promise 返回成功，才会成功，有一个失败，就是失败状态
   * https://es6.ruanyifeng.com/#docs/promise#Promise-all
   */
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      // 参数不是数组 直接 reject
      if (!Array.isArray(promises)) {
        reject(new TypeError('参数必须是数组'))
        return
      }
      
      const result = []
      
      // 空数组直接返回
      if (promises.length === 0) {
        resolve(result)
      }
      
      // 记录成功 promise 数量
      let num = 0
      
      function check(i, data) {
        result[i] = data
        
        num++
        
        // 成功数量等于传入的数量 resolve
        if (num === promises.length) {
          resolve(result)
        }
      }
      
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(
          v => {
            check(i, v)
          },
          e => {
            reject(e)
            return
          })
      }
    })
  }
}

// 测试方法
MyPromise.deferred = function () {
  var result = {}
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })
  
  return result
}

module.exports = MyPromise
