// console.log('process.env', process.env)

// const isDev = process.env.NODE_ENV === 'development'
const isDev = true
const fs = require('fs')
const path = require('path')

const pathName = './docs/fe/js'

fs.readdir(pathName, function (err, files) {
  console.log('files:', files)
  
})

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
              title: '作用域 与 闭包',
              collapsable: false,
              children: [
                '/fe/js/2-1-作用域',
                '/fe/js/2-2-闭包',
              ]
            },
            {
              title: '原型 与 继承',
              collapsable: false,
              children: [
                '/fe/js/3-1-原型',
                '/fe/js/3-2-继承',
                '/fe/js/3-3-new 关键字',
              ]
            },
            {
              title: 'this 与 执行上下文',
              collapsable: false,
              children: [
                '/fe/js/4-1-this和执行上下文',
                '/fe/js/4-2-call-apply-bind',
                '/fe/js/4-3-箭头函数和普通函数',
              ]
            },
            {
              title: 'Event Loop（事件机制）',
              collapsable: false,
              children: [
                '/fe/js/5-1-说下 event loop',
                // '/fe/js/5-2-宏任务和微任务的区别',
                // '/fe/js/5-3-浏览器的执行顺序',
              ]
            },
            {
              title: 'ES6 / ES7 相关',
              collapsable: false,
              children: [
                '/fe/js/6-1-var-let-const区别',
                '/fe/js/6-2-Promise',
                '/fe/js/6-3-generator原理',
                '/fe/js/6-4-async、await',
                '/fe/js/6-5-Set 和 Map 数据结构',
                // '/fe/js/6-6-JS 怎么实现 let 和 const 作用域的',
                // '/fe/js/6-7-JS Babel 和 polyfill',
              ]
            },
            {
              title: 'JS 单线程的理解',
              collapsable: false,
              children: []
            },
            {
              title: 'JS 引擎相关（V8）',
              collapsable: false,
              children: [
                '/fe/js/8-1-js执行过程',
                '/fe/js/8-2-js 垃圾回收',
                '/fe/js/8-3-内存泄露',
              ]
            },
            {
              title: '其他',
              collapsable: false,
              children: [
                '/fe/js/深浅拷贝',
                '/fe/js/函数柯理化',
                '/fe/js/防抖和节流',
                '/fe/js/浮点数精度问题',
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
