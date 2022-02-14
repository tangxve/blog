# vue2+ts 路由钩子函数不生效

## 解决方法

方法1：通过 `Component.registerHooks` 全局注册，用于路由加载的页面组件

```ts
// main.js
import Component from 'vue-class-component'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
```

注册后可以正常使用：

```ts
// page.vue
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class page extends Vue {
  beforeRouteEnter(to: Route, from: Route, next: () => void): void {
    console.log(this, 'beforeRouteEnter');
    next();
  }

  beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
    console.log(this, 'beforeRouteUpdate');
    next();
  }

  beforeRouteLeave(to: Route, from: Route, next: () => void): void {
    console.log(this, 'beforeRouteLeave');
    next();
  }
}
```

::: tip

使用路由钩子函数 需要保证你的 使用钩子函数的组件 是通过路由加载的

:::

方法2：普通组件中使用

```js
// header.vue
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  beforeRouteEnter(to: Route, from: Route, next: () => void): void {
    console.log(this, 'beforeRouteEnter');
    next();
  },
  beforeRouteUpdate(to: Route, from: Route, next: () => void): void {
    console.log(this, 'beforeRouteUpdate');
    next();
  },
  beforeRouteLeave(to: Route, from: Route, next: () => void): void {
    console.log(this, 'beforeRouteLeave');
    next();
  },
})
```
