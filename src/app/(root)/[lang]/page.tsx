import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { client } from "@/sanity/lib/client"
import { getTranslation } from "@/i18n"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"

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

  return await client.fetch<HomePageData>(query)
}

interface PageProps {
  params: Promise<{ lang: string }>
}

const HomePage = async ({ params }: PageProps) => {
  // Await the params first
  const { lang } = await params

  // Then use the resolved lang parameter
  const [pageData, { t }] = await Promise.all([
    getHomePageContent(),
    getTranslation(lang),
  ])

  return (
    <main>
      <HeroSwiper
        heroImages={pageData.heroImages}
        heroHeading={
          pageData.heroHeading[lang as keyof typeof pageData.heroHeading] ||
          pageData.heroHeading.en
        }
        heroSubheading={
          pageData.heroSubheading[
            lang as keyof typeof pageData.heroSubheading
          ] || ""
        }
        className="hero-swiper"
      />
      <div className="bg-white dark:bg-black h-screen">
        <h2>{t("common.welcome")}</h2>
      </div>
    </main>
  )
}

// Add metadata generation function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params
  const pageData = await getHomePageContent()

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

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
  }
}

export default HomePage
