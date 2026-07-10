# DESIGN.md — 设计 Tokens 真相源

> ADR-0005。本文是设计 tokens 真相源;`docs/adr/` 记「为什么」;`PRODUCT.md` 记「做什么」。tokens 冲突时以本文为准(原 §4「以 PLAN 为准」已 superseded)。
> 内容自 PLAN.md §1 搬迁,含 grill 修订(印泥红 3 处名额锁定)。

## 1. 主题:「工程蓝图 × 印鉴」(Blueprint & Seal)

- 「专业大气」→ 工程蓝图/制图语言:细线、标注、网格、图纸编号,承载 Agent 架构图(Agent loop、工具调用链)
- 「有趣」→ 两个反差元素:① 篆刻印章「辞鸢」以盖章动画出现在关键节点;② 低多边形纸鸢(风筝)作为贯穿全站的 3D 灵魂角色
- 刻意避开三大 AI 味模板:奶油底+衬线+陶土橙、纯黑底+单一酸性绿/朱红、报纸风 hairline
- 文化辨识度:蓝图(国际工程语言)+ 印章(中文身份)

## 2. 颜色 Tokens

浅色(默认)与深色「夜间图纸」模式:

```css
:root {
  /* 纸面 */
  --paper: #f4f3ee; /* 图纸底色,暖灰白,不是纯白 */
  --paper-raised: #fbfaf7; /* 卡片浮起层 */
  /* 墨线 */
  --ink: #171a21; /* 主文字/主线条 */
  --ink-soft: #4a4f5a; /* 次级文字 */
  --grid: #d8d6cc; /* 蓝图网格线,极淡 */
  /* 蓝图蓝(主品牌色) */
  --blueprint: #1e4fd8; /* 链接、图纸描线、强调 */
  --blueprint-soft: #a8bcf0;
  /* 印泥红(点睛,克制使用) */
  --seal: #b5382e;
  /* Agent 运行态(终端/代码块专用) */
  --terminal-bg: #10131a;
  --terminal-green: #7bd88f;
}

.dark {
  /* 夜间图纸:深蓝黑底 + 白描线,像晒图纸(cyanotype)反转 */
  --paper: #0d1220;
  --paper-raised: #131a2c;
  --ink: #e8eaf2;
  --ink-soft: #9aa3b8;
  --grid: #223052;
  --blueprint: #6e93f5;
  --seal: #e05c50;
}
```

**印泥红规则(grill 锁定,ADR-0001)**:全站同屏最多 3 处,3 处名额已锁定:

1. SHEET 00 开场印章(飞到 logo 位后不再用)
2. SHEET 02 工具调用节点「DeepSeek 本站驱动」标注
3. SHEET 06 终章大印章

蓝图蓝负责「专业」,印泥红负责「有趣」,不许互换职责。同屏超过 3 处即违规。

## 3. 字体(三角色制)

| 角色    | 中文                           | 西文                          | 用途                              |
| ------- | ------------------------------ | ----------------------------- | --------------------------------- |
| Display | 思源宋体 Heavy(或「屏显臻宋」) | Zodiak / Gambarino(fontshare) | 大标题,带笔锋的宋体呼应印章气质   |
| Body    | 思源黑体 / MiSans              | General Sans / Switzer        | 正文,克制中性                     |
| Mono    | —                              | JetBrains Mono / Commit Mono  | 图纸标注、代码、Agent trace、数据 |

- 禁用 Inter 作为唯一字体;禁止紫蓝渐变
- 图纸标注(尺寸线、编号如 `FIG. 02 / SHEET A-3`)一律 Mono 大写 + 宽字距,这是「蓝图感」的主要来源

## 4. 版式

- 12 列网格,最大宽度 1280px;背景铺极淡蓝图网格(`--grid`,每 8px 小格 / 64px 大格),滚动时网格 0.05 级视差
- 每个 section 左上角图纸编号角标(`SHEET 01 — HERO`),Mono 小字,这是页面导航系统,点击可跳转
- 圆角统一 2px(制图感,拒绝大圆角卡片);阴影极浅,层级靠描线而非投影

## 5. 签名元素(全站只允许一个「放肆」的地方)

**纸鸢(3D 低多边形风筝)+ 引线**:

- Hero 以 R3F 渲染折纸风格纸鸢,线框材质 + 蓝图蓝描边,缓慢悬浮
- 滚动时 SVG 引线(风筝线)沿页面主轴向下延伸(DrawSVGPlugin),纸鸢降级为 2D SVG 形态沿线飞行(MotionPathPlugin),在每个 section 图纸编号处「停靠」
- 到 footer 风筝线收尾成「辞鸢」印章,盖章动画(scale + 轻微旋转 + 印泥红扩散)作全站终章
- **3D→SVG 切换时机(ADR-0004 G2)**:Hero 离开视口即切 SVG(不只是移动端/reduced-motion),canvas 卸载,SHEET 03 独占 R3F
- 移动端 / `prefers-reduced-motion`:3D 纸鸢替换为静态 SVG,引线只保留 section 进入时的短描线

## 6. 动画工程规则

1. 插件注册集中在 `lib/gsap.ts`(§3.2),bonus 插件随 section 代码分割懒加载(ADR-0006 grill):首屏只加载 Hero 所需(SplitText/ScrambleText/TextPlugin),SHEET 02/03/04/06 插件随各自 section 懒加载
2. `gsap` ≥ 3.13(2024 Webflow 收购后全部插件 MIT 免费、纳入主包,`gsap/DrawSVGPlugin` 等路径直接 import)
3. 每个 section 组件 `useGSAP(() => {...}, { scope: ref })`,locale 变化 revert 重建(SplitText 中文按 `chars` 拆,`aria-label` 保留原文)
4. `ScrollTrigger.matchMedia()` 区分桌面/移动:移动端关 ScrollSmoother、关 pin、scrub 改一次性入场
5. `prefers-reduced-motion`:timeline 降级 `duration: 0` 直达,纸鸢换静态 SVG
6. 性能预算:LCP ≤ 2.5s;R3F ≤ 300 三角面 + `dpr={[1, 1.5]}`;蓝图网格用 CSS background;同屏活跃 tween ≤ 20
