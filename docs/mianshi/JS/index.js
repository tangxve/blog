// 创建一个构造函数
function Person() {
}

/**
 * 每个函数都有一个 prototype 属性
 * prototype 是函数才会有的属性
 */

Person.prototype.name = 'Kevin'

// 实例，构造函数的实例
const p1 = new Person()
const p2 = new Person()

/**
 * 其实函数的 prototype，都指向了一个对象(Person.prototype)，这个对象就是调用该构造函数（Person）而创建的实例（p1，p2）的原型
 * p1和p2的原型就是 Person.prototype
 */

/**
 * 什么是原型
 * 每一个js对象（null 除外）在创建的时候就会关联另一个对象，这个对象就是我们所说的原型（Object.prototype）每一个对象都会从原型'继承'属性
 */


async function async1() {
  console.log('2async1 start')
  await async2()
  console.log('async1 end')
  
}

async function async2() {
  new Promise(function (resolve) {
    console.log('3primuse1')
    resolve()
  }).then(function () {
    console.log('6primuse2')
  })
}

console.log('1scritp start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('4primuse3')
  resolve()
}).then(function () {
  console.log('7primuse4')
})

console.log('5scritp end')

// 第一遍正常运行
// 打印 scritp start（1）
// setTimeout push 到 宏任务
// 打印 async1 start(2)
// 打印 primuse1(3)
// async2 的 resolve push 到 微任务
// 打印 primuse3（4）
// new Promise resolve push 到 微任务
// 打印 scritp end（5）

// 第二遍 执行 微任务
// 执行 async2 的 resolve，打印 primuse2（6）
// async2 执行完成 打印 async1 end（7）
// new Promise resolve，打印 primuse4（8）

// 第三遍 执行 宏任务
// setTimeout 打印 setTimeout（9）

var outVar = '最外层变量'

// 最外层函数
function outFun() {
  var inVar = '内层变量'
  
  // 内层函数 innerFun
  function innerFun() {
    console.log(inVar)
  }
  
  innerFun()
}

console.log(outVar)   // ==> 最外层变量

outFun()              // ==> 内层变量

console.log(inVar)    // ==> inVar is not defined

innerFun()            // ==> innerFun is not defined

var a = 10

function f1() {
  var b = 20
  
  function f2() {
    var c = 30
    
    console.log(a)  // 自由变量，顺着作用域链找
    console.log(b)  // 自由变量，顺着作用域链找
    console.log(c)  // 当前作用域变量
  }
  
  f2()
}

f1()

var x = 10

function fn() {
  console.log(x) // 10
}

function show(f) {
  var x = 20
  
  (function () {
    f() // 10, 而不是20
  })()
}

show(fn)

var a = 10

function fn() {
  var b = 20
  
  function bar() {
    console.log(a + b)  // 30
  }
  
  return bar
}

var x = fn() // x = bar

b = 200

x() // bar() ==> 30

(function (p) {
  
  let x = 1
  
  setTimeout(() => {
    
    console.log(x) // 1   实参
    
    console.log(p) // 20  形参
    
  }, 100)
  
})(10)
