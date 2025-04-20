import React from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const Logo = async ({}) => {
  const data = await client.fetch(`
    *[_type == "generalLayout"][0] {
      logo {
        asset->{
          url,
          metadata {
            dimensions,
            lqip,
            palette
          }
        },
        alt,
        hotspot,
        crop
      },
      companyName
    }
  `)

  if (!data || !data.logo) return null
  // Create optimized image URL with Sanity's image URL builder
  const imageUrl = urlFor(data.logo)
    .width(data.logo.asset.metadata.dimensions.width)
    .height(data.logo.asset.metadata.dimensions.height)
    .auto("format")
    .quality(80)
    .url()

  const altText = data.logo.alt || data.companyName || "Company Logo"

  return (
    <div className="flex items-center justify-center py-2 ">
      <Image
        src={imageUrl}
        alt={altText}
        className="w-full h-full"
        width={400}
        height={400}
        priority
        sizes="(max-width: 640px) 200px,
               (max-width: 768px) 250px,
               (max-width: 1024px) 200px,
               250px"
      />
    </div>
  )
}

export default Logo
