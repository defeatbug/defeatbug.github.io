---
outline: deep
---

# MCP 学习笔记

持续更新中。记录 MCP 协议的要点、最佳实践和常见问题。

## 核心概念速查

| 概念 | 一句话 |
|------|--------|
| MCP Server | 提供工具/资源的服务端程序 |
| MCP Client | AI 侧消费者（LangChain Agent, Claude Desktop 等） |
| Transport | 传输方式：stdio（本地）、HTTP（远程） |
| JSON-RPC | 通信协议格式 |
| FastMCP | Python 简化版 MCP Server 框架 |
| langchain-mcp-adapters | LangChain 官方 MCP 桥接包 |

## 设计原则

- **一个 Server 做一件事** — 数学工具一个 Server，排版工具另一个
- **Server 不依赖 AI** — 可以在任何地方独立运行和测试
- **函数签名就是文档** — 清晰的参数名 + 类型标注 + docstring
- **返回字符串** — MCP 工具返回文本；结构化数据用 JSON 字符串
- **错误用字符串返回** — 不要抛异常，返回 "Error: xxx"

## 常见问题

**Q: MCP 和 OpenAI Function Calling 的区别？**

MCP 是协议标准，Function Calling 是 OpenAI 一家的实现。用 MCP 写的工具可以跨平台复用。

**Q: 什么时候用 stdio，什么时候用 HTTP？**

- stdio：本地开发、脚本、单用户场景
- HTTP：部署到服务器、多用户访问、生产环境

**Q: Go 能用 MCP 吗？**

可以。社区有 `mcp-go`，还有 `langchaingo-mcp-adapter`。你最强的 Go 可以直接用。

**Q: MCP Server 能调用 API 吗？**

能。MCP Server 就是普通程序，你可以在工具函数里发 HTTP 请求、查数据库、调其他 API。

## 关键链接

- [MCP 规范](https://modelcontextprotocol.io/specification/2025-11-25)
- [MCP 规范（中文）](https://modelcontextprotocol.info/zh-cn/specification/)
- [langchain-mcp-adapters](https://pypi.org/project/langchain-mcp-adapters/)
