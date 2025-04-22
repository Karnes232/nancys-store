"use client"
import React, { useContext } from "react"
import { CartContext } from "../../context/cart"
import { toast } from "react-toastify"
import useTranslations from "@/i18n/useTranslations"

const notifyAddedToCart = (productName: string) =>
  toast.success(`${productName} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#fff",
      color: "#000",
    },
  })

const notifyRemovedFromCart = (productName: string) =>
  toast.error(`${productName} removed from cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: "#000",
      color: "#fff",
    },
  })

const AddToCartButton = ({
  product,
  selectedLang,
}: {
  product: any
  selectedLang: string
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext)
  const t = useTranslations(selectedLang)

  function handleClick(e) {
    e.preventDefault()

    addToCart(product)
    if (cartItems.length < 4) {
      notifyAddedToCart(product.name[selectedLang])
    } else {
      console.log(product)
      // addVariantToCart(variantId, quantity)
    }
  }

  return (
    <div className="flex justify-center items-center mb-5">
      {!cartItems.find(item => item.name.en === product.name.en) ? (
        <button
          type="submit"
          onClick={handleClick}
          className={`bg-black/75 hover:bg-black/50 text-white font-bold py-1 px-4 rounded dark:bg-white dark:text-black`}
        >
          {t("addToCart")}
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            type="submit"
            onClick={() => {
              const cartItem = cartItems.find(
                item => item.name.en === product.name.en,
              )
              if (cartItem.quantity === 1) {
                notifyRemovedFromCart(product.name[selectedLang])
                removeFromCart(product)
              } else {
                removeFromCart(product)
              }
            }}
            className={`bg-black/75 hover:bg-black/50 text-white font-bold py-1 px-4 rounded dark:bg-white dark:text-black`}
          >
            -
          </button>
          <p className="text-gray-600 dark:text-gray-300 flex justify-center items-center">
            {cartItems.find(item => item.name.en === product.name.en).quantity}
          </p>
          <button
            type="submit"
            onClick={handleClick}
            className={`bg-black/75 hover:bg-black/50 text-white font-bold py-1 px-4 rounded dark:bg-white dark:text-black`}
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}

export default AddToCartButton
