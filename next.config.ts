import type { NextConfig } from "next";

// Photos are served by the Unsplash CDN through lib/image-loader.ts.
// Swap them for the studio's own work in lib/content.ts (local files in public/ also work).
const nextConfig: NextConfig = {
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
};

export default nextConfig;
