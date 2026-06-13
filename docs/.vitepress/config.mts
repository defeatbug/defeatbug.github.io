import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Learning Notes',
  description: 'AI · 编程 · 思考 — 记录所学，分享所得',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '学习', link: '/learn/' },
    ],

    search: {
      provider: 'local',
    },

    sidebar: {
      '/learn/': [
        {
          text: '学习路线',
          items: [
            { text: '总览', link: '/learn/' },
          ],
        },
        {
          text: 'MCP（Model Context Protocol）',
          collapsed: false,
          items: [
            { text: '什么是 MCP？', link: '/learn/mcp/' },
            { text: 'Lesson 1 — MCP 核心概念', link: '/learn/mcp/0001-what-is-mcp' },
            { text: '快速开始：写一个 MCP Server', link: '/learn/mcp/0002-build-first-server' },
            { text: 'MCP + LangChain 集成', link: '/learn/mcp/0003-mcp-langchain' },
          ],
        },
        {
          text: 'LangChain & Agent',
          collapsed: false,
          items: [
            { text: 'LangChain 概述', link: '/learn/langchain/' },
            { text: 'Agent 是什么？', link: '/learn/langchain/0001-what-is-agent' },
            { text: 'ReAct 模式深入', link: '/learn/langchain/0002-react-pattern' },
          ],
        },
        {
          text: '学习总结',
          items: [
            { text: 'MCP 学习笔记', link: '/learn/summary-mcp' },
            { text: 'LangChain 学习笔记', link: '/learn/summary-langchain' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/defeatbug' },
    ],

    footer: {
      message: '学习 · 思考 · 分享',
      copyright: '© 2026 defeatbug',
    },

    // Enable "edit this page" link
    editLink: {
      pattern: 'https://github.com/defeatbug/defeatbug.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'short' },
    },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false,
  },
})
