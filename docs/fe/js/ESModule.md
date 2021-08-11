# CommonJs 和 ES6 Module

- [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)

## 区别

- `CommonJs` 导出的是变量的一份拷贝；`ES6 Module` 导出的是变量的引用（绑定）（export default 是特殊的）
- `CommonJs` 是单个值导出；`ES6 Module` 可以导出多个
- `CommonJs` 是动态语法可以写在判断里；`ES6 Module` 静态语法只能写在顶层
- `CommonJs` 的 this 是当前模块；`ES6 Module` 的 this 是 undefined
- `CommonJs` 模块是运行是加载，是同步加载的；`ES6 Module` 模块是编译时输出接口


## CommonJs 循环引用

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
