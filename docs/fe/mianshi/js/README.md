# js 相关面试题

## 0.1 + 0.2 什么不等于 0.3，有什么解决方法
1. JS 中 number 类型，按照 `IEEE754` 标准区分整数和浮点数（ IEEE754 全称：IEEE 二进制浮点数算术标准）
2. JS 采用 IEEE754 标准的 双精确度 存储格式（单精确度（32位）、双精确度（64位））
3. 运算过程
    1. 浮点数转二进制（0.1转二进制是一个无限循环的数）
    2. 浮点数的储存阶段（使用科学计数法：-1 * 10^3 * 1.02） (0.1和0.2存储2次) **二次存储 精度丢失**
    3. 浮点数的运算 **精度丢失**    
4. 因为两次存储时的精度丢失加上一次运算时的精度丢失，最终导致了 0.1 + 0.2 !== 0.3


**解决方法**

- Math.js：三方库 [https://mathjs.org/](https://mathjs.org/)
- 把计算数字 提升 10 的 N 次方 倍 再 除以 10的 N 次方。 N > 1
```javascript
(0.1 * 1000 + 0.2 * 1000) / 1000 == 0.3

// true
```


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

### ESM 循环调用
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
3. foo.js -> 导入 bar.js -> bar.js 已经执行过直接返回 -> 输出 bar -> bar is not defined， bar 未定义报错

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



### CommonJS 循环调用



## JavaScript 中 Map 和 Object 的区别
Map对象是一种有对应 键/值 对的对象， JS的Object也是 键/值 对的对象 ；

ES6中Map相对于Object对象有几个区别：

1. Object对象有原型， 也就是说他有默认的key值在对象上面， 除非我们使用Object.create(null)创建一个没有原型的对象；

2. 在Object对象中， 只能把String和Symbol作为key值， 但是在Map中，key值可以是任何基本类型(String, Number, Boolean, undefined, NaN….)，或者对象(Map, Set
, Object, Function , Symbol , null….);

3. 通过Map中的size属性， 可以很方便地获取到Map长度， 要获取Object的长度， 你只能用别的方法了；

Map实例对象的key值可以为一个数组或者一个对象，或者一个函数，比较随意 ，而且Map对象实例中数据的排序是根据用户push的顺序进行排序的， 而Object实例中key,value的顺序就是有些规律了， (他们会先排数字开头的key值，然后才是字符串开头的key值)；

另: 关于 Array 和 Set, 区别就是 Set 不可以有重复元素, 而 Array 可以有
