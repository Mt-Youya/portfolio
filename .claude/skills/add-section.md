# Skill: add-section

在作品集首页新增一个 Section。

## 用法

```
/add-section <SectionName>
```

例：`/add-section Testimonials`

## 步骤

1. **创建组件** `src/components/sections/<SectionName>.tsx`
   - 第一行必须是 `'use client'`
   - 用 `<section id="<id>">` 包裹，id 用小写
   - 引入 `SectionTitle` 组件：`import { SectionTitle } from '@/components/shared/SectionTitle'`
   - 使用 Framer Motion `motion.div` 做进场动画（参考已有 Section 的写法）

2. **注册到 `PortfolioClient.tsx`**（`src/components/PortfolioClient.tsx`）
   - import 新 Section
   - 在 JSX 中按顺序插入

3. **注册到 Navbar**（`src/layouts/Navbar.tsx`）
   - 在 `navItems` 数组中添加 `{ id: '<id>', label: '<中文标签>' }`

4. **注册到 store**（`src/store/useAppStore.ts`）
   - 在 `sections` 数组中添加新 id

## 约定

- 所有 Section 组件都是 Client Component（`'use client'`）
- 动画统一用 `framer-motion`，进场用 `fadeInUp` 变体
- 样式用 Tailwind utility class，深色主题（`bg-background`、`text-foreground`）
- 间距统一：`py-20 px-6`，最大宽度 `max-w-6xl mx-auto`
