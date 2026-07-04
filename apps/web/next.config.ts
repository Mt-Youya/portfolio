import createNextIntlPlugin from "next-intl/plugin"
import type { NextConfig } from "next"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cyrus/ui"],
}

export default withNextIntl(nextConfig)
