import React from "react"
import Image from "next/image"
import imageLoader from "@/lib/image-loader"

interface StaticLogoProps {
  logoData: {
    url: string
    alt: string
    width: number
    height: number
    lqip: string
  }
}

const StaticLogo: React.FC<StaticLogoProps> = ({ logoData }) => {
  if (!logoData) return null

  return (
    <div className="flex items-center justify-center py-2">
      <Image
        loader={imageLoader}
        src={logoData.url}
        alt={logoData.alt}
        width={logoData.width}
        height={logoData.height}
        className="w-auto h-auto max-w-[250px] max-h-[170px]"
        priority
        placeholder="blur"
        blurDataURL={logoData.lqip}
        sizes="(max-width: 640px) 200px,
               (max-width: 768px) 250px,
               (max-width: 1024px) 200px,
               250px"
        quality={85}
        unoptimized={false}
        loading="eager"
      />
    </div>
  )
}

export default StaticLogo 