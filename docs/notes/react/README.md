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

1、直接引入整个 css 文件：

```jsx
import './index.css';

<div className="app">< /div>
```

容易造成全区污染

- css in js 模块化引入组件

```jsx
import style from './index.css';

<div className={ styles.app }></div>
```

标签的 class 名称是动态生产的，可能对调试造成麻烦

## setState 更新

- 调用 setState后，state不会立刻改变，是异步操作，`react 会优化操作，多个修改会合并成一次`
- 不能依赖当前的 State，计算下一个 state

### 1、setState 同步执行，异步更新视图

dom 视图上会显示 count = 1, 视图会异步更新

```js{6,8}
// state 伪代码 
this.state.count = 0;

this.setState({ count: this.state.count + 1 });

console.log('count:', this.state.count); // this.state.count = 0 

// dom 视图上会显示 count = 1, 视图会异步更新
```

### 2、setState 第二个参数，异步回调

使用第二个参数，可以获取更新后的数据

```jsx{5}
// state 伪代码 
this.state.count = 0;

this.setState({ count: this.state.count + 1 }, () => {
  console.log('count:', this.state.count) // this.state.count = 1
})
```

### 3、多个 setState

由于 setState是异步操作的，如果使用多个 this.state，也是获取的同步数据，也就是上一个生命周期state，并没有更新

下面 2 个 setState 执行，最后也是以增量为 1 添加的

**视图页面的只会增量加 1**

```jsx{7,11}
// state 伪代码 
this.state.count = 0;

// 业务 伪代码
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

**第一个参数可以获取上一个生命周期的 state 和 Props**：`preState`, `preProps`

`每次点击执行 2 个 setState，最后的结果 this.state.count 每次会 + 2`

```jsx{4,8,11,15,17}
// state 伪代码 
this.state.count = 0;

// 每点击一次 this.state.count + 2，拿到的结果会是 2 / 4 / 6
<button
  onClick={ () => {
    // 第一个参数可以获取上一个生命周期的 state 和 Props
    this.setState((preState, preProps) => {
      return { count: preState.count + 1 }
    }, () => {
      console.log('count:', this.state.count) // this.state.count = 2 / 4 / 6
    })

    this.setState((preState, preProps) => {
      return { count: preState.count + 1 }
    }, () => {
      console.log('count:', this.state.count) // this.state.count = 2 / 4 / 6
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

## useEffect 副作用

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

const [count, setCount] = useState<number>(0)
const [robotGallery, setRobotGallery] = useState<any[]>([])

useEffect(() => {
  document.title = '点击' + count
  console.log('useEffect3333')
}, [count])
```

### useEffect 处理 异步

useEffect 只支持返回一个函数，不能使用 async，async 返回一个 promise

解决方法： 在声明一个 异步函数 fetchData

```js
  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    setRobotGallery(data)
  }

  fetchData()
}, [])
```

## useContext 全局数据传递

### 声明

1. 通过 `React.createContext` 声明并导出,可以声明函数或对象
2. 添加 `<xxxxx.Provider>` 关键标签 `value` 属性传递

```jsx {4,5,12,13,15,16}
// AppState.jsx 文件
const defaultContextValue = { username: '德玛西亚' }

export const appContext = React.createContext(defaultContextValue)
export const appSetStateContext = React.createContext(undefined)

export const AppStateProvider = (props) => {

  const [state, setState] = useState(defaultContextValue)

  return (
    <appContext.Provider value={ state }>
      <appSetStateContext.Provider value={ setState }>
        { props.children }
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}
```

### 使用

1. import 引入 数据
2. 使用 `useContext`

```jsx {2,6,8}
import React, { useContext } from 'react'
import { appContext, appSetStateContext } from '../AppState'

export const withAddToCart = (ChildComponent) => {
  return (props) => {
    const defaultContext = useContext(appContext)   // => { username: '德玛西亚' }

    const setState = useContext(appSetStateContext) // => undefined
  }
}

```

## 自定义 hooks

- `hook` 是函数
- 命名以 `use` 开头
- 内部可调用其他 `hook` 函数
- 并非 `React` 的特性

```jsx
import React, { useContext } from 'react'
// 命名以 use 开头
export const useAddToCart = () => {
  // 内部可以调用其他 hook 函数
  const setState = useContext(appSetStateContext)
  // 复用逻辑
  const addToCart = () => {
    console.log('加入购物车，我是复用逻辑')
  }
  return addToCart
}
```

## 高阶组件 HOC

**高阶组件是参数为组件，返回值为新组件的函数。**

一般用来封装复用的逻辑

业务场景： 1、普通商品卡片 2、打折商品卡片 3、拥有复用的页面逻辑：加入购物车

- 编写高阶组件

```jsx
// AddToCart.jsx
import React from 'react'

export const withAddToCart = (ChildComponent) => {
  // 复用逻辑
  const addToCart = () => {
    console.log('加入购物车，我是复用逻辑')
  }
  return (props) => { // props 是业务中默认传递
    return <ChildComponent { ...props } addToCart={ addToCart } />
  }
}

```

- 使用高阶组件：

普通商品组件：

```jsx
// Robot 组件
import { withAddToCart } from './AddToCart'

const Robot = ({ name, id, addToCart }) => {
  const value = useContext(appContext)
  return (
    <div>
      <h2>{ name }</h2>
      <p>{ id }</p>
    </div>
  )
}
export default withAddToCart(Robot)
```

打折商品组件：

```jsx
// RobotDiscount 组件
import { withAddToCart } from './AddToCart'

const RobotDiscount = ({ name, id, addToCart }) => {
  const value = useContext(appContext)
  return (
    <div>
      <h2>打折商品</h2>
      <h2>{ name }</h2>
      <p>{ id }</p>
    </div>
  )
}
export default withAddToCart(RobotDiscount)
```

业务中使用：

```jsx
// 正常商品
<Robot name={ 'name' } id={ 'id' } />
// 打折商品
<RobotDiscount name={ 'name' } id={ 'id' } />
```

### 命名规范

一般以 with 开头

`withXxxx` ==> `withAddToCart`

## 遇到的问题

### 在使用 `Menu` 组件嵌套时，要注意 组件的 `Key` 值的唯一

下面代码只有一级 Menu 组件的key 是唯一；二三级都会存在重复的

```tsx
export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {sideMenuList.map((m, i) =>
        <Menu.SubMenu
          key={`side-menu-${i}`} title={m.title}>
          {m.subMenu.map((sm, smindex) =>
            <Menu.SubMenu
              key={`sub-menu-${smindex}`} title={sm.title}>
              {sm.subMenu.map((sms, smsIndex) =>
                <Menu.Item key={`sub-sub-menu-${smsIndex}`} title={sms} />
              )}
            </Menu.SubMenu>
          )}
        </Menu.SubMenu>
      )}
    </Menu>
  )
}
```

解决方法：

遇到 树形结构时，如果没有唯一 id，要注意key 的使用，可以借助父级的 key

1.一级 menu：key = mIndex

1.1 二级 subMenu：key = mIndex_smIndex

1.1.1 三级 subSubMenu: key = mIndex_smIndex_smsIndex

```tsx
export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {sideMenuList.map((m, mIndex) =>
        <Menu.SubMenu key={`side-menu-${mIndex}`} title={m.title} icon={<FireOutlined />}>
          {m.subMenu.map((sm, smIndex) =>
            <Menu.SubMenu key={`sub-menu-${mIndex}_${smIndex}`} title={sm.title} icon={<GifOutlined />}>
              {sm.subMenu.map((sms, smsIndex) =>
                <Menu.Item key={`sub-sub-menu-${mIndex}_${smIndex}_${smsIndex}`} title={sms} icon={<GiftFilled />} />
              )}
            </Menu.SubMenu>
          )}
        </Menu.SubMenu>
      )}
    </Menu>
  )
}

```

## 路由 react-router

其实安装是 react-router-dom

`npm install react-router-dom`

提供了 `BrowserRouter`、`HashRouter`、`Route`、`Switch`、`Link` 等组件

- `<Link />` 组件可以渲染出 `<a/>` 标签
- `<BrowserRouter />` 组件利用 H5 API 实现路由切换
- `Switch` 切换页面，会对路径做短路处理，每次只渲染一个单独页面，消除页面堆叠影响
- `Route` 路径组件，会页面堆叠，从上到下匹配路径并渲染页面。没有匹配到就是空页面（可以用来做404页面）
- `<HashRouter/ >` 组件利用原生 js 中的 `window.location.hash` 来实现路由切换

网站系统的要求

- 路由导航与原生浏览器操作一样：使用 `<BrowserRouter />`
- 路由的路径解析原来与原生浏览器一样，可以自动识别 url 路径：使用 `<Route />`
- 路径的切换以页面为单位，不要页面堆叠：使用 `<Switch />`

基础路由组成：`<BrowserRouter />` + `<Switch />` + `<Route />`

### 添加 types 文件

::: tip

只参与开发过程中使用依赖安装到 devDependencies 下，这些打包后不会影响代码的体积变大

:::

`@types/react-router-dom` 只会在开发环境使用，实际运行并不需要，要安装在 devDependencies 下

不会参与最后的发布，这样打包后的体积会缩小，如果体积变大，用户打开网站时间也会变长

### Route 组件

匹配页面

下面这种场景 会吧2个 路径的组件，同时渲染到一个页面上

```tsx
<BrowserRouter>
  <Route path={'/'} component={HomePage} />
  <Route path="/signIn" render={() => <h1>登录</h1>} />
</BrowserRouter>
```

添加 exact 属性，精准匹配

exact：告诉 route 组件，有且仅有以 **路径** 一模一样的时候才做页面的匹配，负责继续执行下面的代码

```tsx {2}
<BrowserRouter>
  <Route exact path={'/'} component={HomePage} />
  <Route path="/signIn" render={() => <h1>登录</h1>} />
</BrowserRouter>
```

Route 组件会给 component 的 props 属性 传递 路由信息：history、location、match 等

路由文件

```tsx {2}
<BrowserRouter>
  <Route exact path={'/'} component={HomePage} />
</BrowserRouter>
```

HomePage 文件：

```tsx{3}
import React from 'react'
export const HomePage: React.FC = (props) => {
  console.log(props) // history、location、match 等路由信息
  return (
    <h1>HomePage</h1>
  )
}

```

### Switch 组件

会优先渲染匹配到路径，如果配置了 `根路径 '/'` ，会优先渲染到 `根路径 '/'` 上

根路径：`'/'`

路径a：`'/a'`

路径b：`'/b'`

url：`'xxx.com/b'` 这种情况也会匹配到 `根路径 '/'`

配合 exact 使用：

```tsx{4,8}
<BrowserRouter>
  <Switch>
    {/* 匹配顺序 从上到下 一次匹配 */}
    <Route exact path={'/'} component={HomePage} />
    <Route path="/signIn" render={() => <h1>登录</h1>} />
    <Route path="/test" render={() => <h1>test</h1>} />
    {/* 404 页面 什么路径都没有匹配到 */}
    <Route render={() => <h1> 404 页面没有找到</h1>} />
  </Switch>
</BrowserRouter>
```

### 完整路由

```tsx
import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages'

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          {/* 匹配顺序 从上到下 一次匹配 */}
          <Route exact path={'/'} component={HomePage} />
          <Route path="/signIn" render={() => <h1>登录</h1>} />
          <Route path="/test" render={() => <h1>test</h1>} />
          {/* 404 页面 什么路径都没有匹配到 */}
          <Route render={() => <h1> 404 页面没有找到</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

```

## 路由之间的跳转方法

- 高阶组件 `withRouter`
- Hooks 的方法：`useHistory`, `useParams`, `useRouteMatch`, `useLocation`
- Link 组件

### 高阶组件方法

高阶组件方法：`react-router-dom` 自己提供的 高阶组件 `withRouter`

`withRouter` 会向组件的 props 提供 `history`, `match`, `location` 等属性

利用 `history.push()` 可以跳转

```tsx{10,13,17}
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface PropsType extends RouteComponentProps {
  imageSrc: string
  title: string
}

export const ProductImageCompoent: React.FC<PropsType> = ({
  imageSrc, title, // 业务本身的 props
  history, match, location  // withRouter 提供的 props
}) => {
  return (
    <div onClick={() => history.push(`/detail/${id}`)}></div>
  )
}

export const ProductImage = withRouter(ProductImageCompoent)
```

### Hooks 的方法

Hooks 的方法：`react-router-dom` 自己提供的hooks方法：`useHistory`, `useParams`, `useRouteMatch`, `useLocation`

利用 `history.push()` 可以跳转

```tsx{4-7,11-12}
import { useHistory, useParams, useRouteMatch, useLocation } from 'react-router-dom'

export const Header: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const params = useParams()
  const location = useLocation()

  return (
    <div className={styles['app-header']}>
      <Button onClick={() => history.push('/register')}>注册</Button>
      <Button onClick={() => history.push('signIn')}>登陆</Button>
    </div>
  )
}
```

### Link 组件

使用 Link 组件：

1. 节省代码，避免手动对导航栈进行处理
2. 会别 a 标签包裹，可以使用a标签的一些特性，比如右击打开新的页面

```tsx{1,5,7}
import { Link } from 'react-router-dom'

export const ProductImageCompoent: React.FC<PropsType> = ({ id, imageSrc, }) => {
  return (
    <Link to={`/detail/${id}`}>
      <Image src={imageSrc} height={285} width={490} />
    </Link>
  )
}
```

**Link 组件的原理：**

- 组件 props 接受  `children` , `to` 2个属性
- 使用 a 标签包裹 `children`
- 引入 `useHistory` hooks
- a 标签 使用 `useHistory` 的 push 方法

```tsx
import React from 'react'
import { useHistory } from 'react-router-dom'

interface LinkProps {
  to: string
}

const Link: React.FC<LinkProps> = ({ children, to }) => {
  const history = useHistory()
  return (
    <a href={to} onClick={() => history.push(to)}>
      {children}
    </a>
  )
} 
```

## Redux 通讯

### Redux 原理

- 剥离组件数据（state）
- 数据统一放在 store 中
- 组件订阅 store 获得数据
- store **同步** 推送数据更新

Redux 统一保存数据，在隔离了数据与UI的同时，负责处理数据的绑定


### 什么时候需要使用 Redux

- 组件需要共享数据（状态 state）的时候
- 某个状态需要在任何地方都可以随时访问的时候（用户登录的全局数据共享）
- 某个组件需要改变另外一个组件状态的时候
- 场景：语言切换、黑暗模式切换、用户登录数据全局共享


### 简单的 Redux 工作流
