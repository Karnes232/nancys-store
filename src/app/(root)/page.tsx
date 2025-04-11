import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { client } from "@/sanity/lib/client"
import { useTranslation } from "@/i18n"
import { headers } from "next/headers"
import { fallbackLng } from "@/i18n/settings"
import HomePage from "./[lang]/page"

interface HomePageData {
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
  heroSubheading?: string
  content?: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    openGraphImage?: {
      asset: {
        _ref: string
      }
    }
  }
}

async function getHomePageContent() {
  const query = `
    *[_type == "page" && title == "Index"][0] {
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
      content
    }
  `

  return await client.fetch<HomePageData>(query)
}

async function getLocale() {
  const headersList = await headers()
  return headersList.get("x-locale") || "en"
}

export default async function RootPage() {
  // Reuse the same page component with the default language
  return <HomePage params={{ lang: fallbackLng }} />
}
