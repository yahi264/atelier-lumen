import type { NextConfig } from "next";

// Photos are served by the Unsplash CDN through lib/image-loader.ts.
// GITHUB_PAGES=true builds a static copy for GitHub Pages (see scripts/deploy-pages.mjs).
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  ...(pages ? { output: "export", basePath, trailingSlash: true, distDir: ".next-pages" } : {}),
};

export default nextConfig;
