# Portfolio 作为「表演型 Agent」,Hero introduce 真跑

整体定位是「以 Agent 的方式自我介绍」的叙事性表演,而非可交互的 Agent 产品;唯独 Hero 终端的 introduce 流程真跑(Edge Function 实时 fetch GitHub + DeepSeek 生成自我介绍,10min 缓存命中静默)。选这个混合姿态是因为:6 个代表项目已承担「我能做 Agent 工程」的证明,portfolio 本身不必再当产品;但「正在运行」的名分需要至少一处真跑来兑现,否则对技术读者是空头支票。这否决了纯静态(C 方案的静态导出兜底)与完整可交互 Agent harness 两个极端。

**Status**: accepted

**Considered Options**:

- 纯表演(终端全预录,纯静态,零后端)—— 拒绝:「正在运行」名不副实
- 轻量真跑(Hero introduce 真跑,tool 调用部分真跑)—— 采纳
- 完整 Agent(后端 harness,访客可交互提问)—— 拒绝:工程量翻倍、偏离 portfolio 定位、与 Phase 0–6 施工计划不符

**Consequences**:

- §3.3 的静态导出(`output: 'export'`)+ 国内 OSS/CDN 兜底方案作废——Edge Function 不能与静态导出共存,需另定国内访问策略(见后续 ADR)
- Hero 真跑分支的成本/限流/缓存/失败兜底成为必须设计的事项
- 印泥红 3 处名额锁定:SHEET 00 开场印章、SHEET 02 DeepSeek 行「本站驱动」、SHEET 06 终章印章
