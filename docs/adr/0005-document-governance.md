# 文档治理:ADR / PRODUCT / DESIGN / PLAN 分层

grill 产生的 ADR 多处修订 PLAN.md §0/§2 原文(卖点 #2 五模型→DeepSeek 深度、SHEET 02 改版、SHEET 03 改 R3F、SHEET 01 滚动规则、SHEET 04「6 个」→N 个)。为避免执行者在矛盾文档间猜测,确立分层:

- **ADR**(`docs/adr/`):决策推理,记「为什么」。hard-to-reverse 决策的真相源。
- **PRODUCT.md**:产品定位与内容编排的当前真相(grill 后),记「做什么」。impeccable init 从此读取,非从 PLAN.md。
- **DESIGN.md**:设计 tokens 真相源(§1.2 未被 ADR 动)。§4「tokens 冲突以 PLAN 为准」改为「以 DESIGN.md 为准」。
- **PLAN.md**:冻结为历史草稿,顶部标注 superseded,不再维护。

理由:D4 职责分离最清晰——ADR=why, PRODUCT=what, DESIGN=tokens, PLAN=历史。impeccable init 读 PRODUCT.md 不会写入过时原文;PLAN 冻结保留推理可追溯性,施工者一眼知其被取代。

**Status**: accepted

**Considered Options**:
- D1 ADR 最高真相,PRODUCT 写修订版 —— 拒绝:PRODUCT 派生自 ADR 但 ADR 是决策非产品文档,职责混
- D2 PRODUCT 写原文,ADR 补丁层 —— 拒绝:执行者认知负担大,需先读 PRODUCT 再翻 ADR
- D3 直接修订 PLAN —— 拒绝:丢推理过程,施工者不知哪里被动过
- D4 ADR=why, PRODUCT=what, DESIGN=tokens, PLAN=历史 —— 采纳

**Consequences**:
- PLAN.md 顶部加 superseded 标注
- Phase 1 impeccable init 必须从 PRODUCT.md 读取(非 PLAN.md),需先撰写 PRODUCT.md
- §4「tokens 冲突以 PLAN 为准」改为「以 DESIGN.md 为准」
- PRODUCT.md / DESIGN.md 尚未创建,需在 Phase 1 前由人(ADR 推动者)据 grill 结果撰写
- PRODUCT.md 须含 grill 修订:卖点 #2 改 DeepSeek 深度、SHEET 02 S4 改版、SHEET 03 R3F、SHEET 01 P4 滚动、SHEET 04 N 项目
