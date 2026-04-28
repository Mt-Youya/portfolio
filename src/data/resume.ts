// 不需要翻译的静态数据（技术名词、链接、联系方式等）

export const personalInfo = {
  name: '窦扬杰',
  nameEn: 'Yonjay Doyle',
  age: 26,
  phone: '+86-15795096824',
  email: 'dd257248@proton.me',
  links: {
    yuque: 'https://yuque.com/yonjay',
    juejin: 'https://juejin.cn/user/3554089909627287',
    csdn: 'https://blog.csdn.net/qq_44134222?type=blog',
  },
}

// icon 和技术名词（React/TypeScript 等）不需要翻译，category 从翻译文件读取
export const skillItems = [
  { icon: '⚛️', items: ['React 19', 'Vue 3', 'React Native', 'Pinia', 'Redux', 'Zustand', 'VueRouter', 'ReactRouter'] },
  { icon: '🛠️', items: ['TypeScript', 'ES6+', 'Sass/CSS', 'Zod', 'Vite', 'pnpm', 'CI/CD', 'ApiFox'] },
  { icon: '🎨', items: ['Three.js', 'react-three-fiber', 'react-konva', 'WebGL', 'Raycaster', 'vtk.js'] },
  { icon: '🤖', items: ['LangChain', 'MCP', 'Function Calling', 'Agent Skill', 'SSE', 'Prompt Engineering'] },
  { icon: '🎭', items: ['shadcn/ui', 'Element Plus', 'Ant Design'] },
  { icon: '🏗️', items: ['Node.js', 'Koa.js', 'qiankun', 'ECharts'] },
]

// icon、techStack 不需要翻译；company/role/period/highlights 从翻译文件读取
export const experienceMeta = [
  {
    current: true,
    projects: [
      { period: '', techStack: ['React Native', 'React', 'Redux', 'Zustand', 'TypeScript', 'Zod', 'Koa.js', 'LangChain', 'MCP', 'Function Calling', 'SSE'] },
    ],
  },
  {
    projects: [
      { period: '2023.03 — 2025.07', techStack: ['Vue3', 'Pinia', 'VueRouter', 'Element Plus', 'TypeScript', 'Vite', 'pnpm'] },
      { period: '2023.06 — 2025.07', techStack: ['React', 'Redux', 'react-konva', 'react-three-fiber', 'Three.js', 'vtk.js', 'TypeScript', 'Vite'] },
      { period: '2020.06 — 2023.02', techStack: ['Vue2', 'React', 'qiankun', 'React-Redux', 'Ant Design', 'ECharts'] },
    ],
  },
]

// icon、period、techStack 不需要翻译；name/badge/description/highlights 从翻译文件读取
export const projectsMeta = [
  { period: '2025',        icon: '🤖', techStack: ['React', 'Koa.js', 'LangChain', 'MCP', 'SSE', 'TypeScript'] },
  { period: '2023 — 2025', icon: '🦷', techStack: ['React', 'react-konva', 'TypeScript', 'Canvas'] },
  { period: '2023 — 2025', icon: '🫁', techStack: ['React', 'Three.js', 'react-three-fiber', 'vtk.js', 'WebGL'] },
  { period: '2023 — 2025', icon: '🏥', techStack: ['Vue3', 'Pinia', 'Element Plus', 'TypeScript', 'Vite'] },
  { period: '2020 — 2023', icon: '🏫', techStack: ['Vue2', 'React', 'qiankun', 'Ant Design', 'ECharts'] },
  { period: '2025',        icon: '📱', techStack: ['React Native', 'TypeScript', 'HarmonyOS'] },
]

// 高亮卡片的 icon 不需要翻译；title/description 从翻译文件读取
export const highlightIcons = ['🔬', '🚀', '👥', '🤖']
