# this原理以及用法

- this指向：
    - 在普通函数中，是动态的，依赖于函数的调用；
    - 在箭头函数中，因为语法解析，this指向是确定的，**this是与外层函数绑定的，如果是最外层没有函数就是window**

- arguments:
    - 在普通函数中，可以获取到所有的参数；
    - 在箭头函数中，arguments是指向外层的函数的arguments的。如果想要获取到统一获取到箭头函数的参数，可以使用…操作符

- return: 箭头函数如果只有一个表达式，这个表达式就会被隐式返回，而且不需要使用return关键字

我们可以在class中使用箭头函数，this会和类实例进行绑定

## this 是什么

MDN 上这样写的：

> In most cases, the value of this is determined by how a function is called.
>
> 在绝大多数情况下，函数的调用方式决定了this的值。

在 js 中 `this` 的指向是调用时决定的，而不是创建的时候决定的。

**`this` 总会指向，调用函数的那个对象**

**this 其实不难，看清楚有木有箭头函数或者是 call apply bind ，其他就是看调用对象**

## 全局上下文

在全局上下文中，`this` 都指向全局对象

浏览器里面 `this` 等价于 `window` 对象，声明的一些全局变量，都会挂在 `window` 上

- `this` 等价于 `window` 对象

- `var` === `this` === `window`

## 纯粹的函数调用

函数属于全局性的调用，`this` 指向全局对象 `window`

```javascript
function test() {
  this.x = 1
  console.log(this.x)
}

test() // 1
```

## 作为 对象 的一个方法

`this` 指向**这个上级对象**

- `person` 调用了 `getName`，`this` 是对象本身

```javascript
var person = {
  name: '123',
  getName: function () {
    return this.name
  }
}

console.log(person.getName()) // 123 （person 调用了 getName，this 是对象本身）
```

- `person.getName` 赋值了一个全局变量 `getName`，`getName` 在全局调用，`this` 指向 `window`

```javascript
var name = 'hj'
var person = {
  name: '123',
  getName: function () {
    return this.name
  }
}

var getName = person.getName()

console.log(getName()) // hj (person.getName 赋值了一个全局变量 getName ，getName 在全局调用)

```

- `getName` 是箭头函数，箭头函数指向外层

```javascript
var person = {
  name: '123',
  getName: () => {
    return this.name
  }
}

console.log(person.getName()) // window，（getName 是箭头函数，箭头函数指向外层）
```

## 作为 构造函数 调用

通过构造函数生成一个新的对象（object），这是 this 指向这个新对象

理解这句话 **（最终是被新对象调用的）**

参考 `new` 关键字的实现

```javascript
var x = 3

function Test() {
  this.x = 4
  this.y = 5
}

var t = new Test()

console.log(t.x, t.y) // 4,5
```

## apply / call 调用

`apply` 是函数对象的方法，改变函数的调用对象，
第一个参数就是改变后的调用对象，因此 this 也是第一个参数

```javascript
var x = 0

function test() {
  console.log(this.x)
}

var o = {
  x: 1
}

o.m = test

o.m.apply() // 0

```

`apply` 参数未空时，默认调用全局对象 `winodw`，因此运行为 0 ，证明 `this` 指向全局对象

`call` 的作用和 apply 作用一样，去吧是写法上

- call 传的是多个参数：`fun.call(thisArg[,arg1[,arg2,…]]);`

- apply 传的是个数组：`fun.apply(thisArg, [argsArray]);`

## 箭头函数

所有的箭头函数都没有自己的 `this`，都会指向外层

```javascript
function Person(name) {
  this.name = name
  this.say = () => {
    return this.name
  }
}

var p = new Person('123')

console.log(p.say()) // 123
```

## 参考

[this的原理以及用法](https://segmentfault.com/a/1190000017957307)
