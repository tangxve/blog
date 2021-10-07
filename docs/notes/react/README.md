# 学习 React 笔记

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

<div className="app" />
```

容易造成全区污染

- css in js 模块化引入组件
```js
import styles './index.css'

<div className={styles.app} />
```

标签的 class 名称是动态生产的，可能对调试造成麻烦

