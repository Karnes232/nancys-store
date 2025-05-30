"use client"
import React, { createContext, useState, useEffect, ReactNode } from "react"

// Define types for cart items and context
interface CartItem {
  rentalItem: string
  price: number
  quantity: number
  [key: string]: any // For any additional properties
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  clearCart: () => void
  getCartTotal: () => number
  updateCartItemQuantity: (product: any, newQuantity: number) => void
}

// Create context with default values
export const CartContext = createContext<CartContextType>({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({
  children,
}: CartProviderProps): React.ReactElement => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
    const data = localStorage.getItem("cartItems")
    if (data) {
      setCartItems(JSON.parse(data))
    }
  }, [])

  const addToCart = (item: CartItem): void => {
    const isItemInCart = cartItems.find(
      cartItem => cartItem.name.en === item.name.en,
    )

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.name.en === item.name.en
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      )
    } else {
      if (cartItems.length < 4) {
        setCartItems([...cartItems, { ...item, quantity: 1 }])
      }
    }
  }

  const removeFromCart = (item: CartItem): void => {
    const isItemInCart = cartItems.find(
      cartItem => cartItem.name.en === item.name.en,
    )

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter(cartItem => cartItem.name.en !== item.name.en),
      )
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.name.en === item.name.en
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      )
    }
  }

  const clearCart = (): void => {
    setCartItems([])
  }

  const getCartTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }

  const updateCartItemQuantity = (product: any, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name.en === product.name.en
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    )
  }

  // Removed duplicate useEffect that was in the original code

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider
      value={
        {
          cartItems: isClient ? cartItems : [],
          addToCart,
          removeFromCart,
          clearCart,
          getCartTotal,
          updateCartItemQuantity,
        } as CartContextType
      }
    >
      {children}
    </CartContext.Provider>
  )
}
