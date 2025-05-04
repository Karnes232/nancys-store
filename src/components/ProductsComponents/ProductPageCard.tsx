import React from "react"
import ProductCardSwiper from "./ProductCardSwiper"
import { Playfair_Display } from "next/font/google"
import AddToCartButton from "./AddToCartButton"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const ProductPageCard = ({ product, lang }: { product: any; lang: string }) => {
  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-4 2xl:gap-20">
        <div className="w-full max-w-sm mx-auto lg:w-1/2 xl:max-w-lg">
          <ProductCardSwiper
            images={product.imagesList}
            landscapeImages={product.imagesListLandscape}
            swiperClassName="h-64 md:h-80 xl:h-96 rounded-b-lg"
            lightbox={true}
          />
        </div>

        <div className="px-6 py-4 lg:w-1/2 xl:max-w-lg flex flex-col">
          <div
            className={`${playfairDisplay.className} font-bold text-lg mb-2 items-center flex justify-between lg:mb-5 `}
          >
            <div
              className="truncate mr-3 md:text-lg lg:text-xl xl:text-2xl"
              translate="no"
            >
              {product.name[lang]}
            </div>

            <div className="text-gray-500 dark:text-white text-sm md:text-base xl:text-lg flex items-center justify-center lg:mr-3">
              <span className="mr-1 mt-0.5" translate="no">
                DOP
              </span>
              {product.price}
            </div>
          </div>
          <div
            className={`${playfairDisplay.className} text-gray-500 dark:text-white text-sm md:text-base xl:text-lg`}
          >
            {product.shortDescription[lang]}
          </div>
          <div className="flex justify-center mt-10 lg:mt-auto">
            <AddToCartButton product={product} selectedLang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPageCard
