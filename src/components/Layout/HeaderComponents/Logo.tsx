import React from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"

const Logo = async ({}) => {
  const data = await client.fetch(`
    *[_type == "generalLayout"][0] {
      logo {
        asset->{
          url,
          metadata {
            dimensions {
              width,
              height
            },
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

  const { width, height } = data.logo.asset.metadata.dimensions
  const lqip = data.logo.asset.metadata.lqip

  return (
    <div className="flex items-center justify-center py-2">
      <Image
        src={data.logo.asset.url}
        alt={data.logo.alt}
        width={width}
        height={height}
        className="w-auto h-auto max-w-[250px] max-h-[170px]"
        priority
        placeholder="blur"
        blurDataURL={lqip}
        sizes="(max-width: 640px) 200px,
               (max-width: 768px) 250px,
               (max-width: 1024px) 200px,
               250px"
        quality={85}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  )
}

export default Logo
