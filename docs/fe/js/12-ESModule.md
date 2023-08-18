# CommonJs 和 ES6 Module

- [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)
- [ESModule 加载与运行机制](https://mp.weixin.qq.com/s/wxUz5E1Xs5dqYFPRPOnAlw)

## 区别

- `CommonJs` 导出的是变量的一份拷贝；`ES6 Module` 导出的是变量的引用（绑定）（export default 是特殊的）
- `CommonJs` 是单个值导出；`ES6 Module` 可以导出多个
- `CommonJs` 是动态语法可以写在判断里；`ES6 Module` 静态语法只能写在顶层
- `CommonJs` 的 this 是当前模块；`ES6 Module` 的 this 是 undefined
- `CommonJs` 模块是运行是加载，是同步加载的；`ES6 Module` 模块是编译时输出接口

## CommonJs 循环引用

```javascript
// a.js
module.exports.a = 1
var b = require('./b')
console.log(b)
module.exports.a = 2

// b.js
module.exports.b = 11
var a = require('./a')
console.log(a)
module.exports.b = 22

//main.js
var a = require('./a')
console.log(a)
```

**利用缓存方式解决循环引用**

1. 执行 `node main.js -> 第一行 require(a.js)`，（node 执行也可以理解为调用了require方法，我们省略require(main.js)内容）

2. 进入 require(a)方法： `判断缓存（无） -> 初始化一个 module -> 将 module 加入缓存 -> 执行模块 a.js 内容`，（需要注意 是**先加入缓存， 后执行模块**内容）

3. a.js： `第一行导出 a = 1 -> 第二行 require(b.js)`（a 只执行了第一行）

4. 进入 require(b) 内： `同 1 -> 执行模块 b.js 内容`

5. b.js： `第一行 b = 11 -> 第二行 require(a.js)`

6. require(a) 此时 a.js **是第二次调用** `require -> 判断缓存（有）-> cachedModule.exports -> 回到 b.js`（因为js对象引用问题 此时的
   cachedModule.exports = { a: 1 }）

7. b.js：`第三行 输出 { a: 1 } -> 第四行 修改 b = 22 -> 执行完毕回到 a.js`

8. a.js：`第二行 require 完毕 获取到 b -> 第三行 输出 { b: 22 } -> 第四行 导出 a = 2 -> 执行完毕回到 main.js`

9. main.js：`获取 a -> 第二行 输出 { a: 2 } -> 执行完毕`

## ES6 Module 循环引用

```javascript
// bar.js
import { foo } from './foo'

console.log(foo);
export let bar = 'bar'

// foo.js
import { bar } from './bar'

console.log(bar);
export let foo = 'foo'

// main.js
import { bar } from './bar'

console.log(bar)
```

1. 执行 main.js -> 导入 bar.js
2. bar.js -> 导入 foo.js
3. foo.js -> 导入 bar.js -> bar.js 已经执行过直接返回 -> 输出 `bar -> bar is not defined， bar 未定义报错`

**使用 function 的方式解决：**

```javascript
// bar.js
import { foo } from './foo'

console.log(foo());

export function bar() {
  return 'bar'
}

// foo.js
import { bar } from './bar'

console.log(bar());

export function foo() {
  return 'foo'
}

// main.js
import { bar } from './bar'

console.log(bar)
```

1. 因为函数声明会提示到文件顶部
2. 所以就可以直接在 foo.js 调用还没执行完毕的bar.js的 bar 方法，
3. 不要在函数内使用外部变量，因为变量还未声明(let,const)和赋值，var

## ESModule 加载和执行过程解析

ESModule 的加载和解析过程整体上可以拆分为三个步骤：

1. 获取代码和解析：建立模块之间连接
    1. 通过文件读写的方式，读取 main.mjs 的文件内容，记录到 ESModule 中
    2. 逐行解析 JS 代码，获取依赖的 ESModule 的地址
    3. 然后继续加载对应依赖的模块，重复第一步的操作，直到所有的 ESModule 都完成了加载
2. 实例化模块：完成变量声明和环境对象(enviroment object)的绑定
    1. 每个模块都会有各自环境对象且相互隔离，这也是不同模块可以有相同的名字的函数、变量而不会冲突的原因
    2. function、var 的变量提升的特性在这个场景下也适用，function 会直接完成初始化，var 则会初始化为 undefined
3. 执行代码：按照深度优先的顺序，逐行执行代码
    1. 按照深度优先的顺序，首先执行最深的依赖的模块代码
    2. 每个模块的代码只会被执行一次

## ESModule 加载运行策略相比于同步的方式又哪些优势

1. 实际模块的依赖不许执行代码，在可以解析时候，通过静态分析方式进行
   1. 浏览器、node 等应用可能快的速度完成依赖的收集和资源的请求，
   2. 而不会受具体模块代码执行耗时以及前后顺序的影响
   3. 可以使用尽可能多的并发请求来快速完成加载。
2. 支持 TreeShaking 的自动优化 

