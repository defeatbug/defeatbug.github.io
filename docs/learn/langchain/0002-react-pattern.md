---
outline: deep
---

# ReAct 模式深入

**阅读时长：** 10 分钟 | **类型：** 概念 + 代码

## 1. ReAct 是什么？

**Reason + Act = ReAct**

这是 AI Agent 最常见的推理模式。每一步：

1. **Reason（推理）**：分析当前状态，决定下一步做什么
2. **Act（行动）**：调用工具，获取结果
3. **Observe（观察）**：读工具返回的结果，判断是否足够回答

循环直到能给出最终答案。

## 2. 完整例子

用户问：「帮我查一下苹果公司和特斯拉的市值差多少」

```
Step 1 — Thought: 需要查两家公司的市值
Step 2 — Action: search("Apple market cap 2025")
Step 3 — Observation: "Apple market cap is $3.2 trillion"
Step 4 — Thought: 拿到苹果的了，还差特斯拉
Step 5 — Action: search("Tesla market cap 2025")
Step 6 — Observation: "Tesla market cap is $580 billion"
Step 7 — Thought: 需要算差值
Step 8 — Action: subtract(3200000000000, 580000000000)
Step 9 — Observation: "2620000000000"
Step 10 — Thought: 够了，直接回答
Final Answer: "苹果市值约 3.2 万亿，特斯拉约 5800 亿，差值约 2.62 万亿美元。"
```

## 3. LangChain 的 ReAct 实现

```python
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(model, tools)
result = agent.invoke({
    "messages": [("user", "Calculate (15 + 23) * 4")]
})
```

LangChain 在内部维护了一个消息循环：

```python
# 伪代码 — 展示内部逻辑
def react_loop(messages, model, tools):
    while True:
        response = model.invoke(messages)  # LLM 思考
        if response.has_tool_calls():
            for call in response.tool_calls:
                result = execute_tool(call)  # 执行工具
                messages.append(result)      # 结果加入对话
        else:
            return response.content          # 最终回答
```

## 4. 常见问题与对策

| 问题 | 现象 | 对策 |
|------|------|------|
| **循环** | Agent 反复调同一个工具不停止 | system_prompt 加「最多试 3 个工具」 |
| **幻觉调用** | LLM 调了一个不存在的工具 | 工具名和描述尽量明确 |
| **过早回答** | 工具结果还没拿全就给答案 | system_prompt 加「确保数据完整后再回答」 |
| **工具报错** | 工具返回了错误信息 | Agent 会读到错误，通常会自动重试或换策略 |

## 5. 什么时候 ReAct 够用？什么时候不够？

**够用：**
- 3-5 步以内的单链推理
- 工具之间没有复杂依赖
- Q&A、搜索、计算、格式化

**不够：**
- 需要并行调多个工具
- 有分支逻辑（"如果 A 则调工具 X，否则工具 Y"）
- 需要跨多次对话的记忆

不够用的时候，用 LangGraph 的 `StateGraph` 手动编排。但目前你不用操心。

## 6. 一个调试技巧

在 system_prompt 里要求 Agent 展示思考过程：

```python
system_prompt = """You are an assistant. Before calling any tool,
explain what tool you're calling and why.
After getting a result, explain if it's sufficient."""
```

这在开发阶段很有用 — 你能看到 Agent 每一步的决策逻辑。

## 下一步

- [MCP 学习笔记](/learn/summary-mcp.html) — MCP 要点速查
- [LangChain 学习笔记](/learn/summary-langchain.html) — LangChain 要点速查
