"use client"
import { useState, useMemo } from "react"
import ProductCard from "./ProductCard"
import { Product, Category } from "@/types/product"
import ProductSearch from "./ProductSearch"
import Pagination from "./Pagination"
import ProductsPerPageSelector from "./ProductsPerPageSelector"

type ProductsFilterProps = {
  products: Product[]
  categories: Category[]
  lang: string
  translations: {
    all: string
  }
  defaultItemsPerPage?: number
}

export function ProductsFilter({
  products,
  categories,
  lang,
  translations,
  defaultItemsPerPage = 12,
}: ProductsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchFilteredProducts, setSearchFilteredProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)

  const handleCategoryFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.value)
    setCurrentPage(1) // Reset to first page when category changes
  }

  const filteredProducts = useMemo(() => {
    const filtered = selectedCategory === "All"
      ? searchFilteredProducts
      : searchFilteredProducts.filter(
          product => product.category._id === selectedCategory,
        )
    
    // Reset to first page when filtered products change
    setCurrentPage(1)
    return filtered
  }, [selectedCategory, searchFilteredProducts])

  // Calculate pagination
  const totalItems = filteredProducts.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to ProductSearch component with offset
    const searchElement = document.querySelector('.product-navbar')
    if (searchElement) {
      const elementPosition = searchElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 200 // 100px offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleSearch = (filteredProducts: Product[]) => {
    setSearchFilteredProducts(filteredProducts)
    setCurrentPage(1) // Reset to first page when search changes
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when items per page changes
  }

  return (
    <div>
      {/* CHANGE WHEN MORE CATEGORIES ARE ADDED */}
      <nav className="product-navbar flex flex-row items-center overflow-x-scroll xl:overflow-x-auto whitespace-nowrap mx-5 lg:justify-center">
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
        onSearch={handleSearch}
        products={products}
        selectedLang={lang}
      />
      {/* <ProductsPerPageSelector
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        selectedLang={lang}
        totalItems={totalItems}
      /> */}
      <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap md:justify-evenly max-w-5xl xl:max-w-6xl mx-5 md:mx-auto">
        {currentProducts.map(product => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              selectedLang={lang}
            />
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        selectedLang={lang}
      />
    </div>
  )
}
