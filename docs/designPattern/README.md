# JavaScript 设计模式核⼼原理

## 核心思想

### 设计模式的核心思想——封装变化

设计模式出现的背景，是软件设计的复杂度日益飙升。软件设计越来越复杂的“罪魁祸首”，就是**变化**。

业务的迭代和优化，都是变化，要考虑代码的可维护性、可扩展性

我们能做到只有将这个变化造成的影响做到：**最小化——将变化与不变分离，确保变化的部分灵活、不变的部稳定**

这个过程就是：`封装变化`；这样的代码，就是所谓的健壮代码，它可以经得起变化的考验。而设计模式出现的意义，就是帮我们写出这样的代码。

## 分类

将23种设计模式按照`创建型`、`行为型`和`结构型`进行划分

- 创建型模式：封装了创建对象过程中的变化，比如工厂模式，它做的事情就是将创建对象的过程抽离；
- 结构型模式：封装了对象之间组合方式的变化，目的在于灵活表达对象间的配合与依赖关系；
- 行为型模式：封装对象千变万化的行为进行抽离，确保我们能够更安全、更方便的对行为惊喜更改；

创建型：

- 单利模式
- 原型模式
- 构造器模式
- 工厂模式
- 抽象工厂模式

结构型：

- 桥接模式
- 外观模式
- 组合模式
- 装饰器模式
- 适配器模式
- 代理模式
- 亨元模式

行为型：

- 迭代器模式
- 解释器模式
- 观察者模式
- 中介者模式
- 访问者模式
- 状态模式
- 备忘录模式
- 策略模式
- 模版方式模式
- 指责链模式
- 命令模式

## 单例模式

保证一个类仅有一个实例，并提供一个访问它的全局问点。

### 单例模式案例

- 全局弹窗
- 全局缓存
- 浏览器中的 window 对象

### 实现一：面向对象

```js
// 单例模式实现：面向对象
const Singleton = function (name) {
  this.name = name
  this.instance = null;
}

Singleton.prototype.getName = function () {
  return this.name
}

// 静态访问，每次创建构造函数创建实例，都会调用
Singleton.getInstance = function (name) {
  // 判断是否创建过一个实例，如果实例不存在，那么先创建它
  if (!Singleton.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

const instance1 = Singleton.getInstance('aaa')
const instance2 = Singleton.getInstance('bbb')
console.log(instance1 === instance2)  // true

const s1 = new Singleton('aaa')
const s2 = new Singleton('bbb')
console.log(s1.getName()) // aaa
console.log(s2.getName()) // bbb
```

### 单例实现方式：闭包

```js
// 闭包方式实现
const Singleton = function (name) {
  this.name = name
}

Singleton.prototype.getName = function () {
  return this.name
}

Singleton.getInstance = function (name) {
  let instance = null
  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
}


const instance1 = Singleton.getInstance('aaa')
const instance2 = Singleton.getInstance('bbb')
console.log(instance1 === instance2)  // true
```

### 面试-实现单例 Storage

> 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。


**静态方法 实现 Storage：**

<details><summary>点击查看</summary>

```js
const Storage = function () {
  this.instance = null
}

Storage.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}

Storage.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}
Storage.instance = function () {
  if (!Singleton.instance) {
    Storage.instance = new Storage()
  }

  return Storage.instance
}
```

</details>




**闭包方式 实现 Storage：**

<details><summary>点击查看</summary>

```js

/**
 * Modal 闭包方式实现全局弹窗
 * @returns {function(): null|string|*}
 * @constructor
 */
const Modal = function () {
  this.model = null
  return function () {
    if (!this.model) {
      modal = document.createElement('div')
      modal.innerHTML = '我是一个全局唯一的 Modal'
      modal.id = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
    }

    return this.model
  }
}

Modal.prototype.open = function () {
  this.modal.style.display = 'block'
}
Modal.prototype.close = function () {
  this.modal.style.display = 'node'
}

// 点击打开按钮展示模态框
document.getElementById('open').addEventListener('click', function () {
  // 未点击则不创建 modal 实例，避免不必要的内存占用;
  // 此处不用 new Modal 的形式调用也可以，Mode.open() 也可以
  const modal = new Modal()
  modal.open()
})


// 点击关闭按钮隐藏模态框
document.getElementById('close').addEventListener('click', function () {
  const modal = new Modal()
  modal && modal.close()
})


```

</details>



## 观察者模式


### 观察者模式与发布-订阅模式的区别是什么？

- 观察者模式：发布者直接触及到订阅者的操作，叫观察者模式 
- 发布-订阅模式：发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，叫做发布-订阅模式。

观察者模式和发布-订阅模式之间的区别，在于是**否存在第三方、发布者能否直接感知订阅者**


- 观察者模式：解决的其实是模块间的耦合问题，但观察者模式仅仅是减少了耦合，并没有完全地解决耦合问题

- 发布-订阅模式：完全解耦，两个模块直接没有关联，发布者完全不需要感知订阅者。




