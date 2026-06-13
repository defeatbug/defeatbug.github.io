---
outline: deep
---

# Lesson 3 — MCP + LangChain 集成

**类型：** 实操 | **前置：** [Lesson 2](/learn/mcp/0002-build-first-server.html)

## 目标

把你写的 MCP Server 接入 LangChain Agent，让 AI 发现并调用你的工具。

## 1. 核心包：langchain-mcp-adapters

```bash
pip install langchain-mcp-adapters langchain langchain-deepseek
```

`langchain-mcp-adapters` 是 LangChain 官方维护的 MCP 桥接包。它把 MCP 工具自动转换成 LangChain 能用的格式。

## 2. 连接方式

### 本地开发：stdio

```python
from langchain_mcp_adapters.tools import load_mcp_tools
from langchain_mcp_adapters.sessions import StdioConnection

connection = StdioConnection(
    transport="stdio",
    command="python",
    args=["my_tools.py"],
)
tools = await load_mcp_tools(None, connection=connection)
```

客户端启动 `my_tools.py` 作为子进程，通过 stdin/stdout 用 JSON-RPC 通信。

### 生产环境：多服务器 + HTTP

```python
from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient({
    "math": {
        "command": "python",
        "args": ["./math_server.py"],
        "transport": "stdio",
    },
    "paper_tools": {
        "url": "http://localhost:8000/mcp",
        "transport": "http",
    },
})
tools = await client.get_tools()
```

## 3. 完整例子

把前面的 `math_server.py` 接入 Agent：

```python
from langchain_deepseek import ChatDeepSeek
from langchain.agents import create_agent
from langchain_mcp_adapters.tools import load_mcp_tools
from langchain_mcp_adapters.sessions import StdioConnection
import asyncio

async def main():
    # 连接 MCP Server
    connection = StdioConnection(
        transport="stdio",
        command="python", args=["math_server.py"],
    )
    mcp_tools = await load_mcp_tools(None, connection=connection)

    # 创建 Agent
    model = ChatDeepSeek(model="deepseek-chat", temperature=0)
    agent = create_agent(model=model, tools=mcp_tools,
                         system_prompt="You are a math assistant.")

    # 调用
    result = agent.invoke({
        "messages": [{"role": "user",
                      "content": "Calculate (15 + 23) * 4 - 100 / 5"}]
    })
    print(result["messages"][-1].content)

asyncio.run(main())
```

## 4. Agent 是怎么工作的

当用户问 "Calculate (15 + 23) * 4 - 100 / 5"：

```
Step 1 — LLM 分析: 需要先加、再乘、再除、最后减
Step 2 — LLM 决定: 调用 add(15, 23)
Step 3 — Tool 返回: "38"
Step 4 — LLM 决定: 调用 multiply(38, 4)
Step 5 — Tool 返回: "152"
Step 6 — LLM 决定: 调用 divide(100, 5)
Step 7 — Tool 返回: "20.0"
Step 8 — LLM 决定: 调用 subtract(152, 20.0)
Step 9 — Tool 返回: "132.0"
Step 10 — LLM 回答: "结果是 132"
```

这就是 **ReAct 模式**（Reason + Act）：LLM 每一步都在"思考→行动→观察→思考→..."，直到得出最终答案。

## 5. 常见问题

**Q: 工具返回了非字符串怎么办？**

MCP 要求工具返回字符串。如果不是，转成 JSON：

```python
import json

@mcp.tool()
def analyze_text(text: str) -> str:
    result = {"words": len(text.split()), "chars": len(text)}
    return json.dumps(result)
```

**Q: 工具执行出错怎么办？**

返回错误信息字符串。AI 会读到错误并调整策略。

```python
@mcp.tool()
def divide(a: float, b: float) -> str:
    if b == 0:
        return "Error: division by zero"
    return str(a / b)
```

**Q: Agent 调了不该调的工具？**

在 system_prompt 里明确约束：

```python
system_prompt = """You are a math assistant.
Only use math tools (add, subtract, multiply, divide, power).
If the question is not about math, say you can only help with math."""
```

## 下一步

- [LangChain 概述](/learn/langchain/) — 深入理解 Agent 框架
- [Agent 是什么？](/learn/langchain/0001-what-is-agent.html)
