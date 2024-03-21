import{_ as a,c as e,o as s,S as o}from"./chunks/framework.9c4db3f7.js";const C=JSON.parse('{"title":"Chrome 浏览器","description":"","frontmatter":{},"headers":[],"relativePath":"notes/14.md","filePath":"notes/14.md","lastUpdated":1710985462000}'),n={name:"notes/14.md"},l=o(`<h1 id="chrome-浏览器" tabindex="-1">Chrome 浏览器 <a class="header-anchor" href="#chrome-浏览器" aria-label="Permalink to &quot;Chrome 浏览器&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/tangxve/notes/issues/14" target="_blank" rel="noreferrer">Chrome 浏览器 | GitHub</a></p></div><h2 id="关于-本地开发-cookie-问题" tabindex="-1">关于 本地开发 cookie 问题 <a class="header-anchor" href="#关于-本地开发-cookie-问题" aria-label="Permalink to &quot;关于 本地开发 cookie 问题&quot;">​</a></h2><p>参考链接：</p><p>修改地址：chrome://flags/</p><p><a href="https://docs.adobe.com/content/help/zh-Hans/target/using/implement-target/before-implement/privacy/google-chrome-samesite-cookie-policies.translate.html" target="_blank" rel="noreferrer">Google Chrome SameSite Cookie 策略</a></p><p><a href="https://medium.com/@azure820529/chrome-80-%E5%BE%8C%E9%87%9D%E5%B0%8D%E7%AC%AC%E4%B8%89%E6%96%B9-cookie-%E7%9A%84%E8%A6%8F%E5%89%87%E8%AA%BF%E6%95%B4-default-samesite-lax-aaba0bc785a3" target="_blank" rel="noreferrer">Chrome 80 後針對第三方 Cookie 的規則調整 (default SameSite=Lax)</a></p><h2 id="常用插件" tabindex="-1">常用插件 <a class="header-anchor" href="#常用插件" aria-label="Permalink to &quot;常用插件&quot;">​</a></h2><h3 id="插件设置" tabindex="-1">插件设置 <a class="header-anchor" href="#插件设置" aria-label="Permalink to &quot;插件设置&quot;">​</a></h3><p>设置路径：chrome://extensions/</p><h3 id="常用插件-1" tabindex="-1">常用插件 <a class="header-anchor" href="#常用插件-1" aria-label="Permalink to &quot;常用插件&quot;">​</a></h3><ul><li><p>FeHelper.JSON</p><p>提供方：<a href="https://www.baidufe.com" target="_blank" rel="noreferrer">https://www.baidufe.com</a></p></li></ul><h3 id="_1-关闭-黑暗模式" tabindex="-1">1. 关闭 黑暗模式 <a class="header-anchor" href="#_1-关闭-黑暗模式" aria-label="Permalink to &quot;1. 关闭 黑暗模式&quot;">​</a></h3><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">write</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.google.Chrome</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">NSRequiresAquaSystemAppearance</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">YES</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 重新启动 Chrome</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-打开-黑暗模式" tabindex="-1">2. 打开 黑暗模式 <a class="header-anchor" href="#_2-打开-黑暗模式" aria-label="Permalink to &quot;2. 打开 黑暗模式&quot;">​</a></h3><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">write</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.google.Chrome</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">NSRequiresAquaSystemAppearance</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">NO</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 重新启动 Chrome</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,16),t=[l];function r(p,c,i,h,m,d){return s(),e("div",null,t)}const b=a(n,[["render",r]]);export{C as __pageData,b as default};