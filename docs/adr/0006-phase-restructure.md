# 阶段重组:新增 Phase 0.5 真跑后端,PRODUCT/DESIGN 前置 Phase 0

grill 引入的真跑链路(Edge Function `/api/agent` + `profile.json` + `agent-prompt.md` + Zustand `agentIntro`)及文档治理(ADR-0005 要求 Phase 1 前有 PRODUCT.md/DESIGN.md)未被原 §5 阶段覆盖。执行者按原 §5 走会在 Phase 2 卡住(Hero 依赖真跑后端但无归属阶段)。

重组阶段序:

- Phase 0 — 脚手架 + PRODUCT.md/DESIGN.md 撰写
- Phase 0.5 — 真跑后端(Edge Function `/api/agent` + `profile.json` + `agent-prompt.md` + Zustand `agentIntro`)
- Phase 1 — 蓝图设计系统 + impeccable init(从 PRODUCT.md 读)
- Phase 2 — Hero(消费 Phase 0.5 真跑后端)
- Phase 3 — 四 section(含 SHEET 02 S4 改版、SHEET 03 R3F 爆炸图、两 canvas 生命周期 G2)
- Phase 4 — 动画深化
- Phase 5 — i18n/a11y/性能
- Phase 6 — 审计上线

Phase 0.5 验收:`/api/agent?lang=zh` 冷启动返回 DeepSeek 真跑 answer、二次请求命中 10min 缓存、DeepSeek 失败返回 `hero.fallbackAnswer` 兜底、`/en` 返回英文且缓存按 locale 分键不串。

理由:真跑链路是自洽单元有独立验收点,适合独立成 Phase 0.5;Phase 2 Hero 可直接消费不卡壳;PRODUCT/DESIGN 是 impeccable init 前置,归 Phase 0 脚手架。

**Status**: accepted

**Considered Options**:

- PH1 新增 Phase 0.5 + PRODUCT/DESIGN 前置 Phase 0 —— 采纳
- PH2 真跑并入 Phase 0 —— 拒绝:Phase 0 边界模糊,脚手架混入业务
- PH3 真跑并入 Phase 2 —— 拒绝:Phase 2 爆炸,验收点混乱
- PH4 PRODUCT/DESIGN 为 Phase 0.9、真跑为 Phase 1.5 —— 拒绝:阶段碎片化

**Consequences**:

- §5 原阶段表 superseded,执行以本 ADR 阶段序为准
- Phase 3 工作量增大(S4 改版 + SHEET 03 R3F + G2 生命周期),需预留更多时间
- Phase 0 需撰写 PRODUCT.md(含 grill 修订:卖点 #2、SHEET 02 S4、SHEET 03 R3F、SHEET 01 P4、SHEET 04 N 项目)与 DESIGN.md(§1.2 tokens)
