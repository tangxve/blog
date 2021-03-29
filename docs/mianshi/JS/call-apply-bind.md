# call / apply / bind


## call 和 apply 共同点

- 都能够 **改变函数执行的上下文**，将一个对象的方法交给另外一个对象执行，并且是立即执行

- 第一个参数是 `thisArg` 就是 this 的指向

- 写个也类似，**调用 call 和 apply 的对象，必须是一个函数 Function**。


## call 和 apply 的却别

只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。


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



## 参考
([参考1](https://segmentfault.com/a/1190000017957307)
