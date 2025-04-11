"use client"
import React, { useState } from "react"

import { HiBars3 } from "react-icons/hi2"
import SideBarMenu from "./SideBarMenu"
const HamburgerMenu = () => {
  const [toggled, setToggled] = useState(false)
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <SideBarMenu toggled={toggled} setToggled={setToggled} />
      </div>
      <div className="flex justify-center items-center p-3">
        <div>
          <button
            aria-label="Menu"
            className={`sb-button `}
            onClick={() => setToggled(!toggled)}
          >
            <HiBars3 className={`h-7 w-7 md:h-9 text-white`} />
          </button>
        </div>
      </div>
      <div className="block h-16 lg:hidden">
        <SideBarMenu toggled={toggled} setToggled={setToggled} />
      </div>
    </div>
  )
}

export default HamburgerMenu
