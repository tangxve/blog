# call / apply / bind


## call 和 apply 共同点

- 都能够 **改变函数执行的上下文**，将一个对象的方法交给另外一个对象执行，并且是立即执行

- 第一个参数是 `thisArg` 就是 this 的指向

- 写个也类似，**调用 call 和 apply 的对象，必须是一个函数 Function**。


## call 和 apply 的区别

**只有一个区别，就是 `call()` 方法接受的是一个参数列表，而 `apply()` 方法接受的是一个包含多个参数的数组。**


## call

**语法**

```javascript
funct.call(thisArg, arg1, arg2, ...)
```

- 调用 `call` 的对象，必须是个函数 `Function`

- 第一个参数：`thisArg` 是 `this` 的指向，如果不传默认为全局对象 `window`

- 第二个参数开始，可以接受任意参数，会映射到相应位置的 `Function` 的参数上面



## apply

**语法**

```javascript
func.apply(thisArg, [argsArray])
```

- 调用 apply 的对象，必须是个函数 `Functin`

- 第一个参数：`thisArg` 是 `this` 的指向，如果不传默认为全局对象 `window` 。和 `call` 一致。

- 第二个参数：**必须是数组或者类数组，它们会被转成类数组**，传到调用的函数中，并且映射到 function 对应的参数上。call 和 apply 之间很重要的一个区别


## bind

**语法**

```javascript
funct.call(thisArg, arg1, arg2, ...)
```

- `bind` 方法与 `apply` 和 `call` 类似，也能改变函数 `this` 指向。

- `bind` 方法的返回值是函数，并且需要调用后，才会执行。而 `apply` 和 `call` 是立即调用的


## call \ apply \ bind 的使用场景

### call 使用场景

- 1、对象继承
```javascript
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

subClass() // shiba 18

```

subClass 通过 call 继承了 superClass 的 func 方法 和 name、age 变量。
 
 -  2、方法借用

类数组，使用 Array 原型链的方法

```javascript
let domNodes = Array.prototype.slice.call(document.getElementsByTagName('*'))
```


### apply 用处

- 1、Math 方法

数组的最大的一项

```javascript
const array = [1, 2, 3, 4, 5]

let max = Math.max.apply(null, array)
```


最小的一项

```javascript
const array = [1, 2, 3, 4, 5]

let min = Math.min.apply(null, array)
```

###  bind 用法

下面代码 输出正常的 name

```javascript

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
```

这离 `this` 运行时候指向的是 `window`，所以 `this.name` 是 `undefined`

> 由 `setTimeout()` 调用的代码运行在与所在函数完全分离的执行环境上。
>
> 这会导致，这些代码中包含的 this 关键字在非严格模式会指向 `window`。


- 方法一 
```javascript
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
```

- 使用 bind
```javascript
function Person(name) {
  this.name = name
  this.say = function () {    
    setTimeout(function () {
      console.log('name', self.name)
    }.bind(this), 100)
  }
}

var p1 = new Person('shiba')

p1.say() // name shiba
```

`setTimeout` 里面使用 箭头函数也可以实现


## 总结

- 三者都可以改变函数的 `this` 的指向

- 三者的第一个参数都是 this 指向的对象

- `bind` 是返回一个函数，需要执行。`call` 、 `apply` 是立即调用的

- `call` 和 `bind` 传参需要将参数全部列出，`apply` 传的是数组

## 参考
[参考1](https://segmentfault.com/a/1190000017957307)
[参考2](https://github.com/axuebin/articles/issues/7)
