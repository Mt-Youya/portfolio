import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cyrus/ui"],
  outputFileTracingIncludes: {
    "/api/pdf": ["../../content/resume.zh.md", "styles/global.css"],
    "/*": ["../../content/resume.zh.md"],
  },
}

export default nextConfig
