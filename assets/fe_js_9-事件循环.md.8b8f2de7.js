import{_ as e,c as a,o as t,N as r}from"./chunks/framework.3751e28a.js";const m=JSON.parse('{"title":"事件循环","description":"","frontmatter":{},"headers":[],"relativePath":"fe/js/9-事件循环.md","lastUpdated":1692250088000}'),i={name:"fe/js/9-事件循环.md"},o=r('<h1 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h1><h2 id="settimeout-的执行时间" tabindex="-1">setTimeout 的执行时间 <a class="header-anchor" href="#settimeout-的执行时间" aria-label="Permalink to &quot;setTimeout 的执行时间&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844903805063004167#heading-12" target="_blank" rel="noreferrer">异步队列执行的时间</a> 执行到异步任务的时候，会直接放到异步队列中吗？</p><p>答案是不一定的。</p><ul><li><p>因为浏览器有个定时器（timer）模块，定时器到了执行时间才会把异步任务放到异步队列。</p></li><li><p>for循环体执行的过程中并没有把setTimeout放到异步队列中，只是交给定时器模块了。 4个循环体执行速度非常快（不到1毫秒）。定时器到了设置的时间才会把setTimeout语句放到异步队列中。</p></li></ul><h2 id="await-会堵塞后面的代码" tabindex="-1">await 会堵塞后面的代码 <a class="header-anchor" href="#await-会堵塞后面的代码" aria-label="Permalink to &quot;await 会堵塞后面的代码&quot;">​</a></h2><ul><li>执行 promise</li></ul><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6844903805063004167" target="_blank" rel="noreferrer">从setTimeout理解JS运行机制</a></li><li><a href="https://juejin.cn/post/6844903553031634952" target="_blank" rel="noreferrer">图解搞懂JavaScript引擎Event Loop</a></li></ul>',9),l=[o];function s(n,_,h,c,p,u){return t(),a("div",null,l)}const f=e(i,[["render",s]]);export{m as __pageData,f as default};
