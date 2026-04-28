# Skill: update-resume

更新作品集中的简历数据（工作经历、项目、技能）。

## 数据文件

所有简历数据集中在 `src/data/resume.ts`，修改这一个文件即可同步到所有 Section。

## 数据结构

```ts
// 工作经历
export const experiences: Experience[] = [
  {
    company: '公司名',
    role: '职位',
    period: '2023.06 — 至今',
    description: '职责描述',
    highlights: ['亮点1', '亮点2'],
    tech: ['React', 'TypeScript'],
  }
]

// 项目
export const projects: Project[] = [
  {
    name: '项目名',
    description: '项目描述',
    tech: ['Three.js', 'React'],
    link: 'https://...',     // 可选
    github: 'https://...',   // 可选
    image: '/projects/...',  // 可选
  }
]

// 技能（Skills Section 使用）
export const skills: SkillCategory[] = [
  {
    category: '前端框架',
    items: ['React 19', 'Next.js 16', 'TypeScript'],
  }
]
```

## 步骤

1. 打开 `src/data/resume.ts`
2. 找到对应数组，按已有格式新增或修改条目
3. TypeScript 类型会自动校验字段，缺少必填字段会报错
4. 保存后开发服务器热更新，刷新页面即可看到变化

## 注意

- `period` 字段是纯字符串，格式自由，建议统一为 `YYYY.MM — YYYY.MM` 或 `YYYY.MM — 至今`
- `tech` 数组用于渲染技术标签，保持简洁（不超过 6 个）
- 项目图片放在 `public/projects/` 目录下
