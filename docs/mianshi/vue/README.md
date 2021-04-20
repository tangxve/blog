# vue 相关

## vue 初次渲染过程

`new vue` => `init` => `$mount` => `compile(编译)` => `render` => `vnode` => `patch` => `dom`

## vue 组件通讯的方式有
1. props / $emit
    - 单向数据流
    - 父组件通过 props 的方式向子组件传递数据
    - 子组件通过 $emit 向父组件通讯

2. $parent / $children
    - 通过 $parent 和 $children 来访问组件的实例，拿到组件的实例可以访问组件的方法和 data

3. provide / inject （不能触发响应式）
    - provide 提供变量
    - inject 来注入 provide 变量
    - 不管子组件调用嵌套有多深，只要调用了inject 那么就可以注入provide中的数据，
    而不局限于只能从当前父组件的props属性中回去数据
    
4. ref / refs
    - ref 绑定 组件
    - refs 访问绑定的组件的实例

5. vuex
    - 待定
6. $attrs / $listeners
    - 待定

## vue 的 计算属性 VS 监听属性
**计算属性**
- 计算属性被访问的时触发 getter 函数，执行用户返回的计算结果，
如果返回值发生来变化才触发更新（有缓存，依赖发生变化才执行）

- 依赖属性更新：计算属性会成为，依赖属性的订阅者，依赖变量发生变化改变则触发计算属性重新计算

- 计算属性有 lazy 和 active两种模式，active模式依赖更新立即计算，lazy模式依赖变化仅设置this.dirty = true，等访问计算属性时再重新计算，并加入缓存。

**监听属性**
- 监听属性相当于主动订阅了属性的变化，属性发生变化时执行回调函数
- 监听属性的watcher执行优先级高于渲染watcher；
- deep 设置为 true 用于监听对象内部值的变化
- immediate 设置为 true 将立即以表达式的当前值触发回调

## vue 的 data 为什么是一个函数
- vue 为了保证每个实例上的 data 数据的独立性，规定了必须使用函数，而不是对象。
- 每个 vue 组件就是 vue 一个实例，vue 的 data 数据是 vue 原型上的属性
- 如果是对象，多个 data 引用是同一个内存地址，数据共享
- 使用函数后，data() 函数的 this 指向就是当前实例本身
- [参考](https://www.imqianduan.com/vue/192.html)

## vue 中 props、data、computed 加载顺序

`props` ==> `methods` ==> `data` ==> `computed` ==> `watch`

vue 中的源码
```javascript
function initState(vm) {
  vm._watchers = []
  var opts = vm.$options
  if (opts.props) { initProps(vm, opts.props) }
  if (opts.methods) { initMethods(vm, opts.methods) }
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) { initComputed(vm, opts.computed) }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
- computed 在 data 之后，所以不要在 data 中引用 computed 中的属性，只能得到 undefined。
- data 可以调用 前面的 props、methods 的属性
- computed 中可以调用 props，methods，data 中的属性

| 类型       | 加载顺序 |加载时间 | 写法 | 作用 | 备注 |
| --------  | ---     | --- | --- | --- | --- |
| props     | 1 |beforeCreated, created 之间| 对象或数组| 接收父组件传递的值| |
| method    | 2 |beforeCreated, created 之间| 函数     | 提供相对复杂的数据计算和逻辑| |
| data      | 3 |beforeCreated, created 之间| 对象或数组| 定义和初始化数据| |
| computed  | 4 |beforeCreated, created 之间| 函数     | 提供相对简单的数据计算| |

##  vue 对应响应式环数据的处理？todo

data 里面声明了一个 a，引用了 dta 里面的 b


## vue template 怎么理解
vue 的模版语法，是一种描述视图的标记语言，通过 vue 的 vue-template-compiler 解析成 render 函数，
再通过 vnode 加上 diff 算法统一替换 dom 形成证实的视图，所以 vue 和 react 在本质上类似。
也就是说 vue 也可以和 react 一样通过 jsx 来描绘视图，不同的是 vue 提高了一套更符合前端思维的标记语言

生成jsx的语法糖，主要是用来生成描述页面的对象

## vue-router
 
**原理：**
1. 当用户执行 Vue.use(VueRouter) 的时候，实际上就是在执行 install 函数
    - 为 vue 的原型上注入 router 
    - mixin beforeCreate
    - 将router-link、router-view组件注册为vue全局组件
2. router 安装最重重要的一步是利用 vue.mixin 方法，把 beforeCreate 和 destroyed 钩子函数注入到每一个组件中。

3. 然后 根 vue 实例同时，会调用 beforeCreate 钩子，这里面执行
    - 调用 Vue.util.defineReactive 方法，把 router 变成响应式对象。（主要的）
    - 然后赋值 _router，这样原型上就可以访问 $router
    - 然后执行 _router.init() 初始化 router
    
4. 当 hash 或 history 更新后都触发 $router 的更新机制，调用实例的 vm.render() 方法进行重新渲染

**hash 模式**

使用 window.location.hash 属性，以及 onhashchange 事件，可以实现监听浏览器地址 hash 值的变化，执行相应的js切换页面

**history 模式**

服务端 需要配置所有的路由都要重定向到根页面

nginx 配置到 根路径下面（qiankun 遇到过）

- H5的新API，pushState 和 replaceState 通过这两个 API 改变url地址不会发送请求。
- 同时还有 popstate 事件


## vuex
vuex的核心原理就是：
1. 在install阶段调用了 Vue.mixin() 方法，利用钩子函数 beofreCreate 给所有组件注册 $stroe，这样
在所有的页面上都能获取到this.$stroe的属性；

2. 使用 resetStoreVM 方法生成了一个新的 vue 实例。
    - 并且把这个实例赋值给 store.vm
    - 接下来又给这个实例的 data 上，赋值了 $$state 属性
    - $$state 的值就是 state，也就是我们定义到 state 上的数据
    - 这样就保证了 state 上的数据被监控了，所以 state 里边的属性发生变化时，视图会更新;
    
当我们获取state上的数据的时候，实际上调用了stroe里的this._vm.data.$$state
```javascript
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed
})
get state () {
  return this._vm._data.$$state
}
```

## 为什么循环的时候要加上key

- 加上key之后，当数据再次更新，新旧虚拟 dom 进行 diff 算法对比的时候，
- 如果发现 key 相同的两组 Vnode，就可以直接拿来复用，
- 而不用删除就节点后在创建新节点，提高 diff 算法效率


## Virtual（虚拟） Dom 的优势在哪里？

首先：
- dom 引擎、js 引擎是相互独立的，但又在同一个线程里面（主线程）
- js 代码调用 dom API 必须挂起 js 引擎，
- 传入参数数据等、然后 dom 引擎激活，DOM 重绘后可能与返回值
- 然后在激活 JS 引擎并继续执行类似频繁的 DOM API调用
- 且浏览器厂商做批量优化处理
- 引擎之前的频繁切换，若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会增加更大的性能消耗


其次是 VDOM 和真实 DOM 的区别和优化：

1. 虚拟 DOM 不会立马进行排版和重绘操作

2. 虚拟 DOM 进行频繁修改后，然后一次性的比较并修改 DOM 中需要改的部分，
最后在真实 DOM 中进行排版与重绘，减少过多的 DOM 节点排版和重绘消耗

3. 虚拟 DOM 有效的降低大面积真实 DOM 的重绘和排版，因为最后与真实 DOM 比较差异，可以只渲染局部

## 总结 diff 算法的过程 todo 
- 新旧节点不同：创建新节点 => 更新节点占位符 => 删除旧节点
- 

## 说下 vue 对 diff 算法做了那些优化 todo
