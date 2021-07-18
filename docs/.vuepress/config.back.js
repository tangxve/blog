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
      { text: 'MacOS', link: '/app/' },
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
        path: '/app/',
        collapsable: true,
        children: [
          '/app/chrome/',
          '/app/homebrew/',
          '/app/nvm/',
          '/app/sh/'
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
