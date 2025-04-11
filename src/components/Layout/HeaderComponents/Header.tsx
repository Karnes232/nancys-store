import React from "react"
import Logo from "./Logo"

const Header = () => {
  return (
    <nav className="bg-transparent sticky top-0 z-50">
      <div className="flex items-center justify-between bg-transparent max-w-screen-xl xl:mx-auto">
        <div></div>
        <Logo width={300} height={150} />
        <div></div>
        {/*  <Nav /> */}
      </div>
    </nav>
  )
}

export default Header
