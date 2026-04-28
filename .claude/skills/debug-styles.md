# Skill: debug-styles

诊断并修复 Tailwind CSS v4 在 Next.js 中样式不生效的问题。

## 常见症状

- 页面黑字白底，完全没有深色主题
- utility class（`bg-*`、`text-*`、`flex`、`grid` 等）不生效
- 自定义颜色变量（`--primary`、`--background`）存在但 utility 不渲染

## 诊断步骤

### 1. 检查 postcss.config.mjs 是否存在

```bash
cat postcss.config.mjs
```

**正确内容：**
```js
const config = { plugins: { '@tailwindcss/postcss': {} } }
export default config
```

若文件不存在，这是根本原因。

### 2. 检查 CSS 规则数量（DevTools）

打开 DevTools → Sources → 搜索 `globals.css`（或 `app/layout`），查看加载的 CSS 规则总数：
- **< 50 条**：Tailwind utility 未生成，PostCSS 未运行
- **> 90 条**：正常

### 3. 检查 globals.css @import 路径

```css
/* 正确写法（相对路径，绕过 Turbopack CSS 模块解析限制）*/
@import "../../node_modules/tw-animate-css/dist/tw-animate.css";
@import "../../node_modules/shadcn/dist/tailwind.css";
```

### 4. 检查依赖是否安装

```bash
pnpm list @tailwindcss/postcss postcss tailwindcss
```

## 修复命令

```bash
# 安装 PostCSS 相关依赖
pnpm add -D @tailwindcss/postcss postcss

# 重启开发服务器（必须重启，不能热更新）
pnpm dev
```

## 注意

- `postcss.config.mjs` 修改后**必须重启** `pnpm dev`，Turbopack 不会热更新 PostCSS 配置
- Turbopack `resolveAlias` 只影响 JS/TS import，不影响 CSS `@import`
