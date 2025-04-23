"use client"
import { CartContext } from "@/context/cart"
import React, { useContext } from "react"
import TextComponentHeading from "../BlockContent/TextComponentHeading"
import useTranslations from "@/i18n/useTranslations"
import ProductCartCard from "../ProductsComponents/ProductCartCard"
import { MdKeyboardArrowDown } from "react-icons/md"
const Cart = ({ selectedLang }: { selectedLang: string }) => {
  const t = useTranslations(selectedLang)
  const { clearCart, cartItems } = useContext(CartContext)
  const [showInstructions, setShowInstructions] = React.useState(false)
  const [instructions, setInstructions] = React.useState("")

  return (
    <div className="mt-10 flex flex-col justify-center items-center gap-5 mx-auto">
      <TextComponentHeading
        heading={t("cart.title")}
        headingNumber="h2"
        HeadingClassName="mb-4 mt-8"
      />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto">
        {cartItems.map((item, index) => {
          return (
            <ProductCartCard
              product={item}
              selectedLang={selectedLang}
              key={index}
            />
          )
        })}
      </div>

      <div className="w-10/12 md:w-full max-w-md border border-gray-200 rounded-lg shadow-sm">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="text-left w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 dark:bg-black dark:text-white rounded-t-lg border-b border-gray-200 flex items-center"
        >
          {t("cart.instructions")}

          <span className="mr-2 w-4">
            <MdKeyboardArrowDown />
          </span>
        </button>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out px-3 ${showInstructions ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <textarea
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder={t("cart.instructionsPlaceholder")}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
