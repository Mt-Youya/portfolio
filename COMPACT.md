# 上下文压缩 — v3 Portfolio 重构

**日期**:2026-07-08
**分支**:v2(孤儿分支,初始提交 c49d836)
**项目**:`/Users/yonjay/codes/hubs/portfolio`(pnpm monorepo,apps/web)
**语言要求**:AGENTS.md 规定所有回复用简体中文

---

## 1. 项目定位

辞鸢(Cyrus)个人作品集,定位"全栈工程师 · AI Agent 方向"。核心概念:让作品集像一个"展示其主人的 Agent"——Hero 终端真实运行 introduce 流程(GitHub fetch + DeepSeek 生成),非预录脚本。

技术栈:Next.js 16(App Router) + TS 7 + pnpm 11 monorepo + Tailwind v4 + shadcn/ui(Base UI) + Zustand + next-intl + GSAP 3.15(多插件) + R3F/three + Edge Function `/api/agent` + DeepSeek V4 Pro。

视觉主题:"工程蓝图 × 印鉴"(Blueprint & Seal),3 处印章红锁定。

---

## 2. 关键决策(ADR 0001–0006)

- **ADR-0003 真实性**:profile.json 数据必须真实,禁止造假。BOM trace 原谎报 5 模型 → 改为 `deepseek.select(model=deepseek-v4-pro)` 仅 DeepSeek。
- **B 决策**:Hero 走轻量真跑(非全量)。
- **R3**:profile.json 是单一结构化真相源,程序吃 json,人吃简历 PDF。
- **G2**:R3F 风筝遇 canvas 冲突时降级为 SVG。
- **D4 文档分层**:ADR=why,PRODUCT=what,DESIGN=tokens,PLAN=history。
- **N4**:Hero introduce 只介入 DeepSeek,不接多模型。

---

## 3. 文件结构要点

- `content/profile.json` — 结构化真相源(identity/positioning/stack/projects/experience/contact/deepseekNote)
- `content/profile.schema.json` — JSON Schema
- `apps/web/lib/profile.ts` — 导出 `Profile` 与 `ProfileProject` 类型(`url` 已设为可选)
- `apps/web/app/[locale]/(site)/page.tsx` — HomePage,组装所有 section,消费 profile + i18n `t.raw()`
- `apps/web/messages/{zh,en}.json` — i18n 文案
- `apps/web/components/site/` — HeroSection / AgentSection / StackExploded / ProjectsSection / Timeline / HighlightsSection / ContactSection / SiteHeader / SectionHeader
- `apps/web/components/motion/PortfolioMotion.tsx` — GSAP 总动画(必须保留,删了全站动画消失)
- `apps/web/data/links.ts` — 8 个个人部署项目(曾被误用,已还原)

---

## 4. 已完成阶段

- Phase 0:脚手架 + 依赖(.npmrc 指向 registry.npmjs.org 解决 picomatch 镜像缺失)
- Phase 0.5:`/api/agent` Edge Function 真跑后端(GitHub fetch + DeepSeek + locale 分键缓存 10min)
- Phase 1:Blueprint 设计系统(tokens + Seal 组件)
- Phase 2:Hero 终端 + 纸鸢风筝(R3F→SVG 降级)
- Phase 3:各 section 重写完成,typecheck 通过,/zh /en 返回 200

---

## 5. 本轮(2026-07-08)修复记录

### 5.1 read-image-cli 工具(美团内网读图)

- 仓库:`ssh://git@git.sankuai.com/~liuyangke02/read-image-tools.git`,克隆到 `/tmp/read-image-tools`
- 全局安装:`pnpm link --global`(需 `PNPM_HOME=/Users/yonjay/.pnpm/bin` 前缀绕过 PATH 报错)
- 配置:`~/.read-image-cli/config.json` `{apiKey:"21965762100027891721", baseUrl:"https://aigc.sankuai.com/v1/openai/native", model:"gemini-3.1-flash-lite-preview"}`
- ⚠️ `gpt-image-2` 是图像生成模型,读图返回 500;改用 `gemini-3.1-flash-lite-preview` 可用(偶发 429,重试即可)
- ⚠️ 曾误设 `pnpm config set global-bin-dir`,已 `pnpm config delete global-bin-dir` 回退;`~/.pnpm/bin` 目录内容未动
- ⚠️ symlink 源在 `/tmp`,重启会失效,建议移到 `~/.local/share/read-image-tools` 后重新 link

### 5.2 profile.json 数据修正

- **stack.data**:删假数据 `[SQLx,Supabase,Upstash Redis,SRT,Trace Events,Structured JSON]` → 改为简历真实 `[MySQL,Redis,知识库检索,日志检索,Function Calling,MCP]`
- **stack.infra**:补充 `pnpm Monorepo / 私有 npm`(原仅 Vite/Webpack/qiankun/Jenkins/Docker)
- **stack.ui**:补充 `Tailwind CSS / shadcn/ui`
- **stack.api**:用户明确要求**不动**,保持 `[Node.js, Koa.js]`

### 5.3 项目还原(重要!)

- 用户反馈:此前误将 8 个个人项目(links.ts)替换了简历 4 个工作项目,工作项目才是给招聘方看的
- 已把 `profile.json` 的 `projects` 从 8 个人项目 → **4 个工作项目**:
  1. `ops-agent` 智能运维 AI 助手(isFlagship=true)
  2. `oral-medical` 口腔医学智能平台
  3. `cephalometric` 医学头影测量系统
  4. `longmao-saas` 龙猫校园智能体测平台
- 中英文 tagline/highlights/stack 对齐 zh.json/en.json 原文
- 工作项目无部署 URL,`ProfileProject` 类型 `url` 设为可选,schema 同步更新
- schema 描述里"TubePilot 必为首项"过时说明已改

### 5.4 StackExploded 布局修复

- 问题:5 层卡片 `absolute` + `translateY(-28px)` 递增,28px 远小于卡片高度 → 严重重叠、文字撞在一起、底部溢出容器压到网格背景
- 修复(`apps/web/components/site/StackExploded.tsx`):
  - `LAYER_GAP = 96`(原 28)
  - `translateY(${offset}px)` 正方向展开(原负方向)
  - 容器 `minHeight` 动态 = `(5-1)*96 + 180 = 564px`

---

## 6. 待办

- [ ] 验证 StackExploded 修复后视觉效果(用户截图确认)
- [ ] Phase 4 动画深化:SHEET 02 pin+scrub+MotionPath / SHEET 03 R3F+scrub / SHEET 04 卡片动画 / SHEET 05 节点动画 / SHEET 00 开场
- [ ] 清理 zh.json/en.json 里未使用的旧 `projects.items`(4 项目旧文案,ProjectsSection 现消费 profile.projects)
- [ ] read-image-cli symlink 源移到持久路径

---

## 7. 用户偏好(记住!)

- **工作项目是核心**:给招聘方看,绝不用个人练手项目替代
- **stack.api 不要改**:用户明确要求保持 `[Node.js, Koa.js]`
- **不要擅自改 pnpm 全局配置**:`~/.pnpm/bin` 是用户的,改了会影响日常 pnpm 使用
- **回复用简体中文**
- **有 gsap-skills 可用**:动画相关注意引用
