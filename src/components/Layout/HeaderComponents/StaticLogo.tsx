import React from "react"
import Image from "next/image"

const StaticLogo: React.FC = () => (
  <div className="flex items-center justify-center py-2">
    <Image
      src="/logo.webp" // or "/logo.png"
      alt="Company Logo"
      width={250}
      height={170}
      className="w-auto h-auto max-w-[250px] max-h-[170px]"
      priority
      placeholder="empty"
      sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 200px, 250px"
    />
  </div>
)

export default StaticLogo 