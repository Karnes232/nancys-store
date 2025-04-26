"use client"
import { CartContext } from "@/context/cart"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { languages, fallbackLng } from "@/i18n/settings"
import React, { useContext } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import useTranslations from "@/i18n/useTranslations"
const CartButton = () => {
  const pathname = usePathname()
  const { cartItems } = useContext(CartContext)
  const cartItemsLength = cartItems.length

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
    <div className="flex h-fit">
      <div className="flex justify-center items-center h-fit p-3">
        <div className="relative">
          <Link
            href={getLocalizedPath("/cart")}
            aria-label="Menu"
            className={`sb-button `}
          >
            <AiOutlineShoppingCart className={`h-7 w-7 md:h-9 text-white`} />
            {cartItemsLength > 0 && (
              <span className="absolute -top-2 -right-2 bg-white/90 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsLength}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartButton
