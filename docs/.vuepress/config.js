module.exports = {
  title: 'Geek',
  description: 'face icu coding',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/study.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    displayAllHeaders: false,
    activeHeaderLinks: false,

    nav: [
      {
        text: 'blog日常',
        items: [
          { text: '前端', link: '/FrontEnd/' },
          { text: '技术专题', link: '/TechnicalTopics/' },
          { text: '其他', link: '/Other/' },
          { text: '读书笔记', link: '/Notes/' },
        ],
      },
      {
        text: '开源',
        items: [
          { text: '图床', link: 'https://img.xjq.icu' },
          {
            text: '前端知识点',
            link: 'https://www.processon.com/view/link/5f4647640791297ca40fe328',
          },
          {
            text: 'http协议',
            link: 'https://www.processon.com/view/link/5f47621df346fb3c83ca1407#map',
          },
          {
            text: 'AwesomeStudy',
            link: 'https://github.com/SummerJoan3/awesome-study',
          },
          { text: '我的Github', link: 'https://github.com/SummerJoan3' },
          { text: '我的LeetCode', link: 'https://leetcode-cn.com/u/xjq_' },
        ],
      },
      {
        text: '友链',
        items: [{ text: '天真的小窝', link: 'http://bin.zmide.com/' }],
      },
    ],
    sidebar: {
      '/FrontEnd/': [
        '',
        'Apk-build',
        'Bignumberjs',
        'Crontab',
        'Css',
        'Custom-hook',
        'Customize-iconfont',
        'Debounce-Throttle',
        'Deploy-img',
        'Es6-module',
        'Form-register',
        'Hooks',
        'Js-accuracy',
        'Js',
        'Node-pm2',
        'String-method',
        'Traversing',
        'Vscode',
        'React-native',
        'Debug',
      ],
      '/TechnicalTopics/': ['', 'Git', 'DesignPattern', 'Net'],
      '/Other/': ['', 'Firewall'],
    },
  },
  plugins: [
    [
      'ribbon',
      {
        size: 90, // 彩带的宽度，默认为 90
        opacity: 0.6, // 彩带的不透明度，默认为 0.3
        zIndex: 999, // 彩带的 z-index 属性，默认值为 -1
      },
    ],
    [
      'dynamic-title',
      {
        showIcon: '/favicon.ico',
        showText: '(/≧▽≦/)咦！又好了！',
        hideIcon: '/failure.ico',
        hideText: '(●—●)喔哟，崩溃啦！',
        recoverTime: 2000,
      },
    ],
    [
      'cursor-effects',
      {
        size: 6, // size of the particle, default: 2
        shape: 'star', // shape of the particle, default: 'star'
        zIndex: 999999999,
      },
    ],
    [
      'vuepress-plugin-awesome-gitalk',
      {
        log: true,
        enable: true,
        //最大重试次数
        maxRetryCount: 5,
        // 默认是检查时间
        defaultCheckMinutes: 500,
        // 是否开启首页评论
        home: false,
        // 关闭 Gitalk 评论页面, 需要绝对匹配 fullPath, eg: /docs/
        ignorePaths: ['/'],
        // gitalk 配置
        gitalk: {
          clientID: 'b58b55371a09c91da91c',
          clientSecret: '57b12a77745432b22d7583347f7b724cb5858975',
          repo: 'bloggitalk',
          owner: 'SummerJoan3',
          admin: ['SummerJoan3'],
          language: 'zh-CN',
        },
      },
    ],
    'vuepress-plugin-reading-time',
  ],
}
