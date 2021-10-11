# 学习 React 笔记

**react 17 的一些变化**

- 支持渐进式升级，逐步升级
    - 升级路由系统、在升级弹窗系统、一个模块一个模块的升级
- 事件委托机制改变
    - 17 版本之前会给dom添加 addEventListener() 事件处理
    - 17版本后，添加到虚拟 dom 的容器中，方便新旧版本交替
- 向浏览器原生事件靠拢
    - onScroll、onFocus、onBlur（失焦）
- 删除事件池
- useEffect 清理操作改为异步操作
    - 过去版本清除操作是同步的，会拖慢UI的渲染效率
    - 清理中会释放资源，不会产生UI阻塞的问题了
- jsx render 函数不能返回 undefined了
- 删除了一些私有 API，大部分是报漏给 RN 使用的，对前端页面开发没有影响

## State

### 初始化

- 生命周期第一阶段：初始化
- 构建函数 constructor 是唯一可以初始化 state 的地方

```js

class ShoppingCart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }
}
```

- state 只能通过 setState 修改状态

### State 的更新是异步的

- 调用 setState后，state不会立刻改变，是异步操作，`react 会优化操作，多个修改会合并成一次`
- 不能依赖当前的 State，计算下一个 state

## Props

props 就是传入函数的参数，是传入组件内部的数据。

由于 react 是单线数据流的，可以理解成从父组件传递向自组件的数据

### Immutable 直读属性

- 所有的 props 都是 **直读的（Immutable）**
- props 对象一旦创建就不可改变，只能通过销毁、重建来改变数据
- 通过判断内存地址是否一致，来确定对象是否有修改过（提高效率）
- 同思想的库：Redux、RxJS

## Event 事件处理机制

## Css 样式使用方式

- 直接引入整个 css 文件

```js
import './index.css'

<
div
className = "app" / >
```

容易造成全区污染

- css in js 模块化引入组件

```js
import styleEffects

'./index.css'

< div
className = { styles.app }
/>
```

标签的 class 名称是动态生产的，可能对调试造成麻烦

## setState 更新

- 调用 setState后，state不会立刻改变，是异步操作，`react 会优化操作，多个修改会合并成一次`
- 不能依赖当前的 State，计算下一个 state

### 1、setState 同步执行，异步更新视图

```js
// this.state.count = 0

this.setState({ count: this.state.count + 1 })

console.log('count:', this.state.count) // this.state.count = 0 

// dom 视图上会显示 count = 1
```

### 2、setState 第二个参数，异步回调

使用第二个参数，可以获取更新后的数据

```js
this.setState({ count: this.state.count + 1 }, () => {
  console.log('count:', this.state.count) // this.state.count = 1
})
```

### 3、多个 setState

由于 setState是异步操作的，如果使用多个 this.state，也是获取的同步数据，也就是上一个生命周期state，并没有更新

下面 2 个 setState 执行，最后也是以增量为 1 添加的

页面的只会增量加1

```jsx
<button onClick={ () => {
  this.setState({ count: this.state.count + 1 }, () => {
    console.log('count:', this.state.count) // this.state.count = 1
  })

  this.setState({ count: this.state.count + 1 }, () => {
    console.log('count:', this.state.count) // this.state.count = 1
  })
} }></button>
```

解决方法：第一个参数接受一个函数，获取上一个生命周期的 state

**第一个参数可以获取上一个生命周期的 state 和 Props**

```jsx
// this.state.count = 0

<button
  onClick={ () => {
    // 第一个参数可以获取上一个生命周期的 state 和 Props
    this.setState((preState, preProps) => {
      return { count: preState.count + 1 }
    }, () => {
      console.log('count:', this.state.count) // this.state.count = 2
    })

    this.setState((preState, preProps) => {
      return { count: preState.count + 1 }
    }, () => {
      console.log('count:', this.state.count) // this.state.count = 2
    })
  } }></button>
```

## 组件生命周期

- Mounting：组件第一次绘制，创建虚拟 DOM，渲染UI，完成组件的初始化
- Updating：更新虚拟 DMO，重新渲染UI，处理用户的交互，收集监听事件
- Unmounting：删除虚拟 DOM，移除UI，

### 初始化 Mounting

1. 创建构造函数,初始化 state

```jsx
class App extends React {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
}
```

2. 调用 `getDerivedStateFromProps`
    - 检查 state 和 props 是否有变化
3. render(): 渲染 UI
4. `componentDidMount`
    - 在组件创建好 dom 元素以后，挂载进页面的时候调用，只会调用一次
    - 一般请求接口在这里面调用

### 更新阶段 Updating

1. 调用 `getDerivedStateFromProps`
    - 检查 state 和 props 是否有变化
2. `shouldComponentUpdate` 判断组件是否需要更新，函数返回一个 布尔值
    ```js
    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return nextState.name !== this.state.name
    }
    ```
3. render: 渲染UI （如果需要更新）
4. `componentDidUpdate`
    - 组件更新后调用，UI重新渲染整个函数会被调用，处理组件更新以后的逻辑

### 销毁阶段 Unmounting

1. `componentWillUnmount` 组件销毁后调用
    - 这个函数可以回收各种监听以及事件，用来防止可能存在内存泄漏

## Hooks 钩子

- 消息处的一种理方法，用来监听指定程序
- 函数组件需要处理副作用，可以用钩子把外部代码'钩'进来
- 常用的钩子：useState、useEffect、useContext、useReducer
- hooks 一律使用 use 前缀命名：useXxx

### useEffect

不管什么情况，初始化阶段都会调用

1. 如果第二参数没有，每次任意 state 状态发生改变都会调用，初始化会调用
   1. 注意使用场景，不要这没有参数的情况下修改任意 state 有可能出现循环回调，系统卡死

```jsx {8}
import React, { useState, useEffect } from 'react'

const [count, setCount] = useState(0)
const [robotGallery, setRobotGallery] = useState([])

useEffect(() => {
  console.log('useEffect11111')
}) // 模拟 componentDidUpdate 
```

2. 第二参数如果是空数组[], 只会执行一次，类似于 `componentDidMount`
    - 一般用来请求接口

```jsx {9}
import React, { useState, useEffect } from 'react'

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => setRobotGallery(data))

  console.log('useEffect2222')
}, []) // 空数组相当于 componentDidMount
```

3. 第二个参数接收数组，值为 state，会监听任意 state 的变化，然后进行会回调执行（类似于 vue 的 watche）

```tsx {9}
import React, { useState, useEffect } from 'react'

const [count, setCount] = useState < number > (0)
const [robotGallery, setRobotGallery] = useState < any[] > ([])

useEffect(() => {
  document.title = '点击' + count
  console.log('useEffect3333')
}, [count])
```
