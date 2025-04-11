import React from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const Logo = async ({
  width = 200,
  height = 80,
}: {
  width?: number
  height?: number
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
    <div className="flex items-center justify-center py-5">
      <Image
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        priority
        sizes={`(max-width: 768px) ${width / 2}px, ${width}px`}
      />
    </div>
  )
}

export default Logo

// import { client } from '@/sanity/lib/client'
// import React from 'react'
// import imageUrlBuilder from '@sanity/image-url'
// import { SanityImageSource } from '@sanity/image-url/lib/types/types'
// export interface LogoData {
//     logo: {
//       _type: 'image'
//       asset: {
//         _ref: string
//         _type: 'reference'
//       }
//       alt?: string
//     }
//   }

//   const builder = imageUrlBuilder(client)

//   const urlFor = (source: SanityImageSource) => {
//     return builder.image(source)
//   }

// const Logo = async () => {
//   const logo = await client.fetch<LogoData>(`
//     *[_type == "generalLayout"][0] {
//       logo
//     }
//   `)

//   if (!logo) return null

//   const imageUrl = urlFor(logo.logo).url()
//   console.log(imageUrl)
//   return (
//     <div>Logo</div>
//   )
// }

// export default Logo
