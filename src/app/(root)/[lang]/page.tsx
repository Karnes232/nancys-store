import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { client } from "@/sanity/lib/client"
import { useTranslation } from "@/i18n"

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
  content?: Array<{
    _type: string
    [key: string]: unknown
  }>
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

const HomePage = async ({
  params: { lang },
}: {
  params: { lang: string }
}) => {
  const { t } = await useTranslation(lang)
  const pageData = await getHomePageContent()

  return (
    <>
      <HeroSwiper
        heroImages={pageData.heroImages}
        heroHeading={
          pageData.heroHeading[lang as keyof typeof pageData.heroHeading] ||
          pageData.heroHeading.en
        }
        heroSubheading={t("common.heroSubheading")}
        className="hero-swiper"
      />
      <div className="bg-white dark:bg-black h-screen">
        <h2>{t("common.welcome")}</h2>
      </div>
    </>
  )
}

export default HomePage
