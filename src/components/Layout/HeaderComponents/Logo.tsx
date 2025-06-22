import React from "react"
import Image from "next/image"
import { LogoData } from "@/lib/getLogo"

interface LogoProps {
  logoData: LogoData | null
}

const Logo: React.FC<LogoProps> = ({ logoData }) => {
  if (!logoData?.logo?.asset?.url) return null

  const { width, height } = logoData.logo.asset.metadata.dimensions
  const imageUrl = logoData.logo.asset.url

  return (
    <div className="flex items-center justify-center py-2">
      <Image
        src={imageUrl}
        alt={logoData.logo.alt || logoData.companyName || "Company Logo"}
        width={250}
        height={170}
        className="w-auto h-auto max-w-[250px] max-h-[170px]"
        priority
        // placeholder="blur"
        // blurDataURL={logoData.logo.asset.metadata.lqip}
        // sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 200px, 250px"
        quality={75}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  )
}

export default Logo