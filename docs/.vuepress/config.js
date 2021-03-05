module.exports = {
  base: '/',
  title: '知食',
  description: '大明湖畔-王翠花',
  dest: './dist',
  head: [
    ['link', {rel: 'icon', href: '/logo-2.jpeg'}]
  ],
  theme: '',
  port: 9000,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
      {text: 'MacOS', link: '/mac/'},
      {text: 'Google', link: 'https://google.com'},
      {text: 'VuePress', link: 'https://vuepress.vuejs.org/zh/'}
    ],
    sidebar: [
      {
        title: '面试',
        path: '/mianshi/',
        collapsable: true,
        sidebarDepth: 4,
        children: [
          '/mianshi/JS/原型和原型链',
          '/mianshi/CSS相关/',
          '/mianshi/JS手写方法/',
          '/mianshi/算法/'
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
        title: '知，食',
        path: '/zhishi/'
      }
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
