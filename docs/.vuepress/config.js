// console.log('process.env', process.env)

const isDev = process.env.NODE_ENV === 'development'

// console.log('process', process.cwd())
// const isDev = true

module.exports = {
  base: '/blog/',
  title: 'TangXve',
  description: '一些记录和沉淀',
  dest: './dist',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo-2.jpeg' }]
  ],
  theme: '',
  port: 9000,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    repo: 'https://github.com/tangxve',
    repoLabel: 'Github',
    smoothScroll: true,
    // displayAllHeaders: true,
    lastUpdated: '最后更新时间',
    nav: [
      { text: 'Home', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: '设计模式', link: '/designPattern/' },
      { text: '常用软件', link: '/app/' },
      { text: '前端相关', link: '/fe/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' },
    ].concat(isDev ? [{
      text: '知识体系', link: '/frontEnd/'
    }] : []),
    subSidebar: 'auto',
    sidebar: {
      '/designPattern/': [{
        title: '设计模式',
        path: '/designPattern/'
      }],
      '/fe/': [
        {
          title: '前端基础',
          collapsable: false,
          path: '/fe/',
          children: [
            '/fe/js/1-1-数据类型',
            '/fe/js/1-2-类型判断原理',
            '/fe/js/2-1-作用域',
            '/fe/js/2-2-闭包',
            '/fe/js/3-1-原型',
            '/fe/js/3-2-继承',
            '/fe/js/3-3-new 关键字',
            '/fe/js/4-1-this和执行上下文',
            '/fe/js/4-2-call-apply-bind',
            '/fe/js/4-3-箭头函数和普通函数',
            '/fe/js/5-1-说下 event loop',
            // '/fe/js/5-2-宏任务和微任务的区别',
            // '/fe/js/5-3-浏览器的执行顺序',
            '/fe/js/6-1-var-let-const区别',
            '/fe/js/6-2-Promise',
            '/fe/js/6-3-generator原理',
            '/fe/js/6-4-async、await',
            '/fe/js/6-5-Set 和 Map 数据结构',
            // '/fe/js/6-6-JS 怎么实现 let 和 const 作用域的',
            // '/fe/js/6-7-JS Babel 和 polyfill',
            '/fe/js/ESModule',
            '/fe/js/8-1-js执行过程',
            '/fe/js/8-2-js 垃圾回收',
            '/fe/js/8-3-内存泄露',
            '/fe/js/深浅拷贝',
            '/fe/js/函数柯理化',
            '/fe/js/防抖和节流',
            '/fe/js/浮点数精度问题',
            '/fe/js/各种循环的区别',
          ]
        },
        {
          collapsable: false,
          title: 'Vue 系列',
          path: '/fe/vue/'
        },
        {
          collapsable: false,
          title: 'React 系列',
          path: '/fe/react/'
        },
        {
          title: 'Css 系列',
          path: '/fe/css/'
        },
        {
          title: 'Http 系列',
          path: '/fe/http/'
        },
        {
          collapsable: false,
          title: 'webpack',
          path: '/fe/webpack/'
        },
        {
          title: 'TypeScript 系列',
          path: '/fe/ts/'
        },
        {
          title: '微前端',
          path: '/fe/microFE/'
        },
        {
          title: '渲染页面过程',
          path: '/fe/http/渲染页面过程'
        },
      ].concat(isDev ? {
        title: 'coding',
        path: '/fe/coding/'
      } : []),
      '/notes/': [
        {
          title: '日常笔记',
          collapsable: false,
          path: '/notes/',
          children: [
            'src/quillEditor自动获取焦点问题.md',
            'src/引用多个版本npm包.md',
            'src/zsh更新.md',
            'src/electron',
            'src/富文本内容样式问题',
            'src/Mac前端开发环境',
            'src/高性能渲染十万条数据',
            'src/微信支付开发流程',
            'src/vue2+ts路由钩子函数不生效',
            'src/git',
            'src/微信公众号开发流程',
          ]
        },
      ],
      '/app/': [
        {
          title: '常用软件',
          collapsable: false,
          children: [
            '/app/chrome/',
            '/app/homebrew/',
            '/app/nvm/',
            '/app/sh/',
            '/app/webstrom/'
          ]
        }
      ],
      '/frontEnd/': [
        '/frontEnd/Javascript/',
        '/frontEnd/CSS/',
        '/frontEnd/HTML/',
        '/frontEnd/性能优化/',
      ]
    },
  },
  plugins: [
    '@vuepress/back-to-top',
    [
      'vuepress-plugin-zooming',
      {
        selector: '.page img',
        delay: 1000,
        options: {
          bgColor: 'black',
          zIndex: 10000
        }
      }
    ]
  ]
}
