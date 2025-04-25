// lib/image-loader.ts
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // Check if this is a Sanity image
  if (src.startsWith("https://cdn.sanity.io")) {
    // Apply Sanity's image pipeline parameters
    return `${src}?w=${width}&q=${quality || 75}&auto=format`
  }
  return src
}
