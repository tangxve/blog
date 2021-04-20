// 三个常量表示状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  /**
   * 在 new Promise 的时候会传入一个执行器 (executor) 同时这个执行器是立即执行的
   * state      Promise的状态，初始化为等待
   * value      成功的值
   * reason     错误的原因
   */
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    
    /**
     * resolve 和 reject 函数中
     * 只有在等待状态（）下的 Promise 才会修改状态
     */
      // 成功函数
    const resolve = (value) => {
        if (this.state === PENDING) {
          this.state = FULFILLED
          this.value = value
        }
      }
    
    // 失败函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
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
    if (this.state === FULFILLED) {
      // 成功后的回调，并把值返回
      onFulfilled(this.value)
    }
    
    if (this.state === REJECTED) {
      // 失败的回调，并把失败原因返回
      onRejected(this.reason)
    }
  }
}

module.exports = MyPromise
