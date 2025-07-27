"use client"

import React from "react"
import useTranslations from "@/i18n/useTranslations"

interface ProductsPerPageSelectorProps {
  itemsPerPage: number
  onItemsPerPageChange: (itemsPerPage: number) => void
  selectedLang: string
  totalItems: number
}

const ProductsPerPageSelector = ({
  itemsPerPage,
  onItemsPerPageChange,
  selectedLang,
  totalItems,
}: ProductsPerPageSelectorProps) => {
  const t = useTranslations(selectedLang)

  const options = [6, 12, 24, 48, totalItems]

  return (
    <div className="flex items-center justify-center mb-4 px-5">
      <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">
        {t("pagination.perPage")}:
      </label>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option === totalItems ? t("pagination.showAll") : option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductsPerPageSelector 