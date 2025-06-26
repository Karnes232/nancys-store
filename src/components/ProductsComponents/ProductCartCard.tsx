import Image from "next/image"
import React from "react"
import AddToCartButton from "./AddToCartButton"
import useTranslations from "@/i18n/useTranslations"
interface ProductCartCardProps {
  product: any
  selectedLang: string
}

const ProductCartCard = ({ product, selectedLang }: ProductCartCardProps) => {
  const t = useTranslations(selectedLang)
  const localizedName = product.name[selectedLang]

  return (
    <div className="flex justify-between mb-5 mt-2">
      <div className="flex gap-10 md:gap-20">
        <Image
          src={product.imagesList[0].image.url}
          className="rounded-md w-32 h-32 md:w-48 md:h-48 object-cover"
          alt={product.imagesList[0].alt}
          width={100}
          height={100}
          loading="lazy"
        />
        <div className="flex flex-col items-center gap-2 md:gap-5 mx-auto">
          <h3 className="text-lg md:text-2xl font-bold truncate">
            {localizedName}
          </h3>
          <AddToCartButton product={product} selectedLang={selectedLang} />
          <div className="text-xs md:text-base w-36 md:w-48">
            <p className="flex justify-between">
              {t("cart.unitPrice")}:{" "}
              <span className="text-xs md:text-sm" translate="no">
                DOP {product.price}
              </span>
            </p>
            <p className="flex justify-between">
              {t("cart.total")}:{" "}
              <span className="text-xs md:text-sm" translate="no">
                DOP {product.price * product.quantity}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCartCard
