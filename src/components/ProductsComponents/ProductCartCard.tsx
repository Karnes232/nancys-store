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
  console.log(product)
  return (
    <div className="flex justify-between mb-5 mt-2">
      <div className="flex gap-10">
        <Image
          src={product.mainImage.asset.url}
          className="rounded-md w-32 h-32 md:w-32 md:h-32 object-cover"
          alt={product.mainImage.alt}
          width={100}
          height={100}
        />
        <div className="flex flex-col items-center gap-2 mx-auto">
          <h3 className="text-lg font-bold truncate">{localizedName}</h3>
          <AddToCartButton product={product} selectedLang={selectedLang} />
          <div className="text-xs w-36">
            <p className="flex justify-between">
              {t("cart.unitPrice")}:{" "}
              <span translate="no">DOP {product.price}</span>
            </p>
            <p className="flex justify-between">
              {t("cart.total")}:{" "}
              <span translate="no">DOP {product.price * product.quantity}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCartCard
