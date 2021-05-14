# vue 相关

## vue 初次渲染过程

`new vue` => `init` => `$mount` => `compile(编译)` => `render` => `vnode` => `patch` => `dom`

1. 初始化一个 vue 实例，以及一系列的相关环境（合并配置、生命周期、watcher 等等）

2. $mount：
    - 挂载元素会被替换了，vue 不能在 `body` 和 `html` 标签上
    -  Vue 的组件的渲染最终都需要 render 方法，是一个“在线编译”的过程；
    
3. compile(编译)：
    - 如果有 template 会将它编译成 render 函数
    - 扩展：vue 在挂载的时候会判断是否有 render 函数，如果有就不编译 template
    - 扩展：普通的 `.vue` 文件中最上面的 template 为什么优先于 render 函数 ？
    - `.vue` 文件的会经过处理的，在 webpack 编译阶段 `.vue` 文件经过 vue-loader 处理，
    把 template 标签在最终后被编译成 render 函数，然后添加在对象组件上，所以你运行组件时候其实只有render函数，并没有 template
    
4. 渲染 Watcher （挂载的时候添加的）
    - 给实例注册一个渲染 Watcher，渲染 watcher 拥有一个回调，该回调函数会在初始化和每次 vm 实例更新时触发
    - 初始化的时候会执行回调函数;
    - 当 vm 实例中的监测的数据发生变化的时候执行回调函数
     
5. render 过程
    - 利用 render 函数创建 vnode（在 render 过程中每一个模板节点（DOM 节点）都会生成对应的 _c，也就是执行 createElement 函数来创建 vnode）
    - 从根 vnode （root vnode）开始创建（处理一些边界值 textVnode（文本节点），emptyVnode（空节点）、注释节点 等等）
    - 摊平所有 children vnode 成一维数组`（children 拍平成一维数组就是为了建立好 tree 的数据结构，因为对于 tree 来说，每个节点的 children 就是一维数组）`
    - 最终生成一个 vnode tree
    
6. 开始执行 patch 过程 
    1. 调用 `createElement()` 判断当前节点是否是 tag（参数：`vnode`、`parentElm(父节点)` 等）
    2. 如果不是tag：就直接用 `createTextNode()` 创建 `文本 DOM` ，通过 `insert` 插入父 vnode
      
    3. 如果是 tag：生成 **当前 vnode 的占位符**，然后调用 `createChildren()` 创建子节点
    
    4. 每个节点的 children 就是一般是一维数组，然后循环调用 `createElement()`，也就是 步骤 1，递归
        - 也有元素的文本节点，通过 appendChild 直接插入节点
        
    5. `createChildren()` 执行完后，**创建当前 `vnode占位符` 的对应的 DOM 并把它插入父 vnode**
    
    6. 最后递归完成到该 `vnode占位符` 的渲染 vnode（组件的 root vnode 根节点，template标签下面的一级），并完成它的 patch。
    
    - patch 的递归过程是一个自上而下的过程，但是插入到 DOM 节点的顺序是自下而上，也就是子节点先插入，父节点后插入。

- createElement（render 函数的参数）
    - children 的规范化：遍历把 children 的节点变成一个一维的 vnode 数组
    - 把他们都标准化为数组，为了后续 patch 过程中统一处理遍历用的。
    - 对 tag 进行判断，如果是字符串类型，继续判断是否系统保留标签，如果是则直接创建一个普通 VNode
    - 如果是为已注册的组件名，则通过 createComponent 函数，创建一个组件类型的 VNode
    - 最终返回一个 VNode
    - render 函数是从最内层开始执行，函数的执行先对参数取值，也就是先执行 children


  
## vue 组件 patch 过程
[patch 流程](https://coding.imooc.com/learn/questiondetail/AKpB2XJAyRgYbv0E.html)

暂时理解：
简单的理解，组件化的实现过程就是一个递归 new Vue 的过程，
new Vue 后就是一个 init -> render -> patch 的过程，
而 patch 就是把 render 生成的 vnode 转换成真实 DOM 的过程，vnode 
又分普通的 vnode 和组件 vnode，patch 过程中遇到了组件 vnode，
就会根据这个组件 vnode 再次执行 new Vue 的过程。

## 响应式对象

### 设置响应式对象的流程

1. initData 的时候调用 `observe`，并把 data 传过去： `observe(data, true /* asRootData */)`
2. `observe` 方法一系列判断，然后创建一个 Observer 实例 `new Observer()`
    - 是否是对象、是否是 Vnode、
    - 对象有 `__ob__`属性：直接返回 `value.__ob__`
    - 没有 `__ob__`：则通过 def() 也就是 Object.defineProperty 添加不可以枚举 `__ob__` 属性 并把 this 赋值给他
3. Observer 类会区分 value 是数组或者对象，然后循环或递归调用 `defineReactive()` 函数，给对象添加 getter 和 setter
    - 如果发现子属性也为对象则会递归调用 observer 方法，第 2 步骤，把该对象变成响应式
4. `defineReactive()` 实际上调用 `Object.defineProperty` 方法，变成响应式也就是给对象添加 getter 和 setter
    - 如果有 `shallow` 参数，也就是有子属性，继续递归调用 observer 方法，先把子属性变成响应式的
    - 先子属性变成响应式，然后在当前属性，当前属性对子属性有依赖 `childOb`

### 依赖收集
- 依赖收集就是 订阅数据变化的 watcher 的收集
    - 在 $mount 时候调用 new Watcher 然后调用 vm._render()，所以会触发所有的 getter 
    ```javascript
    let  updateComponent = function () {
      vm._update(vm._render(), hydrating)
    }
    new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */)
    ```
- 在定义相应式对象的的 getter 函数里，触发 `dep.depend` 做依赖收集，
将获取属性的地方全部加入订阅者列表中，当数据发生变化时，通过遍历订阅者列表实现变更发布。

- 再次 render 时会先做依赖清除，再次进行新的依赖收集，这样做是为了处理v-if条件渲染的数据不用再派发更新了

>那么为什么需要做 deps 订阅的移除呢，在添加 deps 的订阅过程，已经能通过 id 去重避免重复订阅了。

>考虑到一种场景，我们的模板会根据 v-if 去渲染不同子模板 a 和 b，当我们满足某种条件的时候渲染 a 的时候，会访问到 a 中的数据，这时候我们对 a 使用的数据添加了 getter，做了依赖收集，
>那么当我们去修改 a的数据的时候，理应通知到这些订阅者。那么如果我们一旦改变了条件渲染了 b 模板，又会对 b 使用的数据添加了 getter，如果我们没有依赖移除的过程，那么这时候我去修改 a 模板的数据，会通知 a 数据的订阅的回调，这显然是有浪费的。
  
>因此 Vue 设计了在每次添加完新的订阅，会移除掉旧的订阅，这样就保证了在我们刚才的场景中，如果渲染 b 模板的时候去修改 a 模板的数据，a 数据订阅回调已经被移除了，所以不会有任何浪费，真的是非常赞叹 Vue 对一些细节上的处理。  

### 更新派发



## vue 组件通讯的方式有
1. props / $emit
    - 单向数据流
    - 父组件通过 props 的方式向子组件传递数据
    - 子组件通过 $emit 向父组件通讯

2. $parent / $children
    - 通过 $parent 和 $children 来访问组件的实例，拿到组件的实例可以访问组件的方法和 data

3. provide / inject （不能触发响应式）
[聊聊 Vue 中 provide/inject 的应用](https://juejin.cn/post/6844903989935341581)
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

复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，不会共享同一个data对象。

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

## keep-alive 是什么，实现原理 
- `keep-alive` 是 vue 内置抽象组件，在组件实例建立父子关系会被忽略
- 在它的函数钩子 created 阶段，定义了 caches 对象、keys 数组来缓存已经创建的 vnode
- keep-alive 还有一个 render 函数，渲染的时候，计算一个key，然后判断是否存在 cache 对象，
如果有就把缓存的vnode 插入到dom树，没有就把vnode 缓存到 caches 对象 
- 生命周期：activated（激活）、deacitvated（冻结）

- `inclue`：字符串或者正则表达式。只有名称匹配的组件会被缓存
- `exclue`: 字符串或者正则表达式。任何名称匹配的组件都不会被缓存。
- `max`: 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。


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
