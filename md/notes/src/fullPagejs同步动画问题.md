# fullPage 插件 afterLoad 钩子执行时机

[fullPage.js 全屏滚动插件](https://alvarotrigo.com/fullPage/zh/)

## 场景

1. 当前页面加载完成，执行页面上的动画
2. 动画有多个，在动画没有执行完前，页面不能滚动

## 实现

- 利用 `afterLoad` 钩子执行动画
- 利用 `onLeave` 钩子限制当前页面滚动
- `afterLoad`： 滚动结束之后，一旦加载了 section ，就会触发回调。
- `onLeave`： 一旦用户离开 section ，过渡到新 section ，就会触发此回调。 返回 `false` 将在移动发生之前取消移动。

::: details 查看代码

<<< @/docs/notes/src/fullPage.js

:::

::: tip

但是这里有个问题，当用户滑动太快的时候 `afterLoad` 钩子不会执行

因为此时的 section 还没有加完成，只是滚动结束

:::


### 修改问题

可以利用 `onLeave` 方法做判断，在 section 时候就会触发，把开关打开

::: details 改正代码

<<< @/docs/notes/src/fullPage1.js{36}

:::




