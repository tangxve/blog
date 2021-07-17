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
    sidebar: {
      '/fe/': [
        {
          title: '前端基础',
          collapsable: true,
          path: '/fe/',
          children: [
            {
              title: '数据类型',
              collapsable: false,
              children: [
                '/fe/js/1-1-数据类型',
                '/fe/js/1-2-类型判断原理',
              ]
            },
            {
              title: '原型与继承',
              collapsable: false,
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: '作用域 与 闭包',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: 'this 与 执行上下文',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: 'Event Loop（事件机制）',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: 'ES6 / ES7 相关',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: 'JS 单线程的理解',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: 'JS 引擎相关（V8）',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            {
              title: '其他',
              children: [
                '/fe/js/3.1-原型',
                '/fe/js/3.2-继承',
              ]
            },
            
          ]
        },
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
          title: '面经',
          path: '/mianshi/面试记录',
        },
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
