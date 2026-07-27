<!-- 本文件为中文投递简历；内容以本次已确认的经历与项目事实为准。 -->

# 窦扬杰-辞鸢（Cyrus）

**高级全栈工程师｜AI Agent 工程化**<br>

## 教育与联系信息

武汉科技大学 · 软件工程 · 2017～2021<br>
contact@yonjay.me ｜ [GitHub](https://github.com/Mt-Youya) ｜ [个人网站](https://yonjay.me)

## 个人概述

5 年企业应用研发经验，具备 TypeScript、React 与 Node.js 全栈交付能力。聚焦将 AI Agent 落地为可维护的业务系统：从 React 交互、NestJS API、流式协议与工具调用，到 PostgreSQL 持久化和上线工程化均有实践；能够与产品、业务协作拆解需求并推进端到端交付。

## 专业技能

- **前端：** TypeScript、React 18/19（Hooks、Context、Zustand）、Vue 2/3、Next.js、Vite；熟悉 Ant Design、Element Plus，能够构建复杂企业级表单、权限与数据看板。
- **AI Agent：** LangChain、Function Calling、MCP、Prompt 模板与 Few-shot、知识库/日志检索；具备 Agent 工具编排、上下文治理、结构化输出和 SSE 流式交互实践。
- **后端与数据：** Node.js、NestJS、REST API、SSE、WebSocket；PostgreSQL（JSONB 持久化与查询设计）、Redis。
- **工程化：** pnpm Monorepo、Docker、Jenkins、私有 npm 包、Git 协作与代码审查；熟悉 Linux 研发环境与常用命令。

## 工作经历

### 牙颜（上海）医疗科技有限公司｜前端技术经理 / 全栈（偏前端）工程师

**2021.06 – 至今**

- 推进智能运维 AI 助手与医学平台等业务系统的需求拆解、跨端方案和上线协同，覆盖 React 交互、NestJS 服务接入与 Prompt 规范。
- 主导医生、技师、管理员三角色的病例工单与管理后台建设，完成动态表单、权限、审计日志与数据看板；以链表结构处理表单依赖校验，使迭代周期缩短约 **40%**。
- 建设公共设计系统和私有 npm 组件库，服务多子应用复用，消除重复代码约 **30%**；参与 Git 协作、接口契约和发布流程建设。

## 代表项目

### Agnito｜代码知识图谱与 AI Agent 工作台

- 构建以代码关系图为核心的知识图谱工作台，使用 React Flow 呈现模块、依赖与证据关系，支持图谱检索、详情追溯及本地仓库知识浏览。
- 设计 Rest API 与 Agent 在线问答链路，通过 SSE 输出并支持按事件序列恢复；前端以 `Last-Event-ID` 衔接流式结果，提升长任务交互的可恢复性。
- 亲自完成 PostgreSQL 持久化设计与实现：以 JSONB 存储问答执行协议和事件数据，通过幂等写入、序列化事件及按凭据/工作区查询，支撑可追溯的 Agent 执行记录。
- 将图谱数据、API、Agent 协议和前端交互拆分为可独立验证的模块，配套 TypeScript 类型检查、单元/集成测试及构建校验。

技术栈：TypeScript · React · React Flow · Rest · PostgreSQL · SSE · FastAPI

### 智能运维 AI 助手

- 基于 LangChain 与 Function Calling 对接监控 API、日志检索和知识库检索，构建多工具 Agent；将告警根因研判从 **15 分钟缩短至 2 分钟以内**，首 Token 延迟 **< 300ms**。
- 实现 SSE 流式渲染、Markdown/代码高亮、上下文操作与工具结果卡片；通过 MCP 统一多模型上下文与工具调用边界。
- 建立 Prompt 模板和 Few-shot 示例库，使结构化输出解析成功率达到 **97%**，并将业务研判路径沉淀为可复用的 Agent 工作流。

技术栈：React 19 · TypeScript · Next.js · NestJS · LangChain · MCP · SSE · WebSocket

### 口腔医学智能平台 · 工单系统 & 管理后台

- 主导医学端病例工单全流程页面开发（全科问题 / 模型分析 / 治疗计划 / 正畸方案），独立负责从需求拆解到上线的完整交付
- 建设管理后台：实现策略配置面板、角色权限管理（基于策略模式动态换取 token 匹配权限）、审计日志检索与业务数据看板，支撑医生 / 技师 / 管理员三类角色差异化权限体系
- 针对多层嵌套表单"子项依赖父项状态"的校验难题，设计并实现链表结构动态表单引擎：每个节点仅感知前驱条件，新增字段只需修改指针，迭代周期缩短约 40%
- 建设公共设计系统与组件库：封装高频业务组件（牙列图、测量面板、状态反馈机制），统一视觉语言与交互模式，抽取为私有 npm 包供多子应用复用，消除重复代码约 30%

技术栈：Vue3 · Pinia · VueRouter · Element Plus · TypeScript · Vite · pnpm

### 医学头影测量系统 & 口腔模型系统

- 使用 react-konva 实现头影测量核心引擎：通过 Group 层级分组将图片坐标系与测量逻辑坐标系解耦，彻底解决缩放时测量值漂移问题；支持点位拖拽、贝塞尔曲线、测角测距等 20+ 测量项
- 基于策略模式将差异化测量计算抽象为可组合的数学工具链，新增测量项无需修改核心逻辑，扩展成本接近零
- 攻克 Three.js 无法直接加载医学 .vtp 格式的问题：引入 vtk.js 解析多边形网格后转换为BufferGeometry，利用 Raycaster 射线检测实现口腔模型精准分区上色与套索选区

技术栈：React · Redux · react-konva · react-three-fiber · Three.js · vtk.js · TypeScript · Vite
