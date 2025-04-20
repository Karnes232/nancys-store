"use client"
import { CartContext } from "@/context/cart"
import Link from "next/link"
import React, { useContext } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
const CartButton = () => {
  const { cartItems } = useContext(CartContext)
  const cartItemsLength = cartItems.length
  return (
    <div className="flex h-fit">
      <div className="flex justify-center items-center h-fit p-3">
        <div className="relative">
          <Link href="/cart" aria-label="Menu" className={`sb-button `}>
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
