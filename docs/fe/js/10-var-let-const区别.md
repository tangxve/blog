# var、let 及 const 区别

- `var` 存在变量提升，我们在声明之前可以使用。

- `let`、`const` 因为存在暂时性死区的原因，不能在声明前使用

- `var` 在全局作用域下声明变量，会导致变量挂载在 `window` 上，其他两者不会

- `let` 和 `const` 作用基本一致，但是后者声明的变量不能再次赋值

## `const` 不能再次赋值的原因

- const 存储的是指针，指针指向不可以改变，指向地址的内容是可以改变的。
- 因为 const 只是保证了对象的的指针不变，而对象的内容改变不会影响到指针的改变，所以对象属性是可以修改的

## 暂时性死区

ES6规定，let/const 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。
这在语法上，称为 “暂时性死区”（ temporal dead zone，简称 TDZ）。

- var 会变量提升

```javascript
console.log(a)
var a
```

上面的代码相当于， 因为变量提升了

```javascript
var a
console.log(a) // undefined
```

- let 暂时性死区

在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。

报错

```javascript
console.log(a) // ReferenceError: a is not defined
let a
```

## 变量提升 和 函数提升

### 为什么会有 变量提升 和 函数提升

- js 在读取代码过程分为两步
- 第一步解析 js 代码，第二步执行 js 代码
- 浏览器在解析遇到 var 和 function 整个函数时，会提升到当前作用域的最前面

### 变量提升

- 在 es6 之前，js 没有块级作用域这一说，只有全局作用域和函数作用域。
  var声明的变量提升到他所在的作用域的最顶端。

### 函数提升

- 函数声明 可被提升： `function foo() {}`
- 函数表达式 不可提升：`var foo = function () {}`

例子1：函数声明可被提升

```javascript

console.log(square(5)); // 25

function square(n) {
  return n * n;
}
```

过程相当于

```javascript
function square(n) {
  return n * n
}

console.log(square(5)) // 25
```

例子2：函数表达式不可被提升

```javascript
console.log(square) // undefined

console.log(square(5)) // square is not a function =》 初始化并未提升，此时 square 值为 undefined

var square = function (n) {
  return n * n
}
```

过程：

```javascript
var square
console.log(square) // undefined =》赋值没有被提升

console.log(square(5)) // square is not a function =》 square 值为 undefined 故报错

square = function (n) {
  return n * n
}
```

