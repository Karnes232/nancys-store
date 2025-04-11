import React from "react"

interface PageProps {
  params: Promise<{ lang: string }>
}

const CartPage = ({ params }: PageProps) => {
  return <main>Cart Page</main>
}

export default CartPage
