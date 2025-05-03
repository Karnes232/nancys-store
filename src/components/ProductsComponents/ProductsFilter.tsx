"use client"
import { useState } from "react"
import ProductCard from "./ProductCard"
import { Product, Category } from "@/types/product"
import ProductSearch from "./ProductSearch"

type ProductsFilterProps = {
  products: Product[]
  categories: Category[]
  lang: string
  translations: {
    all: string
  }
}

export function ProductsFilter({
  products,
  categories,
  lang,
  translations,
}: ProductsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchFilteredProducts, setSearchFilteredProducts] = useState(products)

  const handleCategoryFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.value)
  }

  const filteredProducts =
    selectedCategory === "All"
      ? searchFilteredProducts
      : searchFilteredProducts.filter(
          product => product.category._id === selectedCategory,
        )

  return (
    <div>
      {/* CHANGE WHEN MORE CATEGORIES ARE ADDED */}
      <nav className="flex flex-row items-center overflow-x-scroll xl:overflow-x-auto whitespace-nowrap mx-5 lg:justify-center">
        <button
          onClick={handleCategoryFilter}
          value="All"
          className={`cursor-pointer no-underline flex items-center px-5 h-10 ${
            selectedCategory === "All" ? "font-extrabold" : ""
          } transition-all duration-300`}
        >
          {translations.all}
        </button>
        {categories.map(category => (
          <button
            key={category._id}
            onClick={handleCategoryFilter}
            value={category._id}
            className={`cursor-pointer no-underline flex items-center px-5 h-10 ${
              selectedCategory === category._id ? "font-extrabold" : ""
            } transition-all duration-300`}
          >
            {category.name[lang]}
          </button>
        ))}
      </nav>
      <ProductSearch
        onSearch={setSearchFilteredProducts}
        products={products}
        selectedLang={lang}
      />
      <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:justify-evenly max-w-5xl xl:max-w-6xl mx-5 md:mx-auto">
        {filteredProducts.map(product => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              selectedLang={lang}
            />
          )
        })}
      </div>
    </div>
  )
}
