import{_ as s,c as n,o as a,S as l}from"./chunks/framework.9c4db3f7.js";const m=JSON.parse('{"title":"fullPage 插件 afterLoad 钩子执行时机","description":"","frontmatter":{},"headers":[],"relativePath":"notes/11.md","filePath":"notes/11.md","lastUpdated":1693141135000}'),e={name:"notes/11.md"},p=l(`<h1 id="fullpage-插件-afterload-钩子执行时机" tabindex="-1">fullPage 插件 afterLoad 钩子执行时机 <a class="header-anchor" href="#fullpage-插件-afterload-钩子执行时机" aria-label="Permalink to &quot;fullPage 插件 afterLoad 钩子执行时机&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/tangxve/notes/issues/11" target="_blank" rel="noreferrer">fullPage 插件 afterLoad 钩子执行时机 | GitHub</a></p></div><p><a href="https://alvarotrigo.com/fullPage/zh/" target="_blank" rel="noreferrer">fullPage.js 全屏滚动插件</a></p><h2 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h2><ol><li>当前页面加载完成，执行页面上的动画</li><li>动画有多个，在动画没有执行完前，页面不能滚动</li></ol><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><ul><li>利用 <code>afterLoad</code> 钩子执行动画</li><li>利用 <code>onLeave</code> 钩子限制当前页面滚动</li><li><code>afterLoad</code>： 滚动结束之后，一旦加载了 section ，就会触发回调。</li><li><code>onLeave</code>： 一旦用户离开 section ，过渡到新 section ，就会触发此回调。 返回 <code>false</code> 将在移动发生之前取消移动。</li></ul><details class="details custom-block"><summary>查看代码</summary><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 记录已经完成的动画</span></span>
<span class="line"><span style="color:#A6ACCD;">      doneTranslate: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 是否需要等待动画 开关</span></span>
<span class="line"><span style="color:#A6ACCD;">      waitTranslate: false</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    async afterLoad(origin, destination, direction) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 当前页面已经完成动画</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (this.doneTranslate.includes(destination.index)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.waitTranslate = false</span></span>
<span class="line"><span style="color:#A6ACCD;">        return</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 动画开始 等待动画</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.waitTranslate = true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 异步动画 方法</span></span>
<span class="line"><span style="color:#A6ACCD;">      await this.startTranslate()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      this.waitTranslate = false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 记录完成的页面</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.doneTranslate.push(destination.index)</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    onLeave(origin, destination, direction, trigger) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 当前页面动画没有完成禁止滚动</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (this.waitTranslate) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return false</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    startTranslate() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 异步动画 方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div></details><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>但是这里有个问题，当用户滑动太快的时候 <code>afterLoad</code> 钩子不会执行</p><p>因为此时的 section 还没有加完成，只是滚动结束</p></div><h3 id="修改问题" tabindex="-1">修改问题 <a class="header-anchor" href="#修改问题" aria-label="Permalink to &quot;修改问题&quot;">​</a></h3><p>可以利用 <code>onLeave</code> 方法做判断，在 section 时候就会触发，把开关打开</p><details class="details custom-block"><summary>改正代码</summary><div class="language-vue line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 记录已经完成的动画</span></span>
<span class="line"><span style="color:#A6ACCD;">      doneTranslate: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 是否需要等待动画 开关</span></span>
<span class="line"><span style="color:#A6ACCD;">      waitTranslate: false</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    async afterLoad(origin, destination, direction) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 当前页面已经完成动画</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (this.doneTranslate.includes(destination.index)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.waitTranslate = false</span></span>
<span class="line"><span style="color:#A6ACCD;">        return</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 动画开始 等待动画</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.waitTranslate = true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 异步动画 方法</span></span>
<span class="line"><span style="color:#A6ACCD;">      await this.startTranslate()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      this.waitTranslate = false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 记录完成的页面</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.doneTranslate.push(destination.index)</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    onLeave(origin, destination, direction, trigger) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 当前页面动画没有完成禁止滚动</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (this.waitTranslate) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return false</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      // 离开 section 的把开关打开</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.waitTranslate = true</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    startTranslate() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 异步动画 方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div></details>`,12),r=[p];function c(i,t,o,b,C,u){return a(),n("div",null,r)}const d=s(e,[["render",c]]);export{m as __pageData,d as default};
