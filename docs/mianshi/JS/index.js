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
  var x = 20;
  
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

function baz() {
  console.log('baz')
  console.log(this)
  bar()
}

function bar() {
  console.log('bar')
  console.log(this)
  foo()
  baz()
}

function foo() {
  console.log('foo')
  console.log(this)
}

baz()

var name = 'hj'
var person = {
  name: '123',
  getName: function () {
    return this.name
  }
}

var getName = person.getName()

console.log(getName()) // hj (person.getName 赋值了一个全局变量 getName ，getName 在全局调用)

var x = 3

function Test() {
  this.x = 4
  this.y = 5
}

var t = new Test()

console.log(t.x, t.y)

function superClass() {
  this.name = 'shiba'
  this.age = 18
  this.func = function () {
    console.log(this.name, this.age)
  }
}

function subClass() {
  superClass.call(this)
  
  this.func()
}

subClass()

function Person(name) {
  this.name = name
  this.say = function () {
    setTimeout(function () {
      console.log('name', this.name)
    }, 100)
  }
}

var p1 = new Person('shiba')

p1.say() // name, undefined

function Person(name) {
  this.name = name
  this.say = function () {
    
    var self = this
    setTimeout(function () {
      console.log('name', self.name)
    }, 100)
  }
}

var p1 = new Person('shiba')

p1.say() // name shiba

// 首页
Function.prototype.bind = function (oThis) {
  var aArgs = Array.prototype.slice.call(arguments, 1)
  
  var fToBind = this
  
  var fNOP = function () {}
  
  var fBound = function () {
    fBound.prototype = this instanceof fNOP ? new fNOP() : fBound.prototype
    
    return fToBind.apply(this instanceof fNOP ? this : oThis || this, aArgs)
  }
  
  if (this.prototype) {
    fNOP.prototype = this.prototype
  }
  
  return fBound
  
}

function Parent() {
  this.name = '11'
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {}

Child.prototype = new Parent()

var c1 = new Child()

console.log(c1.getName()) // 11

function createObj(o) {
  function F() {}
  
  F.prototype = o
  
  return new F()
}

var person = {
  name: 'shiba',
  arrs: ['11', '22']
}

var person1 = createObj(person)

var person2 = createObj(person)

// 这里是给 person1 添加了 name 的值
person1.name = 'p1'

console.log(person2.name) // shiba

person1.arrs.push('33')

console.log(person2.arrs) // ['11', '22', '33']

function createObj(o) {
  var cloe = Object.create(o)
  
  cloe.sayName = function () {
    console.log('hi')
  }
  
  return cloe
  
}

function Person(name) {
  this.name = name
  this.arrs = ['11', '22', '33']
}

Person.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Person.call(this, name)
  
  this.age = age
}

Child.prototype = new Person()

var child1 = new Child('hj', 18)

console.log(child1) // { name: 'hj', age: 18, arrs: ['11', '22', '33'] }

function Parent(name) {
  this.name = name
  this.color = ['red', 'blue', 'green']
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Chid(name, age) {
  Parent.call(this, name)
  this.age = age
}

// 关键的三步
var F = function () {}

F.prototype = Parent.prototype

Chid.prototype = new F()

var child1 = new Chid('shiba', 18)

console.log(child1)

function obj(parent) {
  function F() {}
  
  F.prototype = parent
  
  return new F()
}

function inherit(child, parent) {
  
  var proto = obj(parent.prototype)
  
  proto.constructor = child
  
  child.prototype = proto
}

// 使用
inherit(Chid, Parent)

Promise.resolve().then(() => {
  console.log(0)
  return Promise.resolve(4)
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

console.log('1')
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
    process.nextTick(function foo() {
      console.log(4)
    })
  })
})
Promise.resolve().then(() => {
  console.log(5)
  setTimeout(() => {
    console.log(6)
  })
  Promise.resolve().then(() => {
    console.log(7)
  })
})

process.nextTick(function foo() {
  console.log(8)
  process.nextTick(function foo() {
    console.log(9)
  })
})
console.log('10')

function myInstanceof(leftV, rightV) {
  
  // 取右表达式的 prototype 的值
  let rigthProto = rightV.prototype
  
  // 取左表达式的 __proto__ 值
  leftV = leftV.__proto__
  
  while (true) {
    if (leftV === null) {
      return false
    }
    
    // 严格相等时候 返回 true
    if (leftV === rigthProto) {
      return true
    }
    
    leftV = leftV.__proto__
  }
}

function newOperator() {
  
  var obj = new Object()
  
  var Constructor = [].shift.call(arguments)
  
  obj.__proto__ = Constructor.prototype
  
  Constructor.apply(obj, arguments)
  
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
  
  return '德玛西亚'
}

Person.prototype.getName = function () {
  console.log('名字：', this.name)
}

var p1 = new Person('盖伦', 18)

console.log(p1.name)
console.log(p1.age)
console.log(p1.getName())

function newOperator() {
  var obj = new Object()
  
  var Constructor = [].shift.apply(arguments)
  
  obj.__proto__ = Constructor.prototype
  
  var ret = Constructor.apply(obj, arguments)
  
  // 这里判断对象不是很严谨，重在理解 new 的过程
  return typeof ret === 'object' ? ret : obj
}

Function.prototype.myCallES3 = function (context) {
  context = context || window
  
  context.fn = this
  
  var args = []
  
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }
  
  ['arguments[1]', 'arguments[2]', 'arguments[3]']
  
  var result = eval('context.fn(' + args + ')')
  
  delete context.fn
  
  return result
}

Function.prototype.myCall = function (context, ...args) {
  
  context = context || window
  
  // 创建个不会重名的属性
  const fn = Symbol()
  
  context[fn] = this
  
  const result = context[fn](...args)
  
  delete context[fn]
  
  return result
}

// es3 myApply
Function.prototype.myApply = function (context, arr) {
  var context = Object(context) || window
  
  context.fn = this
  
  var result
  
  if (!arr) {
    // 没有传第二次参数，直接调用
    result = context.fn()
  } else {
    var args = []
    
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    
    result = eval('context.fn(' + args + ')')
  }
  
  delete context.fn
  
  return result
}

// es6 myApply

Function.prototype.myApply = function (context, arr) {
  context = context || window
  
  const fn = Symbol()
  
  context[fn] = this
  
  let result
  
  if (Array.isArray(arr)) {
    result = context[fn](...arr)
  } else {
    result = context[fn]()
  }
  
  delete context[fn]
  
  return result
  
}

// 普通版
Function.prototype.myBind = function (context) {
  
  // 判断是否是 函数
  if (typeof this !== 'function') {
    throw  new Error('Error')
  }
  
  // 绑定函数的 this（调用 bind 的函数）
  var self = this
  
  // 获取 myBind 函数的 第二个到最后一个的参数
  var args = Array.prototype.slice.call(arguments, 1)
  
  // 作为构造函数使用时，声明空函数做中转，不要绑在 this 上
  var fNOP = function () {}
  
  // 返回的函数
  var fBound = function () {
    
    // 获取返回函数的参数
    var bindArgs = Array.prototype.slice.call(arguments)
    
    // 改变 this 指向
    self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }
  
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例可以实例就可以访问原型的的值
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  
  return fBound
}

Object.create = function (o) {
  function f() {}
  
  f.prototype = o
  
  return new f
}
// es6 bind

Function.prototype.myBind = function (context, ...args1) {
  if (typeof this !== 'function') {
    throw  new Error('Error')
  }
  
  const self = this
  
  return function F(...args2) {
    // 判断是否构造函
    if (this instanceof F) {
      return new self(...args1, ...args2)
    }
    
    return self.apply(context, args1.concat(args2))
  }
}

var a1 = { b: { c: {} } }

var a2 = shallowClone(a1)   // 浅拷贝方法

a2.b.c === a1.b.c           // true 新旧对象还是共享同一块内存

var a3 = deepClone(a3)      // 深拷贝方法

a3.b.c === a1.b.c           // false 新对象跟原对象不共享内存

let arr = [1, 3, {
  username: 'kobe'
}]

let arr2 = arr.concat()

arr2[2].username = 'wade'

console.log(arr) // [ 1, 3, { username: 'wade' } ]

let arr = [1, 3, {
  username: 'kobe'
}]

let arr3 = arr.slice()

arr3[2].username = 'wade'

console.log(arr) // [ 1, 3, { username: 'wade' } ]

let obj1 = { name: 'Kobe', address: { x: 100, y: 100 } }

let obj2 = { ...obj1 }

obj1.address.x = 200

obj1.name = 'wade'

console.log('obj2', obj2) // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }

function deepClone(obj, hash = new WeakMap) {
  
  // 如果是不存在就不拷贝了
  if (obj === null) return obj
  
  // 时间格式处理
  if (obj instanceof Date) return new Date(obj)
  
  // 正则格式处理
  if (obj instanceof RegExp) return new RegExp(obj)
  
  // 如果对象是普通值的话就不需要拷贝
  if (typeof obj !== 'object') return obj
  
  // 是对象的话就要进行 深拷贝
  if (hash.get(obj)) return hash.get(obj)
  
  // 找到对象所属原型上的 constructor，而原型上的 constructor 指向的是当前类本身
  let cloneObj = new obj.constructor()
  
  hash.set(obj, cloneObj)
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      
      // 递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  
  return cloneObj
}

const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg(targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    case funcTag:
      return cloneFunction(targe)
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }
  
  // 初始化
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }
  
  // 防止循环引用
  if (map.get(target)) {
    return target
  }
  map.set(target, cloneTarget)
  
  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value))
    })
    return cloneTarget
  }
  
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value))
    })
    return cloneTarget
  }
  
  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })
  
  return cloneTarget
}

// 防抖

function debounce(f, wait) {
  let timer
  
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f(...args)
    }, wait)
  }
}

// 节流

function throttle(f, time) {
  let pre = 0
  
  return function (...args) {
    if (Date.now() - pre > time) {
      
      pre = Data.now()
      
      f(...args)
    }
  }
}

function throttle(f, wait) {
  let timer = null
  
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        f(...args)
      }, wait)
    }
  }
}


const o = Object.create(null)

console.log(o)      // {}

o.constructor       // undefined

o.__proto__         // undefined

o instanceof Object // false
