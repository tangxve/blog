# this / call / apply / bind

## this 是什么

MDN 上这样写的：

> In most cases, the value of this is determined by how a function is called.
>
> 在绝大多数情况下，函数的调用方式决定了this的值。
 
在 js 中 `this` 的指向是调用时决定的，而不是创建的时候决定的。

**`this` 总会指向，调用函数的那个对象**

## this 的用法

### 全局上下文

在全局上下文中，`this` 都指向全局对象

浏览器里面 `this` 等价于 `window` 对象，声明的一些全局变量，都会挂在 `window` 上

- `this` 等价于 `window` 对象

- `var` === `this` === `window`

### 1、纯粹的函数调用

函数属于全局性的调用，`this` 指向全局对象 `window`

```javascript
function test() {
  this.x = 1
  console.log(this.x)
}

test() // 1
```

### 2、作为 对象 的一个方法

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

### 3、作为 构造函数 调用

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

### apply 调用

#### 箭头函数

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





## call


## apply


## bind



## 参考
([参考1](https://segmentfault.com/a/1190000017957307)
