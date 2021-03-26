# call / apply / bind


## call 和 apply 共同点

- 都能够 **改变函数执行的上下文**，将一个对象的方法交给另外一个对象执行，并且是立即执行

- 第一个参数是 `thisArg` 就是 this 的指向

- 写个也类似，**调用 call 和 apply 的对象，必须是一个函数 Function**。


## call 和 apply 的却别

写法上的区别

### call 的语法

- 第一个参数：thisArg 是 this 的指向，如果不传默认为全局对象 window

- 第二个参数开始，可以接受任意参数，会映射到相应位置的 Function 的参数上面

```javascript
fun.call(thisArg[,arg1[,arg2,…]]);
```


### apply 的语法

## call


`call` 是属于所有 `Function` 的方法，也就是 `Function.prototype.call`



## apply


## bind



## 参考
([参考1](https://segmentfault.com/a/1190000017957307)
