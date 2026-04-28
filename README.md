# 我的 — 个人作品集 & 博客

高级前端工程师的个人作品集，基于 Next.js 16 + React 19 构建，包含 Three.js 3D 场景、MDX 博客系统及掘金/语雀内容聚合。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16.2（App Router + Turbopack） |
| UI | React 19 + Tailwind CSS v4 + shadcn/ui |
| 3D | Three.js 0.184 + React Three Fiber 9 + drei 10 |
| 动画 | Framer Motion 12 |
| 博客 | contentlayer2 + MDX（remark-gfm、rehype-highlight） |
| 状态 | Zustand 5 |
| 语言 | TypeScript 6 |

## 功能模块

- **作品集首页**（`/`）：Hero 3D 场景、About、Skills、Experience、Projects、Contact 六大 Section
- **博客列表**（`/blog`）：本地 MDX 文章 + 掘金 RSS 外链 + 语雀 API 外链
- **文章详情**（`/blog/[slug]`）：MDX 渲染，支持 `<Video>`、`<Audio>`、`<BlogImage>` 富媒体组件

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`：

```env
YUQUE_TOKEN=你的语雀个人访问令牌
YUQUE_REPO=namespace/repo-slug   # 例: yonjay/blog
```

> 语雀 Token 获取：语雀 → 账户设置 → Token

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 目录结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 根布局（字体、全局 CSS）
│   ├── page.tsx            # 首页（作品集）
│   └── blog/
│       ├── page.tsx        # 博客列表（Server Component）
│       └── [slug]/
│           └── page.tsx    # 文章详情
├── components/
│   ├── three/
│   │   └── HeroScene.tsx   # R3F 场景（'use client' + ssr:false）
│   ├── sections/           # 作品集各 Section（'use client'）
│   ├── blog/
│   │   ├── PostCard.tsx    # 本地文章卡片
│   │   ├── ExternalCard.tsx# 掘金/语雀外链卡片
│   │   └── mdx/            # 富媒体 MDX 组件
│   └── layouts/
│       └── Navbar.tsx
├── content/
│   └── posts/              # MDX 文章（frontmatter + 正文）
├── lib/
│   ├── juejin.ts           # 掘金 RSS 抓取（服务端）
│   └── yuque.ts            # 语雀 API 客户端（服务端）
├── store/
│   └── useAppStore.ts      # 全局状态（鼠标位置、活跃 Section）
├── data/
│   └── resume.ts           # 简历数据（工作经历、项目、技能）
└── styles/
    └── globals.css         # Tailwind v4 + 主题变量
```

## 写博客文章

在 `src/content/posts/` 下新建 `.mdx` 文件：

```mdx
---
title: "文章标题"
date: "2025-03-15"
summary: "一句话摘要"
tags: ["Three.js", "React"]
cover: "/blog/cover.jpg"
---

正文内容...

<BlogImage src="/blog/image.jpg" alt="描述" caption="图注" />

<Video src="/blog/demo.mp4" poster="/blog/poster.jpg" />

<Audio src="/blog/audio.mp3" title="音频标题" />
```

媒体文件放在 `public/blog/` 目录下。

## 关键配置说明

### Tailwind CSS v4 + Next.js

**必须**有 `postcss.config.mjs`，否则 Tailwind 不会生成 utility class：

```js
// postcss.config.mjs
const config = { plugins: { '@tailwindcss/postcss': {} } }
export default config
```

### CSS @import 路径

Turbopack 对 CSS `@import` 的模块解析有限制，`globals.css` 中使用相对路径：

```css
@import "../../node_modules/tw-animate-css/dist/tw-animate.css";
@import "../../node_modules/shadcn/dist/tailwind.css";
```

### HeroScene SSR 禁用

WebGL 无法在服务端渲染，`Hero.tsx` 中使用动态导入：

```tsx
const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then(m => ({ default: m.HeroScene })),
  { ssr: false }
)
```

## 开发注意事项

- 所有使用 hooks / 浏览器 API / Three.js 的组件都需要 `'use client'` 指令
- `useAppStore.getState()` 在 `useFrame` 内读取鼠标位置（避免触发 React re-render）
- R3F Canvas 使用 `frameloop="demand"` 降低空闲时的 GPU 占用
- 掘金/语雀数据在 Server Component 中获取，ISR 缓存 1 小时（`revalidate: 3600`）
