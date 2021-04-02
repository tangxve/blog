# new 的实现

一句介绍 new
> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一


## new 做了什么

- 创建了一个全新的对象

- 这个对象会被执行`[[Prototype]]`连接，也就是 `__proto__` 连接

- 生成的新对象会绑定到函数调用的 `this`

- 通过 new 创建的对象，最终被 `__proto__` 连接连接到这个函数的 `prototype` 对象上

- 如果构造函数没有返回对象类型 `Object`，如： `Functoin`, `Array`, `Date`, `RegExg`, `Error` 等，
那么 `new` 表达式中的函数调用会自动返回这个新的对象


## 模拟代码实现

**1. `new` 会创建的一个新的对象：** 
我们可以用 `new Object()` 创建一个新的对象：`obj`

**2. 新对象会具有构造函数的属性：** 
可以用继承的方法，使用` Person.apply(obj, arguments)` 来给 `obj` 添加新的属性

**3. 新对象会具有构造函数的原型（`prototype`）的属性：** 
我们知道实例的 __proto__ 属性会指向构造函数的 prototype，也正是因为这样的关系，实例可以访问原型上的属性

### 初次实现

```javascript
function newOperator() {
  
  var obj = new Object()
  
  var Constructor = [].shift.call(arguments)
  
  obj.__proto__ = Constructor.prototype
  
  Constructor.apply(obj, arguments)
  
  return obj
}
```

1. 用 `new Object()` 创建新的对象

2. 取出一个参数，就是我们传入的构造函数，此外使用 shft 会修改原来的数组，所以 `arguments` 会被取出第一个参数

3. 将 obj 的原始指向构造函数，这样 obj 就可以访问到 构造函数的原型中的属性了

4. 使用 apply 改变构造函数this的指向到新建的对象，这就就可以访问构造函数中的属性


### 返回值效果实现

- **构造函数返回一个对象**

::: tip 提示

如果构造函数返回一个对象，那么在实例只能访问到返回的对象中的属性.

如果返回一个基本类型的值，就不会影响
:::

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  
  return {
    returnName: name,
    say: '德玛西亚'
  }
}

Person.prototype.getName = function () {
  console.log('名字：', this.name)
}

var p1 = new Person('盖伦', 18)

console.log(p1.name)          // undefined
console.log(p1.age)           // undefined
console.log(p1.returnName)    // 盖伦
console.log(p1.say)           // 德玛西亚
console.log(p1.getName())     // p1.getName is not a function （报错）

```
如果构造函数没有返回对象类型 `Object`，如： `Functoin`, `Array`, `Date`, `RegExg`, `Error` 等，
那么 `new` 表达式中的函数调用会自动返回这个新的对象

- **构造函数返回基础类型**

基础类型返回值是正常的
```javascript
function Person(name, age) {
  this.name = name
  this.age = age
  
  return '德玛西亚'
}

Person.prototype.getName = function () {
  console.log('名字：', this.name)
}

var p1 = new Person('盖伦', 18)

console.log(p1.name)        // 盖伦
console.log(p1.age)         // 18
console.log(p1.getName())   // 名字： 盖伦

```

所以还要判断构造函数的返回值是不是一个对象，如果是一个对象，就返回这个对象，如果没有，该返回什么就什么

### 完整版代码

```javascript
function newOperator() {

  // 创建一个新的对象
  var obj = new Object()
  
  // 获取外部传入的构造函数，并且删除第一次参数
  var Constructor = [].shift.apply(arguments)
  
  // 用的 __proto__ 指向构造函数的原型，来获取原型的属性
  obj.__proto__ = Constructor.prototype
  
  // 继承构造函数的属性，并获取返回值
  var ret = Constructor.apply(obj, arguments)
  
  // 如果构造函数返回值是对象，就返回它，如果不是就返回 新对象
  return typeof ret === 'object' ? ret || obj : obj

}
```

#### 没有注释的


```javascript
function newOperator() {

  var obj = new Object()
  
  var Constructor = [].shift.apply(arguments)
  
  obj.__proto__ = Constructor.prototype
  
  var ret = Constructor.apply(obj, arguments)
  
  return typeof ret === 'object' ? ret || obj : obj

}
```

## 参考

[JavaScript深入之new的模拟实现 #13](https://github.com/mqyqingfeng/Blog/issues/13)
