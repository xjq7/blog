import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'xjq blog',
  description: 'xjq 代码库 随手记 博客',
  appearance: true,
  base: '/',
  head: [['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }]],
  markdown: {
    theme: 'monokai',
    lineNumbers: true,
    toc: {
      level: [1, 2, 3, 4],
    },
  },
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/xjq7' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present xjq',
    },
    siteTitle: 'xjq',
    editLink: {
      pattern: 'https://github.com/xjq7/blog/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
