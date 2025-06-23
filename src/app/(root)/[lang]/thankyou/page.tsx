import React from "react"
import { PageData } from "@/types/sanity.types"
import { client } from "@/sanity/lib/client"
import { getTranslation } from "@/i18n"
import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import ThankYou from "@/components/ContactFormComponents/ThankYou"

async function getContactPageContent() {
  const query = `
          *[_type == "page" && title == "Contact"][0] {
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

async function getCompanyEmail() {
  const query = `
      *[_type == "generalLayout"][0] {
        email
      }
    `
  return await client.fetch(query)
}

interface PageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const ThankYouPage = async ({ params, searchParams }: PageProps) => {
  const { lang } = await params
  const { name } = await searchParams
  const [pageData, { t }, email] = await Promise.all([
    getContactPageContent(),
    getTranslation(lang),
    getCompanyEmail(),
  ])
  console.log(name)
  return (
    <main>
      <HeroSwiper
        heroImages={pageData.heroImages}
        heroImagesLandScape={pageData.heroImagesLandScape}
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
      <ThankYou email={email.email} lang={lang} />
    </main>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  const pageData = await getContactPageContent()
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

  // Get language-specific keywords or fallback to English
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
          ? "https://esenciasbynancy.com/thankyou"
          : `https://esenciasbynancy.com/${lang}/thankyou`,
    },
    other: {
      "hreflang-en": "https://esenciasbynancy.com/thankyou",
      "hreflang-es": "https://esenciasbynancy.com/es/thankyou",
      "hreflang-x-default": "https://esenciasbynancy.com/thankyou",
    },
  }
}

export default ThankYouPage
