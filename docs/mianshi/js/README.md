# js 相关面试题

## const 为什么不能重新赋值、为什么不能重新声明

const 指针指向不可以改变，指向地址的内容是可以改变的。 因为 const 只是保证了对象的的指针不变，而对象的内容改变不会影响到指针的改变，所以对象属性是可以修改的


## common.js 和 es6 中模块引入的区别？

commonJs： `require` / `exports` 是一种模块语法，最初应用用 `nodejs` 成为 `nodejs` 的模块规范

ES6 模块：
`import` / `export` 

- `commonJs` 模块是输出的是一个值的拷贝，ES6 模块输出的是值的引用
- `commonJs` 模块是运行是加载，是`同步`加载的，ES6 模块是编译时输出接口
- `commonJs` 是单个值导出，ES6 模块可以导出多个
- `commonJs` 是动态语法可以写判断，ES6 模块静态语法只能写在顶层（如果要写在别的地方，可以使用 `import()` 函数实现）
    - `require('url' + a + b)` 不会报错
    - `import 'url' + a + b `会报错，可以使用 `import('url' + a + b)`
- `commonJs` 的 `this` 是当前的模块，ES6 模块的 `this` 是 `undefined`
