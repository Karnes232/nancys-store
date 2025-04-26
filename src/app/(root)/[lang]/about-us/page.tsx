import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import { PageData } from "@/types/sanity.types"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import React from "react"
import BlockContent from "@/components/BlockContent/BlockContent"

async function getAboutUsPageContent() {
  const query = `
          *[_type == "page" && title == "About Us"][0] {
            title,
            heroImages[]{
              _key,
              _type,
              asset->{
                _ref,
                url
              },
              alt,
              caption
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

export const dynamic = "force-static"
export const revalidate = false // or a number in seconds if you want ISR

const AboutUsPage = async ({ params }: PageProps) => {
  const { lang } = await params

  const [pageData, { t }] = await Promise.all([
    getAboutUsPageContent(),
    getTranslation(lang),
  ])

  return (
    <main>
      <HeroSwiper
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
        <BlockContent
          content={{
            _type: "localeBlock",
            en: pageData.content,
            es: pageData.content,
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
  const { lang } = await params
  const pageData = await getAboutUsPageContent()

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
      canonical: lang === "en" ? "/contact" : `/${lang}/contact`,
      languages: {
        en: "/contact",
        es: "/es/contact",
      },
    },
  }
}

export async function generateStaticParams() {
  // Define the supported languages
  return [{ lang: "es" }]
}

export default AboutUsPage
