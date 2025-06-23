// next.config.ts

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Optimize images from Sanity
    domains: ["cdn.sanity.io"],
    // Enable modern formats
    formats: ["image/webp", "image/avif"],
    // Optimize for different device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // ...other config settings
}

export default nextConfig
