---
outline: false
---

<div class="page-header">
  <h1>学习路线</h1>
  <p class="desc">从 MCP 到 LangChain Agent，渐进式掌握 AI 应用开发。</p>
</div>

## 推荐学习顺序

```
MCP 基础  →  动手写 Server  →  集成 LangChain  →  理解 Agent  →  做项目
```

这个顺序的理由：

1. **MCP 是基础** — 理解 AI 如何"拿到工具"，才能理解 Agent 怎么工作
2. **先动手再理论** — 每个概念都配可运行的代码
3. **逐步加深** — 从简单的数学工具开始，最终到论文排版 Agent

## MCP 模块

| 课程 | 内容 | 类型 |
|------|------|------|
| [什么是 MCP？](/learn/mcp/) | 协议概述、架构、设计哲学 | 概念 |
| [Lesson 1](/learn/mcp/0001-what-is-mcp.html) | MCP 核心概念：Server/Client/Transport/Tools | 概念 + 代码走读 |
| [Lesson 2](/learn/mcp/0002-build-first-server.html) | 从零写一个 MCP Server | 实操 |
| [Lesson 3](/learn/mcp/0003-mcp-langchain.html) | MCP Server → LangChain Agent | 实操 |

## LangChain 模块

| 课程 | 内容 | 类型 |
|------|------|------|
| [LangChain 概述](/learn/langchain/) | 框架全景图 | 概念 |
| [Agent 是什么？](/learn/langchain/0001-what-is-agent.html) | 模型 + 工具 + 推理循环 | 概念 |
| [ReAct 模式深入](/learn/langchain/0002-react-pattern.html) | Reason + Act 的完整工作流 | 概念 + 代码 |

## 学完之后

你将能：
- 独立搭建一个 MCP Server
- 用 LangChain 创建能调用工具的 AI Agent
- 开始你的第一个项目（比如论文排版助手）
