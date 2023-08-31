import{_ as a,c as e,o as l,S as n}from"./chunks/framework.9c4db3f7.js";const k=JSON.parse('{"title":"微前端 qiankun","description":"","frontmatter":{},"headers":[],"relativePath":"fe/microFE/qiankun.md","filePath":"fe/microFE/qiankun.md","lastUpdated":1693475307000}'),s={name:"fe/microFE/qiankun.md"},i=n(`<h1 id="微前端-qiankun" tabindex="-1">微前端 qiankun <a class="header-anchor" href="#微前端-qiankun" aria-label="Permalink to &quot;微前端 qiankun&quot;">​</a></h1><ul><li><a href="https://tech.antfin.com/community/articles/536" target="_blank" rel="noreferrer">可能是你见过最完善的微前端解决方案</a></li><li><a href="https://juejin.cn/post/6846687602439897101#heading-12" target="_blank" rel="noreferrer">qiankun 的技术实现与选择</a></li><li><a href="https://juejin.cn/post/6844904115999342600" target="_blank" rel="noreferrer">qiankun 源码分析</a></li><li><a href="https://www.yuque.com/kuitos/gky7yw" target="_blank" rel="noreferrer">qiankun 技术圆桌</a></li></ul><h2 id="qiankun-与-vite-问题" tabindex="-1">qiankun 与 Vite 问题 <a class="header-anchor" href="#qiankun-与-vite-问题" aria-label="Permalink to &quot;qiankun 与 Vite 问题&quot;">​</a></h2><ul><li><p>开发模式：在开发环境下，如果我们使用 <code>vite</code> 来构建 <code>vue3</code> 子应用，基于 vite 的构建机制，会在子应用的 <code>html</code> 的入口文件的 script 标签上携带 <code>type=module</code>。 而我们知道 <code>qiankun</code> 父应用引入子应用，本质上是将html做为入口文件，并通过 <code>import-html-entry</code> 这个库去加载子应用所需要的资源列表Js、css，然后通过 <code>eval</code> 直接执行，而基于 <code>vite</code> 构建的 js 中 <code>import、export</code> 并没有被转码，会导致直接报错（不允许在非 type=module 的 script 里面使用 import）</p></li><li><p>生产模式：生产模式下，因为没有诸如 webpack 中支持运行时 <code>publicPath</code> ,也就是 <code>__webpack_public_path__</code> ，换句话说就是 vite 不支持运行时 <code>publicPath</code>，其主要作用是用来解决微应用动态载入的脚本、样式、图片等地址不正确的问题。</p></li><li><p>public 静态资源</p></li><li><p>主应用：publicPath：/main</p></li><li><p>子应用A：publicPath：/A</p></li><li><p>正常子应用的访问的静态资源是 <code>/A</code> 路径下，当被主应用加载后，回去 <code>/main</code> 下访问资源，这时候就拿不到资源</p></li><li><p>vite 默认打包出来是 ESM 格式，目前 qiankun 需要拿到子应用的声明周期，采用的是 umd 格式</p></li></ul><h2 id="为什么不用-iframe" tabindex="-1">为什么不用 iframe <a class="header-anchor" href="#为什么不用-iframe" aria-label="Permalink to &quot;为什么不用 iframe&quot;">​</a></h2><p><a href="https://www.yuque.com/kuitos/gky7yw/gesexv" target="_blank" rel="noreferrer">为什么不用 iframe</a></p><p>iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。</p><p>但他的最大问题也在于他的隔离性无法被突破，<strong>导致应用间上下文无法被共享</strong>，随之带来的开发体验、产品体验的问题。</p><p><strong>iframe 导致的问题：</strong></p><ul><li>url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。</li><li>UI 不同步、DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..</li><li>全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。</li><li>慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。</li></ul><blockquote><p>其中有的问题比较好解决(问题1)，</p><p>有的问题我们可以睁一只眼闭一只眼(问题4)，</p><p>但有的问题我们则很难解决(问题3)甚至无法解决(问题2)，</p><p>而这些无法解决的问题恰恰又会给产品带来非常严重的体验问题， 最终导致我们舍弃了 iframe 方案。</p></blockquote><h2 id="微前端的价值" tabindex="-1">微前端的价值 <a class="header-anchor" href="#微前端的价值" aria-label="Permalink to &quot;微前端的价值&quot;">​</a></h2><ul><li><p><strong>技术栈无关</strong>：主框架不限制接入应用的技术栈，子应用具备完全自主权</p></li><li><p><strong>独立开发、独立部署</strong>：子应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新</p></li><li><p><strong>独立运行</strong>：每个子应用之间状态隔离，运行时状态不共享</p></li></ul><h2 id="qiankun-源码分析" tabindex="-1">qiankun 源码分析 <a class="header-anchor" href="#qiankun-源码分析" aria-label="Permalink to &quot;qiankun 源码分析&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6844904115999342600" target="_blank" rel="noreferrer">qiankun 源码分析</a></li><li><a href="https://segmentfault.com/a/1190000037747701" target="_blank" rel="noreferrer">js css 加载和执行过程</a></li></ul><h2 id="css-隔离" tabindex="-1">CSS 隔离 <a class="header-anchor" href="#css-隔离" aria-label="Permalink to &quot;CSS 隔离&quot;">​</a></h2><h3 id="shadow-dom" tabindex="-1">Shadow DOM <a class="header-anchor" href="#shadow-dom" aria-label="Permalink to &quot;Shadow DOM&quot;">​</a></h3><ul><li>缺点： <ul><li>比如说你在使用一些弹窗组件的时候（弹窗很多情况下都是默认添加到了 document.body ）这个时候它就跳过了阴影边界，跑到了主应用里面，样式就丢了。</li><li>React 技术栈，而 React 事件代理其实是挂在 document 上的，它也会出一些问题</li></ul></li></ul><h3 id="scoped-css" tabindex="-1">scoped CSS <a class="header-anchor" href="#scoped-css" aria-label="Permalink to &quot;scoped CSS&quot;">​</a></h3><ul><li>experimentalStyleIsolation = true</li></ul><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 假设应用名是 react16</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">app-main</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">font-size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">14px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">div</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">data-qiankun-react16</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">app-main</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">font-size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">14px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>注意事项: 目前 @keyframes, @font-face, @import, @page 等规则不会支持 (i.e. 不会被改写)</p><h3 id="class-命名空间-非官方" tabindex="-1">class 命名空间 （非官方） <a class="header-anchor" href="#class-命名空间-非官方" aria-label="Permalink to &quot;class 命名空间 （非官方）&quot;">​</a></h3><ul><li>在子应用的盒子上加一个class，子应用的样式都在这个 class 下</li></ul><h2 id="公共组件的处理" tabindex="-1">公共组件的处理 <a class="header-anchor" href="#公共组件的处理" aria-label="Permalink to &quot;公共组件的处理&quot;">​</a></h2><ol><li><p>通过方法的形式传给子应用</p></li><li><p>npm 包</p></li><li><p>cdn 的方式引入，配置 webpack externals</p></li><li><p>webpack5 联邦模块：<a href="https://juejin.cn/post/6963326546606030856" target="_blank" rel="noreferrer">微前端实践--webpack5模块联邦</a></p></li></ol><h2 id="js-沙箱隔离" tabindex="-1">JS 沙箱隔离 <a class="header-anchor" href="#js-沙箱隔离" aria-label="Permalink to &quot;JS 沙箱隔离&quot;">​</a></h2><ul><li>ES6 的 proxy，通过代理实现</li></ul><h2 id="qiankun-的使用总结" tabindex="-1">qiankun 的使用总结 <a class="header-anchor" href="#qiankun-的使用总结" aria-label="Permalink to &quot;qiankun 的使用总结&quot;">​</a></h2><ol><li>js 沙箱并不能解决所有的 <code>js</code> 污染问题，例如使用 <code>onclick</code> 或 <code>addEventListener</code> 给 <code>&lt;body&gt;</code> 添加一个点击事件，js 沙箱并不能消除它的影响</li><li><code>qiankun</code> 框架不太好实现 <code>keep-alive</code> 需求，因为解决 css/js 污染的办法就是删除子项目插入的 css 标签和劫持 window 对象， 卸载时还原成子项目加载前的样子，这与 keep-alive 相悖： keep-alive 要求保留这些，仅仅是样式上的隐藏。</li><li>安全问题： <ol><li>qiankun 将每个子项目的 js/css 文件内容都记录在一个全局变量中，如果子项目过多，或者文件体积很大，可能会导致内存占用过多，导致页面卡顿。</li><li>另外，qiankun 运行子项目的 js，并不是通过 script 标签插入的，而是通过 eval 函数实现的，eval 函数的安全和性能是有一些争议的</li></ol></li><li>多页应用改造成功高 <ol><li>虽然 qiankun 支持 jQuery 老项目，但是似乎对多页应用没有很好的解决办法。每个页面都去修改，成本很大也很麻烦，但是使用 iframe 嵌入这些老项目就比较方便。</li></ol></li></ol><h2 id="满足以下几点-你才确实可能需要微前端" tabindex="-1">满足以下几点，你才确实可能需要微前端 <a class="header-anchor" href="#满足以下几点-你才确实可能需要微前端" aria-label="Permalink to &quot;满足以下几点，你才确实可能需要微前端&quot;">​</a></h2><ol><li>系统本身是需要集成和被集成的 一般有两种情况： <ol><li>旧的系统不能下，新的需求还在来。 没有一家商业公司会同意工程师以单纯的技术升级的理由，直接下线一个有着一定用户的存量系统的。而你大概又不能简单通过 iframe 这种「靠谱的」手段完成新功能的接入，因为产品说需要「弹个框弹到中间」</li><li>你的系统需要有一套支持动态插拔的机制。 这个机制可以是一套精心设计的插件体系，但一旦出现接入应用或被接入应用年代够久远、改造成本过高的场景，可能后面还是会过渡到各种微前端的玩法。</li></ol></li><li>系统中的部件具备足够清晰的服务边界 <ol><li>通过微前端手段划分服务边界，将复杂度隔离在不同的系统单元中，从而避免因熵增速度不一致带来的代码腐化的传染，以及研发节奏差异带来的工程协同上的问题。</li></ol></li></ol>`,32),o=[i];function r(t,p,c,d,u,h){return l(),e("div",null,o)}const b=a(s,[["render",r]]);export{k as __pageData,b as default};
