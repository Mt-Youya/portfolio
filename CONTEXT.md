# yonjay.me Portfolio

辞鸢(全栈工程师 · AI Agent 方向)的个人网站。以「工程蓝图 × 印鉴」为视觉主题,用 Agent 自我介绍的方式展示主人,而非简历的 PDF 复刻。

## Language

**Agent**:
以「感知 → 规划 → 工具调用 → 观察 → 循环」结构自我介绍并展示主人的程序化角色。在本站中特指 Hero 终端里真跑的 introduce 流程(读 GitHub 数据 → 由 DeepSeek 生成自我介绍),而非可交互对话系统。
_Avoid_:聊天机器人、对话助手、AI 产品

**Introduce 流程**:
Hero 终端里 `agent run introduce --lang <locale>` 触发的一次真跑:`--lang` 取自路由段(`/zh` 或 `/en`),Edge Function 据此 fetch GitHub pinned repos 并由 DeepSeek 按该语言生成自我介绍句。结果缓存 10 分钟,按 locale 分键(`agent:intro:zh` / `agent:intro:en`),命中静默返回(不向访客标记 cached)。真跑失败时静默回退预录兜底文案(`messages/{zh,en}.json` 的 `hero.fallbackAnswer`),不向访客暴露失败。兜底文案须提及主打项目 TubePilot,以保持与真跑风格一致。DeepSeek 输入为 `content/profile.json` 预筛关键字段(非全量),约束清单(zh/en 两段)版本化在 `content/agent-prompt.md`。
_Avoid_:聊天、问答、对话

**真跑(Real Run)**:
在访客触发的请求路径上真实执行外部调用(GitHub API + DeepSeek),区别于预录脚本。Hero trace 中 `[tool] github.fetch` 与 `[answer]` 行为真跑;`[plan]` 与 `[tool] llm.rank` 为预录。
_Avoid_:表演、脚本

**Profile**:
`content/profile.json`,辞鸢的结构化档案(经历/技能/项目/联系方式),仓库内的真相源。同时喂三个消费方:Hero 真跑(DeepSeek 预筛关键字段作上下文)、SHEET 05 时间线、SHEET 04 项目卡(8 个已部署个人项目)。程序吃 Profile,人吃简历 PDF,各司其职。
_Avoid_:简历、个人资料、bio

**BOM 物料表**:
SHEET 02 中以工程图纸详图形式呈现的 DeepSeek 工程化物料表(选型理由 + 接入架构 + 本站驱动标注)。原 Plan 的「五国产模型物料清单」已弃用——仅 DeepSeek 真介入,其余四个未介入,保留即假声明。DeepSeek 行盖「本站驱动」印泥红,表示 Hero 真跑由它驱动。
_Avoid_:模型列表、对比表、生态广度展示
