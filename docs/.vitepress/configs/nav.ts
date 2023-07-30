import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '🏠 Home', link: '/' },
  { text: '🗒 日常笔记', link: '/notes/', activeMatch: '^/notes/' },
  { text: '📟 前端相关', link: '/fe/', activeMatch: '^/fe/' },
  { text: '🌈 彩虹桥', link: '/bifrost', activeMatch: '^/bifrost' },
]
