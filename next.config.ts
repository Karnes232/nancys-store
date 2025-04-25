// next.config.ts
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export", // Enable static site generation
  distDir: ".next", // Specify the build directory
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig

// // next.config.ts

// import type { NextConfig } from "next"

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//       },
//     ],
//   },
//   // ...other config settings
// }

// export default nextConfig
