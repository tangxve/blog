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
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'MacOS', link: '/mac/' },
      { text: 'Google', link: 'https://google.com' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/' },
    ],
    sidebar: [
      {
        title: '笔记',
        path: '/notes/',
        collapsable: false,
        sidebarDepth: 4,
        // displayAllHeaders: true,
        children: [
          '/notes/WeChat/'
        ]
      },
      {
        title: 'MacOS',
        path: '/mac/',
        collapsable: false,
        children: [
          '/mac/chrome/',
          '/mac/homebrew/',
          '/mac/nvm/',
          '/mac/sh/',
        ]
      },
      {
        title: '知食',
        path: '/zhishi/',
        // collapsable: false,
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
