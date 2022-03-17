# 编程题

## 最全的手写JS面试题

[最全的手写JS面试题](https://juejin.cn/post/6968713283884974088)

## flat 数组 扁平化/降纬

::: details 数组降维 flat 方法
<<< @/docs/fe/coding/coding.js#flat
:::

## flatten 对象和数组 扁平化

::: details flatten 对象和数组 扁平化

### 题目：

```javascript
  // 对象扁平化
  // 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。

const input = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null
}

//  output如下
const output = {
  'a': 1,
  'b[0]': 1,
  'b[1]': 2,
  'b[2].c': true, 'b[3][0]': 3, 'd.e': 2,
  'd.f': 3
  // "g": null,  值为null或者undefined，丢弃
}
```

### 答案：

<<< @/docs/fe/coding/coding.js#flatten
:::

## 获取 url 参数

::: details 获取 url 参数
<<< @/docs/fe/coding/coding.js#urlParsing
:::

## 对象转 url 参数

```js
const param = { a: '1', b: '2' }
const url = 'www.xxx.com'

function objToUrl(url, param) {
  const _url = url.split('?')[0]
  let _paramStr = url.split('?')[1]

  _paramStr = _paramStr ? `&${_paramStr}` : ''

  const paramStr = Object.keys(param).map(k => `${k}=${param[k]}`).join('&')

  return `${url}?${paramStr}${_paramStr}`
}

objToUrl(url, param)
```

## new 关键词方法

::: details new 关键词方法
<<< @/docs/fe/coding/coding.js#myNew
:::

## 远程实现加减乘除运算

- 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
- 以加法为例，现有远程API的模拟实现

::: details 远程实现加减乘除运算

### 题目

```javascript
const addRemote = async (a, b) => new Promise(resolve => {
  setTimeout(() => resolve(a + b), 1000)
});

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 你的实现
}

// 请用示例验证运行结果:
add(1, 2)
  .then(result => {
    console.log(result); // 3
  });


add(3, 5, 2)
  .then(result => {
    console.log(result); // 10
  })

```

### 方法 1 `Promise.all` + `for` 循环

<<< @/docs/fe/coding/coding.js#add1

### 方法 2 `Promise.all` + `while` 循环

<<< @/docs/fe/coding/coding.js#add2
:::

## 大数相加

::: details 大数相加
<<< @/docs/fe/coding/coding.js#bigNumAdd
:::

## JS 发布订阅 EventBus

::: details JS 发布订阅 EventBus
<<< @/docs/fe/coding/coding.js#EventBus
:::

## JS 实现千分位

::: details 实现千分位
**正则版本**

<<< @/docs/fe/coding/coding.js#format

**reduce 版本**

<<< @/docs/fe/coding/coding.js#qianfenwei-reduce
:::

## 实现 getValue 函数来获取path对应的值

::: details getValue
**题目**

```js
var object = { 'a': [{ 'b': { 'c': 3 } }] }; // path: 'a[0].b.c'
var array = [{ "a": { 'b': [1] } }]; // path: '[0].a.b[0]'

function getValue(obj, path, defaultValue) {
}

console.log(getValue(object, 'a[0].b.c', 0));  // 输出3
console.log(getValue(array, '[0].a.b[0]', 12)); // 输出 1
console.log(getValue(array, '[0].a.b[0].c', 12));  // 输出 12
```

**方法1：正则匹配、替换、截取**

<<< @/docs/fe/coding/coding.js#getValue

**方法2：正则 + reduce**

<<< @/docs/fe/coding/coding.js#getValue2

方法3：根据下划线截取
:::

## 数据的 key 从下划线改为驼峰

key 下划线转驼峰：a_d_s => aDS

::: details 下划线转驼峰

```js
const testData = {
  a_bbb: 123,
  a_g: [1, 2, 3, 4],
  a_d: {
    s: 2,
    s_d: 3
  },
  a_f: [1, 2, 3, {
    a_g: 5
  }, 'a_b_c'],
  a_d_s: 1
}
```

<<< @/docs/fe/coding/coding.js#transferKey
:::

## 将文字版本的目录，解析成树结构 parseTree

::: details parseTree
<<< @/docs/fe/coding/coding.js#parseTree
:::

## 实现一个带井发控制的 Promise.allSettled

Tips:

1. 相比于 Promise.all()，Promise.allSettled()
   当遇到 promise reject 时，会收集错误信息而不是直接 reject。

2. 因为需要控制并发，所以要实现的方法接受的参数不是 promise 数组， 而是 async function 数组（或者一个返回 promise 的普通方法）

::: details 实现一个带井发控制的 Promise.allSettled
<<< @/docs/fe/coding/coding.js#allSettledWithConcurrency
:::

## 多表单错误联动

有多个 input 输入框，需要通过 Javascript 实现错误检测逻辑，实时监控 input 的输入，

当出现错误时输出错误提示。需要检测如下 3 种错误信息：

1. 输入内容为空，输出错误信息 empty
2. 输入内容和其他输入框内容重复，所有重复的输入框都输出错误信 息 duplicate
3. 输入内容长度超过 10，输出错误信息 overlength

::: details 实现一个 多表单错误联动
<<< @/docs/fe/coding/coding.js#InputOperator
:::

## 实现一个reduce

::: details 实现一个 reduce
<<< @/docs/fe/coding/coding.js#reduce
:::

## 版本号对比

### 方法一：字符串分割

<details><summary>点击查看</summary>

```js
var compareVersion = function (version1, version2) {

  const v1 = version1.split('.')
  const v2 = version2.split('.')

  for (let i = 0; i < v1.length || i < v2.length; i++) {
    let x = 0
    let y = 0

    if (x < v1.length) {
      x = parseInt(v1[i]);
    }

    if (y < v2.length) {
      y = parseInt(v2[i])
    }

    if (x > y) {
      return 1
    }
    if (x < y) {
      return -1
    }
  }

  return 0
}

```

</details>

### 方法二：双指针

<details><summary>点击查看</summary>

```js
var compareVersion = function (version1, version2) {
  const n = version1.length
  const m = version2.length

  let i = 0
  let j = 0

  while (i < n || j < m) {
    let x = 0
    for (i < n && version1[i] !== '.'; i++;) {
      // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
      x = x * 10 + version1[i].charCodeAt() - '0'.charCodeAt()
    }

    ++i; // 跳过点号

    let y = 0;
    for (; j < m && version2.charAt(j) !== '.'; ++j) {
      y = y * 10 + version2[j].charCodeAt() - '0'.charCodeAt();
    }

    ++j; // 跳过点号

    if (x !== y) {
      return x > y ? 1 : -1;
    }
  }
  return 0
}
```

</details>




