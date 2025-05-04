import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import { ProductsFilter } from "./ProductsFilter"

async function getProducts() {
  const query = `
    *[_type == "product"] {
      _id,
      name,
      slug,
      "category": category->{
        _id,
        name
      },
      price,
      imagesList[]{
        _key,
        alt,
        "image": image.asset->{
          _ref,
          url
        }
      },
      imagesListLandscape[]{
        _key,
        alt,
        "image": image.asset->{
          _ref,
          url
        }
      },
      shortDescription
    }
    `

  return await client.fetch(query)
}

async function getCategories() {
  const query = `
        *[_type == "productCategory"] {
          _id,
          name
        }
        `
  return await client.fetch(query)
}

const ProductsDisplay = async ({ lang }: { lang: string }) => {
  const [{ t }, products, categories] = await Promise.all([
    getTranslation(lang),
    getProducts(),
    getCategories(),
  ])

  return (
    <div>
      <ProductsFilter
        products={products}
        categories={categories}
        lang={lang}
        translations={{ all: t("common.all") }}
      />
    </div>
  )
}

export default ProductsDisplay
