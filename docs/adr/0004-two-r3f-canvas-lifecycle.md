# 两个 R3F 场景的生命周期管理

整站有两个 R3F canvas:Hero 纸鸢(悬浮+鼠标视差)与 SHEET 03 爆炸图(E3,R3F 真爆炸图,偏离 §2 原文的「纯 CSS 3D」)。为避免双 WebGL context 同屏撑爆低端设备 GPU,采用互斥挂载:Hero canvas 在纸鸢离开 Hero 视口时卸载,纸鸢降级为 §1.3 已规定的 2D SVG 形态沿风筝线持续飞行;SHEET 03 滚入时独占 R3F。任意时刻只有一个 R3F canvas 存在。

SHEET 03 canvas 驱动:`frameloop='demand'` + ScrollTrigger `onUpdate` → `invalidate()`,五层旋转展开严格绑定 scrub 进度,不做常驻动画。

理由:G2 复用 §1.3 已定的「3D→SVG 切换」设计作为生命周期手段,不是新增成本;纸鸢以 SVG 形态无缝接管,避免重新挂载 canvas 的闪现;单 context 互斥保障 §3.2 性能预算。

**Status**: accepted

**Considered Options**:

- G1 互斥挂载,视口驱动 —— 拒绝:纸鸢重新挂载闪现,破坏叙事连续
- G2 互斥挂载 + 纸鸢降级 SVG —— 采纳
- G3 两者常驻 demand —— 拒绝:双 WebGL context 常驻,低端设备定时炸弹
- G4 单 canvas 场景切换 —— 拒绝:架构复杂,与 §3.1 组件目录冲突,ScrollTrigger 跨 section 协调难

**Consequences**:

- §1.3「3D→SVG 切换」触发时机明确:Hero 离开视口即切 SVG,不只是移动端/reduced-motion
- §2 SHEET 03 偏离原文「纯 CSS 3D」,改为 R3F 真爆炸图(E3)
- SHEET 03 反向滚动收拢彩蛋保留(§2 原文「全栈 = 能把这台机器拆了再装回去」),R3F 下五层旋转归位实现
- 性能预算自洽:单 R3F context + demand 驱动,三角面远低于 300 上限(5 块平板约 10 三角面)
