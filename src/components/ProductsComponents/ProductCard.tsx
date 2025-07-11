import React from "react"
import ProductCardSwiper from "./ProductCardSwiper"
import { Playfair_Display } from "next/font/google"
import { Product } from "@/types/product"
import Link from "next/link"

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
    <Link
      href={`/${selectedLang}/products/${product.slug.current}`}
      scroll={true}
    >
      <div className="max-w-sm w-[22rem] xl:max-w-xs my-5 mx-2 rounded-lg overflow-hidden shadow-lg dark:shadow-slate-900 h-[27rem] flex flex-col hover:shadow-xl transition-all duration-300">
        <ProductCardSwiper
          images={product.imagesList}
          landscapeImages={product.imagesListLandscape}
          swiperClassName="h-64 lg:h-60"
          lightbox={false}
        />
        <div className="px-6 py-4 mt-2 mb-5">
          <div
            className={`${playfairDisplay.className} font-bold text-lg mb-5 items-center flex justify-between`}
          >
            <div className="truncate mr-3" translate="no">
              {product.name[selectedLang]}
            </div>

            <div className="text-gray-500 text-sm flex items-center justify-center">
              <span className="mr-1 mt-0.5" translate="no">
                DOP
              </span>
              {product.price}
            </div>
          </div>
          <div
            className={`${playfairDisplay.className} text-gray-500 text-sm line-clamp-5`}
          >
            {product.shortDescription[selectedLang]}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
