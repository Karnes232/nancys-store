import LanguageSwitcher from "@/components/LanguageSwitcher"
import React from "react"

const Footer = () => {
  return (
    <div className="flex mb-36 flex-col xl:max-w-6xl xl:w-full xl:mx-auto justify-between py-10 mx-8 md:mx-10">
      <LanguageSwitcher />
    </div>
  )
}

export default Footer
