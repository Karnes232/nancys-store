import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { getTranslation } from "@/i18n"
import { client } from "@/sanity/lib/client"
import { PageData } from "@/types/sanity.types"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import React from "react"
import BlockContent from "@/components/BlockContent/BlockContent"

// Add static paths generation
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

// Update the query to include team members
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

// Update the page component
const AboutUsPage = async ({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string }
}) => {
  const resolvedParams = await Promise.resolve(params)
  const { lang } = resolvedParams

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

// Update metadata generation to remove Promise from params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string }
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  const { lang } = resolvedParams
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
      canonical: lang === "en" ? "/about-us" : `/${lang}/about-us`,
      languages: {
        en: "/about-us",
        es: "/es/about-us",
      },
    },
  }
}

export default AboutUsPage
