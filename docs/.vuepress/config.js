// console.log('process.env', process.env)

const isDev = process.env.NODE_ENV === 'development'

// console.log('process', process.cwd())
// const isDev = true

module.exports = {
  base: '/blog/',
  title: '知食',
  description: '大明湖畔-王翠花',
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
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '前端基础', link: '/fe/', items: [
          { text: '前端基础', link: '/fe/' },
          { text: 'webpack 相关', link: '/fe/webpack/' },
          { text: '微前端 相关', link: '/fe/microFE/' }
        ]
      },
      {
        text: '笔记', link: '/notes/'
      },
      { text: '常用软件', link: '/app/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' },
      { text: 'GitHub', link: 'https://github.com/tangxve' }
    ],
    // displayAllHeaders: true,
    sidebar: {
      '/fe/': [
        {
          title: '前端基础',
          collapsable: true,
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
            '/fe/js/浮点数精度问题'
          ]
        },
        {
          collapsable: true,
          title: 'Vue 系列',
          path: '/fe/vue/'
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
          collapsable: true,
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
        {
          title: 'coding',
          path: '/fe/coding/'
        }
      ],
      '/notes/': [
        {
          title: '笔记',
          children: [
            '/notes/WeChat/',
            '/notes/git/',
            '/notes/vue-property-decorator 引入路由钩子函数',
            '/notes/react/',
          ]
        }
      ],
      '/app/': [
        {
          title: '常用软件',
          children: [
            '/app/chrome/',
            '/app/homebrew/',
            '/app/nvm/',
            '/app/sh/',
            '/app/webstrom/'
          ]
        }
      ]
    },
    lastUpdated: '上次更新'
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
