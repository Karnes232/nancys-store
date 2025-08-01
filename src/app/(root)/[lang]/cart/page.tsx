import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import { PageData } from "@/types/sanity.types"
import React from "react"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import Cart from "@/components/CartComponents/Cart"
import { ToastContainer } from "react-toastify"
async function getCartPageContent() {
  const query = `
          *[_type == "page" && title == "Cart"][0] {
            title,
            heroImages[]{
              _key,
              _type,
              asset->{
                _ref,
                url
              },
              alt
            },
            heroImagesLandScape[]{
              _key,
              _type,
              asset->{
                _ref,
                url
              },
              alt
            },
            heroHeading,
            heroSubheading,
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

  return await client.fetch<PageData>(query)
}

interface PageProps {
  params: Promise<{ lang: string }>
}

const CartPage = async ({ params }: PageProps) => {
  const { lang } = await params

  // Then use the resolved lang parameter
  const [pageData, { t }] = await Promise.all([
    getCartPageContent(),
    getTranslation(lang),
  ])

  return (
    <main>
      <ToastContainer />
      <HeroSwiper
        heroImagesLandScape={pageData.heroImagesLandScape}
        heroImages={pageData.heroImages}
        heroHeading={
          pageData.heroHeading
            ? (pageData.heroHeading[
                lang as keyof typeof pageData.heroHeading
              ] ?? "")
            : ""
        }
        heroSubheading={
          pageData.heroSubheading
            ? (pageData.heroSubheading[
                lang as keyof typeof pageData.heroSubheading
              ] ?? "")
            : ""
        }
        className="hero-swiper"
      />
      <div className="my-5">
        <Cart selectedLang={lang} />
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  const pageData = await getCartPageContent()

  const builder = imageUrlBuilder(client)
  const ogImage = pageData.seo?.openGraphImage?.asset?._ref
    ? builder.image(pageData.seo.openGraphImage.asset._ref).url()
    : undefined

  // Handle localized meta title and description
  const metaTitle =
    pageData.seo?.metaTitle?.[lang as keyof typeof pageData.seo.metaTitle] ||
    pageData.seo?.metaTitle?.en ||
    pageData.title

  const metaDescription =
    pageData.seo?.metaDescription?.[
      lang as keyof typeof pageData.seo.metaDescription
    ] || pageData.seo?.metaDescription?.en

  const keywords =
    pageData.seo?.keywords?.[lang as keyof typeof pageData.seo.keywords] ||
    pageData.seo?.keywords?.en ||
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
          ? "https://esenciasbynancy.com/cart"
          : `https://esenciasbynancy.com/${lang}/cart`,
    },
    other: {
      "hreflang-en": "https://esenciasbynancy.com/cart",
      "hreflang-es": "https://esenciasbynancy.com/es/cart",
      "hreflang-x-default": "https://esenciasbynancy.com/cart",
    },
  }
}

export default CartPage
