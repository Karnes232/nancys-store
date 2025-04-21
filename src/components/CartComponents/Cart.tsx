"use client"
import { CartContext } from "@/context/cart"
import React, { useContext } from "react"
import TextComponentHeading from "../BlockContent/TextComponentHeading"
import useTranslations from "@/i18n/useTranslations"

const Cart = ({ selectedLang }: { selectedLang: string }) => {
  const t = useTranslations(selectedLang)
  const { clearCart, cartItems } = useContext(CartContext)
  console.log(cartItems)
  return (
    <div className="mt-10 flex flex-col justify-center items-center gap-5 mx-auto">
      <TextComponentHeading
        heading={t("cart.title")}
        headingNumber="h2"
        HeadingClassName="mb-4 mt-8"
      />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto">
        {cartItems.map((item, index) => (
          <div key={index}>
            <h1>{item.name[selectedLang]}</h1>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
