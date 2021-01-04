module.exports = {
  base: '/',
  title: '知食',
  description: '大明湖畔-王翠花',
  dest: './dist',
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
      { text: 'Google', link: 'https://google.com' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' },
    ],
    sidebar: [
      {
        title: '面试',
        path: '/mianshi/',
        collapsable: true,
        sidebarDepth: 4,
        children: [
          '/mianshi/CSS相关/',
          '/mianshi/JS基础方面/',
          '/mianshi/JS手写方法/',
          '/mianshi/算法/',
        ]
      },
      {
        title: '工作方面',
        path: '/work/',
        collapsable: true,
        sidebarDepth: 4,
        children: [
          '/work/安全各个平台访问地址汇总',
          '/work/标准签微前端方案/',
          '/work/编辑中台/',
          '/work/印章管理/',
          '/work/任务中心/',
          '/work/optimize/',
          '/work/header/',
        ]
      },
      {
        title: '笔记',
        path: '/notes/',
        collapsable: true,
        sidebarDepth: 4,
        children: [
          '/notes/WeChat/',
        ]
      },
      {
        title: 'MacOS',
        path: '/mac/',
        collapsable: true,
        children: [
          '/mac/chrome/',
          '/mac/homebrew/',
          '/mac/nvm/',
          '/mac/sh/',
        ]
      },
      {
        title: '知，食',
        path: '/zhishi/',
      }
    ],
    lastUpdated: '上次更新',
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
          zIndex: 10000,
        },
      },
    ],
  ]
}
