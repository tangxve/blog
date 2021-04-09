/**
 * 链式调用简易实现
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

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
      // 这里会立即执行
      if (this.state === FULFILLED) {
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的结果
            const x = onFulfilled(this.value)
            
            // x 判断下，如果是 promise 就执行 x.then 方法。如果不是返回正常的值
            x.then ? x.then(resolve, reject) : resolve(x)
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
            onFulfilled(this.value)
          })
        })
        
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            onRejected(this.reason)
          })
        })
      }
    })
    
    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  
  // 判断 x 是不是 MyPromise 的实例
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
  
}

module.exports = MyPromise
