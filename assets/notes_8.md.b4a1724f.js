import{_ as s,c as a,o as n,N as l}from"./chunks/framework.3751e28a.js";const h=JSON.parse('{"title":"om my zsh 更新问题","description":"","frontmatter":{},"headers":[],"relativePath":"notes/8.md","lastUpdated":1691547600000}'),o={name:"notes/8.md"},e=l(`<h1 id="om-my-zsh-更新问题" tabindex="-1">om my zsh 更新问题 <a class="header-anchor" href="#om-my-zsh-更新问题" aria-label="Permalink to &quot;om my zsh 更新问题&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">原文地址</p><p><a href="https://github.com/tangxve/notes/issues/8" target="_blank" rel="noreferrer">om my zsh 更新问题 | GitHub</a></p></div><h2 id="更新命令" tabindex="-1">更新命令： <a class="header-anchor" href="#更新命令" aria-label="Permalink to &quot;更新命令：&quot;">​</a></h2><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">omz</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>或者</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">upgrade_oh_my_zsh</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="更新失败遇到的问题" tabindex="-1">更新失败遇到的问题 <a class="header-anchor" href="#更新失败遇到的问题" aria-label="Permalink to &quot;更新失败遇到的问题&quot;">​</a></h2><h3 id="the-unauthenticated-git-protocol-on-port-9418-is-no-longer-supported" tabindex="-1">The unauthenticated git protocol on port 9418 is no longer supported. <a class="header-anchor" href="#the-unauthenticated-git-protocol-on-port-9418-is-no-longer-supported" aria-label="Permalink to &quot;The unauthenticated git protocol on port 9418 is no longer supported.&quot;">​</a></h3><p>不再支持端口9418上未经身份验证的 git 协议</p><p>问题：</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">oh-my-zsh</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Would you like to update</span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">Y/n</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">Updating</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Oh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">My</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Zsh</span></span>
<span class="line"><span style="color:#FFCB6B;">fatal:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remote</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">error:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">The</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">unauthenticated</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">protocol</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">on</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">port</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9418</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">no</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">longer</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">supported.</span></span>
<span class="line"><span style="color:#FFCB6B;">Please</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">see</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.blog/2021-09-01-improving-git-protocol-security-github/</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">more</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">information.</span></span>
<span class="line"><span style="color:#FFCB6B;">There</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">was</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">an</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">error</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">updating.</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Try</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">again</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">later?</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>看起了 git 协议安全性的问题</p><p>解决方法：</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--global</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">url.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://github.com/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.insteadOf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">git://github.com/</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>参考：</p><p><a href="https://stackoverflow.com/questions/70663523/the-unauthenticated-git-protocol-on-port-9418-is-no-longer-supported" target="_blank" rel="noreferrer">The unauthenticated git protocol on port 9418 is no longer supported</a></p>`,16),p=[e];function t(r,c,i,C,y,d){return n(),a("div",null,p)}const D=s(o,[["render",t]]);export{h as __pageData,D as default};