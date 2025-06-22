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
      width={Math.min(width, 300)}
      height={Math.min(height, 200)}
      className="w-auto h-auto max-w-[200px] md:max-w-[250px] max-h-[120px] md:max-h-[150px]"
      priority
      // Remove these problematic props that cause render delay
      // placeholder="blur"
      // blurDataURL={logoData.logo.asset.metadata.lqip}
      quality={75}
      loading="eager"
      fetchPriority="high"
      // Add these to reduce render delay
      decoding="sync"
      unoptimized={false}
      // Simplified sizes
      sizes="(max-width: 768px) 200px, 250px"
      style={{
        width: 'auto',
        height: 'auto',
        maxWidth: '250px',
        maxHeight: '150px',
      }}
    />
  </div>
  )
}

export default Logo