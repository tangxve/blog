import{_ as s,c as n,o as a,S as l}from"./chunks/framework.9c4db3f7.js";const A=JSON.parse('{"title":"CommonJs 和 ES6 Module","description":"","frontmatter":{},"headers":[],"relativePath":"fe/js/12-ESModule.md","filePath":"fe/js/12-ESModule.md","lastUpdated":1710985462000}'),o={name:"fe/js/12-ESModule.md"},p=l(`<h1 id="commonjs-和-es6-module" tabindex="-1">CommonJs 和 ES6 Module <a class="header-anchor" href="#commonjs-和-es6-module" aria-label="Permalink to &quot;CommonJs 和 ES6 Module&quot;">​</a></h1><ul><li><a href="https://segmentfault.com/a/1190000017878394" target="_blank" rel="noreferrer">深入 CommonJs 与 ES6 Module</a></li><li><a href="https://mp.weixin.qq.com/s/wxUz5E1Xs5dqYFPRPOnAlw" target="_blank" rel="noreferrer">ESModule 加载与运行机制</a></li></ul><h2 id="区别" tabindex="-1">区别 <a class="header-anchor" href="#区别" aria-label="Permalink to &quot;区别&quot;">​</a></h2><ul><li><code>CommonJs</code> 导出的是变量的一份拷贝；<code>ES6 Module</code> 导出的是变量的引用（绑定）（export default 是特殊的）</li><li><code>CommonJs</code> 是单个值导出；<code>ES6 Module</code> 可以导出多个</li><li><code>CommonJs</code> 是动态语法可以写在判断里；<code>ES6 Module</code> 静态语法只能写在顶层</li><li><code>CommonJs</code> 的 this 是当前模块；<code>ES6 Module</code> 的 this 是 undefined</li><li><code>CommonJs</code> 模块是运行是加载，是同步加载的；<code>ES6 Module</code> 模块是编译时输出接口</li></ul><h2 id="commonjs-循环引用" tabindex="-1">CommonJs 循环引用 <a class="header-anchor" href="#commonjs-循环引用" aria-label="Permalink to &quot;CommonJs 循环引用&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// a.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports.</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./b</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(b)</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports.</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// b.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports.</span><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">11</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a)</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports.</span><span style="color:#A6ACCD;">b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">22</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//main.js</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>利用缓存方式解决循环引用</strong></p><ol><li><p>执行 <code>node main.js -&gt; 第一行 require(a.js)</code>，（node 执行也可以理解为调用了require方法，我们省略require(main.js)内容）</p></li><li><p>进入 require(a)方法： <code>判断缓存（无） -&gt; 初始化一个 module -&gt; 将 module 加入缓存 -&gt; 执行模块 a.js 内容</code>，（需要注意 是<strong>先加入缓存， 后执行模块</strong>内容）</p></li><li><p>a.js： <code>第一行导出 a = 1 -&gt; 第二行 require(b.js)</code>（a 只执行了第一行）</p></li><li><p>进入 require(b) 内： <code>同 1 -&gt; 执行模块 b.js 内容</code></p></li><li><p>b.js： <code>第一行 b = 11 -&gt; 第二行 require(a.js)</code></p></li><li><p>require(a) 此时 a.js <strong>是第二次调用</strong> <code>require -&gt; 判断缓存（有）-&gt; cachedModule.exports -&gt; 回到 b.js</code>（因为js对象引用问题 此时的 cachedModule.exports = { a: 1 }）</p></li><li><p>b.js：<code>第三行 输出 { a: 1 } -&gt; 第四行 修改 b = 22 -&gt; 执行完毕回到 a.js</code></p></li><li><p>a.js：<code>第二行 require 完毕 获取到 b -&gt; 第三行 输出 { b: 22 } -&gt; 第四行 导出 a = 2 -&gt; 执行完毕回到 main.js</code></p></li><li><p>main.js：<code>获取 a -&gt; 第二行 输出 { a: 2 } -&gt; 执行完毕</code></p></li></ol><h2 id="es6-module-循环引用" tabindex="-1">ES6 Module 循环引用 <a class="header-anchor" href="#es6-module-循环引用" aria-label="Permalink to &quot;ES6 Module 循环引用&quot;">​</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// bar.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">foo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./foo</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(foo)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> bar </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// foo.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(bar)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// main.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(bar)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><ol><li>执行 main.js -&gt; 导入 bar.js</li><li>bar.js -&gt; 导入 foo.js</li><li>foo.js -&gt; 导入 bar.js -&gt; bar.js 已经执行过直接返回 -&gt; 输出 <code>bar -&gt; bar is not defined， bar 未定义报错</code></li></ol><p><strong>使用 function 的方式解决：</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// bar.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">foo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./foo</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">bar</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// foo.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">bar</span><span style="color:#A6ACCD;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// main.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">bar</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(bar)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ol><li>因为函数声明会提示到文件顶部</li><li>所以就可以直接在 foo.js 调用还没执行完毕的bar.js的 bar 方法，</li><li>不要在函数内使用外部变量，因为变量还未声明(let,const)和赋值，var</li></ol><h2 id="esmodule-加载和执行过程解析" tabindex="-1">ESModule 加载和执行过程解析 <a class="header-anchor" href="#esmodule-加载和执行过程解析" aria-label="Permalink to &quot;ESModule 加载和执行过程解析&quot;">​</a></h2><p>ESModule 的加载和解析过程整体上可以拆分为三个步骤：</p><ol><li>获取代码和解析：建立模块之间连接 <ol><li>通过文件读写的方式，读取 main.mjs 的文件内容，记录到 ESModule 中</li><li>逐行解析 JS 代码，获取依赖的 ESModule 的地址</li><li>然后继续加载对应依赖的模块，重复第一步的操作，直到所有的 ESModule 都完成了加载</li></ol></li><li>实例化模块：完成变量声明和环境对象(enviroment object)的绑定 <ol><li>每个模块都会有各自环境对象且相互隔离，这也是不同模块可以有相同的名字的函数、变量而不会冲突的原因</li><li>function、var 的变量提升的特性在这个场景下也适用，function 会直接完成初始化，var 则会初始化为 undefined</li></ol></li><li>执行代码：按照深度优先的顺序，逐行执行代码 <ol><li>按照深度优先的顺序，首先执行最深的依赖的模块代码</li><li>每个模块的代码只会被执行一次</li></ol></li></ol><h2 id="esmodule-加载运行策略相比于同步的方式又哪些优势" tabindex="-1">ESModule 加载运行策略相比于同步的方式又哪些优势 <a class="header-anchor" href="#esmodule-加载运行策略相比于同步的方式又哪些优势" aria-label="Permalink to &quot;ESModule 加载运行策略相比于同步的方式又哪些优势&quot;">​</a></h2><ol><li>实际模块的依赖不许执行代码，在可以解析时候，通过静态分析方式进行 <ol><li>浏览器、node 等应用可能快的速度完成依赖的收集和资源的请求，</li><li>而不会受具体模块代码执行耗时以及前后顺序的影响</li><li>可以使用尽可能多的并发请求来快速完成加载。</li></ol></li><li>支持 TreeShaking 的自动优化</li></ol>`,19),e=[p];function r(c,t,i,D,y,F){return a(),n("div",null,e)}const b=s(o,[["render",r]]);export{A as __pageData,b as default};