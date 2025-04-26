"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { languages, fallbackLng } from "@/i18n/settings"
import useTranslations from "@/i18n/useTranslations"
import Link from "next/link"
const SiteMap = () => {
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
    <section className="">
      <div className="lg:hidden ml-2 flex flex-col justify-center overflow-hidden text-gray-400 space-y-1">
        <Link
          href={getLocalizedPath("/")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("Home")}{" "}
        </Link>
        <Link
          href={getLocalizedPath("/about-us")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("About Us")}{" "}
        </Link>
        <Link
          href={getLocalizedPath("/cart")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("Cart")}{" "}
        </Link>
        <Link
          href={getLocalizedPath("/contact")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("Contact")}{" "}
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-row lg:space-x-4 text-gray-400">
        <Link
          href={getLocalizedPath("/")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("Home")}{" "}
        </Link>
        <Link
          href={getLocalizedPath("/about-us")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("About Us")}{" "}
        </Link>
        <Link
          href={getLocalizedPath("/cart")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("Cart")}{" "}
        </Link>
        <Link
          href={getLocalizedPath("/contact")}
          className="no-underline uppercase text-sm space-x-3 transition-all duration-300 hover:scale-110"
        >
          {" "}
          {t("Contact")}{" "}
        </Link>
      </div>
    </section>
  )
}

export default SiteMap
