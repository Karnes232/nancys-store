import ProductHeroSwiper from "@/components/HeroComponent/ProductHeroSwiper"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import React from "react"

interface PageProps {
  params: {
    lang: string;
    slug: string;
  }
}

async function getProduct(slug: string) {
  console.log("Fetching product with slug:", slug)
  const query = `
    *[_type == "product" && slug.current == "${slug}"] {
      _id,
      name,
      slug,
      price,
      mainImage{
        asset->{
          _ref,
          url
        },
        alt
      },
      imagesList[]{
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
  const result = await client.fetch(query)
  console.log("Sanity query result:", result)
  return result
}

interface PageProps {
  params: {
    lang: string;
    slug: string;
  }
}

const ProductPage = async ({ params }: PageProps) => {
  const { lang, slug } = params  // Remove the await here since params is no longer a Promise
  
  const [{ t }, product] = await Promise.all([
    getTranslation(lang),
    getProduct(slug),
  ])

  console.log("Product data:", product)

  if (!product || product.length === 0) {
    console.log("No product found")
    return (
      <main>
        <h1>Product not found</h1>
      </main>
    )
  }

  console.log(product[0].imagesList)
  return (
    <main>
      <ProductHeroSwiper
        images={product[0].imagesList}
        mainImage={product[0].mainImage}
      />
    </main>
  )
}

export default ProductPage
