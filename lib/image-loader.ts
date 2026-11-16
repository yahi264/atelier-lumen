"use client";

// Unsplash photos are resized by their CDN; local files (starting with "/") are served as they are.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("/")) return src;
  return `https://images.unsplash.com/photo-${src}?w=${width}&q=${quality ?? 75}&auto=format&fit=crop`;
}
