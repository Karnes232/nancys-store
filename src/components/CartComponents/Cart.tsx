"use client"
import { CartContext } from "@/context/cart"
import React, { useContext, useState, useEffect } from "react"
import TextComponentHeading from "../BlockContent/TextComponentHeading"
import useTranslations from "@/i18n/useTranslations"
import ProductCartCard from "../ProductsComponents/ProductCartCard"
import { MdKeyboardArrowDown } from "react-icons/md"
import { div } from "motion/react-client"
import CartForm from "./CartForm"
import { useRouter } from "next/navigation"
const Cart = ({ selectedLang }: { selectedLang: string }) => {
  const router = useRouter()
  const t = useTranslations(selectedLang)
  const { clearCart, cartItems } = useContext(CartContext)
  const [showInstructions, setShowInstructions] = useState(false)
  const [instructions, setInstructions] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    instructions: instructions,
    cartItems: cartItems.map(item => ({
      name: item.name.en,
      price: item.price,
      quantity: item.quantity,
      slug: item.slug,
    })),
  })

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      instructions,
      cartItems: cartItems.map(item => ({
        name: item.name.en,
        price: item.price,
        quantity: item.quantity,
        slug: item.slug,
      })),
    }))
  }, [cartItems, instructions])

  const handleSubmit = async () => {
    try {
      const formDataWithStringifiedCart = {
        ...formData,
        cartItems: JSON.stringify(formData.cartItems),
      }
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formDataWithStringifiedCart).toString(),
      })
      if (response.ok) {
        router.push(`/thankyou/?name=${formData.name}`)
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start w-full lg:max-w-7xl lg:mx-auto min-h-[600px]">
      <div className="mt-10 flex flex-col justify-center items-center gap-5 mx-auto lg:w-1/2">
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

        <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-left w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 dark:bg-black dark:text-white rounded-t-lg border-b border-gray-200 flex items-center justify-between"
          >
            {t("cart.instructions")}

            <span className="ml-auto">
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
      <div className="w-full lg:w-1/2 lg:mt-10">
        <CartForm
          selectedLang={selectedLang}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  )
}

export default Cart
