"use client"

import React from "react"
import { Menu, MenuItem } from "react-pro-sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { languages, fallbackLng } from "@/i18n/settings"
import useTranslations from "@/i18n/useTranslations"

const SideBarInside = ({ footer, setToggled }) => {
  const pathname = usePathname()

  const getCurrentLocale = () => {
    const segments = pathname.split("/")
    return languages.includes(segments[1]) ? segments[1] : fallbackLng
  }

  const currentLocale = getCurrentLocale()
  const t = useTranslations(currentLocale)

  const getLocalizedPath = (path: string) => {
    return currentLocale === fallbackLng ? path : `/${currentLocale}${path}`
  }

  return (
    <>
      <Menu className="ml-0 h-full flex flex-col justify-center items-center overflow-hidden text-black">
        <MenuItem
          component={
            <Link
              href={getLocalizedPath("/")}
              className="no-underline uppercase text-xl space-x-3 transition-all duration-300 hover:scale-110"
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p
            className={`${footer ? "hamburgerSmall" : "hamburger"} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all after:duration-300`}
          >
            {t("Home")}
          </p>
        </MenuItem>

        <MenuItem
          component={
            <Link
              href={getLocalizedPath("/about-us")}
              className="no-underline uppercase text-xl space-x-3 transition-all duration-300 hover:scale-110"
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p
            className={`${footer ? "hamburgerSmall" : "hamburger"} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all after:duration-300`}
          >
            {t("About Us")}
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href={getLocalizedPath("/photo-gallery")}
              className="no-underline uppercase text-xl space-x-3 transition-all duration-300 hover:scale-110"
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p
            className={`${footer ? "hamburgerSmall" : "hamburger"} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all after:duration-300`}
          >
            {t("Photo Gallery")}
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href={getLocalizedPath("/cart")}
              className="no-underline uppercase text-xl space-x-3 transition-all duration-300 hover:scale-110"
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p
            className={`${footer ? "hamburgerSmall" : "hamburger"} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all after:duration-300`}
          >
            {t("Cart")}
          </p>
        </MenuItem>
        <MenuItem
          component={
            <Link
              href={getLocalizedPath("/contact")}
              className="no-underline uppercase text-xl space-x-3 transition-all duration-300 hover:scale-110"
              onClick={footer ? undefined : () => setToggled(false)}
            />
          }
        >
          <p
            className={`${footer ? "hamburgerSmall" : "hamburger"} relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-current hover:after:w-full after:transition-all after:duration-300`}
          >
            {t("Contact")}
          </p>
        </MenuItem>
      </Menu>
    </>
  )
}

export default SideBarInside
