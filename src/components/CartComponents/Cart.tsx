"use client"
import { CartContext } from "@/context/cart"
import React, { useContext } from "react"

const Cart = () => {
  const { clearCart, cartItems } = useContext(CartContext)
  console.log(cartItems)
  return <div>Cart</div>
}

export default Cart
