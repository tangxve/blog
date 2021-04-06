# 手写实现 call apply bind

## call 模拟实现

- `context` 是可选的，如果不传默认上下文是 `window`

- 给 `context` 创建一个属性 `fn`。

    - 当前的这个函数赋值给这个函数（改变 `this`）
    
    - 这个属性要保证唯一，有可能对象已经存在 `fn` 这里用于模拟 `call` 的实现

- 处理 `arguments` 参数
    
    - 第一个参数是this 的指向，如果不传默认为全局对象 window
    
    - 剩下的参数会映射要函数的参数上，call 为多个参数，apply 为数组

- 删除 `fn` 属性，（如果不删除会给对象本身添加这个属性）

- 返回 参数 (绑定函数有可能有返回值)

### ES3 的写法
```javascript
Function.prototype.myCall = function (context) {
  context = context || window
  
  context.fn = this
  
  var args = []
  
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }    

  var result = eval('context.fn(' + args + ')')
  
  delete context.fn
  
  return result
}
```

::: tip
```javascript
var args = []

for (var i = 1, len = arguments.length; i < len; i++) {
  args.push('arguments[' + i + ']')
}
```

- 执行后 `args` 为 `['arguments[1]', 'arguments[2]', 'arguments[3]']`

```javascript
eval('context.fn(' + args +')')
```

- 这里 args 会自动调用 Array.toString() 这个方法。

    执行为：`context.fn(arguments[1], arguments[2], arguments[3])`
::: 


### ES6 的写法
```javascript
Function.prototype.myCall = function (context, ...args) {
  
  context = context || window
  
  // 创建个不会重名的属性
  const fn = Symbol()
  
  context[fn] = this
  
  const result = context[fn](...args)
  
  delete context[fn]
  
  return result
}
```

## apply 模拟实现

apply 和 call 实现类似，参数为数组

### ES3 实现
```javascript
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
```

### ES6 实现

```javascript
Function.prototype.myApply = function (context, arr) {
  context = context || window
  
  const fn = Symbol()
  
  context[fn] = this
  
  let result
  
  // 如果是 类数组 检测不出来，这里主要是理解
  if (Array.isArray(arr)) {
    result = context[fn](...arr)
  } else {
    result = context[fn]()
  }
  
  delete context[fn]
  
  return result  
}
```


## bind 模拟实现

- `bind` 函数返回一个函数

- 可以传参数
    - 绑定的函数可以传参数、使用 `bind()` 的时候也可以传参数
    
- 返回函数用于构造函数是
    - `bind` 返回的函数作为构造函数的时候，`bind` 时指定的 `this` 值会失效，但传入的参数依然生效。
    
    >一个绑定函数也能使用 `new` 操作符创建对象：这种行为就像把原函数当成构造器。                                                                        
    >提供的 `this` 值被忽略，同时调用时的参数被提供给模拟函数。
    
- `bind` 的调用必须是一个函数

### 普通版
```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw  new Error('Error')
  }
 
  var self = this
  
  var args = Array.prototype.slice.call(arguments, 1)
  
  var fNOP = function () {}
  
  var fBound = function () {

    var bindArgs = Array.prototype.slice.call(arguments)

    self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
  }
  
  fNOP.prototype = this.prototype

  fBound.prototype = new fNOP()
  
  return fBound
}
```
1. 判断是否函数调用
```javascript
if (typeof this !== 'function') {
  throw  new Error('Error')
}
```

2. 存储绑定函数的 this (调用 bind 的函数)
```javascript
var self = this
```
3. 获取除了 thisArg 的剩余参数（第二个到最后一个）
 ```javascript
var args = Array.prototype.slice.call(arguments, 1)
```
4. 返回函数的参数
```javascript
var bindArgs = Array.prototype.slice.call(arguments)
```
5. 改变 `this` 的指向

    - **当作为构造函数时候**
    
        - **`this` 的 指向实例 `fBound` ，此刻结果为 `true`，将绑定函数的 `this` 实例指向实例**
        
    - **当作为普通函数时候**
    
        - **this 指向是 `window`，此刻结果为 `false`，将绑定函数的 `this` 指向 `context` 并传入参数**
        
```javascript
self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
```

6. 修改 `prototype` 

修改返回函数的 `prototype` 为绑定函数的 `prototype`，实例就可以继承绑定函数的原型中的值

```javascript
fBound.prototype = this.prototype;
```

上面的写法中，如果我们修改 `fBound.prototype` 的时候，也会直接修改绑定函数的 `prototype`。

需要一个空函数使用 `new` 操作符 做中转
```javascript
// 空函数来做中转
var fNOP = function () {}

// ...

fNOP.prototype = this.prototype

fBound.prototype = new fNOP()
```

#### 扩展

```javascript
fNOP.prototype = this.prototype
fbound.prototype = new fNOP()
```

等同于 

```javascript
fbound.prototype = Object.create(this.prototype)
```
Object.create 模拟实现：

```javascript
Object.create = function (o) {
  function f() {}
  
  f.prototype = o
  
  return new f
}
```

### 精简版 es6
1. 除了参数，返回一个闭包

2. 判断是否调用构造函数调用，如果是则使用 new 调用当前函数

3. 如果不是，使用 apply，将 context 和处理好的参数返回
```javascript
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
```

## 参考
- [JavaScript深入之call和apply的模拟实现 #11](https://github.com/mqyqingfeng/Blog/issues/11#)

- [JavaScript深入之bind的模拟实现 #12](https://github.com/mqyqingfeng/Blog/issues/12)

- [参考2](http://www.conardli.top/docs/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E3%80%81bind.html)
