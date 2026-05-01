# 我的 — 个人作品集 & 博客

高级前端工程师的个人作品集，基于 Next.js 16 + React 19 构建，包含 Three.js 3D 场景、MDX 博客系统及掘金/语雀内容聚合。

**[GitHub](https://github.com/Mt-Youya)**

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16.2（App Router + Turbopack） |
| UI | React 19 + Tailwind CSS v4 + shadcn/ui |
| 3D | Three.js 0.184 + React Three Fiber 9 + drei 10 |
| 动画 | Framer Motion 12 |
| 博客 | contentlayer2 + MDX（remark-gfm、rehype-highlight） |
| 状态 | Zustand 5 |
| 国际化 | next-intl 4（中文 / English） |
| 语言 | TypeScript 6 |

## 功能模块

- **作品集首页**（`/`）：阶梯预加载动画、Hero 3D 场景、About、Skills、Experience、Projects、Contact
- **博客列表**（`/blog`）：本地 MDX 文章 + 掘金 RSS 外链 + 语雀 API 外链
- **文章详情**（`/blog/[slug]`）：MDX 渲染，支持 `<Video>`、`<Audio>`、`<BlogImage>` 富媒体组件
- **主题切换**：暗色 / 亮色，主题感知预加载动画
- **多语言**：中文（默认）/ English，`/en` 路由前缀

## 快速开始

```bash
pnpm install
```

配置环境变量：

```env
# .env.local
YUQUE_TOKEN=你的语雀个人访问令牌
YUQUE_REPO=namespace/repo-slug   # 例: yonjay/blog
```

> 语雀 Token：账户设置 → Token

```bash
pnpm dev      # 开发服务器（port 3033）
pnpm build    # 生产构建
pnpm start    # 生产服务器（port 3034）
```

## 目录结构

```
src/
├── app/
│   └── [locale]/               # next-intl 国际化路由
│       ├── layout.tsx           # 根布局（主题、预加载、i18n Provider）
│       ├── page.tsx             # 首页（作品集）
│       └── blog/
│           ├── page.tsx         # 博客列表（Server Component，ISR 1h）
│           └── [slug]/
│               └── page.tsx     # 文章详情
├── components/
│   ├── PreLoader/               # 阶梯预加载动画（主题感知）
│   ├── sections/                # 作品集各 Section
│   ├── blog/
│   │   ├── PostCard.tsx         # 本地文章卡片
│   │   ├── ExternalCard.tsx     # 掘金/语雀外链卡片
│   │   └── mdx/                 # 富媒体 MDX 组件
│   ├── ThemeToggle.tsx
│   └── LanguageSwitcher.tsx
├── layouts/
│   └── Navbar.tsx               # 顶部导航（GitHub 链接、主题、语言切换）
├── content/
│   └── posts/                   # MDX 文章
├── lib/
│   ├── juejin.ts                # 掘金 RSS 抓取（服务端）
│   └── yuque.ts                 # 语雀 API 客户端（服务端）
├── store/
│   └── useAppStore.ts           # 全局状态（主题、活跃 Section、菜单）
├── data/
│   └── resume.ts                # 静态简历数据（链接、技能、项目）
├── i18n/
│   ├── routing.ts               # 路由配置（locales、defaultLocale）
│   ├── request.ts               # 服务端 i18n 请求配置
│   └── navigation.ts            # 本地化 Link / useRouter
└── styles/
    └── globals.css              # Tailwind v4 + CSS 主题变量
messages/
├── zh.json                      # 中文翻译
└── en.json                      # 英文翻译
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

媒体文件放 `public/blog/`。

## 关键配置说明

### Turbopack CSS 别名

`next.config.ts` 中配置路径别名解决 Turbopack 无法识别 `style` 导出条件的问题：

```ts
turbopack: {
  resolveAlias: {
    'shadcn/tailwind.css': './node_modules/shadcn/dist/tailwind.css',
    'tw-animate-css': './node_modules/tw-animate-css/dist/tw-animate.css',
  },
},
```

### 主题系统

`useAppStore` 维护 `theme: 'dark' | 'light'`，通过 `applyThemeToDom()` 给 `<html>` 添加对应 class。Tailwind v4 使用 `@custom-variant dark (&:is(.dark *))` 匹配暗色模式。

### HeroScene SSR 禁用

WebGL 无法在服务端渲染，使用动态导入 + `ssr: false`。

### 掘金/语雀数据

在 Server Component 中获取，`revalidate: 3600`（ISR 1 小时缓存）。请求失败时返回空数组，不影响页面渲染。
