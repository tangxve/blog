// 三个常量表示状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
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

    // 储存成功的回调函数
    this.onResolvedCallback = null
    
    // 储存失败的回调函数
    this.onRejectedCallback = null
    
    /**
     * resolve 和 reject 函数中
     * 只有在等待状态（）下的 Promise 才会修改状态
     */
      // 成功函数
    const resolve = (value) => {
        if (this.state === PENDING) {
          this.state = FULFILLED
          this.value = value
          
          // 如果有成功回调就调用
          this.onResolvedCallback && this.onResolvedCallback(value)
        }
      }
    
    // 失败函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        
        // 如果有失败的回调就调用
        this.onRejectedCallback && this.onRejectedCallback(reason)
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
  
  // # esay snippet
  
  // then 方法
  then(onResolved, onRejected) {
    if (this.state === FULFILLED) {
      // 成功后的回调，并把值返回
      onResolved(this.value)
    }
    
    if (this.state === REJECTED) {
      // 失败的回调，并把失败原因返回
      onRejected(this.reason)
    }
    
    // === 新增 ===
    if (this.state === PENDING) {
      // 不知道后续的状态变化情况，先把成功和失败的回调储存起来
      this.onResolvedCallback = onResolved
      this.onRejectedCallback = onRejected
    }
  }
}

module.exports = Promise
