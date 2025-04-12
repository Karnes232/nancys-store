import React from "react"
import ProductCardSwiper from "./ProductCardSwiper"
import { Playfair_Display } from "next/font/google"
import { Product } from "@/types/product"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const ProductCard = ({
  product,
  selectedLang,
}: {
  product: Product
  selectedLang: string
}) => {
  return (
    <div className="max-w-sm min-w-[20rem] xl:max-w-xs my-5 mx-2 rounded-lg overflow-hidden shadow-lg">
      <ProductCardSwiper
        images={product.imagesList}
        mainImage={product.mainImage}
      />
      <div className="px-6 py-4">
        <div
          className={`${playfairDisplay.className} font-bold text-lg mb-2 items-center flex justify-between`}
        >
          <div className="truncate mr-3" translate="no">
            {product.name[selectedLang]}
          </div>
          <div className="text-gray-500 text-sm flex items-center justify-center">
            <span className="mr-1 mt-0.5">DOP</span>
            {product.price}
          </div>
        </div>
        <div className={`${playfairDisplay.className} text-gray-500 text-sm`}>
          {product.shortDescription[selectedLang]}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
