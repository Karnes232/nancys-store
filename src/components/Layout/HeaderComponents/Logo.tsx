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

  return (
    <div className="flex items-center justify-center py-2 ">
      <Image
        src={data.logo.asset.url}
        alt={data.logo.alt}
        width={400}
        height={400}
        className="w-full h-full"
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
