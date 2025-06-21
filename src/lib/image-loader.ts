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
    // Apply Sanity's image pipeline parameters with optimizations
    const params = new URLSearchParams({
      w: width.toString(),
      q: (quality || 85).toString(),
      auto: 'format',
      fit: 'max',
      fm: 'webp' // Use WebP for better compression
    })
    
    return `${src}?${params.toString()}`
  }
  return src
} 