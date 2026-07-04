# yonjay.me 个人网站重构计划(v3 · 全栈 + AI Agent 方向)

> 本文件是给 Codex 执行的完整施工计划。请严格按 Phase 顺序执行,每个 Phase 结束后停下等确认。
> 定位一句话:**把「简历网站」做成「一个正在运行的 Agent」**——访客不是在读简历,而是在看一个 Agent 展示它的主人。

---

## 0. 项目定位与叙事

### 0.1 人物定位(所有文案围绕这个展开)

- 标题定位:**全栈工程师 · AI Agent 方向**(Full-Stack Engineer, AI Agent Focused)
- 叙事顺序(重要,决定信息层级):
  1. **AI Agent 工程**:Agent Harness、Spec-Driven Development、多 Agent 编排、Claude Code / MCP 工程化实践
  2. **国产大模型生态**:Qwen / DeepSeek / GLM / Kimi / Doubao 的接入与选型经验
  3. **全栈能力**:React / Vue / TypeScript 深度 + Node.js 后端 + Rust/Tauri 桌面端
  4. 前端仍是根基,但呈现方式是「前端功底 → 全栈交付 → Agent 产品化」的进化线,而不是并列罗列
- 代表项目(按展示优先级):
  1. **TubePilot** — YouTube→Bilibili 自动化搬运工具(Tauri v2 + Next.js,Agent 化流水线,最能体现 AI Agent + 全栈)
  2. **agent-learning** — 面向前端工程师的中文 AI Agent 学习平台(Next.js 16 / Fumadocs / Turborepo)
  3. **vite-mastery** — Vite 8 (Rolldown) 学习指南站,14 Parts + 10 实战项目
  4. **PolyUI (@cyrus-ui)** — 跨框架组件库(React/Vue/Svelte/Solid,Base UI + Tailwind v4)
  5. **AlgoMotion** — 算法可视化(Remotion/Manim,Step Tracer 事件流架构)
  6. **中国城市到手工资计算器** — 全国主要城市个税+五险一金精确计算引擎
- 身份元素:中文名/网名 **辞鸢**(「鸢」= 纸鸢/风筝,是视觉系统的核心母题,见 §2)、GitHub `Mt-Youya`

### 0.2 内容来源

- 简历 PDF 在 `https://www.yonjay.me/assets/resume.pdf`(⚠️ 有 bot 防护,Codex 抓不到就让 Jay 手动把文本贴进 `content/resume.zh.md`)
- 网站不是简历的 PDF 复刻:**网站讲故事,PDF 供下载**。每个 section 底部保留「下载完整简历」入口

---

## 1. 设计方向(以顶级 UI 设计师视角给出的唯一推荐方案)

### 1.1 主题:「工程蓝图 × 印鉴」(Blueprint & Seal)

**为什么是它:**

- 「专业大气」→ 工程蓝图/制图语言:细线、标注、网格、图纸编号,天然传达严谨的工程师气质,且完美承载 Agent 架构图(Agent loop、工具调用链本来就该画成图纸)
- 「有趣」→ 两个反差元素:① 篆刻印章「辞鸢」作为个人标识,以**盖章动画**出现在关键节点;② 一只低多边形**纸鸢**(风筝)作为贯穿全站的 3D 灵魂角色,随滚动飞行
- **刻意避开三大 AI 味模板**:不要奶油底+衬线+陶土橙、不要纯黑底+单一酸性绿/朱红点缀、不要报纸风 hairline 布局。蓝图方向自带独特性
- 文化辨识度:蓝图(国际工程语言)+ 印章(中文身份),正好对应「服务国内市场、对齐国际工程标准」的人设

### 1.2 Design Tokens

**颜色(浅色为主题默认,提供深色「夜间图纸」模式):**

```css
:root {
  /* 纸面 */
  --paper: #f4f3ee; /* 图纸底色,暖灰白,不是纯白 */
  --paper-raised: #fbfaf7; /* 卡片浮起层 */
  /* 墨线 */
  --ink: #171a21; /* 主文字/主线条 */
  --ink-soft: #4a4f5a; /* 次级文字 */
  --grid: #d8d6cc; /* 蓝图网格线,极淡 */
  /* 蓝图蓝(主品牌色) */
  --blueprint: #1e4fd8; /* 链接、图纸描线、强调 */
  --blueprint-soft: #a8bcf0;
  /* 印泥红(点睛,克制使用:仅印章、当前态、重要 CTA) */
  --seal: #b5382e;
  /* Agent 运行态(终端/代码块专用) */
  --terminal-bg: #10131a;
  --terminal-green: #7bd88f;
}

.dark {
  /* 夜间图纸:深蓝黑底 + 白描线,像晒图纸(cyanotype)反转 */
  --paper: #0d1220;
  --paper-raised: #131a2c;
  --ink: #e8eaf2;
  --ink-soft: #9aa3b8;
  --grid: #223052;
  --blueprint: #6e93f5;
  --seal: #e05c50;
}
```

规则:**印泥红全站同屏最多出现 3 处**。蓝图蓝负责「专业」,印泥红负责「有趣」,不许互换职责。

**字体(三角色制):**

| 角色    | 中文                           | 西文                          | 用途                              |
| ------- | ------------------------------ | ----------------------------- | --------------------------------- |
| Display | 思源宋体 Heavy(或「屏显臻宋」) | Zodiak / Gambarino(fontshare) | 大标题,带笔锋的宋体呼应印章气质   |
| Body    | 思源黑体 / MiSans              | General Sans / Switzer        | 正文,克制中性                     |
| Mono    | —                              | JetBrains Mono / Commit Mono  | 图纸标注、代码、Agent trace、数据 |

- 禁用 Inter 作为唯一字体;禁止紫蓝渐变
- 图纸标注(尺寸线、编号如 `FIG. 02 / SHEET A-3`)一律 Mono 大写 + 宽字距,这是「蓝图感」的主要来源

**版式:**

- 12 列网格,最大宽度 1280px;背景铺极淡的蓝图网格(`--grid`,每 8px 小格 / 64px 大格),滚动时网格有 0.05 级视差
- 每个 section 左上角有图纸编号角标(`SHEET 01 — HERO`),Mono 小字。这不是装饰:它就是页面导航系统,点击可跳转
- 圆角统一 2px(制图感,拒绝大圆角卡片);阴影极浅,层级靠描线而非投影

### 1.3 签名元素(全站只允许一个「放肆」的地方)

**纸鸢(3D 低多边形风筝)+ 引线**:

- Hero 中以 react-three/fiber 渲染一只折纸风格的鸢(风筝/纸鸢双关),线框材质 + 蓝图蓝描边,缓慢悬浮
- 滚动时,一条 SVG 引线(风筝线)沿页面主轴向下延伸(DrawSVGPlugin 描线),纸鸢降级为 2D SVG 形态沿线飞行(MotionPathPlugin),在每个 section 的图纸编号处「停靠」一次
- 到 footer 时风筝线收尾成一枚「辞鸢」印章,盖章动画(scale + 轻微旋转 + 印泥红扩散)作为全站终章
- 移动端 / `prefers-reduced-motion`:3D 纸鸢替换为静态 SVG,引线只保留 section 进入时的短描线

---

## 2. 信息架构与逐屏动画编排

> 动画总原则(来自 gsap-skills 官方最佳实践):多步动画一律 `gsap.timeline()`,位移用 transform(x/y/scale/rotation)不动 layout 属性,淡入淡出用 `autoAlpha`,React 中一律 `useGSAP()` 作用域化并自动清理,路由切换 kill 掉 ScrollTrigger。

全站滚动容器用 **ScrollSmoother**(桌面端,`smooth: 1.2`;移动端关闭)。

### SHEET 00 — 开场加载(仅首次访问,≤1.8s,可跳过)

- 蓝图网格从中心向外描线展开(DrawSVG)→ 「辞鸢」印章盖下(0.4s,带一次 8° 过冲)→ 印章缩小飞到导航栏 logo 位(Flip)
- sessionStorage 记忆,刷新不重播

### SHEET 01 — Hero:「一个正在自我介绍的 Agent」

布局:左 60% 文字,右 40% 3D 纸鸢;下方一条横贯的终端。

1. 大标题两行:`辞鸢` + `全栈工程师 · AI Agent 方向`。SplitText 按字符入场,但**不用烂大街的逐字上浮**——用「蓝图描线」感:字符先以 0.5px 描边线框出现(clip-path 揭示),再 0.2s 内填充墨色,stagger 0.02
2. 副标题用 ScrambleTextPlugin 从乱码解码为正文(呼应 LLM token 生成),只播一次
3. **核心趣味点——Agent 自我介绍终端**:一个仿真终端逐行打出
   ```
   $ agent run introduce --lang zh
   ▸ [plan]    读取 resume.pdf … done
   ▸ [tool]    github.fetch(Mt-Youya) → 6 pinned repos
   ▸ [tool]    llm.rank(Qwen, DeepSeek, GLM, Kimi, Doubao)
   ▸ [answer]  你好,我是辞鸢的 Agent。他写前端出身,现在让我替他干活。
   ```
   打字机效果(TextPlugin),每行前的 spinner 用 CSS。最后一行出现后,页面才允许滚动提示出现(一条向下的尺寸标注线循环 DrawSVG)
4. 3D 纸鸢:R3F 悬浮 + 鼠标视差(±6°),Hero 离开视口时 `frameloop='demand'` 省电

### SHEET 02 — AI Agent 能力(全站最重的一屏,pin 住讲完)

- **交互式 Agent Loop 蓝图**:一张 SVG 工程图纸,画出 `感知 → 规划 → 工具调用 → 观察 → 循环` 的回路。ScrollTrigger `pin: true, scrub: 1`,滚动推进时:
  - 回路各段依次 DrawSVG 描线
  - 每到一个节点,右侧浮出对应的真实工程经验卡(Mono 标注风格):Agent Harness 设计 / Spec-Driven Development / MCP 工具协议 / 多 Agent 编排(Claude Code + Reviewer 模式)
  - 节点之间有一个小方块(代表 token/消息)沿 MotionPath 在回路上跑,速度绑定 scrub 进度——**滚动越快,Agent「思考」越快**,这是本屏的趣味彩蛋
- 屏末:国产大模型生态条。五个模型(Qwen/DeepSeek/GLM/Kimi/Doubao)以「图纸物料表 (BOM)」形式列出,hover 时该行用印泥红盖一个小「验讫」章

### SHEET 03 — 全栈技能矩阵:「爆炸图」

- 用机械制图的**分解图(exploded view)**隐喻全栈:一个应用被拆成 UI 层 / 状态层 / API 层 / 数据层 / 基建层五块板,初始叠合
- ScrollTrigger scrub:滚动时五层沿 Y 轴展开(GSAP 控制 translateY + rotateX 8°,纯 CSS 3D 即可,不必上 R3F),每层旁边 DrawSVG 引出标注线,列出该层技术栈(React/Vue/TS ← → Node.js/Nest ← → Rust/Tauri…)
- 反向滚动时收拢——「全栈 = 能把这台机器拆了再装回去」,文案就用这句

### SHEET 04 — 项目精选(6 个,双列图纸卡)

- 每个项目是一张「图纸卡」:左上图号(`PROJ-01 TubePilot`),中间产品截图/示意 SVG,下方 Mono 技术栈标签
- 入场:batch ScrollTrigger,卡片以「图纸从图筒抽出」的感觉入场(y: 40 → 0 + 轻微 rotateZ 归零 + autoAlpha),stagger 0.08
- hover:Flip 或 scale(1.02) + 描线加深 + 图号变印泥红;点击展开详情(Base UI Dialog,进出场也走 GSAP,`onOpenChange` 里驱动 timeline)
- TubePilot 卡片额外给一条 mini pipeline 动画(YouTube → 字幕 → 翻译 → Bilibili 的四节点小流程,循环 MotionPath),它是主打项目,允许比别人「吵」一点

### SHEET 05 — 经历时间线

- 竖直风筝线继续向下,经历节点挂在线上(雅延医疗前端工程师 → 全栈/Agent 转型的关键节点)
- 每个节点:时间 Mono 小字 + 一句话成果;进入视口时节点圆点「盖章式」出现(scale 1.4 → 1 + 印泥红仅当前节点)
- 不做 pin,轻量 batch 即可——上一屏已经很重,这里要「安静」

### SHEET 06 — 开源 / 写作 / 联系(Footer)

- GitHub 贡献、agent-learning 文档链接、语言切换、邮箱
- 终章:风筝线收线 → 「辞鸢」大印章盖在 footer 右下(全站第三处、也是最后一处印泥红),旁边 Mono 小字 `SHEET 06 OF 06 — APPROVED`
- 彩蛋:连点印章 3 次,纸鸢挣脱引线在屏幕上飞一圈(Observer + MotionPath,纯趣味)

### 动画 ↔ GSAP 插件对照表(全部免费,官方 npm 包)

| 场景                    | 插件                           |
| ----------------------- | ------------------------------ |
| 全站平滑滚动            | ScrollSmoother(桌面)           |
| 所有滚动触发/pin/scrub  | ScrollTrigger                  |
| 标题拆字                | SplitText                      |
| 副标题解码              | ScrambleTextPlugin             |
| 终端打字                | TextPlugin                     |
| 蓝图描线/风筝线/标注线  | DrawSVGPlugin                  |
| 纸鸢/消息块沿线运动     | MotionPathPlugin               |
| 印章 logo 位移/卡片展开 | Flip                           |
| 彩蛋交互                | Observer                       |
| 印章过冲手感            | CustomEase(自定义 `seal` ease) |

---

## 3. 技术方案

### 3.1 栈与目录

- **Next.js 16(App Router)+ TypeScript 7 + pnpm 11 monorepo**,Tailwind v4,shadcn/ui(Base UI primitives,不是 Radix)
- **Zustand**:`useUiStore`(theme / locale / 动画偏好 / 加载动画已播标记);持久化到 localStorage(theme+locale)
- **i18n:next-intl**,`/zh`(默认)与 `/en` 路由段;文案全部走 `messages/{zh,en}.json`,禁止硬编码
- **GSAP**:`gsap` + `@gsap/react`(useGSAP);**react-three/fiber + drei** 仅在 Hero 纸鸢使用,`next/dynamic` + `ssr: false` 懒加载

```
apps/web/
  app/[locale]/(site)/page.tsx        # 单页主站
  components/
    canvas/PaperKite.tsx              # R3F 纸鸢(dynamic import)
    blueprint/{Grid,SheetLabel,DrawLine,Seal}.tsx
    sections/{Hero,AgentLoop,StackExploded,Projects,Timeline,Footer}.tsx
    terminal/AgentTerminal.tsx
  lib/gsap.ts                         # 统一注册插件 + CustomEase('seal')
  stores/ui.ts
  messages/{zh,en}.json
content/resume.pdf
packages/ui/
    components/button/index.tsx
pnpm-workspace.yaml
```

### 3.2 GSAP 工程规则(写进代码,不是口头约定)

1. 插件注册只在 `lib/gsap.ts` 做一次;所有动画组件 `'use client'`
2. 每个 section 组件内部用 `useGSAP(() => {...}, { scope: ref })`,依赖 locale 变化时 revert 重建(SplitText 对中文按 `chars` 拆,注意 `type: 'chars'` 对 CJK 可用,但要 `aria-label` 保留原文)
3. `ScrollTrigger.matchMedia()` 区分桌面/移动:移动端关 ScrollSmoother、关 pin、scrub 改为一次性入场
4. `prefers-reduced-motion`:`gsap.matchMedia()` 中所有 timeline 降级为 `duration: 0` 的直达状态,纸鸢换静态 SVG
5. 性能预算:LCP ≤ 2.5s;R3F 场景 ≤ 300 个三角面 + `dpr={[1, 1.5]}`;蓝图网格用 CSS background 而非 SVG 节点;同屏活跃 tween ≤ 20

### 3.3 部署

- Vercel;由于国内访问不稳,构建产物同步做一份静态导出评估(若 R3F/动画不依赖服务端可 `output: 'export'` + 国内 OSS/CDN 兜底,Phase 6 再定)

---

## 4. 设计 Skill 使用编排(给 Codex 的协作规则)

> 冲突总原则(沿用 Jay 的既有约定):**同一时间只有一个 skill 拥有 `MASTER.md` / `DESIGN.md` 的所有权**,其余 skill 只读不写。本项目的所有权归 impeccable。

| 阶段            | Skill                           | 用法                                                                                                                                                                                  |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 1 开始前  | **ui-ux-pro-max**               | 输入「engineer portfolio, blueprint aesthetic, AI agent」让它产出候选 design system,仅作参照;凡与本文件 §1.2 tokens 冲突,以本文件为准                                                 |
| Phase 1         | **impeccable**                  | `npx impeccable install` → `/impeccable init`,把 §0/§1 内容写入 PRODUCT.md 与 DESIGN.md(anti-references 写明:no Inter-only, no purple gradient, no cream+terracotta, no card-in-card) |
| 每个 Phase 结束 | **impeccable**                  | `/impeccable audit <区域>` → 修复 → `/impeccable critique`;上线前跑一次 `/impeccable polish` 全站                                                                                     |
| Phase 4(动画)   | **gsap-skills**(greensock 官方) | 写任何 GSAP 代码前必须加载对应 SKILL.md(core / timeline / scrolltrigger / react / performance);React 清理模式、插件注册、transform-first 全按官方 skill 执行                          |
| Phase 4 后微调  | **gpt-taste (taste-skill)**     | 用参数化方式调「动画烈度」:目标 MOTION_INTENSITY ≈ 7、DESIGN_VARIANCE ≈ 6;只调不推翻布局                                                                                              |

顺序固定:**ui-ux-pro-max(生成参照)→ impeccable(立规矩+持续审计)→ gsap-skills(动画实现)→ gpt-taste(手感微调)**。

---

## 5. 分阶段执行(Codex 按序执行,每阶段完成后停)

**Phase 0 — 脚手架**
pnpm 11 workspace + Next.js 16 + TS 7 + Tailwind v4 + shadcn/ui(Base UI)初始化;next-intl 双语路由;Zustand store;`lib/gsap.ts`;CI 上 `pnpm typecheck && pnpm lint`。验收:双语空页可跑,主题切换可用。

**Phase 1 — 蓝图设计系统**
落地 §1.2 全部 tokens(CSS variables + Tailwind theme);Grid 背景、SheetLabel、DrawLine、Seal 四个基础组件;字体接入(next/font,中文字体 subset);impeccable init。验收:一个 style-guide 页面展示所有 tokens/组件。

**Phase 2 — Hero + 纸鸢**
Hero 布局与文案(zh/en);SplitText 描线式标题入场;ScrambleText 副标题;AgentTerminal 打字序列;R3F PaperKite(dynamic import + 降级 SVG)。验收:LCP 达标,reduced-motion 下完整可读。

**Phase 3 — 四个内容 section**
AgentLoop(pin+scrub 蓝图回路)、StackExploded(分解图)、Projects(图纸卡+详情 Dialog)、Timeline、Footer。先静态布局全部完成,再挂动画骨架(入场级)。验收:内容与简历一致,双语齐全。

**Phase 4 — 动画深化**
按 §2 对照表逐屏实现全部编排;matchMedia 移动端降级;开场加载动画;印章彩蛋。写动画前加载 gsap-skills 对应 SKILL.md。验收:滚动全程 60fps(6x CPU throttle 下 ≥ 30fps),无布局抖动。

**Phase 5 — i18n / a11y / 性能**
文案终稿双语校对;键盘焦点全链路;SplitText 的 aria 处理;图片 next/image + AVIF;Lighthouse ≥ 90(Perf/A11y/SEO);OG 图(蓝图风格模板)。

**Phase 6 — 审计与上线**
`/impeccable polish` + `critique` 全站;gpt-taste 动画微调;Vercel 部署 + 国内访问评估;简历 PDF 下载链路;404 页(蓝图上一个「图纸遗失」印章,顺手有趣一下)。

---

## 6. 明确的「不要做」清单

- ❌ Inter 全站单字体、紫蓝渐变、卡片套卡片、彩色底灰字、图标方块置于每个标题上方
- ❌ 奶油底 + 高对比衬线 + 陶土橙(#D97757 一类)组合
- ❌ 纯黑底 + 单一酸性绿/朱红点缀
- ❌ 无意义的 01/02/03 序号装饰(本站的图号是导航系统,属于例外,因为它承担信息)
- ❌ 每个元素都 fade-up:入场动画必须服务「蓝图/描线/盖章」母题,否则删掉
- ❌ 在移动端跑 ScrollSmoother 或 pin 长 section
- ❌ 印泥红同屏超过 3 处

---

_SHEET PLAN — REV.3 · 辞鸢 · 待 Codex 施工_
