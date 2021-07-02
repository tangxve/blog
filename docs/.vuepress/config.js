// console.log('process.env', process.env)

// const isDev = process.env.NODE_ENV === 'development'
const isDev = true

module.exports = {
  base: '/notes/',
  title: '知食',
  description: '大明湖畔-王翠花',
  dest: './dist',
  locales: {
    '/': {
      lang: 'zh-CN',
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
      { text: 'MacOS', link: '/mac/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' },
      // { text: 'GitHub', link: 'https://github.com/Tang1118' },
    ],
    sidebar: [
      {
        title: '知，食',
        path: '/zhishi/'
      },
      {
        title: 'MacOS',
        path: '/mac/',
        collapsable: true,
        children: [
          '/mac/chrome/',
          '/mac/homebrew/',
          '/mac/nvm/',
          '/mac/sh/'
        ]
      },
      {
        title: '笔记',
        path: '/notes/',
        collapsable: true,
        sidebarDepth: 4,
        children: [
          '/notes/WeChat/'
        ]
      },
      {
        title: 'webpack',
        path: '/webpack/'
      },
      {
        title: '微前端',
        path: '/microFE/'
      },
      {
        title: '前端基础',
        path: '/fe/',
        sidebarDepth: 3,
        children: [
          '/fe/js/var-let-const区别',
          '/fe/js/数据类型',
          '/fe/js/作用域和作用域链',
          '/fe/js/闭包',
          '/fe/js/原型和原型链',
          '/fe/js/this的指向',
          '/fe/js/call-apply-bind',
          '/fe/js/instanceof',
          '/fe/js/模拟实现call-apply-bind',
          '/fe/js/new操作符',
          '/fe/js/继承',
          '/fe/js/深浅拷贝',
          '/fe/js/防抖和节流',
          '/fe/js/promise/Promise',
          '/fe/js/事件循环',
          '/fe/js/ESModule',
          '/fe/js/数组',
          '/fe/js/算法',
        ]
      },
      {
        title: 'Vue 面试',
        path: '/mianshi/vue/'
      },
      {
        title: 'JS 面试',
        path: '/mianshi/js/'
      },
      {
        title: 'Css 面试',
        path: '/mianshi/css/'
      },
      {
        title: 'http 面试',
        path: '/mianshi/http/'
      },
      {
        title: '面试',
        path: '/mianshi',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/mianshi/算法/',
        ].concat(isDev ? ['/mianshi/面试记录'] : [])
      },
    ],
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
