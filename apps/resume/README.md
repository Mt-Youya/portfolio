# Resume app

`apps/resume` 是独立部署的简历应用。它只读取仓库根目录的 `content/resume.zh.md`：公开页渲染当前已发布内容，`/manage` 让授权编辑者创建 GitHub Issue 提案，不会写入仓库。

## 本地运行

```bash
pnpm install
pnpm dev:resume
```

访问 `http://localhost:3000`，管理入口为 `/manage`。复制 `.env.example` 为 `.env.local` 后填入 GitHub OAuth 与仓库配置；未配置时公开页仍可读取内容，但管理入口和提交提案不可用。

## Vercel

在同一个 Git 仓库新建第二个 Vercel Project，Root Directory 保持仓库根目录，Build Command 设置为：

```bash
pnpm build:resume
```

配置 `.env.example` 中的全部变量。`RESUME_GITHUB_TOKEN` 使用仅有目标仓库 `Issues: write` 权限的细粒度 Token；`RESUME_CHROMIUM_PACK_URL` 指向与 `@sparticuz/chromium-min` 版本匹配的 Chromium pack。
