import BlockContent from "@/components/ProductsComponents/BlockContent"
import ProductHeroSwiper from "@/components/HeroComponent/ProductHeroSwiper"
import ProductPageCard from "@/components/ProductsComponents/ProductPageCard"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import React from "react"
import imageUrlBuilder from "@sanity/image-url"
import { Metadata } from "next"

export interface PageProps {
  params: Promise<{
    lang: string
    slug: string
  }>
}

interface LocalizedField {
  en: string
  es: string
}

interface SeoData {
  metaTitle: LocalizedField
  metaDescription: LocalizedField
  keywords: LocalizedField
  openGraphImage?: {
    asset: {
      _ref: string
      url: string
    }
  }
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
      content,
      seo{
          metaTitle,
          metaDescription,
          keywords,
          openGraphImage{
            asset->{
              _ref,
              url
            }
          }
        }
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
      <div className="mt-10 mb-5 md:my-20 lg:my-5 xl:max-w-6xl 2xl:max-w-7xl mx-5 md:mx-auto">
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const pageData = await getProduct(slug)

  if (!pageData || pageData.length === 0) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    }
  }

  const builder = imageUrlBuilder(client)
  const ogImage = (pageData[0].seo as SeoData)?.openGraphImage?.asset?._ref
    ? builder
        .image((pageData[0].seo as SeoData).openGraphImage!.asset._ref)
        .url()
    : undefined

  const metaTitle =
    (pageData[0].seo as SeoData)?.metaTitle?.[lang as "en" | "es"] ||
    (pageData[0].seo as SeoData)?.metaTitle?.en ||
    pageData[0].name

  const metaDescription =
    (pageData[0].seo as SeoData)?.metaDescription?.[lang as "en" | "es"] ||
    (pageData[0].seo as SeoData)?.metaDescription?.en

  const keywords =
    (pageData[0].seo as SeoData)?.keywords?.[lang as "en" | "es"] ||
    (pageData[0].seo as SeoData)?.keywords?.en ||
    []

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    alternates: {
      canonical:
        lang === "en" ? `/products/${slug}` : `/${lang}/products/${slug}`,
      languages: {
        en: `/products/${slug}`,
        es: `/${lang}/products/${slug}`,
      },
    },
  }
}

export default ProductPage
