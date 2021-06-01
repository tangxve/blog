# Promise

## 文档规范
- [中文翻译-掘金](https://juejin.cn/post/6844903649852784647#heading-21)
- [中文翻译-图灵社区](https://www.ituring.com.cn/article/66566)
- [英文文档](https://promisesaplus.com/)

## 基础版本

- `Promise` 是一个类（构造函数），在执行这个类的时候回传入一个函数（执行器），这个函数回立即执行
    - `executor` 接受2个参数，一个叫 `resolve`（成功），一个叫 `reject`（失败）

- `Promise` 会有三种状态： `Pending` 等待中、`Fulfilled` 完成、`Rejected` 失败
    
- 状态切一旦发生变化便不可以二次修改
    - 成功： `Pending ==> Fulfilled`，且必须有一个不改变的值 `value`
    
    - 失败：`Pending ==> Rejected`，且必须有一个不可以改变的原因 `reason`
- `executor` 函数报错，直接执行 `reject` 

- then 方法有两个参数：`onFulfilled`、`onRejected`

- 当状态为 Fulfilled，执行 onFulfilled ，传入 value。则执行onRejected，传入this.reason

```javascript

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
```

## 实现异步方法 和 多个then


### 异步代码的情况

有异步代码的情况下会有问题：

```javascript
// test.js

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000)
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

```
没有打印信息！！！

::: tip 原因
主线程代码立即执行，setTimeout 是异步代码，then 会马上执行，这个时候判断 Promise 状态，状态是 Pending，然而之前并没有判断等待这个状态
:::

### 多个then的调用
问题代码：

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000)
})

promise.then(value => {
  console.log(1)
  console.log('resolve', value)
})

promise.then(value => {
  console.log(2)
  console.log('resolve', value)
})

promise.then(value => {
  console.log(3)
  console.log('resolve', value)
})

// 3
// resolve success
```
### 解决方法

- 增加数组，缓存 成功回调 与 失败回调
- then 添加 pending 状态判断
- resolve 与 reject 中循环调用回调函数

```javascript
// 三个常量表示状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
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
    if (this.state === FULFILLED) {
      // 成功后的回调，并把值返回
      onFulfilled(this.value)
    }
    
    if (this.state === REJECTED) {
      // 失败的回调，并把失败原因返回
      onRejected(this.reason)
    }
    
    // 当 promise 状态为等待时（pending），将 onFulfilled 和 onRejected 存入对应的回调队列
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
```

## 链式调用

::: tip

- `then` 方法链式调用需要返回一个 `promise` 对象

- `then` 方法里面 return 一个返回值，作为下一个 then 方法的参数，如果是 return 一个 promise 对象，那么需要判断他的状态

- `then` 函数中，无论是 **成功函数回调 `onFulfilled`** ，还是 **失败函数的回调 `onRejected`** ，只要返回了结果就会传到 **下一个 `then`** 中

- `then` 执行的时候 `onFulfilled`, `onRejected` 可能会出现错误，需要捕获错误，并执行失败回调（处理成失败状态）

:::

```javascript
/**
 * 链式调用简易实现
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
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
    // 为了链式调用这里直接创建一个 Promise，并在后面 return 出去
    const promise2 = new Promise((resolve, reject) => {
        // 这里会立即执行
        if (this.state === FULFILLED) {
          try {
            // 获取成功回调函数的结果
            const x = onFulfilled(this.value)
  
            // x 判断下，如果是 promise 就执行 x.then 方法。如果不是返回正常的值
            // 下一个 then
            x.then ? x.then(resolve, reject) : resolve(x)
          } catch (e) {
            // 当前 then
            reject(e)
          }
        }
        
        if (this.state === REJECTED) {
          try {
            // 获取失败函数回调的结果
            const x = onRejected(this.reason)
            
            // x 判断下，如果是 promise 就执行 x.then（）方法。如果不是返回正常的值
            // 下一个 then
            x.then ? x.then(resolve, reject) : resolve(x)
          } catch (e) {
            // 当前 then 
            reject(e)
          }
        }
        
        // 当 promise 状态为等待时（pending），将 onFulfilled 和 onRejected 存入对应的回调队列
        if (this.state === PENDING) {
          this.onFulfilledCallbacks.push(() => {
            onFulfilled(this.value)
          })
          
          this.onRejectedCallbacks.push(() => {
            onRejected(this.reason)
          })
        }
      })
    
    return promise2
  }
}
```

## then 方法链式调用识别 Promise 是否返回自己

### 扩展 resolvePromise 方法

```javascript
function resolvePromise(promise2, x, resolve, reject) {
  // 新增判断  
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  
  if (x instanceof Promise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
  
}
```

### 回调函数中添加异步方法  `queueMicrotask`

文档规定：

> 2.2.4 在执行上下文堆栈（execution context）仅包含平台代码之前，
> 不得调用 onFulfilled 和 onRejected

>2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3
>.1].


```javascript

  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        // ==== 新增 ====
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      
      if (this.state === REJECTED) {
        // ==== 新增 ====
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            onFulfilled(this.value)
          })
        })
        
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            onRejected(this.reason)
          })
        })
      }
    })
    
    return promise2
  }
```

## then 的参数变为可选的

```javascript

then(onFulfilled, onRejected) {
    // ==== 新增 ====
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    
    // 示意代码
    const promise2 = new Promise((resolve, reject) => {})
    
    return promise2
  }
```

## Promise A+ 规范实现
```javascript
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

class Promise {
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
  
  // Promise.prototype.then() 实现
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    
    // 为了链式调用这里直接创建一个 Promise，并在后面 return 出去
    const promise2 = new Promise((resolve, reject) => {
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
  
}
```

## 完善其他方法

## Promise.resolve()

- 将现有对象转为 Promise 实例，该实例的状态为 resolved

```javascript
  static resolve(parameter) {
    // 如果传入 Promise 就直接返回
    if (parameter instanceof Promise) {
      return parameter
    }
    
    // 转成常规方式
    return new Promise(resolve => {
      resolve(parameter)
    })
  }
```

## Promise.reject()

- 将现有对象转为 promise 实例，该实例状态为 reject

```javascript
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
```

## Promise.prototype.catch()

catch 用于发生错误是的回调函数，实际上是 .then(null, rejection)或.then(undefined, rejection)的别名

```javascript
  catch(cb) {
    return this.then(null, cb)
  }
```

## Promise.prototype.finally()

- finally 用于指定不管 promise 最后的状态如何 都会执行操作
- 在 finally 后面还可以继续 then ，并将值原封不动的传递下去
- finally 本质上是 then 方法的特例
- 该方法由 ES2018 引入
   
```javascript
  finall(cb) {
    return this.then(
      value => Promise.resolve(cb()).then(() => value),
      reason => Promise.resolve(cb()).then(() => {throw  reason})
    )
  }
```

## Promise.all()

- 用于多个 Promise 实例，包装成一个新的 Promise 实例

1. 只有所有的 Promise 返回成功，才会成功，
2. 如果有一个失败，就是失败状态，并且不会返回其他已经成功的状态

```javascript

  static all(promises) {
    return new Promise((resolve, reject) => {
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
        Promise.resolve(promises[i]).then(
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

```

## Promise.race()

- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- 新的 Promise 实例状态会根据 **最先更改状态的**  Promise 而更改状态

    只要有一个 Promise 状态发生改变，就调用其状态对应的回调方法
- https://es6.ruanyifeng.com/#docs/promise#Promise-race

```javascript
  static race(promises) {
    return new Promise((resolve, reject) => {
      // 参数不为数组时直接 reject
      if (!Array.isArray(promises)) {
        reject(new TypeError('参数必须为数组'))
        return
      }

      // 如果传入一个空数组则直接返回
      if (promises.length === 0) {
        resolve()
        return
      }

      for (let i = 0; i < promises.length; i++) {
        // 只要有一个 Promise 状态发生改变，就调用其状态对应的回调方法
        Promise.resolve(promises[i]).then(resolve, reject)
      }
    })
  }
```

## Promise.allSettled()
- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- 新的 Promise 实例只有等到 **所有这些参数实例都返回结果** 

    不管是 `resolved（成功）` 还是 `rejected（失败）`

    包装实例才会结束，一旦结束，状态总是 `resolved（成功）` 并且把所有状态返回

- 该方法由 ES2020 引入
- https://es6.ruanyifeng.com/#docs/promise#Promise-allSettled

```javascript
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      // 参数不为数组时直接 reject
      if (!Array.isArray(promises)) {
        reject(new TypeError('参数必须为数组'))
        return
      }

      const result = []

      // 如果传入一个空数组则直接返回
      if (promises.length === 0) {
        resolve(result)
        return
      }

      // 记录当前已返回结果的 Promise 数量
      let num = 0

      // resolve 验证函数
      function check(i, data) {
        result[i] = data
        num++
        // 只有已返回结果的 Promise 数量等于传入的数组长度时才调用 resolve
        if (num === promises.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (value) => {
            check(i, {
              status: FULFILLED,
              value,
            })
          },
          (reason) => {
            check(i, {
              status: REJECTED,
              reason,
            })
          }
        )
      }
    })
  }
```

## Promise.any()

- 用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例
- 只要参数实例有一个变成 `resolved` 状态，包装实例就会变成 `resolved` 状态；
- 如果**所有参数实例**都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态
- https://es6.ruanyifeng.com/#docs/promise#Promise-any

```javascript
  static any(promises) {
    return new Promise((resolve, reject) => {
      // 参数不为数组时直接 reject
      if (!Array.isArray(promises)) {
        reject(new TypeError('参数必须为数组'))
        return
      }

      // 如果传入一个空数组则直接返回
      if (promises.length === 0) {
        resolve()
        return
      }

      const rejects = []
      // 记录当前已失败的 Promise 数量
      let num = 0

      // reject 验证函数
      function check(i, data) {
        rejects[i] = data
        num++
        // 只有失败的 Promise 数量等于传入的数组长度时才调用 reject
        if (num === promises.length) {
          reject(rejects)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        // 当其中一个 Promise 成功时直接调用 resolve
        Promise.resolve(promises[i]).then(resolve, (r) => {
          check(i, r)
        })
      }
    })
  }
```

## 完整代码

```javascript

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise(promise, x, resolve, reject) {  
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'))
  }
  
  if (typeof x === 'object' || typeof x === 'function') {
    
    if (!x) return resolve(x)
    
    let then
    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }
    
    if (typeof then === 'function') {
      
      let called = false
      
      try {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          r => {
            if (called) return

            called = true
            reject(r)
          })
      } catch (e) {
        if (called) return
        
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
  
}

class Promise {
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
        if (this.state === PENDING) {
          this.state = FULFILLED
          this.value = value
          
          this.onFulfilledCallbacks.forEach(fn => fn())
        }
      }
    
    // 失败函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      
      if (this.state === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value)
              
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason)
              
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
  
  catch(cb) {
    return this.then(null, cb)
  }
  
  finall(cb) {
    return this.then(
      value => Promise.resolve(cb()).then(() => value),
      reason => Promise.resolve(cb()).then(() => {throw  reason})
    )
  }
  
  static resolve(parameter) {
    if (parameter instanceof Promise) {
      return parameter
    }
    
    return new Promise(resolve => {
      resolve(parameter)
    })
  }
  
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  
  static all(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(new TypeError('参数必须是数组'))
        return
      }
      
      const result = []
      
      if (promises.length === 0) {
        resolve(result)
      }
      
      let num = 0
      
      function check(i, data) {
        result[i] = data
        
        num++
        
        if (num === promises.length) {
          resolve(result)
        }
      }
      
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
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
Promise.deferred = function () {
  var result = {}
  result.promise = new Promise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })
  
  return result
}

module.exports = Promise

```
      








## 参考      

-  [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-31)

- [图解搞懂JavaScript引擎Event Loop](https://juejin.cn/post/6844903553031634952)

- [我以为我很懂Promise，直到我开始实现Promise/A+规范 | 技术点评](https://juejin.cn/post/6937076967283884040#heading-17)

[参考1](https://github.com/maomao1996/Promise/blob/master/src/promise.js)
