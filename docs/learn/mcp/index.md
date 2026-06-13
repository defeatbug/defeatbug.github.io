---
outline: false
---

<div class="page-header">
  <h1>MCP — Model Context Protocol</h1>
  <p class="desc">AI 的"万能插头"：一个让 AI 连接任何工具的开放协议。</p>
</div>

## 为什么需要 MCP？

AI 模型本质上是"只会说话的脑子"——它能理解你、给你建议，但它不能操作数据库、发邮件、改文件。要让 AI 真正干活，你需要给它**工具**。

问题在于：每个 AI 平台（OpenAI、Anthropic、LangChain）有自己的一套工具格式。如果你给 LangChain 写了个工具函数，Claude Desktop 用不了。你得为每种平台写胶水代码。

**MCP 解决的就是这个：定义一套标准协议。** 工具提供方（Server）只写一次，任何 MCP 客户端都能用。

## 核心架构

```
Host（宿主应用, 比如 Claude Desktop）
 ├── MCP Client  ──→  MCP Server A（数学工具）
 ├── MCP Client  ──→  MCP Server B（搜索引擎）
 └── MCP Client  ──→  MCP Server C（你的论文排版工具）
```

## 三种能力

| 类型 | 说明 | 示例 |
|------|------|------|
| **Tools** | AI 可以调用的函数 | `add(a,b)`, `format_citations(doc)` |
| **Resources** | AI 可以读取的数据 | 文件内容、数据库记录 |
| **Prompts** | 预置的提示模板 | "帮我润色这段摘要：{{text}}" |

## 传输方式

| 方式 | 适用场景 |
|------|---------|
| **stdio** | 本地开发。客户端启动 Server 进程，通过管道通信。 |
| **HTTP (SSE / Streamable HTTP)** | 生产部署。Server 跑在服务器上，暴露 HTTP 端点。 |

## 快速入口

- [Lesson 1: 核心概念详解](/learn/mcp/0001-what-is-mcp.html)
- [Lesson 2: 写一个 MCP Server](/learn/mcp/0002-build-first-server.html)
- [Lesson 3: 接入 LangChain](/learn/mcp/0003-mcp-langchain.html)
