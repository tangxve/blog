# 编程题

## 数组降维 flat 方法
::: details 数组降维 flat 方法
<<< @/docs/fe/coding/coding.js#flat
:::

## 获取 Url 参数 getQueryString

## new 关键词方法
::: details new 关键词方法
<<< @/docs/fe/coding/coding.js#myNew
:::

###  add
- 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
- 以加法为例，现有远程API的模拟实现
::: details 题目
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
  :::
- 方法 1 `Promise.all` + `for` 循环
  ::: details add 方法1
  <<< @/docs/fe/coding/coding.js#add1
  :::

- 方法 2 `Promise.all` + `while` 循环
  ::: details add 方法2
  <<< @/docs/fe/coding/coding.js#add2
  :::
  

## 大数相加
::: details 大数相加
<<< @/docs/fe/coding/coding.js#bigNumAdd
:::

