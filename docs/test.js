const curry = (fn, ...args) => {
  console.log(fn, args)
// 函数的参数个数可以直接通过函数数的.length属性来访问
  return args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
     */
    : (..._args) => curry(fn, ...args, ..._args)
}

function add1(x, y, z) {
  console.log([...arguments])
}

// const add = curry(add1, 'a', 'b', 'c', 'd')
// console.log(add(1, 2, 3))
// console.log(add(1)(2)(3))
// console.log(add(1, 2)(3))
// console.log(add(1)(2, 3))

function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  })
}

function add(...args1) {
  let sum1 = argsSum(args1)
  let fn = function (...args2) {
    let sum2 = argsSum(args2)
    return add(sum1 + sum2)
  }
  console.log('fn', fn)
  fn.toString = function () {
    return sum1
  }
  return fn
}

console.log(add(1, 2)(3)(4)(10))
