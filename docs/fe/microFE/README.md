# 微前端

- [可能是你见过最完善的微前端解决方案](https://tech.antfin.com/community/articles/536)
- [qiankun 的技术实现与选择](https://juejin.cn/post/6846687602439897101#heading-12)
- [qiankun 源码分析](https://juejin.cn/post/6844904115999342600)

## 为什么不用 iframe

[为什么不用 iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。

但他的最大问题也在于他的隔离性无法被突破，**导致应用间上下文无法被共享**，随之带来的开发体验、产品体验的问题。 

**iframe 导致的问题：**

- url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
- UI 不同步、DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..
- 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
- 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

> 其中有的问题比较好解决(问题1)，
>
> 有的问题我们可以睁一只眼闭一只眼(问题4)，
>
>但有的问题我们则很难解决(问题3)甚至无法解决(问题2)，
>
>而这些无法解决的问题恰恰又会给产品带来非常严重的体验问题， 最终导致我们舍弃了 iframe 方案。

## 微前端的价值

- **技术栈无关**：主框架不限制接入应用的技术栈，子应用具备完全自主权

- **独立开发、独立部署**：子应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

- **独立运行**：每个子应用之间状态隔离，运行时状态不共享

## qiankun 源码分析

[qiankun 源码分析](https://juejin.cn/post/6844904115999342600)

## CSS 隔离

### Shadow DOM
- 缺点：
  - 比如说你在使用一些弹窗组件的时候（弹窗很多情况下都是默认添加到了 document.body ）这个时候它就跳过了阴影边界，跑到了主应用里面，样式就丢了。
  - React 技术栈，而 React 事件代理其实是挂在 document 上的，它也会出一些问题

### scoped CSS
- experimentalStyleIsolation = true

```css
// 假设应用名是 react16
.app-main {
  font-size: 14px;
}

div[data-qiankun-react16] .app-main {
  font-size: 14px;
}
```

注意事项: 目前 @keyframes, @font-face, @import, @page 等规则不会支持 (i.e. 不会被改写)

### class 命名空间 （非官方）

- 在子应用的盒子上加一个class，子应用的样式都在这个 class 下


## 公共组件的处理

1、通过方法的形式传给子应用

2、npm 包

3、cdn 的方式引入，配置 webpack externals

4、webpack5 联邦模块：[微前端实践--webpack5模块联邦](https://juejin.cn/post/6963326546606030856)




## JS 沙箱隔离

- ES6 的 proxy，通过代理实现
