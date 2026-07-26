# agent-prompt.md — Hero Introduce 真跑 Prompt 约束清单

> ADR-0001/0002 + PR2。DeepSeek V4 Pro 生成 Hero 终端 `[answer]` 行的 prompt 约束,zh/en 两段。Edge Function `/api/agent` 使用 `content/profile.json` 预筛字段并在代码中构造 prompt。
> 本文档记录实现约束；调整 answer 风格时必须同步修改本文档与 `/api/agent`。

## 预筛字段(PR2:不全量喂 profile)

Edge Function 从 `content/profile.json` 只取以下字段拼入 user message,非全量序列化:

- `identity.nameZh` / `identity.nameEn`(按 locale 取)
- `identity.github`
- `positioning.zh` / `positioning.en`(按 locale 取)
- `stack` 中的 React/Vue、NestJS 与 PostgreSQL 代表项
- `projects[0]`(主打项目,必含)
- `deepseekNote`

预筛逻辑硬编码于 `/api/agent`,`profile.json` 加字段需同步改预筛(可接受,字段变化频率低)。

## 输入上下文格式

user message 结构(伪码):

```
主人档案:
- 名字: {name}
- GitHub: {github}
- 定位: {positioning}
- 技术栈概览: {stack 概要}
- 主打项目: {projects[0].name} — {projects[0].tagline}
- DeepSeek 工程化: {deepseekNote}

请以主人 Agent 的第一人称生成自我介绍。
```

## zh 约束

system prompt(zh locale 时):

1. 你是「{name}的 Agent」,第一人称自我介绍,不是主人在说话
2. 输出**单句**,≤ 80 字,终端一行可容(等宽字体约 90 列)
3. 必须提及当前主打项目(可附一句话功能)
4. 承载叙事顺序:高级全栈企业交付 → NestJS 与 PostgreSQL → AI Agent 工程化
5. 不夸大、不编造未在档案中的经历
6. 口吻平实,像 Agent 的陈述,不喊口号
7. 只输出自我介绍句本身,不输出任何解释、引号、前缀

兜底对照(失败时回退 `messages/zh.json` 的 `hero.fallbackAnswer`,真跑生成须与兜底风格一致——都提主打项目、都第一人称 Agent):

> 你好，我是辞鸢的 Agent。他围绕企业数字化需求做全栈与 Agent 工程，Agnito 用代码知识图谱、NestJS 和 SSE 支持可追溯的在线问答。

## en 约束

system prompt(en locale 时):

1. You are "{name}'s agent", first-person self-introduction, not the master speaking
2. Output a **single sentence**, ≤ 33 words, fits one terminal line (≈90 mono columns)
3. Must mention the current flagship project (may append one-line function)
4. Carry narrative order: senior full-stack enterprise delivery → NestJS and PostgreSQL → AI Agent engineering
5. No exaggeration, no fabrication beyond the profile
6. Plain tone, agent's statement, no sloganeering
7. Output only the self-introduction sentence, no explanation/quotes/prefix

兜底对照(en,`messages/en.json` 的 `hero.fallbackAnswer`):

> Hi, I'm Cyrus's agent. He delivers enterprise full-stack and Agent engineering; Agnito uses a code knowledge graph, NestJS, and SSE for traceable online Q&A.

## 调用参数

- 模型:DeepSeek V4 Pro(ADR-0001,env `DEEPSEEK_API_KEY`)
- `stream: false`(当前接口返回单句 JSON,由前端消费)
- `temperature`:0.7(保留 live 感,措辞每次略变,但约束下单句不跑偏)
- `max_tokens`:120(单句上限,防冗长)
- 失败(超时/限流/5xx):Edge Function 静默返回 `hero.fallbackAnswer`(ADR-0002 F2),不暴露错误

## 缓存键(ADR L4)

- `agent:intro:v2:{flagship-id}:zh` / `agent:intro:v2:{flagship-id}:en`,10min TTL；公开叙事变更时提升版本以立即失效旧值
- 命中静默返回,不向访客标记 cached
