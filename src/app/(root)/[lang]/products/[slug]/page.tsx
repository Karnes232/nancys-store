// import BlockContent from "@/components/ProductsComponents/BlockContent"
import ProductHeroSwiper from "@/components/HeroComponent/ProductHeroSwiper"
//import ProductPageCard from "@/components/ProductsComponents/ProductPageCard"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import React from "react"
import imageUrlBuilder from "@sanity/image-url"
import { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import dynamicImport from "next/dynamic"
import DimensionsComponent from "@/components/ProductsComponents/DimensionsComponent"

const BlockContent = dynamicImport(
  () => import("@/components/BlockContent/BlockContent"),
  {
    loading: () => <div>Loading...</div>,
  },
)

const ProductPageCard = dynamicImport(
  () => import("@/components/ProductsComponents/ProductPageCard"),
  {
    loading: () => <div>Loading...</div>,
  },
)

const ScrollToTop = dynamicImport(() => import("@/components/ScrollToTop"), {
  loading: () => null,
})

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
      dimensions{
        height,
        width,
        weight
      },
      imagesList[]{
        _key,
        alt,
        "image": image.asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      imagesListLandscape[]{
        _key,
        alt,
        "image": image.asset->{
          _id,
          _ref,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
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
      <ScrollToTop />
      <ToastContainer />
      <ProductHeroSwiper
        images={product[0].imagesList}
        landscapeImages={product[0].imagesListLandscape}
      />
      <div className="mt-20 mb-5 md:mt-36 lg:my-5 xl:max-w-6xl 2xl:max-w-7xl mx-5 md:mx-auto">
        <ProductPageCard product={product[0]} lang={lang} />
      </div>
      <div className="my-5 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        <BlockContent
          content={{
            _type: "localeBlock",
            en: product[0].content,
            es: product[0].content,
          }}
          language={lang as "en" | "es"}
        />
      </div>
      {product[0].dimensions && (
        <div className="my-5 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          <DimensionsComponent dimensions={product[0].dimensions} lang={lang} />
        </div>
      )}
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
        lang === "en"
          ? `https://esenciasbynancy.com/products/${slug}`
          : `https://esenciasbynancy.com/${lang}/products/${slug}`,
    },
    other: {
      "hreflang-en": `https://esenciasbynancy.com/products/${slug}`,
      "hreflang-es": `https://esenciasbynancy.com/es/products/${slug}`,
      "hreflang-x-default": `https://esenciasbynancy.com/products/${slug}`,
    },
  }
}

export default ProductPage
