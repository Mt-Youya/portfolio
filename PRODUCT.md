# PRODUCT.md — yonjay.me Portfolio 产品真相源

> 执行真相源(ADR-0005)。本文记「做什么」;`docs/adr/` 记「为什么」;`DESIGN.md` 记设计 tokens;`PLAN.md` 已冻结为历史草稿。
> Codex 施工以本文 + ADR 为准。

## 1. 定位

把「简历网站」做成「以 Agent 的方式自我介绍」的叙事性表演。访客不是在读简历,而是在看一个 Agent 展示它的主人。整体为表演型 Agent,唯独 Hero 终端的 introduce 流程真跑(ADR-0001)。

## 2. 人物定位

标题定位:**全栈工程师 · AI Agent 方向**(Full-Stack Engineer, AI Agent Focused)。

叙事顺序(决定信息层级):
1. **AI Agent 工程**:Agent Harness、Spec-Driven Development、多 Agent 编排、Claude Code / MCP 工程化实践
2. **DeepSeek 工程化深度**(grill 修订,原「五国产模型生态广度」已弃用,ADR-0003):DeepSeek 接入架构、选型理由、本站真跑驱动
3. **全栈能力**:React / Vue / TypeScript 深度 + Node.js 后端 + Rust/Tauri 桌面端
4. 前端仍是根基,呈现方式是「前端功底 → 全栈交付 → Agent 产品化」的进化线,非并列罗列

代表项目(展示优先级,站内展示项目 = 8 个已部署个人项目,ADR-0003 N4 修订):
1. **TubePilot** — YouTube→Bilibili 自动化搬运工具(Tauri v2 + Next.js,Agent 化流水线,主打项目)
2. **agent-learning** — 面向前端工程师的中文 AI Agent 学习平台(Next.js 16 / Fumadocs / Turborepo)
3. **vite-mastery** — Vite 8 (Rolldown) 学习指南站,14 Parts + 10 实战项目
4. **PolyUI (@cyrus-ui)** — 跨框架组件库(React/Vue/Svelte/Solid,Base UI + Tailwind v4)
5. **AlgoMotion** — 算法可视化(Remotion/Manim,Step Tracer 事件流架构)
6. **中国城市到手工资计算器** — 全国主要城市个税+五险一金精确计算引擎

身份元素:中文名/网名 **辞鸢**(「鸢」= 纸鸢/风筝,视觉系统核心母题)、西文名 **Cyrus**、GitHub `Mt-Youya`。

## 3. 内容来源

- 程序吃 `content/profile.json`(结构化真相源,ADR R3);人吃简历 PDF(下载入口,§0.2)。
- 网站不是简历 PDF 复刻:网站讲故事,PDF 供下载,每个 section 底部保留下载入口。
- 简历 PDF:`https://www.yonjay.me/assets/resume.pdf`(有 bot 防护,需手动镜像或保留现有)。

## 4. 逐屏编排(grill 修订版)

### SHEET 00 — 开场加载(仅首次访问,≤1.8s,可跳过)
蓝图网格描线展开 → 辞鸢印章盖下 → 印章缩小飞到导航栏 logo 位(Flip)。sessionStorage 记忆,刷新不重播。
**真跑预取(ADR O1)**:SHEET 00 挂载即经 Zustand `fetchAgentIntro(locale)` 发起 `/api/agent` 真跑,1.8s 动画掩护冷启动。

### SHEET 01 — Hero:「一个正在自我介绍的 Agent」
布局:左 60% 文字,右 40% 3D 纸鸢;下方横贯终端。
1. 大标题两行:`辞鸢` + `全栈工程师 · AI Agent 方向`。SplitText 描线式入场(字符先 0.5px 描边线框,再填充墨色)
2. 副标题 ScrambleText 从乱码解码为正文,只播一次
3. **Agent 自我介绍终端**(真跑,ADR-0001/0002):
   ```
   $ agent run introduce --lang <locale>
   ▸ [plan]    读取 profile.json … done
   ▸ [tool]    github.fetch(Mt-Youya) → <N> repos
   ▸ [ctx]     deepseek.select(model=deepseek-v4-pro)
   ▸ [answer]  <DeepSeek 实时生成,或失败回退 hero.fallbackAnswer>
   ```
   - `[tool] github.fetch` 与 `[answer]` 真跑;`[plan]` 与 `[ctx] deepseek.select` 预录
   - `N` = GitHub 真实仓库数(由 `/api/agent` 返回,ADR-0003 真实性)
   - `deepseek.select` 取代原 `llm.rank(5 模型)`——仅 DeepSeek 真介入,rank 5 模型是假声明(ADR-0003)
   - 打字机效果(TextPlugin),最后一行出现后放滚动提示
   - **滚动阻塞(ADR P4)**:暖缓存命中时阻塞至 answer 出现才放滚动;冷启动不阻塞,answer 异步追加
4. 3D 纸鸢:R3F 悬浮 + 鼠标视差(±6°),Hero 离开视口 `frameloop='demand'`

### SHEET 02 — AI Agent 能力(全站最重一屏,pin 住讲完)
**S4 改版(ADR-0003)**:Agent Loop 蓝图与本站真跑实现同图叠加——
- 一张 SVG 工程图纸画 `感知 → 规划 → 工具调用 → 观察 → 循环` 回路
- ScrollTrigger `pin: true, scrub: 1`,回路各段依次 DrawSVG 描线
- 节点标注本站实现:感知节点标「GitHub fetch」、**工具调用节点标「DeepSeek(本站驱动,印泥红)」**、观察节点标「10min 缓存」
- token 小方块沿 MotionPath 在回路上跑,速度绑定 scrub;跑到工具调用节点时触发 DeepSeek 标注高亮
- 原「五模型 BOM + hover 验讫章」编排作废

### SHEET 03 — 全栈技能矩阵:「爆炸图」
**E3 R3F 真爆炸图(ADR-0004)**:R3F 渲染五块平板(UI/状态/API/数据/基建层),ScrollTrigger scrub 驱动 translateY + rotateX 展开,DrawSVG 引出标注线列出各层技术栈。反向滚动收拢(「全栈 = 能把这台机器拆了再装回去」)。
**Canvas 生命周期(ADR-0004 G2)**:SHEET 03 独占 R3F,`frameloop='demand'` + `onUpdate` → `invalidate()`。

### SHEET 04 — 项目精选(8 个已部署个人项目,双列图纸卡)
每项目一张图纸卡:左上图号(`PROJ-01 TubePilot`)、中间产品截图/示意 SVG、下方 Mono 技术栈标签。入场 batch ScrollTrigger(图纸从图筒抽出感),hover 描线加深+图号变印泥红,点击 Base UI Dialog 展开(GSAP timeline)。TubePilot 卡额外 mini pipeline 动画(YouTube→字幕→翻译→Bilibili 四节点 MotionPath 循环)。

### SHEET 05 — 经历时间线
竖直风筝线向下,经历节点挂线上(牙颜医疗前端工程师 → 全栈/Agent 转型关键节点)。每节点:时间 Mono 小字 + 一句话成果,进入视口时圆点「盖章式」出现(scale 1.4→1 + 印泥红仅当前节点)。数据源 `content/profile.json`。轻量 batch,不 pin。

### SHEET 06 — 开源 / 写作 / 联系(Footer)
GitHub 贡献、agent-learning 文档链接、语言切换、邮箱。终章:风筝线收线 → 辞鸢大印章盖在 footer 右下(全站第三处印泥红),旁 Mono 小字 `SHEET 06 OF 06 — APPROVED`。
**彩蛋(ADR E2)**:连点印章 3 次(Observer `threshold:3, interval:0.6s`),纸鸢挣脱引线 MotionPath 飞一圈。仅桌面 + 非 reduced-motion;移动端/reduced-motion 不显示彩蛋触发。

## 5. 印泥红 3 处名额(锁定,ADR-0001)
1. SHEET 00 开场印章(飞到 logo 位后不再用印泥红)
2. SHEET 02 工具调用节点「DeepSeek 本站驱动」标注
3. SHEET 06 终章大印章

## 6. 不要做清单
- ❌ Inter 全站单字体、紫蓝渐变、卡片套卡片、彩色底灰字、图标方块置于每个标题上方
- ❌ 奶油底 + 高对比衬线 + 陶土橙(#D97757 一类)
- ❌ 纯黑底 + 单一酸性绿/朱红点缀
- ❌ 无意义 01/02/03 序号装饰(本站图号是导航系统,属例外)
- ❌ 每个元素都 fade-up:入场必须服务「蓝图/描线/盖章」母题
- ❌ 移动端跑 ScrollSmoother 或 pin 长 section
- ❌ 印泥红同屏超过 3 处
- ❌ 事实造假:trace 数字、BOM 模型必须真实(ADR-0003)
