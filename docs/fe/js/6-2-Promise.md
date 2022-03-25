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

- then 方法有两个参数：`onResolved`、`onRejected`

- 当状态为 Fulfilled，执行 onResolved ，传入 value。则执行onRejected，传入this.reason

::: details 基础版本
<<< @/docs/fe/js/promise/esay.js
:::

## 实现异步方法

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

::: tip 原因 主线程代码立即执行，setTimeout 是异步代码，then 会马上执行，这个时候判断 Promise 状态，状态是 Pending，然而之前并没有判断等待这个状态
:::

1. 缓存成功和失败

```js
// Promise 类中添加属性 

// 储存成功的回调函数
this.onResolvedCallback = null

// 储存失败的回调函数
this.onRejectedCallback = null
```

2. then 方法中 Pending 状态的处理

```js
  // then 方法
then(onResolved, onRejected)
{
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
```

3. resolve 与 reject 中调用回调函数

```js

```

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
   * onResolvedCallbacks     成功函数的回调队列
   * onRejectedCallbacks     失败函数的回调队列
   */
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
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
          this.onResolvedCallbacks.forEach(fn => fn())
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
  then(onResolved, onRejected) {
    if (this.state === FULFILLED) {
      // 成功后的回调，并把值返回
      onResolved(this.value)
    }

    if (this.state === REJECTED) {
      // 失败的回调，并把失败原因返回
      onRejected(this.reason)
    }

    // 当 promise 状态为等待时（pending），将 onResolved 和 onRejected 存入对应的回调队列
    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onResolved(this.value)
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

- `then` 函数中，无论是 **成功函数回调 `onResolved`** ，还是 **失败函数的回调 `onRejected`** ，只要返回了结果就会传到 **下一个 `then`** 中

- `then` 执行的时候 `onResolved`, `onRejected` 可能会出现错误，需要捕获错误，并执行失败回调（处理成失败状态）

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
   * onResolvedCallbacks     成功函数的回调队列
   * onRejectedCallbacks     失败函数的回调队列
   */
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
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
          this.onResolvedCallbacks.forEach(fn => fn())
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
  then(onResolved, onRejected) {
    // 为了链式调用这里直接创建一个 Promise，并在后面 return 出去
    const promise2 = new Promise((resolve, reject) => {
      // 这里会立即执行
      if (this.state === FULFILLED) {
        try {
          // 获取成功回调函数的结果
          const x = onResolved(this.value)

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

      // 当 promise 状态为等待时（pending），将 onResolved 和 onRejected 存入对应的回调队列
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          onResolved(this.value)
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
> 不得调用 onResolved 和 onRejected

> 2.2.4 onResolved or onRejected must not be called until the execution context stack contains only platform code. [3
> .1].

```javascript

then(onResolved, onRejected)
{
  const promise2 = new Promise((resolve, reject) => {
    if (this.state === FULFILLED) {
      // ==== 新增 ====
      queueMicrotask(() => {
        try {
          const x = onResolved(this.value)
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
      this.onResolvedCallbacks.push(() => {
        // ==== 新增 ====
        queueMicrotask(() => {
          onResolved(this.value)
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

then(onResolved, onRejected)
{
  // ==== 新增 ====
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

  // 示意代码
  const promise2 = new Promise((resolve, reject) => {})

  return promise2
}
```

## Promise A+ 规范实现

[Promise A+ 规范实现](https://github.com/tangxve/Promise/blob/main/src/promise.js)

## Promise.all()

- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- 只有所有的 Promise 状态成功才会成功，如果其中一个 Promise 的状态失败就会失败
- [Promise.all()](https://es6.ruanyifeng.com/#docs/promise#Promise-all)

```javascript
class Promise {
  static all(promises) {
    return new Promise((resolve, reject) => {
      if (!isIterator(promises)) {
        reject(new TypeError('参数必须为 Iterator'))
        return
      }

      const result = []

      if (promises.length === 0) {
        resolve(result)
        return
      }

      // 记录当前已成功的 Promise 数量
      let doneNum = 0

      // resolve 验证函数
      function check(i, data) {
        reject[i] = data
        doneNum++

        // 只有成功的 Promise 数量等于传入的数组长度时才调用 resolve
        if (doneNum === promises.length) {
          resolve(result)
          return
        }
      }

      // 异步并行直接 promise
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((v) => {check(i, v)}, (e) => {
          // 如果有一个 promise 失败，就直接 reject
          reject(e)
          return
        })
      }
    })
  }
}

```

## Promise.race()

Promise.race() 实现

- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- 新的 Promise 实例状态会根据最先更改状态的 Promise 而更改状态
- [Promise.race()](https://es6.ruanyifeng.com/#docs/promise#Promise-race)

```javascript
class Promise {
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (!isIterator(promises)) {
        reject(new TypeError('参数必须为 Iterator'))
        return
      }

      for (let i = 0; i < promises.length; i++) {
        // 只要有一个 Promise 状态发生改变，就调用其状态对应的回调方法
        Promise.resolve(promises[i]).then(resolve, reject)
      }
    })
  }
}
```

## Promise.any()

- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- 只要参数实例有一个变成 resolved 状态，包装实例就会变成 resolved 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态
- 和 all 有点相反
- [Promise.any](https://es6.ruanyifeng.com/#docs/promise#Promise-any)

```javascript
class Promise {
  static any(promises) {
    return new Promise((resolve, reject) => {
      // 如果不能遍历(不为 Iterator ) 直接 reject, 语法错误
      if (!isIterator(promises)) {
        reject(new TypeError('参数必须为 Iterator'))
        return
      }

      // 失败的次数
      const rejects = []

      // 记录数量
      let num = 0

      function check(i, data) {
        rejects[i] = data
        num++

        // 只有失败的 promise 数量登入传入数组的长度，调用 regect
        if (num === promises.length) {
          reject(rejects)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        // 如果有一个成功就算成功，失败的记录下来
        Promise.resolve(promises[i].then(
          resolve,
          (r) => {
            check(i, r)
          }
        ))
      }
    })
  }
}
```

## Promise.allSettled()

- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
- 新的 Promise 实例只有等到所有这些参数实例都返回结果，不管是 resolved 还是 rejected ，包装实例才会结束，一旦结束，状态总是 resolved
- 和 Promise.all 区别：Promise.all 如果有失败就立即返回 rejected，并不会全部执行

- 返回的是数组对象
- 该方法由 ES2020 引入
- [Promise.allSettled()](https://es6.ruanyifeng.com/#docs/promise#Promise-allSettled)

```javascript
class Promise {
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      // 如果不能遍历(不为 Iterator ) 直接 reject, 语法错误
      if (!isIterator(promises)) {
        reject(new TypeError('参数必须为 Iterator'))
        return
      }

      const result = []

      if (promises.length === 0) {
        resolve(result)
        return
      }

      // 记录当前已成功的 Promise 数量
      let doneNum = 0

      // resolve 验证函数
      function check(i, data) {
        reject[i] = data
        doneNum++

        // 只有成功的 Promise 数量等于传入的数组长度时才调用 resolve
        if (doneNum === promises.length) {
          resolve(result)
          return
        }
      }

      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (value) => {
            check(i, {
              status: FULFILLED,
              value
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
}
```

