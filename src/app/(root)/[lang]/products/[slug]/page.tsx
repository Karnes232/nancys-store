import BlockContent from "@/components/ProductsComponents/BlockContent"
import ProductHeroSwiper from "@/components/HeroComponent/ProductHeroSwiper"
import ProductPageCard from "@/components/ProductsComponents/ProductPageCard"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import React from "react"

export interface PageProps {
  params: Promise<{
    lang: string
    slug: string
  }>
}

async function getProduct(slug: string) {
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
      shortDescription,
      content
    }
    `
  const result = await client.fetch(query)
  return result
}

const ProductPage = async ({ params }: PageProps) => {
  const { lang, slug } = await params

  const [{ t }, product] = await Promise.all([
    getTranslation(lang),
    getProduct(slug),
  ])

  if (!product || product.length === 0) {
    return (
      <main>
        <h1>Product not found</h1>
      </main>
    )
  }

  return (
    <main>
      <ProductHeroSwiper
        images={product[0].imagesList}
        mainImage={product[0].mainImage}
      />
      <div className="my-5 md:my-20 lg:my-5 xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        <ProductPageCard product={product[0]} lang={lang} />
      </div>
      <div className="my-5 xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        <BlockContent
          content={{
            _type: "localeBlock",
            en: product[0].content,
            es: product[0].content,
          }}
          language={lang as "en" | "es"}
        />
      </div>
    </main>
  )
}

export default ProductPage
