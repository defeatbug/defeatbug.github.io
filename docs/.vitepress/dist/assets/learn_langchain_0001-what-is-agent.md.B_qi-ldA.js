import{_ as s,o as n,c as t,a2 as e}from"./chunks/framework.KT0ECV7t.js";const g=JSON.parse('{"title":"Agent 是什么？","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"learn/langchain/0001-what-is-agent.md","filePath":"learn/langchain/0001-what-is-agent.md","lastUpdated":null}'),p={name:"learn/langchain/0001-what-is-agent.md"};function i(l,a,h,o,r,d){return n(),t("div",null,[...a[0]||(a[0]=[e(`<h1 id="agent-是什么" tabindex="-1">Agent 是什么？ <a class="header-anchor" href="#agent-是什么" aria-label="Permalink to &quot;Agent 是什么？&quot;">​</a></h1><p><strong>阅读时长：</strong> 8 分钟 | <strong>类型：</strong> 概念</p><h2 id="_1-从-聊天-到-做事" tabindex="-1">1. 从&quot;聊天&quot;到&quot;做事&quot; <a class="header-anchor" href="#_1-从-聊天-到-做事" aria-label="Permalink to &quot;1. 从&quot;聊天&quot;到&quot;做事&quot;&quot;">​</a></h2><p>普通的 LLM 调用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你: &quot;今天北京天气怎么样？&quot;</span></span>
<span class="line"><span>LLM: &quot;抱歉，我没有实时数据。&quot;</span></span></code></pre></div><p>加了 Agent 之后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你: &quot;今天北京天气怎么样？&quot;</span></span>
<span class="line"><span>Agent: （自动调用天气查询工具 → 拿到数据 → 回答）&quot;北京今天晴，22度。&quot;</span></span></code></pre></div><p><strong>Agent = 模型 + 工具 + 推理循环。</strong></p><h2 id="_2-agent-的决策循环" tabindex="-1">2. Agent 的决策循环 <a class="header-anchor" href="#_2-agent-的决策循环" aria-label="Permalink to &quot;2. Agent 的决策循环&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>      ┌──────────────────────┐</span></span>
<span class="line"><span>      │  用户提问             │</span></span>
<span class="line"><span>      └─────────┬────────────┘</span></span>
<span class="line"><span>                ↓</span></span>
<span class="line"><span>      ┌──────────────────────┐</span></span>
<span class="line"><span>      │  LLM 思考             │ ← &quot;我需要什么工具？&quot;</span></span>
<span class="line"><span>      └─────────┬────────────┘</span></span>
<span class="line"><span>                ↓</span></span>
<span class="line"><span>         ┌──────┴──────┐</span></span>
<span class="line"><span>         ↓              ↓</span></span>
<span class="line"><span>    需要工具         不需要工具</span></span>
<span class="line"><span>         ↓              ↓</span></span>
<span class="line"><span>   ┌──────────┐   ┌──────────┐</span></span>
<span class="line"><span>   │ 调用工具  │   │ 直接回答  │</span></span>
<span class="line"><span>   └────┬─────┘   └──────────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>   ┌──────────┐</span></span>
<span class="line"><span>   │ 拿到结果  │</span></span>
<span class="line"><span>   └────┬─────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>   ┌──────────┐</span></span>
<span class="line"><span>   │ LLM 再思考│ ← &quot;结果够了吗？&quot;</span></span>
<span class="line"><span>   └────┬─────┘</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>   ┌────┴────┐</span></span>
<span class="line"><span>   ↓         ↓</span></span>
<span class="line"><span> 够了      不够 → 再调工具</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span> 最终回答</span></span></code></pre></div><p>这就是 Agent 的核心。它自己决定<strong>什么时候调工具、调哪个工具、调完了怎么用结果</strong>。</p><h2 id="_3-工具怎么给-agent" tabindex="-1">3. 工具怎么给 Agent？ <a class="header-anchor" href="#_3-工具怎么给-agent" aria-label="Permalink to &quot;3. 工具怎么给 Agent？&quot;">​</a></h2><p>在 LangChain 里：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> langchain.agents </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> create_agent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">agent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> create_agent(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    model</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">model,        </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 大脑</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    tools</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tools,        </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 工具箱</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    system_prompt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 行为规范</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>关键是 <strong>tools 列表</strong>。Agent 会把每个工具的名字、描述、参数发给 LLM，让 LLM 决定什么时候用哪个。</p><h2 id="_4-langchain-agent-的演变" tabindex="-1">4. LangChain Agent 的演变 <a class="header-anchor" href="#_4-langchain-agent-的演变" aria-label="Permalink to &quot;4. LangChain Agent 的演变&quot;">​</a></h2><table tabindex="0"><thead><tr><th>时期</th><th>方式</th><th>状态</th></tr></thead><tbody><tr><td>早期</td><td><code>initialize_agent()</code> + AgentType</td><td>已废弃</td></tr><tr><td>现在</td><td><code>create_agent()</code> + LangGraph 底层</td><td>推荐</td></tr><tr><td>高级</td><td><code>StateGraph</code> 手动编排</td><td>复杂场景</td></tr></tbody></table><p>现在的 <code>create_agent()</code> 封装了最佳实践，大多数情况够用。</p><h2 id="_5-agent-不做什么" tabindex="-1">5. Agent 不做什么 <a class="header-anchor" href="#_5-agent-不做什么" aria-label="Permalink to &quot;5. Agent 不做什么&quot;">​</a></h2><ul><li>Agent <strong>不是在&quot;思考&quot;</strong> — 它只是在预测下一个 token（这点很重要）</li><li>Agent <strong>不会真的&quot;理解&quot;你的目标</strong> — 它被 system_prompt 和 tools 约束</li><li>Agent <strong>可能犯错</strong> — 调了错的工具、陷入循环、或者给不出答案</li></ul><p>良好的 system_prompt 和工具设计能大幅降低这些问题。</p><h2 id="下一步" tabindex="-1">下一步 <a class="header-anchor" href="#下一步" aria-label="Permalink to &quot;下一步&quot;">​</a></h2><ul><li><a href="/learn/langchain/0002-react-pattern.html">ReAct 模式深入</a> — 理解 Agent 最常见的推理模式</li></ul>`,23)])])}const k=s(p,[["render",i]]);export{g as __pageData,k as default};
