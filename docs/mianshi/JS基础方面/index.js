// 创建一个构造函数
function Person() {}

/**
 * 每个函数都有一个 prototype 属性
 * prototype 是函数才会有的属性
 */

Person.prototype.name = 'Kevin';

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
