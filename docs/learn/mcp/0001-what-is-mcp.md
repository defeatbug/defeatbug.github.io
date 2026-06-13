---
outline: deep
---

# Lesson 1 — MCP 核心概念

**阅读时长：** 10 分钟 | **类型：** 概念 + 代码走读

## 1. AI 怎么连接外部世界？

你用过 ChatGPT、DeepSeek 聊天。但如果你想让 AI **帮你做事情** — 查数据库、发邮件、改论文排版 — AI 模型本身做不到。它只会"吐字"。

要让 AI 能干活，需要给它**工具（Tool）**。就像人需要扳手才能拧螺丝。

问题来了：工具有各种花样。有的工具是你自己写的 Python 函数，有的是第三方 API，有的跑在另一台服务器上。每家 AI 平台（OpenAI、Anthropic、LangChain）有自己的工具格式。

<div class="callout">
<strong>核心矛盾：</strong>工具提供方（服务端）和 AI 调用方（客户端）各说各的方言，每对接一次就要写一堆胶水代码。
</div>

## 2. MCP 的解决思路

MCP（Model Context Protocol）定义了**一个 AI 怎么和一个工具服务器通信**的标准化协议。

类比：

- **USB-C** — 不管你什么设备，插上去就能用
- **MCP** — 不管你用什么 AI 框架，只要是 MCP Server 就能调用它的工具

```
┌──────────────┐     MCP 协议      ┌──────────────┐
│  AI Agent    │ ←──→ (JSON-RPC)  │  MCP Server  │
│  (客户端)     │ stdio / HTTP     │  (服务端)     │
└──────────────┘                  └──────────────┘
                                       ↑
                    暴露: Tools / Resources / Prompts
```

## 3. MCP Server 能暴露什么？

| 类型          | 是什么                    | 例子                                           |
| ------------- | ------------------------- | ---------------------------------------------- |
| **Tools**     | AI 可以**调用执行**的函数 | `add(a,b)`、`搜索论文(query)`、`修改格式(doc)` |
| **Resources** | AI 可以**读取**的数据     | 文件内容、数据库记录、文档模板                 |
| **Prompts**   | 预置的**提示模板**        | "帮我润色这段论文摘要：{{text}}"               |

目前你只需要关注 **Tools**。Resources 和 Prompts 后续再学。

## 4. 看代码：math_server.py

一个 MCP Server 就是普通的 Python 程序：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Math Server")

@mcp.tool()
def add(a: float, b: float) -> str:
    """Add two numbers together."""
    return str(a + b)

@mcp.tool()
def multiply(a: float, b: float) -> str:
    """Multiply two numbers together."""
    return str(a * b)

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

**做了什么：**

1. 用 `FastMCP` 创建 MCP 服务器
2. 用 `@mcp.tool()` 装饰器暴露工具函数
3. 通过 **stdio**（标准输入输出）与客户端通信

<div class="callout">
<strong>关键认知：</strong>MCP Server 就是普通程序。不绑定任何 AI 模型、不绑定任何框架。它只说：「我有这些工具，输入什么返回什么」。
</div>

## 5. 看代码：math_client.py

AI 端怎么连上这个服务器：

```python
from langchain_mcp_adapters.tools import load_mcp_tools
from langchain_mcp_adapters.sessions import StdioConnection

# 1. 告诉系统去启动 math_server.py 进程
connection = StdioConnection(
    transport="stdio",
    command="python", args=["math_server.py"],
)

# 2. 加载 MCP 工具 — 自动连接服务器，问「你有什么工具？」
tools = await load_mcp_tools(None, connection=connection)
print(f"Loaded {len(tools)} tools: {[t.name for t in tools]}")
# 输出: Loaded 5 tools: ['add', 'subtract', 'multiply', 'divide', 'power']

# 3. 创建 Agent，把工具给它
agent = create_agent(
    model=model, tools=tools,
    system_prompt="You are a math assistant.",
)
```

**整个调用流程：**

```
用户: "计算 (3+5)×12"
  → LLM 决定: 先 add(3,5), 再 multiply(结果, 12)
    → langchain-mcp-adapters (翻译层)
      → JSON-RPC over stdio → math_server.py
        → add(3,5) = 8 → multiply(8,12) = 96
      ← 返回 96
  → Agent: "答案是 96"
```

## 6. 为什么这对你很重要？

想象你做论文排版工具：

```python
# paper_tools.py — 论文排版 MCP Server
@mcp.tool()
def fix_page_margins(doc_path: str, margin_cm: float) -> str:
    """修改论文页边距"""
    ...

@mcp.tool()
def format_citations(doc_path: str, style: str) -> str:
    """把引用格式改成 APA / MLA / GB/T 7714"""
    ...
```

**同一个 MCP Server**，可以用 Python 调用、用 Go 调用、用 Claude Desktop 调用。工具代码**不用改一行**。

<div class="callout">
<strong>投资回报：</strong>你在 MCP 上花的每一分钟，都是在建<strong>可复用的基础设施</strong>。工具代码完全独立于 UI、独立于 AI 模型、独立于框架。
</div>

## 下一步

- [Lesson 2: 从零写一个 MCP Server](/learn/mcp/0002-build-first-server.html)
- [推荐阅读：MCP 规范（中文版）](https://modelcontextprotocol.info/zh-cn/specification/)

> 有问题？这是你自己的知识库，每页底部的编辑链接随时改。
