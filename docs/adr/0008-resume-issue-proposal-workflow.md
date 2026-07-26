# 简历候选内容经 Issue 审核，不由应用直接保存

`apps/resume` 既要提供多人编辑体验，又必须让 `content/resume.zh.md` 保持唯一真相源并由人工控制发布。因此公开页只读取已发布版本，`/manage` 仅向 GitHub OAuth 白名单编辑者开放；保存操作创建含完整候选 Markdown 与 diff 的 GitHub Issue，绝不写入仓库或创建候选分支。已发布历史取 Git 提交，待审核历史取 Issue 状态。

**Status**: accepted

**Considered Options**:

- 应用直接写入仓库内容 —— 拒绝：绕过人工审核，且部署运行时不应成为内容真相源
- 应用创建候选分支或 Draft PR —— 拒绝：会直接向仓库写入候选变更，超出严格的只提 Issue 边界
- 应用仅创建 GitHub Issue —— 采纳：编辑者可提交完整可审阅提案，仓库内容只在人工审核后的常规 Git 流程中变更
