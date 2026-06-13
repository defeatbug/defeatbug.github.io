---
outline: false
---

<div class="page-header">
  <h1>LangChain</h1>
  <p class="desc">AI 应用开发框架 — 以"积木式"组合搭建 Agent。</p>
</div>

## 什么是 LangChain？

LangChain 是一套帮你**把 LLM（大语言模型）和工具、数据、逻辑组合在一起**的 Python/JS 框架。

它提供了标准化的组件：

| 组件 | 做什么 | 例子 |
|------|--------|------|
| **Model** | 统一的模型接口 | 一行代码切换 OpenAI / DeepSeek / Anthropic |
| **Tool** | 给模型配工具 | `@tool` 装饰器包装函数、MCP 工具 |
| **Agent** | 决策循环 | 模型自己决定什么时候调用哪个工具 |
| **Memory** | 记住对话 | 短期缓存 + 长期持久化 |
| **Retriever** | 外部知识检索 | RAG：从文档库搜索相关内容喂给模型 |

## LangChain vs LangGraph

| | LangChain | LangGraph |
|---|---|---|
| 做什么 | 连接 LLM + 工具 + 数据的"乐高" | 构建复杂 Agent 的"流程图" |
| 适用 | 简单链式调用、RAG | 多步推理、有分支/回退的 Agent |
| 类比 | 直路 | 城市地图（有路口） |

目前我们用的是 LangChain 的高级封装 (`create_agent`)，底层其实跑在 LangGraph 上。

## 快速入口

- [Agent 是什么？](/learn/langchain/0001-what-is-agent.html)
- [ReAct 模式深入](/learn/langchain/0002-react-pattern.html)
- [LangChain 学习笔记](/learn/summary-langchain.html)
