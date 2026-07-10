# 部署策略与真跑失败兜底

部署:整站走 Vercel(D1 起步),放弃 §3.3 原定的 `output: 'export'` 静态导出评估——Edge Function 不能与静态导出共存。架构上把 `/api/agent` 抽成独立可迁移单元,预留两条升级路径:前端国内 CDN 镜像(D2)、真跑后端搬国内 serverless(D3)。Phase 6 上线后按实测国内访问质量决定是否升级,与 §3.3「Phase 6 再定」的延期精神一致,但把死路换成活路。

失败兜底:真跑链路(GitHub fetch → DeepSeek)任一环节失败时,Hero 终端静默回退预录兜底文案,不向访客暴露失败、不标记 fallback。这与 10min 缓存命中静默策略同口径——「真跑」的承诺是「会真跑」,不是「每次都成功且每次都 live」。

**Status**: accepted

**Considered Options(部署)**:

- D1 整站 Vercel —— 采纳(起步),预留 D2/D3 接口
- D2 前端国内 CDN 镜像 + 真跑走 Vercel —— 预留
- D3 真跑搬国内 serverless —— 预留
- D4 全栈搬国内 serverless —— 拒绝:海外访客体验下降、偏离 Plan 原意最远

**Considered Options(失败兜底)**:

- F1 硬真跑,失败即暴露 —— 拒绝:portfolio 第一印象高于失败可见的诚实
- F2 失败静默回退预录 —— 采纳
- F3 失败回退 + 轻量标记 —— 拒绝:标记行破坏 Agent 叙事纯粹、访客理解成本高
- F4 真跑非阻塞,先播预录后追加 —— 拒绝:实现复杂、trace 自我修正违和

**Consequences**:

- `/api/agent` 必须设计为可迁移单元(不与 Next.js route handler 耦合死),便于后续搬国内 serverless
- 兜底文案进 `messages/{zh,en}.json` 的 `hero.fallbackAnswer`,不破坏「禁止硬编码文案」规则
- 兜底文案须提及 TubePilot,故 DeepSeek 真跑的 system prompt 须引导提及主打项目,以免兜底与真跑风格不一露馅
- 印泥红 3 处名额已在 ADR-0001 锁定,本 ADR 不新增印泥红使用
