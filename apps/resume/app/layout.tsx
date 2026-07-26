import type { Metadata } from "next"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: "辞鸢的简历",
  description: "辞鸢的公开中文简历与受控提案管理入口。",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
