# this / call / apply / bind

## this

MDN 上这样写的：

> In most cases, the value of this is determined by how a function is called.
>
> 在绝大多数情况下，函数的调用方式决定了this的值。
 
在 js 中 `this` 的指向是调用时决定的，而不是创建的时候决定的。


### 调用位置

调用位置就是函数在代码的中调用位置，而不是声明位置。

这时候 `this` 指向调用，调用的作用域的 `this`

### 全局上下文

在全局上下文中，`this` 都指向全局对象

浏览器里面 `this` 等价于 `window` 对象，声明的一些全局变量，都会挂在 `window` 上

- `this` 等价于 `window` 对象

- `var` === `this` === `window`


### 函数上下文

在函数中，`this` 的值取决于函数被调用的方式

#### 直接调用

`this` 指向全局变量
```javascript

function foo() {
  return this
}

console.log(foo() === window)   // true

```

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

#### 作为对象的一个方法

`this` 指向**调用函数的对象**

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




## call


## apply


## bind



## 参考
([参考1](https://github.com/axuebin/articles/issues/6)
([参考2](https://segmentfault.com/a/1190000017957307)
