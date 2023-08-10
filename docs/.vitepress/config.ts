import { defineConfig } from 'vitepress'

import { nav, sidebar, head } from './configs'

export default defineConfig({
  outDir: '../dist',
  base: process.env.APP_BASE_PATH || '/',

  title: '知食',
  description: 'A VitePress Site',
  lastUpdated: true,
  cleanUrls: true,
  head,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true
  },

  /* 主题配置 */
  themeConfig: {
    logo: '/logo.png',
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangxve' }
    ]
  }
})
