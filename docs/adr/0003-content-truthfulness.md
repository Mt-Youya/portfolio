# 内容真实性纪律:trace 数字与 BOM 模型必须真实

站内一切「事实声明」必须与真实数据/经验对齐,不造假。两条应用:

1. Hero trace 的 `→ N repos` 真跑取 GitHub 实际 pinned 数。SHEET 04 展示项目 = 8 个已部署个人项目(见 `content/profile.json` 与 `apps/web/data/links.ts`),不绑定 GitHub pinned 约束——展示集以「已部署个人项目」为准,N=8。Plan §0.1/§2 的「6 个代表项目」改为「8 个」。

2. SHEET 02 BOM 物料表从「五国产模型(Qwen/DeepSeek/GLM/Kimi/Doubao)生态广度」缩为「DeepSeek 工程化深度」单模型详图——仅 DeepSeek 真介入,其余四个未介入,保留即假声明。§0.1 卖点 #2 同步从「国产大模型生态:接入与选型经验」改为「DeepSeek 工程化深度」。

理由:portfolio 对技术读者最致命的减分是事实造假。B2 让 Hero GitHub fetch 真跑后,数字已是事实声明;BOM 模型同理。两条纪律不能双标——既然数字要真,模型也必须真。深度叙事(深度用一个国产模型)比广度叙事(泛泛接触五个)更贴「AI Agent 方向」定位。

**Status**: accepted

**Considered Options**:
- N4 真跑取数 + 展示项目=8 个已部署个人项目(非 pinned 约束) —— 采纳(修订:原「展示=pinned」改为「展示=已部署个人项目」,因 `links.ts` 有 8 个已部署项目且数据完整)
- N1/N2/N3 —— 拒绝(见 grill 记录)
- B1 保留 5 行改「选型评估」—— 拒绝:未做过 4 个选型评估
- B2 缩为 DeepSeek 单行详图 —— 采纳
- B3 保留 5 行降格「认知」—— 拒绝:太弱,撑不起卖点

**Consequences**:
- §0.1 卖点 #2、§2 SHEET 02 编排、§2 SHEET 04「6 个」均需修订(「6 个」→「8 个」)
- SHEET 04 展示 8 个已部署个人项目,数据源 `content/profile.json`
- SHEET 02 从「五模型 BOM + hover 验讫章」改版为「DeepSeek 单模型工程化详图」——印泥红在 SHEET 02 仅保留「本站驱动」一处(hover 验讫章随五模型删除而消失),全站印泥红仍 3 处:SHEET 00 印章、SHEET 02「本站驱动」、SHEET 06 终章印章,不超限
- §0.1 卖点 #2 失去「生态广度」,需在叙事上以「DeepSeek 工程化深度」补位,避免卖点单薄
- SHEET 02 改版方案(S4):Agent Loop 蓝图与本站真跑实现同图叠加——感知节点标「GitHub fetch」、工具调用节点标「DeepSeek(本站驱动,印泥红)」、观察节点标「10min 缓存」;token 跑到工具调用节点时触发 DeepSeek 标注高亮。原「五模型 BOM + hover 验讫章」编排作废
