---
outline: deep
---

# Lesson 2 — 从零写一个 MCP Server

**类型：** 实操 | **前置：** [Lesson 1](/learn/mcp/0001-what-is-mcp.html)

## 目标

搭建一个能用的 MCP Server，暴露几个工具，用客户端验证它能正常工作。

## 1. 安装

```bash
pip install mcp
```

## 2. 最小可运行的 MCP Server

创建 `my_tools.py`：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("My Tools Server")

@mcp.tool()
def hello(name: str) -> str:
    \"\"\"Say hello to someone.\"\"\"
    return f"Hello, {name}!"

@mcp.tool()
def word_count(text: str) -> str:
    \"\"\"Count words in a text string.\"\"\"
    count = len(text.split())
    return f"Word count: {count}"

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

这就是一个完整的 MCP Server。两个工具：`hello` 和 `word_count`。

## 3. 关键规则

写工具时注意这几点：

1. **函数签名 = 接口文档** — AI 通过参数类型和函数名理解怎么调用。用清晰的参数名和类型标注。
2. **docstring 是给 AI 看的** — AI 根据 docstring 决定什么时候调用你的工具。写清楚它做什么。
3. **返回值用字符串** — MCP 工具返回文本。如果是结构化数据，用 JSON 字符串返回。

```python
# 好
@mcp.tool()
def format_citations(doc_path: str, style: str) -> str:
    \"\"\"Format all citations in a document to the given style (APA, MLA, or GB/T 7714).
    Returns a summary of changes made.\"\"\"
    ...

# 不好 — 参数名模糊，docstring 不明确
@mcp.tool()
def format(p: str, s: str) -> str:
    \"\"\"Format something.\"\"\"
    ...
```

## 4. 用 MCP Inspector 测试

MCP 官方提供了一个调试工具：

```bash
npx @modelcontextprotocol/inspector python my_tools.py
```

这会打开一个网页界面，让你可以直接测试每个工具：输入参数、看返回值、验证是否正常。

## 5. 更多例子

```python
@mcp.tool()
def check_grammar(text: str) -> str:
    \"\"\"Check English grammar and return suggestions.
    Returns errors found or 'No issues found'.\"\"\"
    # 现在只是 demo，将来可以接 AI
    errors = []
    if "  " in text:
        errors.append("Found double spaces")
    return "\n".join(errors) if errors else "No issues found"

@mcp.tool()
def convert_markdown_to_html(markdown_text: str) -> str:
    \"\"\"Convert markdown text to HTML.\"\"\"
    import markdown
    return markdown.markdown(markdown_text)
```

## 6. 练习

给 `my_tools.py` 加一个你自己的工具。比如：

- 统计一段文字的中文字数
- 检测全角半角混用
- 把一段文本转成拼音

<div class="callout">
<strong>提示：</strong>工具就一个普通 Python 函数 + @mcp.tool()。你随便写什么函数都行。
</div>

## 下一步

- [Lesson 3: MCP + LangChain 集成](/learn/mcp/0003-mcp-langchain.html)
- [MCP 速查手册](/learn/summary-mcp.html)
