"use client"
import React, { useState } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
const CartButton = () => {
  const [toggled, setToggled] = useState(false)
  return (
    <div className="flex h-fit">
      <div className="flex justify-center items-center h-fit p-3">
        <div>
          <button
            aria-label="Menu"
            className={`sb-button `}
            onClick={() => setToggled(!toggled)}
          >
            <AiOutlineShoppingCart className={`h-7 w-7 md:h-9 text-white`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartButton
