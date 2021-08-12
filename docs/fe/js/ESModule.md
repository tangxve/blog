# CommonJs 和 ES6 Module

- [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)

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
1. 执行 `node main.js -> 第一行 require(a.js)`，（node 执行也可以理解为调用了require方法，我们省略require(main.js)内容）

2. 进入 require(a)方法： `判断缓存（无） -> 初始化一个 module -> 将 module 加入缓存 -> 执行模块 a.js 内容`，（需要注意 是**先加入缓存， 后执行模块**内容）

3. a.js： `第一行导出 a = 1 -> 第二行 require(b.js)`（a 只执行了第一行）

4. 进入 require(b) 内： `同 1 -> 执行模块 b.js 内容`

5. b.js： `第一行 b = 11 -> 第二行 require(a.js)`

6. require(a) 此时 a.js **是第二次调用** `require -> 判断缓存（有）-> cachedModule.exports -> 回到 b.js`（因为js对象引用问题 此时的 cachedModule.exports = { a: 1 }）

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
export function bar(){
  return 'bar'
}

// foo.js
import { bar } from './bar'
console.log(bar());
export function foo(){
  return 'foo'
}

// main.js
import { bar } from './bar'
console.log(bar)
```
1. 因为函数声明会提示到文件顶部
2. 所以就可以直接在 foo.js 调用还没执行完毕的bar.js的 bar 方法，
3. 不要在函数内使用外部变量，因为变量还未声明(let,const)和赋值，var
