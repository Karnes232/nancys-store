import React from "react"
import Logo from "./Logo"
import HamburgerMenu from "./HamburgerMenu"
import CartButton from "./CartButton"
import NavBar from "./NavBar"
import { LogoData } from "@/lib/getLogo"

const Header = ({ logoData }: { logoData: LogoData }) => {
  return (
    <nav className="bg-black/75 relative lg:sticky top-0 z-50">
      <div className="relative flex items-center justify-between bg-transparent max-w-screen-xl mx-auto px-4">
        <div className="hidden lg:block absolute left-4">
          <HamburgerMenu />
        </div>
        <div className="flex-1 flex justify-center">
          <Logo logoData={logoData} />
        </div>
        <div className="hidden lg:block absolute right-4">
          <CartButton />
        </div>
      </div>
      <div className="lg:hidden flex items-center justify-between bg-transparent max-w-screen-xl h-16 xl:mx-auto">
        <div className="block lg:hidden">
          <HamburgerMenu />
        </div>
        <div className="block lg:hidden">
          <CartButton />
        </div>
      </div>
    </nav>
  )
}

export default Header
