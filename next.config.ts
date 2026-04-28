import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // Next.js 16 默认启用 Turbopack，配置 CSS 包路径别名
  turbopack: {
    resolveAlias: {
      // shadcn 的 CSS 文件在 Turbopack 中需要显式映射
      'shadcn/tailwind.css': './node_modules/shadcn/dist/tailwind.css',
      'shadcn/dist/tailwind.css': './node_modules/shadcn/dist/tailwind.css',
      // tw-animate-css 同样只有 style 导出条件，Turbopack 无法识别
      'tw-animate-css': './node_modules/tw-animate-css/dist/tw-animate.css',
    },
  },
  experimental: {
    // mdxRs 使用 Rust 编译器加速 MDX
    mdxRs: true,
  },
  images: {
    // 允许 next/image 使用本地图片
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.nlark.com', // 语雀 CDN
      },
    ],
  },
}

export default withNextIntl(withContentlayer(nextConfig))
