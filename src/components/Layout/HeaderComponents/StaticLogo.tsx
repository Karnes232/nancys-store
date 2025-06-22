import React from "react"
import Image from "next/image"

const StaticLogo: React.FC = () => (
  <div className="flex items-center justify-center py-2">
    <Image
      src="/images/logo.webp"
      alt="Esencias By Nancy"
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

export default StaticLogo 