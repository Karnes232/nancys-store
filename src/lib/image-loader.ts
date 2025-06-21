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
    // Apply Sanity's image pipeline parameters with aggressive optimization
    const params = new URLSearchParams({
      w: width.toString(),
      q: (quality || 75).toString(), // Lower quality for faster loading
      auto: 'format',
      fit: 'max',
      fm: 'webp', // Force WebP for better compression
      bg: 'transparent' // Transparent background
    })
    
    return `${src}?${params.toString()}`
  }
  return src
} 