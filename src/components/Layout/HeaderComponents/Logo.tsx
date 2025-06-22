import React, { useState, useEffect } from "react"
import Image from "next/image"
import { LogoData } from "@/lib/getLogo"

interface LogoProps {
  logoData: LogoData | null
}

const Logo: React.FC<LogoProps> = ({ logoData }) => {
  const [useDynamicLogo, setUseDynamicLogo] = useState(false)
  const [dynamicLogoLoaded, setDynamicLogoLoaded] = useState(false)

  // Static logo for immediate display (WebP for better performance)
  const staticLogoUrl = "/images/logo.webp"

  useEffect(() => {
    // Only load dynamic logo if we have logo data and it's different from static
    if (logoData?.logo?.asset?.url && logoData.logo.asset.url !== staticLogoUrl) {
      // Preload the dynamic logo
      const img = document.createElement('img')
      img.onload = () => {
        setDynamicLogoLoaded(true)
        setUseDynamicLogo(true)
      }
      img.onerror = () => {
        // Fallback to static logo if dynamic fails
        setUseDynamicLogo(false)
      }
      img.src = logoData.logo.asset.url
    }
  }, [logoData?.logo?.asset?.url])

  // Use dynamic logo if available and loaded, otherwise use static
  const shouldUseDynamic = useDynamicLogo && dynamicLogoLoaded && logoData?.logo?.asset?.url

  if (shouldUseDynamic) {
    const { width, height } = logoData.logo.asset.metadata.dimensions
    const imageUrl = logoData.logo.asset.url

    return (
      <div className="flex items-center justify-center py-2">
        <Image
          src={imageUrl}
          alt={logoData.logo.alt || logoData.companyName || "Company Logo"}
          width={Math.min(width, 250)}
          height={Math.min(height, 150)}
          className="w-auto h-auto max-w-[200px] md:max-w-[250px] max-h-[120px] md:max-h-[150px]"
          priority
          quality={85}
          sizes="(max-width: 768px) 200px, 250px"
          fetchPriority="high"
          placeholder="empty"
        />
      </div>
    )
  }

  // Static logo fallback
  return (
    <div className="flex items-center justify-center py-2">
      <Image
        src={staticLogoUrl}
        alt="Company Logo"
        width={500}
        height={315}
        className="w-auto h-auto max-w-[200px] md:max-w-[250px] max-h-[120px] md:max-h-[150px]"
        priority
        quality={85}
        sizes="(max-width: 768px) 200px, 250px"
        fetchPriority="high"
        placeholder="empty"
      />
    </div>
  )
}

export default Logo