import React from "react"
import Logo from "./Logo"
import HamburgerMenu from "./HamburgerMenu"
import CartButton from "./CartButton"
import NavBar from "./NavBar"

const Header = () => {
  return (
    <nav className="bg-black/75 sticky top-0 z-50">
      <div className="relative flex items-center justify-between bg-transparent max-w-screen-xl mx-auto px-4">
        <div className="hidden lg:block absolute left-4">
          <NavBar />
        </div>
        <div className="flex-1 flex justify-center">
          <Logo
            width={300}
            height={160}
            className="sm:w-[300px] sm:h-[160px] lg:w-[200px] lg:h-[120px]"
          />
        </div>
        <div className="hidden lg:block absolute right-4">
          <HamburgerMenu />
        </div>
      </div>
      <div className="flex items-center justify-between bg-transparent max-w-screen-xl xl:mx-auto">
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
