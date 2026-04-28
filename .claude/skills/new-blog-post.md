# Skill: new-blog-post

新建一篇 MDX 博客文章。

## 用法

```
/new-blog-post <slug> <title>
```

例：`/new-blog-post react-server-components React Server Components 深度解析`

## 步骤

1. 在 `src/content/posts/<slug>.mdx` 创建文件，frontmatter 包含：
   - `title`（必填）
   - `date`（今天的日期，格式 `YYYY-MM-DD`）
   - `summary`（一句话摘要，必填）
   - `tags`（字符串数组）
   - `cover`（可选，路径 `/blog/<slug>/cover.jpg`）

2. 写一段占位正文，包含 H2 标题和示例段落

3. 如有媒体文件，提示用户把文件放到 `public/blog/<slug>/` 目录下

## 模板

```mdx
---
title: "{{title}}"
date: "{{date}}"
summary: "{{summary}}"
tags: []
---

## 简介

...

## 正文

...
```

## 注意

- slug 只用小写字母、数字和连字符
- 媒体组件：`<BlogImage>`、`<Video>`、`<Audio>` 已全局注册，直接在 MDX 中使用
- contentlayer2 会在 `pnpm dev` 启动时自动编译，无需手动触发
