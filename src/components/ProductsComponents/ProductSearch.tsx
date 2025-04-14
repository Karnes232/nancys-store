"use client"

import React, { useState } from "react"
import { Product } from "@/types/product"
import useTranslations from "@/i18n/useTranslations"

interface ProductSearchProps {
  onSearch: (filteredProducts: Product[]) => void
  products: Product[]
  selectedLang: string
}

const ProductSearch = ({
  onSearch,
  products,
  selectedLang,
}: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const t = useTranslations(selectedLang)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    const filtered = products.filter(product => {
      const name = product.name[selectedLang].toLowerCase()
      const description = product.shortDescription[selectedLang].toLowerCase()
      const searchLower = term.toLowerCase()

      return name.includes(searchLower) || description.includes(searchLower)
    })

    onSearch(filtered)
  }

  return (
    <div className="search-container my-3 px-5 flex justify-center items-center">
      <input
        type="text"
        placeholder={t("search.products")}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full lg:max-w-lg xl:max-w-xl p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default ProductSearch
