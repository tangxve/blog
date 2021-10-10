# 编程题

## 最全的手写JS面试题

[最全的手写JS面试题](https://juejin.cn/post/6968713283884974088#heading-2)

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

## 数据的 KEY 从下划线改为驼峰

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





