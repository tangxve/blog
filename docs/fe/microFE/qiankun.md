# 微前端 qiankun

- [qiankun 3.0 Roadmap](https://github.com/umijs/qiankun/discussions/1378)
- [qiankun 的技术实现与选择](https://juejin.cn/post/6846687602439897101#heading-12)
- [qiankun 源码分析](https://juejin.cn/post/6844904115999342600)
- [qiankun 技术圆桌](https://www.yuque.com/kuitos/gky7yw)


## qiankun 与 Vite 问题
- 开发模式：在开发环境下，如果我们使用 `vite` 来构建 `vue3` 子应用，基于 vite 的构建机制，会在子应用的 `html` 的入口文件的 script 标签上携带 `type=module`。
  而我们知道 `qiankun` 父应用引入子应用，本质上是将html做为入口文件，并通过 `import-html-entry` 这个库去加载子应用所需要的资源列表Js、css，然后通过 `eval` 直接执行，而基于 `vite` 构建的 js 中 `import、export` 并没有被转码，会导致直接报错（不允许在非 type=module 的 script 里面使用 import）

- 生产模式：生产模式下，因为没有诸如 webpack 中支持运行时 `publicPath` ,也就是 `__webpack_public_path__` ，换句话说就是 vite 不支持运行时 `publicPath`，其主要作用是用来解决微应用动态载入的脚本、样式、图片等地址不正确的问题。

-  public 静态资源
- 主应用：publicPath：/main
- 子应用A：publicPath：/A
- 正常子应用的访问的静态资源是 `/A` 路径下，当被主应用加载后，回去 `/main` 下访问资源，这时候就拿不到资源

- vite 默认打包出来是 ESM 格式，目前 qiankun 需要拿到子应用的声明周期，采用的是 umd 格式

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

- [qiankun 源码分析](https://juejin.cn/post/6844904115999342600)
- [js css 加载和执行过程](https://segmentfault.com/a/1190000037747701)

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

1. 通过方法的形式传给子应用

2. npm 包

3. cdn 的方式引入，配置 webpack externals

4. webpack5 联邦模块：[微前端实践--webpack5模块联邦](https://juejin.cn/post/6963326546606030856)




## JS 沙箱隔离

- ES6 的 proxy，通过代理实现

## qiankun 的使用总结

1. js 沙箱并不能解决所有的 `js` 污染问题，例如使用 `onclick` 或 `addEventListener` 给 `<body>` 添加一个点击事件，js 沙箱并不能消除它的影响
2. `qiankun` 框架不太好实现 `keep-alive` 需求，因为解决 css/js 污染的办法就是删除子项目插入的 css 标签和劫持 window 对象， 卸载时还原成子项目加载前的样子，这与 keep-alive 相悖： keep-alive 要求保留这些，仅仅是样式上的隐藏。
3. 安全问题：
    1. qiankun 将每个子项目的 js/css 文件内容都记录在一个全局变量中，如果子项目过多，或者文件体积很大，可能会导致内存占用过多，导致页面卡顿。
    2. 另外，qiankun 运行子项目的 js，并不是通过 script 标签插入的，而是通过 eval 函数实现的，eval 函数的安全和性能是有一些争议的
4. 多页应用改造成功高
    1. 虽然 qiankun 支持 jQuery 老项目，但是似乎对多页应用没有很好的解决办法。每个页面都去修改，成本很大也很麻烦，但是使用 iframe 嵌入这些老项目就比较方便。


## 满足以下几点，你才确实可能需要微前端

1. 系统本身是需要集成和被集成的 一般有两种情况：
    1. 旧的系统不能下，新的需求还在来。
       没有一家商业公司会同意工程师以单纯的技术升级的理由，直接下线一个有着一定用户的存量系统的。而你大概又不能简单通过 iframe 这种「靠谱的」手段完成新功能的接入，因为产品说需要「弹个框弹到中间」
    2. 你的系统需要有一套支持动态插拔的机制。
       这个机制可以是一套精心设计的插件体系，但一旦出现接入应用或被接入应用年代够久远、改造成本过高的场景，可能后面还是会过渡到各种微前端的玩法。
2. 系统中的部件具备足够清晰的服务边界
    1. 通过微前端手段划分服务边界，将复杂度隔离在不同的系统单元中，从而避免因熵增速度不一致带来的代码腐化的传染，以及研发节奏差异带来的工程协同上的问题。 
