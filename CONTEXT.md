# yonjay.me Portfolio

辞鸢(高级全栈工程师｜AI Agent 工程化)的个人网站。以「工程蓝图 × 印鉴」为视觉主题,用 Agent 自我介绍的方式展示主人,而非简历的 PDF 复刻。

## Language

**Agent**:
以「感知 → 规划 → 工具调用 → 观察 → 循环」结构自我介绍并展示主人的程序化角色。在本站中特指 Hero 终端里真跑的 introduce 流程(读 GitHub 数据 → 由 DeepSeek 生成自我介绍),而非可交互对话系统。
_Avoid_:聊天机器人、对话助手、AI 产品

**Introduce 流程**:
Hero 终端里 `agent run introduce --lang <locale>` 触发的一次真跑:`--lang` 取自路由段(`/zh` 或 `/en`),Edge Function 据此 fetch GitHub pinned repos 并由 DeepSeek 按该语言生成自我介绍句。结果缓存 10 分钟,按公开叙事版本与 locale 分键,命中静默返回(不向访客标记 cached)。真跑失败时静默回退预录兜底文案(`messages/{zh,en}.json` 的 `hero.fallbackAnswer`),不向访客暴露失败。兜底文案须提及当前主打项目 Agnito,并保持高级全栈、NestJS、PostgreSQL 与 Agent 工程化的公开叙事。DeepSeek 输入为 `content/profile.json` 预筛关键字段(非全量),约束清单(zh/en 两段)记录在 `content/agent-prompt.md` 并与 `/api/agent` 同步维护。
_Avoid_:聊天、问答、对话

**真跑(Real Run)**:
在访客触发的请求路径上真实执行外部调用(GitHub API + DeepSeek),区别于预录脚本。Hero trace 中 `[tool] github.fetch` 与 `[answer]` 行为真跑;`[plan]` 与 `[tool] llm.rank` 为预录。
_Avoid_:表演、脚本

**Profile**:
`content/profile.json`,辞鸢的结构化档案(经历/技能/项目/联系方式),仓库内的真相源。同时喂三个消费方:Hero 真跑(DeepSeek 预筛关键字段作上下文)、SHEET 05 时间线、SHEET 04 项目卡(8 个已部署个人项目)。程序吃 Profile,人吃简历 PDF,各司其职。
_Avoid_:简历、个人资料、bio

**Agnito PostgreSQL 实战**:
指辞鸢在 Agnito 在线版中亲自完成的 PostgreSQL 持久化设计与实现；可用于简历中的实际数据库经验表述，不等同于当前 Lite 运行时的存储方式。
_Avoid_:仅作方案、未验证的 PostgreSQL 经验

**简历求职定位**:
“高级全栈工程师｜AI Agent 工程化”。该称谓用于本次企业数字化全栈岗位的中文简历，强调前端根基、端到端交付与 Agent 工程能力的连续性。
_Avoid_:只做前端、只做 AI Demo

**中文投递简历**:
本次交付为两页 A4 中文简历，文件为 `content/resume.zh.md`。内容覆盖个人概述、核心技能或专业技能、工作经历、AI Agent / 知识图谱项目、教育与联系信息；版式以旧 `resume/data/resume.html` 为基线，分页器按连续内容流测量并固定偏移到 A4 裁剪窗口，跨页项目从完整项目块顶部开始，不得靠隐藏、裁切或不可读字号实现。
_Avoid_:网站叙事稿、无关项目罗列

**简历生成能力**:
Portfolio 单体仓库内独立部署的 `apps/resume` Next.js 应用。它编辑 `content/resume.zh.md` 的候选内容，并经统一的 Markdown→简历 HTML 模板提供预览、历史版本与 PDF 生成下载；保存仅创建包含完整候选 Markdown 与 diff 的 GitHub Issue，绝不直接回写仓库或创建候选分支，简历内容不在应用内另立内容真相源。
_Avoid_:独立 resume 仓库、两份简历源文件、直接编辑 HTML、应用直接写入 Git、候选分支、从 Portfolio 页面直接生成

**简历编辑者**:
被授权在简历生成能力中提交候选内容 Issue 的 GitHub 账号。编辑者通过 GitHub OAuth 登录，账号白名单由 `RESUME_EDITOR_GITHUB_LOGINS` 配置；初始值为 `Mt-Youya,cyrusdoyle`，可调整以支持多名协作者。未获授权者不能创建提案。
_Avoid_:单一管理员、公开提案入口、直接写入权限、写死账号列表

**简历应用主题**:
`apps/resume` 自有的全局视觉 token 与样式，承载从原 `@resume/ui` 提取的主题定义。它为共享的 `@cyrus/ui` 组件提供同名 token，从而实现简历应用的局部视觉风格；共享组件库本身不携带应用主题。
_Avoid_:保留 `@resume/ui`、将简历主题写入 Portfolio 全局样式、为简历复制共享组件

**受控简历 Markdown**:
`content/resume.zh.md` 所遵循的固定章节与层级格式。简历应用用专用模板解释它，以稳定呈现技能、经历与项目的版式；候选内容若破坏该合同，必须在创建 Issue 前提示编辑者。
_Avoid_:通用 Markdown 页面、未校验的自由结构、排版漂移

**已发布版本**:
已经提交到 `content/resume.zh.md` 的简历内容，以 Git 提交历史为准。
_Avoid_:应用本地快照、未审核的候选内容

**待审核提案**:
由简历编辑者提交的 GitHub Issue，包含候选 Markdown 与 diff。它不是已发布版本，Issue 的开启或关闭状态用于呈现审核进度。
_Avoid_:候选分支、直接回写、将 Issue 当作可合并对象

**简历公开页**:
简历应用的首页，任何访客可查看当前已发布简历并下载由其生成的 PDF。
_Avoid_:展示候选内容、展示编辑器、要求访客登录

**简历管理入口**:
简历应用的 `/manage` 路由，仅向简历编辑者提供 Markdown 编辑、创建 Issue 与查看待审核提案的能力。
_Avoid_:公开管理界面、在公开页提交变更

**简历独立部署**:
与 Portfolio 网站同仓库、不同 Vercel 项目的 `apps/resume` 部署。该 Vercel 项目从仓库根目录执行 `pnpm --filter @cyrus/resume build`，使构建可读取根目录唯一的简历内容源。
_Avoid_:从 `apps/resume` 目录孤立构建、复制内容源、与 Portfolio 共用同一个部署项目

**即时 PDF**:
由简历公开页针对当前已发布 Markdown 按请求生成并直接返回的 PDF，不写入 Vercel 运行时文件系统或持久化 `output/` 目录。
_Avoid_:本地输出目录、过期的已保存 PDF、将临时文件当作版本记录

**简历交付格式**:
本次简历应用只交付 PDF。原 resume 仓库中与固定 HTML 文件耦合的 DOCX Python 脚本没有 Web 路由或界面入口，不属于迁移范围。
_Avoid_:将 README 声明当成已接入功能、迁移 DOCX 脚本、持久化 DOCX 输出

**简历 Issue 凭据**:
仅保存在 Vercel 服务端的细粒度 GitHub Token，权限限定为目标仓库的 `Issues: write`。它只用于创建待审核提案，不下发浏览器、不写入简历内容；Issue 正文必须标注发起提案的已授权 GitHub 账号。
_Avoid_:客户端 Token、编辑者仓库写权限、内容写入权限、匿名提案

**教育经历**:
武汉科技大学，软件工程专业，2021 年毕业。
_Avoid_:缺失或待核验的教育信息

**Agnito 简历定位**:
“Agnito｜代码知识图谱与 AI Agent 工作台”是本次简历的第一项目，用于证明 TypeScript、React、Koa、PostgreSQL、SSE 与 Agent 协议的端到端实践；智能运维 AI 助手为第二项目，证明业务效能。
_Avoid_:将 Agnito 表述为仅前端可视化项目

**Agnito 简历证据边界**:
不为 Agnito 填写未公开或未核验的规模、性能与使用量指标；以可验证的工程实现描述成果。
_Avoid_:编造查询延迟、节点规模、并发或用户数据

**JD 对齐网站叙事**:
为企业数字化全栈岗位准备的网站对外叙事：定位统一为“高级全栈工程师｜AI Agent 工程化”；Agnito 为第一项目，智能运维 AI 助手为第二项目，医疗平台与医学图形系统为补充项目，微前端重构项目不再展示。网站文案统一使用 NestJS；这是一项对外能力表述，不改变 Agnito 源码实际架构。
_Avoid_:全栈偏前端、Koa 网站表述、展示微前端重构项目、将网站文案理解为源码迁移

**BOM 物料表**:
SHEET 02 中以工程图纸详图形式呈现的 DeepSeek 工程化物料表(选型理由 + 接入架构 + 本站驱动标注)。原 Plan 的「五国产模型物料清单」已弃用——仅 DeepSeek 真介入,其余四个未介入,保留即假声明。DeepSeek 行盖「本站驱动」印泥红,表示 Hero 真跑由它驱动。
_Avoid_:模型列表、对比表、生态广度展示
