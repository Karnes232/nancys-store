import { client } from "@/sanity/lib/client"
import React from "react"
import { getTranslation } from "@/i18n"
import HeroSwiper from "@/components/HeroComponent/HeroSwiper"

interface ContactPageData {
  title: string
  heroImages: Array<{
    _key: string
    _type: "image"
    asset: {
      _ref: string
      _type: "reference"
    }
    alt: string
    caption?: string
  }>
  heroHeading: { en: string; es: string }
  heroSubheading?: { en: string; es: string }
  content?: Array<{
    _type: string
    [key: string]: unknown
  }>
  seo?: {
    metaTitle?: { en: string; es: string }
    metaDescription?: { en: string; es: string }
    openGraphImage?: {
      asset: {
        _ref: string
      }
    }
  }
}

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
            alt,
            caption
          },
          heroHeading,
          heroSubheading,
          content,
          seo{
            metaTitle,
            metaDescription,
            openGraphImage{
              asset->{
                _ref,
                url
              }
            }
          }
        }
      `

  return await client.fetch<ContactPageData>(query)
}

interface PageProps {
  params: Promise<{ lang: string }>
}

const ContactPage = async ({ params }: PageProps) => {
  // Await the params first
  const { lang } = await params

  // Then use the resolved lang parameter
  const [pageData, { t }] = await Promise.all([
    getContactPageContent(),
    getTranslation(lang),
  ])

  console.log(pageData)
  return (
    <main>
      <HeroSwiper
        heroImages={pageData.heroImages}
        heroHeading={
          pageData.heroHeading[lang as keyof typeof pageData.heroHeading] ?? ""
        }
        heroSubheading={
          pageData.heroSubheading?.[
            lang as keyof typeof pageData.heroSubheading
          ] ?? ""
        }
        className="hero-swiper"
      />
      <div className="bg-white dark:bg-black h-screen">
        <h2>{t("common.welcome")}</h2>
      </div>
    </main>
  )
}

export default ContactPage
