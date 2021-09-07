# 面经


## [小影] 9.7
- 为啥用微前端
- 解决了什么问题，你的这些问题 iframe 也是可以解决
- 子应用webpack配置了什么，为什么这么配置，output 有几种配置方法 ❌
  - 修改 publicPath
- qiankun 怎么对事件做处理的
- import-html-Entry 怎么解析 html的 ❌
- 主应用和子应用直接如果互相修改dom怎么办，怎么处理
  - 可以约定，不能修改
  - shadow dom，减少修改（这个没有回答上来）
- react 熟悉么
- js 中哪些事件是在捕获阶段执行的
- 有木有遇到跨域，跨域怎么解决的
- ajax 请求一个图片，怎么让它展示在浏览器上 ❌
- Tree-Shaking 的实现原理

## [稿定科技] 8.5
钉钉视频面试 40 分钟

- http 那些请求方式会走缓存
- 实现左右布局
- 实现左边菜单可以展开的方法，纯css 怎么实现
- flex 有那些属性
- 一个流程有多个步骤，提交表单怎么实现，结合后端
- 一个树型结构嵌套很多层，选择视图怎么实现。❌
 

## [乒乓智能] 7.20
电话面试 40分钟

- 说下 css 水平垂直局中的方法
- 说下 vue 的生命周期
- 说下 vue 更新时候，父子组件的生命周期
- 说下 nextTick 方法实现
- 说下 宏任务和微任务
- 数组的循环有那些
- 说下 promise 和 async、await
- 说下 webpack
- instanceof 实现原理
- ji 的类型，基本数据类型和引用数据类型有什么区别
- node 了解那些 ❌
- ts 泛型什么 ❌

## [欢聚时代] 7.12
腾讯会议 40分钟

- 说下 vue 响应式原理
- defineProperty 和 Proxy 有什么区别
- 说下 Proxy 的使用场景
- 说下 keep-alive
- 说下 nextTick 实现
- 说下 event loop
- Object 和 Map 的区别
- Object 的存储为什么是无序的 ❌
- object 的 key 和 value 是怎么存储的 ❌
- 说下类型判断的方法
- typeof null 为什么是 'object' ❌
    - null 机器码是 000，object 的机器码也是 000
- git 回滚的方法有那些
    - git reset
    - 别的不清楚了
- git reset --head commitId，回滚过多怎么恢复 ❌
- git merage 和 git rebase 的区别
 

## [快手电商] 7.12 

视频面试，coding

- 说下 vue 的响应式数据
- 那个 watcher 进行依赖收集 ❌
    - 说了在渲染的时候进行依赖收集，对了，但是貌似也不完全对
    - 有三个 watcher： 渲染 watcher、computed watcher、 user watcher
    - 依赖收集是 渲染 watcher
- 组件之间的通讯
- 兄弟组件通讯，除了可以通过父级，还有别的方法么
    - event bus
    - vuex
    - 面试官是不是也可以挂载全局this data 上（也可以，但是比较骚吧）
- 写下 es5的继承，可以穿参数的（手写代码） ❌
    - 没有考虑的可以穿参数
- 数组`[a,b,c]` 用 Math.max 获取大小
    - `Math.max.apply(null,[a,b,c])`
    - apply实现的原理？ ❌
    - call 可以实现么？
- 跨域什么情况下会发出 option 请求
    - 简单请求不会
    - 复杂请求会
- padding-top: 100% 是什么意思
- padding-top: 100% 具体代表那个盒子 ❌
    - 回答的是 border-box，面试官说大多数情况下是 content-box
- qiankun 具体怎么实现 js 隔离的 有看过源码么 ❌
- 有木有学过数据结构，有木有刷过力扣，那简单的来个题尝试试
- 一个 M * N 的二维矩阵，获取左上角到右下角的最下路径和
    ::: details 点击查看代码
    ```js
    // 一个 M * N 的二维矩阵，获取左上角到右下角的最下路径和
    const arr = [
     [5, 6, 7, 3],
     [3, 2, 6, 1],
     [8, 1, 4, 2]
    ]
    
    function minPathSum() {
     //...
    }
    ```
    :::







## [众安保险] 6.30 二面

- vuex 实现原理知道么，
- 为什么用有vuex，解决了什么问题
- 双向绑定的原理
- vue-router 的原理
- router.replace 和 浏览器的 window.replace 有什么区别 ❌
- keep-alive 实现原理
- keep-alive 的缓存的方式，以及缓存到哪里 ❌
- 父子组件的生命周期
- 有木有用过node
- 有木有用过 react

## [微医] 6.30

- 微前端 css 怎么隔离的
- 微前端解决了什么问题
- 说下你了解的跨域
- nginx 了解么
- 说下了你知道的 promise的方法
- 获取 url 参数的方法，你知道那些
- 平时正则用多不多
- vue里面知道怎么获取url的参数么
- 你平时怎么学习的
- 平时有什么兴趣爱好
    - 刷B站
    - 打lol
    - 玩滑板
- 王者农药玩不玩
- 如果找你对接的人很多，你会怎么办
- 你考虑下家公司不爽的点会有那些


## [众安保险] 6.29

- 说下清除浮动有那些方法
- 数组去重知道那些方法
- 说下es5的继承
- 组合继承有什么缺点 ❌
- 说下 for-in 和 for-of区别
- 如果想获取对象的本身的属性，而不是它原型的属性，可以用什么方法 ❌
    - 可以使用 for-in，for ... in是为遍历对象属性而构建的
    - es6 对象结构的原理
- 跨域你们怎么解决的？知道那些解决方法呢
- 可以说下双向数据绑定的原理么
- 

## [爱库存] 6.29

面试官不错，会引导的去问，然后会讲解一些问题

- 了解qiankun的实现原理么
- js 和 css 隔离了解么
- 微前端带来的价值
- 作用域和作用域链能说下
- 闭包与作用域链的关系 ❌
- 闭包怎么销毁 ❌
- 浏览器的渲染过程
- 重排有什么问题
- 浏览器的缓存了解那些
- 浏览器存储有那些
- webWork 了解么
    - 说可以做 PWA 应用，具体不清楚
- vue的组件通信
- 如果不使用 vuex，实现一个全局状态通信，有什么思路么
- vue2和vue3的区别了解那些
- webpack 优化了解那些
- webpack loader 怎么理解
- webpack plugin 怎么理解
- 项目中遇到了那些问题
- 有做过那些对项目提高能效的工具么


## [字节] 6.28
面试官 很 nice
- 说下为什么使用微前端
- qiankun 实现的大概原理知道么
- shadow dom 能说下么
- 数据类型的判断有那些
- Object.prototype.toString.call() 可以检测 Date、正则、类型么
- Object.prototype.toString.call() 判断数据类型原理是什么 ❌
- 能说下map 和 weakMap 的区别么
    - 说的不是太好
- 垃圾回收能说下么 ❌
- vue2和vue3的 响应式数据区别能说下么
- vue 里面 key 的作用时候干什么的
- 如果没有写 key 会有什么问题 ❌
    - 回答的不好好，如果没有写默认vue 默认会使用下标的
- 用下标做key，会有什么问题么
- 如果data里面数据修改了多个，视图会更新多次么
    - 不会，只会更新一次
- nextTick 实现原理
- http 安全了解么
- 能说下 xss 攻击某个场景么
- 能说后下 CSRF 攻击的场景么，怎么获取用户的 cookie ❌
- 一个简单的手写题（紧张了，只说了思路，没有实现）
    - js 将时间戳转换为刚刚、N分钟前、今天几点、昨天、几天前
    


## [来未来笔试]
- 树形结构数据打印
- 千分位格式化
- JSON key 驼峰转化


## [涂鸦智能] 6.24 二面

- vue的 $emit事件实现的原理是什么


## [个推] 6.23

电话面试 40分钟

- vue 组件的通信
- vue 的虚拟dom
- vue 的编译过程
- vue-router 说下
- ESM 你说怎么理解的，有什么好处
- CI/CD 操作了解么
- 前端登陆与后端的交互流程能说下么
- 你们前方发布流程能说下嘛
- 浏览器存储有那些
- 在工程化和推动项目落地的过程可以说说嘛


## [涂鸦智能] 6.23

电话面试 30分钟

他们也在用微前端，用的是阿里的飞冰

- 说下说下为什么会有微前端这个技术，技术带来的那些好处
- 分别说下vue2.0 与3.0的数据绑定是怎么实现的
- http和https的区别
- 说下https的请求流程
- 说下强缓存和协商缓存的区别
- commonJS 和 ESM 的区别


## [艾耕科技] 6.23
电话面试 30分钟

- Object 和 map 的区别
- Shadow DOM 了解么
- 多个 promise 实现串行
- 获取数组中最大的2个数，要求复杂难度最低
- vue3中 Composition Api 了解么
- vue 对 虚拟dom 的优化
- 虚拟dom 有什么坏处 ❌
- 或者说用vue和react时候有遇到虚拟dom 的问题么
- 有音视频开发的经验么 ❌


## [微店] 6.22 二面

40 分钟

- 在重构项目中，作为技术方有什么方法可以做到项目的功能完整呢
- 微前端有什么性能问题
- qiankun 的源码有看过么 ❌
- 对象 和 map 的区别
- Object 是怎么存储的 
- Object 的 key 和 value 是怎么存储的 ❌
- 你了解那些 js 的引擎 ❌
- V8 中怎么对基本数据类型做垃圾回收的 ❌
- setTimeout 是 js引擎提供的，还是宿主提供的 ❌
    - 猜的浏览器提供，因为有事件模块
- async 返回什么，怎么实现的
- promise 的 pending 状态在事件循环中属于哪一步
    - 回答的是异步队列执行阶段，应该是同步阶段，在then的时候才会进到异步
- promise 属于 js引擎提供的方法，还是宿主提供的
    - 这个不知道，猜的是宿主（浏览器）
- vue-cli的大概实现了解过么，引入了那些库和方法 ❌
- 平时怎么学习的
- 对加班怎么看


## [无码科技] 6.21

50分钟 手写代码

- 基于 window.requestAnimationFrame 写一个动画函数，
将一个 DOM 元素 ele 在 duration 内，
从当前位置向右线平移 moveLength 像素

  ::: details 点击查看代码
  没有用过 window.requestAnimationFrame 暂时不会写
  :::

- 写一个节流函数 (限制一个函数在一定时间内只执行一次)

  ::: details 点击查看代码
  没有用过 window.requestAnimationFrame 暂时不会写
  :::

- 有如下文本，请提取文本中的所有 URL 
    ```js
     const text = "这是一段文本https://www.showmebug.com/pads/LKGVGT这是一段文本http://www.showmebug.com这是一段文本http://showmebug.comm这是一段文本"
    ```
 
  ::: details 点击查看代码
  ```js
    function httpString(s) {  
        var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;  
        s = s.match(reg);  
        console.log(s)  
        return(s)
    } 
  ```
  :::

- 输入一个数组 nums，对于其中每个元素 `nums[i]`，请统计数组中比它小的所有数字的数目。
    - 以数组形式返回答案，不能用 sort 和 filter。
    - 输入：`nums = [8,1,2,2,3]`
    - 输出：`[4,0,1,1,3]`
    
  ::: details 点击查看代码
  ```js
    var smallerNumbersThanCurrent = function(nums) {
        const n = nums.length;
        const ret = [];
        for (let i = 0; i < n; ++i) {
            let cnt = 0;
            for (let j = 0; j < n; ++j) {
                if (nums[j] < nums[i]) {
                    cnt++;
                }
            }
            ret[i] = cnt;
        }
        return ret;
    };
  ```
  :::
  
- 实现 atoi，将字符串转为整数。
    - 假设我们的环境只能存储 32 位有符号整数，其数值范围是 `[−2 的 31 次方, 2 的 31次方 − 1]`。
    如果数值超过可表示的范围，则返回 INT_MAX (2 的 31 次方 − 1) 或 INT_MIN (−2 的31次方) 。
    - 不能使用 parseInt
    - 示例1：输入：`' '`，输出：`0`
    - 示例2：输入：`'+2'`，输出：`2`
    - 示例3：输入：`'+'`，输出：`0`
    - 示例4：输入：`'-223pasudasd'`，输出：`-223`
    - 示例5：输入：`'-91283472332'`，输出：`-2147483648`
    
  ::: details 点击查看代码
  
  思路：
  1. 循环筛掉前置的空格
  2. 判断符号位，如果符号位超过一个则不合法，直接返回0
  3. 最后遍历所有数字位，把符号位和数字结合
  4. 限制范围在`-2**31`到`2**31-1`之间
   ```js
    /**
     * @param {string} s
     * @return {number}
     */
    var myAtoi = function(s) {
        let pre="",num="",idx=0
        while(s[idx]===" "){
            idx++;
        }
    
        while(s[idx]==="+"||s[idx]==="-"){
            if(pre){
                return 0;
            }
            pre=s[idx++];
        }
    
        while(s[idx]&&s[idx].charCodeAt()>=48&&s[idx].charCodeAt()<=57){
            num+=s[idx++];
        }
    
        let res=Number(pre+num)||0;
        res=Math.max((-2)**31,res);
        res=Math.min(2**31-1,res);
        return res
    };
  ```
  :::
  
  


## [神兔网络] 6.21

20 分钟

- get 不到面试官的问题，心累


## [智云健康] 二面 6.21 

30分钟
前端：32人，20个B2B电商业务（PC端）12个h5
技术：vue

- vue 的响应式数据，是对data做的响应式，还上对每个属性做的响应式 ❌
    - 对每个属性做的代理，如果是对象或数组，会遍历里面的属性去做代理
    - Object.defineProperty 只能劫持对象的属性，而 Proxy 是直接代理对象。

- vue 中可以监听到数组下标或长度的变化么
    - 不可以，为了考虑性能没有做

- Object.defineProperty 可以监听到数组的下标么
    - Object.defineProperty 在数组中的表现和在对象中的表现是一致的，数组的索引就可以看做是对象中的 key。
    1. 通过索引访问或设置对应元素的值时，可以触发 getter 和 setter 方法
    2. 通过 push 或 unshift 会增加索引，对于新增加的属性，需要再手动初始化才能被observe。
    3. 通过 pop 或 shift 删除元素，会删除并更新索引，也会触发 setter 和 getter 方法。
    - 所以，Object.defineProperty 是有监控数组下标变化的能力的，只是vue2.x放弃了这个特性。

- 你感觉 vue 为什么不用 Object.defineProperty 监听数组下标变化
    - 性能问题
    - 因为length = 5的数组，未必索引就有4，这个索引(属性)不存在，就没法setter了。
    


## [网易云音乐] 6.18 

电话面试 50 分钟

- css 实现上下左右居中的方法
- margin: 0 auto; 什么情况下使用（迷惑问题get不到点）
- css flex 布局
- justify-content 有那些属性
- flex-direction 有那些属性
- css 有那些动画（写的不多，回答不好）❌
    - 说了 transition 过渡
    - animation 动画
- 说下 js 的数据类型
    - 说了 symbol 
- symbol 在什么场景下使用 ❌
- null == undefined 返回什么
- 防抖和节流说下
- 实现一个防抖函数
- 数组中删除一个指定下标元素的方法，返回一个新数组
    - splice
    - filter
    - reduce
- es6的 map 了解么，map 有那些方法 ❌
    - 没有回答好，没有使用的场景
- 说下 Generator 和 async/await 的关系
- 说下 Promise.all
- 代码实现下 Promise.all (实现了丝毫不慌)
- 说下前端首屏优化大概有那些方法
    - 路由懒加载，代码分割
    - 图片懒加载
    - 骨架图
    - 开启 gzip（nginx和webpack）
    - vue 可以使用异步组件 和 v-if 空显示隐藏
    - 利用好script标签的async和defer这两个属性
    - 使用 服务端渲染 SSR
- 说下服务端渲染有什么好处和问题（没有项目实践，不太清楚）
    - 对搜索 seo 友好
    - 渲染快
    - 没有浏览器环境的api，需要服务器资源
- 剩下的就问一些项目的问题
    - 微前端解决了那些问题
    - 怎么推动了 iconfont
    - 文档在线编辑中台怎么做的
    - .....
- 你什么想问题



  
 


## [哈啰单车] 6.15

- 说下项目中比较亮眼的东西
- qiankun 的js沙箱隔离是怎么实现的
    - 快照沙箱是 qiankun1.0的思路
    - 2.0 使用的 es6 Proxy
- 为什么要实现沙箱
- qiankun 的样式隔离是怎么实现的
- 样式的严格模式是怎么实现的
- qiankun 的应用通信有哪几种
- 子应用直接通信用的什么
- vue 中挂载实例的data可以是对象，组件里面data为什么必须是函数
- vue 为什么只有一个挂载实例
- 计算属性和监听属性的使用场景
- 计算属性的实现 ❌
- 组件diff的过程
- keep-alive 实现原理
- keep-alive 如果定制缓存，max：20个，我需要缓存10个，超出缓存后如果保证优先这10个
- nextTick 的实现原理
- 说下js的事件循环
- 浏览器渲染是什么任务
- 说下 v-if 和 v-show 的区别，vue在编译的时候怎么处理这2个指令的
- 说下 vue 中对数组的重写是如何实现的 ❌
- 实现一个多少秒内，执行一个指定的函数的方法
- 如何实现 const
- 如何实现 reduce ❌
- 数组去重的方法
- webpack 配置那些
- webpack 热更新实现原理 ❌
- https 是如何判断证书的
- 对称加密和非对称加密的区别 ❌


## [微店面试] 6.15

- BFC说下
- 层级上下文说下
- js 原型和原型链
- 说下原型继承，以及有什么问题，怎么解决
- new 的实现原理
- 说下防抖，项目中什么场景用到过
- 下面的代码输出什么，怎么输出正常
    ```js
      for (var i = 0; i < 10; i++) {
          setTimeout(function () {
              console.log(i);
          }, 1000);
      }
    ```
  - 输出：10个 10
  - 方法1：利用闭包
  ```js
    for (var i = 0; i < 10; i++) {
        (function (j) {
            setTimeout(function () {
                console.log(j);
            }, 1000)
        })(i);
    }
  ```
  - 方法2：将 var 改为 let， 使用 es6 语法  
- tcp的为什么要3次，2次不行么 ❌
- 浏览器缓存的流程是什么样的
- vue 中 nextTick 是什么，大概说下怎么实现的
- vue3 和 vue2 的一些区别，简单说下
- vue 的渲染过程（包括了编译过程）
- vue 是如何编译的 .vue 文件的，如何区分 template、js、style
- 编译方面有了解过么 ❌
- vue-loader 了解过么 ❌
    - 自我理解的作用：解析转换.vue文件。提取出script，css，template，再分别交给对应的loader去处理。核心就是提取。
    - 官方定义：
    - 1、允许为vue组件的每个部分使用他的webpack loader，例如在style中使用sass，在template中使用Pug
    - 2、允许一个.vue文件中使用自定义块，并对其运用自定义的loader链
    - 3、使用webpack loader将style，template中引用的资源当作模块依赖处理
    - 4、为每个组件模拟出scoped css
    - 5、在开发过程中使用热重载来保持状态
- webpack 的打包流程是什么样
- 常用的 loader 知道那些
- loader 的工作流程是什么的
- 项目工程化上配置过那些东西（有配置过 webpack 么）
- 微前端为什么不用 iframe 实现
- 能简单说下 qiankun 的实现原理么
    - 应用入口
    - js 隔离
    - 样式 隔离
    - 应用通信
- 项目中遇到的问题
- 项目中比较有成就感的事情
- 沟通上有木有遇到问题


## [哈啰单车] 6.2

- 说下对项目做了那些贡献
- 说下封装了那些组件
- 写过 node 么、写过 react 么 ❌
- 你做过那些前端优化
- 前端异常捕获怎么做，API是什么 ❌
- 怎么看前端加载的性能 ❌
- a文件引用b文件，b文件引用a文件，webpacke 打包会出现什么问题 ❌
- map 和 weakMap 的却别
- 说下事件循环
- 说下防抖和节流
- css 的 scoped 属性是什么，原理是什么 ❌
    - 会对每个文件生成一个随机编码，编译后会添加到标签上和 class 上
    - 添加到 dom上  `<div data-v-19e726ed class="box"></div>`
    - `.box[data-v-xxxx]`
- 怎么预防 css 污染 
- css像素和物理像素的却别 ❌
- flex: 1，是那个属性的缩写，分别代表什么
- rem 是什么
- html font-size: 10px，12rme 是多少像素 ❌
- JSBridge 的通信原理
    - https://juejin.cn/post/6844903585268891662
- 说下 http 缓存
- 命中协商缓存的状态码是多少，没有命中状态吗是多少 ❌
- 强缓存的状态码是多少
- vue2 和 vue3 的区别
- 如果监听一个对象的属性 obj.a，为什么可以监听
- vue data里面嵌套引用怎么处理的 obj.a = 1, obj.b = obj.a
- vue 里面 key 如果是一个随机数，会有什么问题
- vue 什么时候会触发 update 钩子
- vue 是怎么样吧 template 处理成js的，v-if、v-for 指令是什么时候处理的
- render 函数返回了什么


## [政采云] 4.20

电话面试 50分钟

面试官围绕项目提问

- 1-2分钟时间围绕项目做个自我介绍
- js 中 == 和 === 有什么区别
- `1 == true` 为什么相等（没有回答上来）  ❌
    - 隐式转换
- 0.1 + 0.2 什么不等于 0.3，有什么解决方法   ❌
    - 浮点数采用 IEEE标准，二进制双精度的存储格式
    - 存储阶段会采用科学计数发存储，会导致精度丢失
    - 运算阶段 精度又一次丢失
    - 解放方法：第三方库 Math.js
    - 解决方法：把计算数字 提升 10 的 N 次方 倍 再 除以 10的 N 次方。 N > 1 `(0.1 * 1000 + 0.2 * 1000) / 1000 == 0.3`
    
- 说下深拷贝的实现
- 说下怎么判断 Date 类型，顺便说了 instanceof 判断原理
- css 盒模型
- 三栏布局，越多越好
- vue 的声明周期，分别用到那些
- 销毁钩子里面为啥要清除定时器
- keep-alive 了解么，怎么实现的 
- keep-alive 缓存上限是多少（没有回答上来，具体没有使用过）❌
    - `inclue`：字符串或者正则表达式。只有名称匹配的组件会被缓存
    - `exclue`: 字符串或者正则表达式。任何名称匹配的组件都不会被缓存。
    - `max`: 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。
- v-for 循环的时候，为什么需要添加 key 属性
- vue 中组件通讯
- qiankun 中怎么实现 样式隔离
- qiankun 基石应用中如果给body 设置来样式，怎么不影响子应用
    - 回答来 子应用使用 !important 属性，但是感觉好像不对
- get 和 post 区别
- post 请求 url 可以传参数么（应该可以，但是我回答错误）❌
- 为什么对接qiankun、qiankun解决什么问题、带来了什么收益
- 问了3个项目中的问题，同上


## [小电科技] 4.16

面试官很 nice，到面 1个小时

- 手写几个常用的 es6 的方法
    - 写了 concat、find、findIndex、async / await、promise、let、const
- promise 有几种状态 
- promise 的状态改变后，还可以还原么
- promise.then 为什么可以链式调用
- 常用的 promise 的方法
- promise.race 和 promise.all 区别
- let / const 和 var 有区别 
- let / const 作用域是什么作用域（块级）
- **const 为什么不能重新赋值、为什么不能重新声明** ❌
    - const 指针指向不可以改变，指向地址的内容是可以改变的。
    因为 const 只是保证了对象的的指针不变，而对象的内容改变不会影响到指针的改变，所以对象属性是可以修改的
- async / await 是什么语法糖
- generator 有了解过么 ❌
- webpack 从 0-1 有没有配置过，应该去了解的 ❌ 
- webpack 了解么，第一个层级有那些属性（没有回答上来，要学习webpack了）
- 说下 vue 的双向绑定实现原理
- 说下 前端路由 / 后端路由
- 如果是 history 模式，需要后段配置什么，为什么要配置
- 浏览器输入后回车的事情 
- qiankun 是基于什么实现的 ❌
- 小程序了解么
- taro、Uni-app 实现理解么，应该去了解下
- 说下前端架构上做了什么 
- 如果项目延期了你会怎么过，从自己和自己带的同学2个方面回答


## [有赞] 4.15

电话面试：80分钟

面试官不错，问题由浅到深，也很明确，会做简单的引导
- js 基础
    - 常用的数组方法那些
    - Array.find 返回什么、匹配不到返回什么
    - Array.findIndex 返回什么，匹配不到返回什么
    - Array.filter 用过么
    - Array.concat 用过么，返回什么，会修改数组么
        - 这个回答错误了，会返回一个新的数组
    - js 的对象怎么遍历
        - 说了 for-in、Object.keys、Object.values
    - for-in 和 for-of 的区别是什么 能遍历数组么
    - 怎么判断数据类型
- es6
    - async / await 是谁的语法糖
    - Generator 有了解过么 ❌
    - promise 的有几种状态
    - promise 常用的几种方法
        - Promise.all、Promise.reject、Promise.resolve()
    - Promise.race 有用到么，和 Promise.all 区别是什么
    - Promise.then 为什么可以链式调用
    - Promise.then 为什么可以写多个
    - Promise.finally 是什么，为什么没有用到，如果修改状态你是怎么做的
        - 用 try catch finally
    - Promise.allSettled 了解么，有用过么 ❌
    - Map 了解过么 ❌
    - WeakMap 了解么 ❌
    - js 垃圾回收机制了解么（由 WeakMap 引出） ❌
    - js 内存泄漏了解过么 ❌
- vue 框架
    - vue 的 data 为什么是一个函数（这个没有回答上来，难受）❌
        - 保证每个vue组件实例的 data 具有独立性，互不影响
    - **vue 中 props、data、computed 加载顺序** ❌
    - vue 组件之间的通讯
    - **provide / inject 有用过么，有什么注意的**
    - 说下 diff 算法流程 ❌
    - 说下 vue 对 diff 算法做了那些优化 ❌
- 其他
    - webpack了解多少，有木有配置过什么，有木有自己通过 webpack 搭建脚手架
        - 自己没有搭建过，经常用是 vue-cli ，一些简单的配置，后续没有问
    - http1.0 和 http2.0 的区别，2.0做了那些提升 ❌
    - XSS 跨站脚本攻击 是什么，怎么预防，项目中有木有遇到 **（更强调是现实项目中怎么预防）**
    - CSRF 跨站请求伪造 是什么，怎么预防，项目中有木有遇到 **（更强调是现实项目中怎么预防）**
    - css 实现 水平垂直居中
    - TS 的泛型是什么，泛型类型是什么 ❌
- 3个笔试题 45 分钟
1. 实现一个对象深拷贝的方法

面试管：基本实现了，但是循环引用，递归爆栈没有考虑到

```javascript
/**
 * 1. 实现一个对象深拷贝的方法？尽可能考虑特殊情况，考虑下循环引用，递归爆栈的问题？
 */

function deepCopy(obj) {
  // ...
}
```

::: details 点击查看代码
todo
:::


2. 实现 getValue 函数来获取path对应的值（没有思路）

面试官：可以字符串分割，然后递归取值
```javascript
/**
 * 2. 实现 getValue 函数来获取path对应的值
 */

var object = { 'a': [{ 'b': { 'c': 3 } }] }; // path: 'a[0].b.c'
var array = [{ "a": { 'b': [1] } }]; // path: '[0].a.b[0]'

function getValue(obj, path, defaultValue) {
}

console.log(getValue(object, 'a[0].b.c', 0));  // 输出3
console.log(getValue(array, '[0].a.b[0]', 12)); // 输出 1
console.log(getValue(array, '[0].a.b[0].c', 12));  // 输出 12
```

::: details 点击查看代码
todo
:::


3. 实现一个信息脱敏的方法

```javascript
/**
 * 3. 实现一个信息脱敏的方法， 如：手机号信息脱敏 15924167134 -> 159****7134, 可以设置脱敏的起始位置，
 * 并考虑如何解决emoji等特殊字符。
 */
 // 哈哈哈😝😝😝 -> 哈哈***😝

function parser(str, start, end) {
}
``` 
::: details 点击查看代码
```javascript
const astralRange = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g
function parser(str, start, end) {
  const strArray = str.match(astralRange) || []
  for (let i = start; i < end; i++) {
    strArray[i] = '*'
  }
  return strArray.join('')
}
parser('123😀1️⃣👨‍👨‍👦👨‍👩‍👧‍👦', 1, 6)
```
:::


## [数澜科技] 4.15

电话面试：5分钟

没有 react 项目经验，简历筛选失误，面试结束


## [览众数据] 4.14

电话面试：35分钟

面试官心高气傲，不知道面试官再问什么，心累

- 说说 qiankun 遇到的问题
- 说说 vue-router 是怎么实现的
- 说说 兄弟组件的直接通讯
- 说说对 Object.defineProperty 了解
- 闭包是什么，有什么好处和缺点
- 说下 vue 生命周期
- updated 钩子没有用到过么（特么的，我真没有用到过）
- 大文件的断点上传能简单说下，有那些需要注意的
- 10000条数据，渲染树形结构，有什么思路么
- 表格的固定列或行怎么实现。
    说了element的是怎么实现，面试官想问的，数据懒加载，害
 


## [安恒信息] 4.14

电话面试：35分钟

- BFC是什么 ❌
    - 格式化上下文，它是一块特殊的渲染容器，是一个独立的容器
    - 形成条件
        1. overflow:hidden/auto
        2. float除了none以外的值
        3. 定位元素，定位元素，position、absolute、fixed
        4. display 为以下值 inline-block、table-cel
    - 特点、作用
        1. 解决 margin 重叠问题
        2. bfc 不会被 float 的元素覆盖
        3. 撑起含有浮动元素的父元素的高度
- 三栏布局怎么实现
- css 实现一个三角形
- 说下 vuex
- 说下计算属性和监听属性
- http1.0 和http2.0 区别了解么 ❌（还好今天上午看了）
- 如何实现一个没有原型的对象（这个没有回答上来）
    - `Object.create(null)` 
    - 相当于是最顶层的 Object.prototype
- vue 源码有了解么
- 100个请求，每次请求5个，
- webpack 了解么，有配置过什么东西么
- 说下为什么用 qiankun，遇到了那些问题
- 能说下简单架构方面要那些事情做


## [校史] 4.13

电话面试：45分钟

- 能说说项目中为啥用了微前端么
- 能说说为啥封装的在线文档编辑的中台么
- Object.defineProperty 有什么缺点
- vue 编译 template 的过程
- vue 渲染 dom 的过程
- nextTick 怎么实现的
- http 缓存了解么
    说了强缓存和协商缓存，具体的属性不清楚，没有说
- 说说作用域和作用域链的理解
- webpack 有配置过什么东西么
- 除了get 和 post 请求方式还知道那些，
- options 了解么，为什么会出现
- 说说知道的解决跨域的方法


## [光云科技] 4.12 

电话面试：35分钟左右

- 职业规划是什么
- 分支管理是什么流程
- 请说下作用域和作用域链
- 字符串转 number 有那些方法
- 节流和防抖了解么
- ES6 了解那些
- promise 了解么
- 传统页面和单页面的区别，单页面有那些优点和缺点
- 打包后 index.html加载白屏怎么办，首屏幕优化
    - vue-router 路由懒加载（利用 webpack的代码切割）
    - 使用 cnd 加速，通用
- http 协议了解么
- http 的状态码有那些
- 从输入URL到浏览器显示页面过程中都发生了什么
- vue 的双向绑定怎么实现的
- vue 的指令有了解么
- vue 组件是什么（不理解什么意思）
- vue 组件之间的通讯有那些
- flex 有那些属性
- 用 flex 实现上下左右居中
- css 画一个三角形 ❌

::: details 点击查看代码

当 border 足够宽的时候，图形就有4个三角形拼凑而成

```css
/* 三角形 */
#demo {
  width: 0px;
  height: 0px;
  /* 其他设置成 透明色 */
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 40px solid red;
}
```
:::