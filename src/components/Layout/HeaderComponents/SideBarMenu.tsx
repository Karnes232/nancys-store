import React from "react"
import { IoClose } from "react-icons/io5"
import { Sidebar } from "react-pro-sidebar"
import SideBarInside from "./SideBarInside"
const SideBarMenu = ({ toggled, setToggled }) => {
  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${
        !toggled ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <Sidebar
        backgroundColor="rgb(255, 255, 255, 1)"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
        rtl
        width="100%"
        transitionDuration={300}
      >
        <div className="flex flex-col h-full items-center text-center justify-between">
          {toggled && (
            <div className="fixed top-5 right-5">
              <button
                className="p-2 text-2xl text-gray-500"
                onClick={() => setToggled(false)}
              >
                <IoClose />
              </button>
            </div>
          )}

          <SideBarInside footer={false} setToggled={setToggled} />
        </div>
      </Sidebar>
    </div>
  )
}

export default SideBarMenu
