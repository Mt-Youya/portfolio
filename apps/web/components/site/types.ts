export type NavItem = {
  href: string
  label: string
}

export type Stat = {
  value: string
  label: string
}

export type Capability = {
  label: string
  text: string
}

export type RuntimeStep = {
  label: string
  text: string
}

export type Project = {
  eyebrow: string
  title: string
  summary: string
  bullets: string[]
  stack: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type Highlight = {
  title: string
  text: string
}
