import{_ as e,c as t,o as i,N as l}from"./chunks/framework.3751e28a.js";const m=JSON.parse('{"title":"箭头函数和普通函数","description":"","frontmatter":{},"headers":[],"relativePath":"fe/js/8-箭头函数和普通函数.md","lastUpdated":1692250088000}'),o={name:"fe/js/8-箭头函数和普通函数.md"},a=l('<h1 id="箭头函数和普通函数" tabindex="-1">箭头函数和普通函数 <a class="header-anchor" href="#箭头函数和普通函数" aria-label="Permalink to &quot;箭头函数和普通函数&quot;">​</a></h1><p><a href="https://juejin.cn/post/6844903805960585224#heading-0" target="_blank" rel="noreferrer">ES6 - 箭头函数、普通函数的区别</a></p><ul><li><p>箭头函数不会创建自己 <code>this</code></p></li><li><p>在箭头函数中，因为语法解析，this指向是确定的，this是与外层函数绑定的，如果是最外层没有函数就是window</p></li><li><p><code>.call()</code> / <code>.apply()</code> / <code>.bind()</code> 无法改变箭头函数中 <code>this</code> 指向</p></li><li><p>箭头函数不能作为构造函数使用</p></li><li><p>箭头函数没有自己的 <code>arguments</code></p></li><li><p>箭头函数没有自己原型 <code>prototype</code></p></li><li><p>箭头函数不能用作 <code>Generator</code> 函数，不能使用 <code>yeild</code> 关键字</p></li><li><p>this指向：</p><ul><li>在普通函数中，是动态的，依赖于函数的调用；</li><li>在箭头函数中，因为语法解析，this指向是确定的，this是与外层函数绑定的，如果是最外层没有函数就是window</li></ul></li><li><p>arguments:</p><ul><li>在普通函数中，可以获取到所有的参数；</li><li>在箭头函数中，arguments是指向外层的函数的arguments的。如果想要获取到统一获取到箭头函数的参数，可以使用…操作符 return: 箭头函数如果只有一个表达式，这个表达式就会被隐式返回，而且不需要使用return关键字</li></ul></li></ul><p>我们可以在class中使用箭头函数，this会和类实例进行绑定</p>',4),c=[a];function r(s,d,p,_,n,h){return i(),t("div",null,c)}const f=e(o,[["render",r]]);export{m as __pageData,f as default};
