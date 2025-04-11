import React from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const Logo = async ({
  width = 200,
  height = 80,
  className = "",
}: {
  width?: number
  height?: number
  className?: string
}) => {
  const data = await client.fetch(`
        *[_type == "generalLayout"][0] {
          logo,
          companyName
        }
      `)

  if (!data || !data.logo) return null

  // Create optimized image URL with Sanity's image URL builder
  const imageUrl = urlFor(data.logo)
    .width(width)
    .height(height)
    .auto("format") // Automatically choose best format (webp when supported)
    .quality(80) // Slightly reduce quality for better performance
    .url()

  const altText = data.logo.alt || data.companyName || "Company Logo"

  return (
    <div className="flex items-center justify-center py-2">
      <Image
        src={imageUrl}
        alt={altText}
        className={className}
        width={width}
        height={height}
        priority
        sizes="(max-width: 640px) 300px,
               (max-width: 768px) 175px,
               (max-width: 1024px) 200px,
               250px"
      />
    </div>
  )
}

export default Logo
