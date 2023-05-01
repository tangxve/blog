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


/**
 * 静态方式实现 Storage
 * @constructor
 */
const Storage = function () {
  this.instance = null
}

Storage.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}

Storage.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}

Storage.getInstance = function () {
  if (!Singleton.instance) {
    Storage.instance = new Storage()
  }

  return Storage.instance
}

/**
 * 闭包方式实现 Storage
 * @constructor
 */
const Storage = function () {}

Storage.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}

Storage.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}

Storage.getInstance = function () {
  let instance = null

  return function () {
    if (!instance) {
      instance = new Storage()
    }

    return instance
  }
}


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




