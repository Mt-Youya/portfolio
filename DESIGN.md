---
name: Yonjay Doyle Portfolio
description: Senior frontend engineer portfolio — precise, restrained, earned.
colors:
  amber-signal: "#f5a623"
  near-black: "#120e08"
  near-white: "#fefcf8"
  surface-raised: "#1d1911"
  surface-border: "#2f2b22"
  muted-text: "#7b7566"
  amber-signal-light: "#e0930f"
  surface-light: "#fefcf8"
  surface-border-light: "#e1ddd5"
  foreground-light: "#1e1a12"
  destructive: "#d4341a"
typography:
  display:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: "clamp(3rem, 10vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  none: "0"
  sm: "2px"
  md: "0.375rem"
  lg: "0.625rem"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.amber-signal}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#e0930f"
    textColor: "{colors.near-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.near-white}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.amber-signal}"
  chip-specialty:
    backgroundColor: "transparent"
    textColor: "{colors.muted-text}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
  badge-tag:
    backgroundColor: "transparent"
    textColor: "{colors.amber-signal}"
    rounded: "{rounded.md}"
    padding: "4px 14px"
---

# Design System: Yonjay Doyle Portfolio

## 1. Overview

**Creative North Star: "The Precision Instrument Manual"**

This system is modeled after the printed documentation of a high-precision Japanese instrument: dense information arranged with strict hierarchy, nothing decorative, the quality self-evident before a single word is read. Every spacing decision is load-bearing. Every typographic choice has a reason. The absence of ornament is the ornament.

The palette is near-black with amber-tinted neutrals and a single amber accent. That accent is rare — used on ≤10% of any screen — and its rarity is the argument. When visitors see amber, they are looking at something that matters. The typography is Inter Variable at maximum weight contrast: display names at 900 weight and 9rem, body copy at 400 weight and 14px, monospace labels for all metadata. Two families maximum: Inter for structure and hierarchy, JetBrains Mono for code-adjacent annotation.

This system explicitly rejects: Bootstrap resume templates (time-axis layouts, skill progress bars), SaaS landing-page marketing patterns (hero-metric grids, gradient accent statistics, oversaturated feature cards), dark geek aesthetics (terminal green, neon purple, scan-line effects), and shadcn clone default patterns (identical card grids, hero-with-big-number templates, gradient text applied as decoration).

**Key Characteristics:**
- Dark-first (near-black base); light mode available as inversion, not afterthought
- Single amber accent; every other surface is neutral
- Inter Variable at extreme weight contrast (900 display, 400 body)
- JetBrains Mono for all labels, timestamps, tags, metadata
- Flat-by-default surfaces; amber glow used only on interactive focus/glow states
- Asymmetric layout rhythm; not every element is centered or card-wrapped
- Framer Motion entrance animations staggered and purposeful, not decorative

## 2. Colors: The Amber Signal Palette

One accent, two themes (dark / light), amber-tinted neutrals throughout so no surface is pure gray.

### Primary
- **Amber Signal** (`#f5a623` / `oklch(0.75 0.18 70)`): The single accent color. Used on active states, CTAs, highlighted data points, section tag badges, and timeline nodes. Never as a background fill for large areas. The light-mode variant drops to `oklch(0.68 0.18 70)` / `#e0930f`.

### Neutral (Dark Theme)
- **Near-Black Amber** (`#120e08` / `oklch(0.08 0.006 70)`): Page background. The 0.006 chroma tints it toward amber so it reads as warm charcoal, not cold slate.
- **Surface Raised** (`#1d1911` / `oklch(0.13 0.005 70)`): Card and popover backgrounds — one step above the base.
- **Surface Border** (`#2f2b22` / `oklch(0.22 0.005 70)`): Dividers, card borders, input strokes. Barely visible; structural, not decorative.
- **Muted Text** (`#7b7566` / `oklch(0.56 0.005 70)`): Secondary labels, timestamps, metadata. Not for body copy.
- **Foreground** (`#fefcf8` / `oklch(0.985 0.006 70)`): Primary text and icons on dark backgrounds.

### Neutral (Light Theme)
- **Near-White Amber** (`#fefcf8` / `oklch(0.98 0.005 70)`): Page background. Same amber tint at the light extreme.
- **Foreground Light** (`#1e1a12` / `oklch(0.14 0.006 70)`): Primary text.
- **Border Light** (`#e1ddd5` / `oklch(0.88 0.004 70)`): Dividers and borders.
- **Muted Light** (`oklch(0.46 0.005 70)`): Secondary labels.

### Named Rules
**The One Voice Rule.** Amber appears on ≤10% of any given screen. When everything is amber, nothing is amber. Guard the accent by keeping everything else neutral.

**The Tinted Neutral Rule.** Pure `#000` and `#fff` are prohibited. Every neutral must carry a trace of amber chroma (≥0.004). The difference is invisible in isolation and decisive in aggregate.

## 3. Typography

**Display Font:** Inter Variable (system sans-serif fallback)
**Body Font:** Inter Variable
**Label / Mono Font:** JetBrains Mono (Fira Code fallback)

**Character:** A single-family system with extreme weight contrast does what two-family pairings attempt but rarely achieve — unambiguous hierarchy with no visual noise between fonts. The mono label font is the only "second family" and exists strictly for code-adjacent metadata: timestamps, skill tags, section badges, scroll hints.

### Hierarchy
- **Display** (900 weight, `clamp(3rem, 10vw, 9rem)`, line-height 0.95, tracking −0.02em): Hero name only. One instance per page. At this size and weight, it functions as a visual anchor, not a text block.
- **Headline** (700 weight, `clamp(1.875rem, 4vw, 2.25rem)`, line-height 1.2, tracking −0.01em): Section titles (`h2`). Used via `SectionTitle` component.
- **Title** (600 weight, `1.125rem`, line-height 1.4): Company names, project card headings, sub-section headers.
- **Body** (400 weight, `0.875rem`, line-height 1.6): All descriptive copy, project descriptions, highlight bullets. Maximum line length 65ch.
- **Label** (JetBrains Mono 400, `0.75rem`, line-height 1.4, tracking 0.1em, uppercase): Section tags/badges, skill category headers, timestamps, scroll hints, metadata. Never used for body prose.

### Named Rules
**The Mono-Only-for-Metadata Rule.** JetBrains Mono is reserved for machine-readable context: dates, tags, codes, labels. Using it for prose signals "this person doesn't understand voice." Every skill category header, every badge, every timestamp is mono. Nothing else is.

**The Weight Gap Rule.** Adjacent text elements must have a weight gap of ≥200 (e.g., 700 headline followed by 400 body). A gap of 100 reads as accidental variation, not hierarchy.

## 4. Elevation

This system is flat by default. Cards and containers sit on the base layer with only a subtle border (`oklch(0.22 0.005 70)` in dark mode) to separate them from the background. No ambient drop shadows in the resting state.

Depth is conveyed tonally: `background` → `card` → `popover` is a three-step lightness staircase (+0.05 OKLCH lightness each). The eye reads depth without shadows.

### Shadow Vocabulary
- **Amber Glow** (`0 0 14px oklch(0.75 0.18 70 / 0.5)`): Used exclusively on the Experience timeline dot node. A single punctuation mark of luminance that marks "the current job." Nowhere else.
- **CTA Shadow** (`0 4px 24px oklch(0.75 0.18 70 / 0.25)`): Applied to the primary CTA button on hover. Connects the amber button to its brand identity. Not used on secondary elements.
- **Keyframe Glow** (animated via `@keyframes glow`): `0 0 5px oklch(0.75 0.18 70 / 0.2)` → `0 0 20px oklch(0.75 0.18 70 / 0.4), 0 0 40px oklch(0.75 0.18 70 / 0.2)`. Applied to specific elements (Three.js canvas accent nodes). Not a default hover treatment.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are flat at rest. The amber glow appears only on the timeline current-position dot and the primary CTA hover state — two places, no more.

## 5. Components

### Buttons
Character: Direct, confident, muted on ghost — loud only when the action is the most important thing on screen.
- **Shape:** Gently squared corners (0.625rem / `rounded-lg`). Not pill-shaped; not sharp.
- **Primary:** Amber Signal background (`#f5a623`), near-black text, 12px × 24px padding. On hover: background deepens to `#e0930f`, amber glow shadow. Transition 300ms.
- **Ghost / Secondary:** Transparent background, near-white text, `border-border` stroke. On hover: border shifts to amber, text shifts to amber. No background fill on hover.
- **Disabled:** Opacity 0.4. No pointer cursor.

### Chips (Specialty Tags)
- **Style:** Transparent background, muted-text color (`oklch(0.56 0.005 70)`), thin border at 60% border opacity, `rounded-sm` (2px). Monospace font, 0.75rem, uppercase is not required.
- **Purpose:** Displays the engineer's specialty directions in the Hero section. Non-interactive.

### Section Badges (Tags)
- **Style:** `Badge variant="outline"` from shadcn. Amber text, amber/30 border, monospace uppercase with widest tracking. Transparent background. Used as section eyebrows (e.g., "ABOUT ME", "WORK EXPERIENCE").
- **Hover:** Not interactive; no hover state needed.

### Cards / Containers (Experience, Skills)
- **Corner Style:** Squared off, `rounded-lg` (0.625rem)
- **Background:** `card` token (`oklch(0.13 0.005 70)` dark / `oklch(0.995 0.004 70)` light)
- **Shadow Strategy:** No resting shadow. See Elevation.
- **Border:** `border-border` at full opacity. Structural, not decorative.
- **Internal Padding:** 20–24px (`p-5` / `p-6`)
- **Nested cards are prohibited.** The Experience section uses a Card for the company, with divider-separated project items inside — not nested Card components.

### Contact List Rows
- **Style:** `divide-y divide-border` list. Each row is `flex items-center gap-4 py-4`. No card wrapping, no background. The amber icon at 60% opacity lifts to 100% on hover; the label text lifts from `foreground/80` to `foreground`. External links show an amber `ArrowUpRight` icon that also transitions.
- **Philosophy:** A list is the right affordance here. Cards would add noise and visual weight to a simple set of links.

### Section Title (Reusable Component)
- **Tag:** `Badge variant="outline"` with amber accent, monospace uppercase, small. Eyebrow to the heading.
- **Heading:** `text-3xl md:text-4xl font-bold` — Headline tier.
- **Subtitle:** `text-muted-foreground text-base md:text-lg` — Body tier, max width 2xl (42rem).
- **Decorator:** A 64px horizontal line fading from amber to transparent, placed below the subtitle. Left-aligned by default; centered when `center` prop is passed.

### Navigation
- **Style:** Fixed top, transparent background with `backdrop-blur-sm` when scrolled. Logo mark in Inter 700. Nav links in Inter 400. Active section link highlighted in amber.
- **Mobile:** Hamburger menu with full-screen overlay or slide-in drawer.

### Signature Component: Timeline (Experience)
The vertical timeline is the most distinctive component in the system.
- **Spine:** A 2px (`w-0.5`) vertical gradient line: `from-accent/60 via-border/40 to-transparent`. Fades out toward the bottom, implying forward direction.
- **Node:** A 16×16px filled circle, `bg-accent border-2 border-background`, with the amber glow shadow `shadow-[0_0_14px_oklch(0.75_0.18_70/0.5)]`. This is the one place the glow is intentional.
- **Company Card:** Attached to the right of the spine via left offset (`pl-12 md:pl-16`). Contains the collapsible project accordion.
- **Accordion:** Ghost `Button` variant, full-width, `ArrowDown01Icon` rotates 180° on expand. No background change on hover. Text shifts to amber.
- **Quantified Metrics:** Numbers within project highlights (e.g., "15 min → 2 min", "97%+") are rendered in accent color at semibold weight via the `HighlightText` component.

## 6. Do's and Don'ts

### Do:
- **Do** use `oklch(0.75 0.18 70)` amber as the single accent color. Amber on a dark neutral surface is the entire visual identity.
- **Do** use JetBrains Mono exclusively for metadata: timestamps, skill tags, section badges, scroll hints. Nothing else.
- **Do** leave cards flat at rest. Elevation communicates state change, not category.
- **Do** let white space carry structural weight. Sections are separated by 80px (`section-padding`). Do not collapse this.
- **Do** use Inter Variable at 900 weight for the hero name. The extreme weight is the point.
- **Do** show amber amber only on the timeline's current-position node and the primary CTA button's hover shadow. Two places. That is the complete list of glow usage.
- **Do** write the amber tint into every neutral (≥0.004 chroma, hue 70). Pure `#000` and `#fff` are absent from this system.
- **Do** constrain body text to 65ch max line length for readability.
- **Do** use `divide-y` list patterns for contact links and other list content. Cards for lists add noise.

### Don't:
- **Don't** use `background-clip: text` with gradient backgrounds on any heading or label. Gradient text is decoration masquerading as hierarchy.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe. Rewrite with full borders, background tints, leading numbers, or nothing.
- **Don't** create identical card grids — same-sized cards with icon + heading + text, repeated identically. Vary the layout (see Projects section asymmetric grid).
- **Don't** use the hero-metric template: big number, small label, gradient accent background. This is the SaaS cliché this portfolio rejects.
- **Don't** use Bootstrap-style resume templates with timeline + skill progress bars. Progress bars are meaningless and performative.
- **Don't** use SaaS Landing Page patterns: large hero CTA stacked on feature cards stacked on testimonials.
- **Don't** use dark geek aesthetics: terminal green, neon purple, scan-line textures, matrix effects.
- **Don't** use glassmorphism as a default pattern. Backdrop-blur is used once (hero badge) for a specific contextual reason. Anywhere else, it's decoration.
- **Don't** add gradients to text for emphasis. Use weight or size. Gradient text is an absolute ban.
- **Don't** nest cards. A Card containing Card components is always wrong.
- **Don't** animate layout properties (height, width, top, left). Use `transform` and `opacity` only.
- **Don't** use bounce or elastic easing. All motion eases out with `easeOut` or exponential curves.
- **Don't** treat every section as a card. The Skills section is a dense list on the background. The Contact section is a divider list. Not everything needs a container.
