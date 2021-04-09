const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// function resolvePromise(promise, x, resolve, reject) {
//
//   // 2.3.1 promise2 返回结果 x 为自身，应直接执行 reject
//   if (promise === x) {
//     return reject(new TypeError('循环调用'))
//   }
//
//   // 2.3.3 判断 x 是不是对象或函数
//   if (typeof x === 'object' || typeof x === 'function') {
//
//     // 如果null 直接走失败
//     if (x === null) return reject(x)
//
//     // 2.3.3.1 让 x 作为 x.then
//     let then
//     try {
//       then = x.then
//     } catch (e) {
//       return reject(e)
//     }
//
//     if (typeof then === 'function') {
//
//       // 防止重复调用
//       let called = false
//
//       /**
//        * 2.3.3.3 如果 then 是一个方法，把 x 当作 this 来调用它
//        * 其中第一个参数为 resolvePromise，第二个参数为 rejectPromise
//        */
//       try {
//         then.call(
//           x,
//           // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
//           y => {
//             /**
//              * 如果 resolvePromise 和 rejectPromise 均被调用
//              * 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
//              * 实现这条需要前面加一个变量 called
//              */
//             if (called) return
//             called = true
//             resolvePromise(promise, y, resolve, reject)
//           },
//           // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
//           r => {
//             if (called) return
//             called = true
//             reject(r)
//           })
//       } catch (e) {
//         // 如果调用 then 方法抛出了异常 error：
//         // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
//         if (called) return
//
//         called = true
//         // 否则以 error 为据因拒绝 promise
//         reject(e)
//       }
//     } else {
//       // 2.3.3.4 如果 then 不是一个函数，用 x 完成 promise
//       resolve(x)
//     }
//   } else {
//     // 2.3.4 x 是一个普通值就直接调用 resolve(x)
//     resolve(x)
//   }
//
// }

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
          // this.onFulfilledCallbacks.forEach(fn => fn())
          // resolve里面将所有成功的回调拿出来执行
          while (this.onFulfilledCallbacks.length) {
            // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
            this.onFulfilledCallbacks.shift()(value)
          }
        }
      }
    
    // 失败函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        
        // 执行 reject 回调队列
        // this.onRejectedCallbacks.forEach(fn => fn())
        while (this.onRejectedCallbacks.length) {
          this.onRejectedCallbacks.shift()(reason)
        }
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
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
  
      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      
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
  
  // resolve 静态方法
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
  
  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'))
  }
  
  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x)
    }
    
    let then
    try {
      // 把 x.then 赋值给 then
      then = x.then
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error)
    }
    
    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
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
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return
        
        // 否则以 error 为据因拒绝 promise
        reject(error)
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x)
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
