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
    return `${src}?w=${width}&q=${quality || 85}&auto=format&fit=max`
  }
  return src
} 