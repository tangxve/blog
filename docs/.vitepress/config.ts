import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '知食',
  description: 'A VitePress Site',
  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '🌈 彩虹桥', link: '/bifrost' },
      { text: '日常笔记', link: '/a' },
      { text: '前端相关', link: '/b' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
