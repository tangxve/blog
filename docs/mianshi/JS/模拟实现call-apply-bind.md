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


### ES6
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

## 参考
- [JavaScript深入之call和apply的模拟实现 #11](https://github.com/mqyqingfeng/Blog/issues/11#)

- [参考2](http://www.conardli.top/docs/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E3%80%81bind.html)
