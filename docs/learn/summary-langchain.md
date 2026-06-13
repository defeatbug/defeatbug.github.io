---
outline: deep
---

# LangChain 学习笔记

持续更新中。记录 LangChain 核心概念、常用模式和踩坑日记。

## 核心组件速查

| 组件 | 用途 | 关键 API |
|------|------|---------|
| Model | 统一 LLM 接口 | `ChatDeepSeek(model="deepseek-chat")` |
| Tool | 包装函数供 Agent 调用 | `@tool` 装饰器或 MCP 工具 |
| Agent | 决策循环 | `create_agent(model, tools, prompt)` |
| Memory | 对话记忆 | `InMemorySaver()` 作为 checkpointer |

## 新版 vs 旧版 API

| 旧版（废弃） | 新版（推荐） |
|-------------|-------------|
| `initialize_agent()` | `create_agent()` |
| `.run()` | `.invoke()` / `.ainvoke()` |
| `from langchain.tools` | `from langchain_core.tools` |

## 六种 Agent 模式

模式按复杂度递增。大多数需求用前两种就够了。

1. **Augmented LLM** — 给模型加工具，最基础
2. **Prompt Chaining** — 多个步骤串联（概要 → 草稿 → 校验 → 输出）
3. **Routing** — 根据问题类型分发给不同处理
4. **Parallelization** — 并行处理
5. **Orchestrator** — 主 Agent 协调子 Agent
6. **Evaluator-Optimizer** — 迭代改进

## 常见踩坑

**1. Agent 无限循环**

原因：Agent 反复调同一个工具得不到满意结果。解决：system_prompt 设上限。

```python
system_prompt = """... After calling a tool 3 times without progress,
explain what you know so far and ask the user for guidance."""
```

**2. 工具返回了非 JSON 字符串**

Agent 读工具结果时如果格式不对，LLM 可能误解。返回 JSON 时确保格式正确。

**3. 忘记加 checkpointer**

```python
checkpointer = InMemorySaver()
agent = create_agent(..., checkpointer=checkpointer)
```

没有 checkpointer，Agent 不会记住前面的对话。

**4. MCP 工具的同步/异步兼容**

MCP 工具默认是 async，LangGraph 有时候要 sync。用法见 [Lesson 3](/learn/mcp/0003-mcp-langchain.html)。

## 推荐阅读

- [Effective Agent Patterns with LangChain (GitHub)](https://github.com/jcran/effective-agents-langchain)
- [LangChain 官方文档](https://python.langchain.com/docs/)
