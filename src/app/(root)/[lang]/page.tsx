import dynamicImport from "next/dynamic"
//import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { client } from "@/sanity/lib/client"
import { getTranslation } from "@/i18n"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import { PageData } from "@/types/sanity.types"
//import BlockContent from "@/components/BlockContent/BlockContent"
import { LocaleBlockContent } from "@/types/sanity.types"
//import HeroSwiperOptimized from "@/components/HeroComponent/HeroSwiperOptimized"
// import ProductsDisplay from "@/components/ProductsComponents/ProductsDisplay"
const BlockContent = dynamicImport(
  () => import("@/components/BlockContent/BlockContent"),
  {
    loading: () => <div>Loading...</div>,
  },
)
const ProductsDisplay = dynamicImport(
  () => import("@/components/ProductsComponents/ProductsDisplay"),
  {
    loading: () => <div>Loading...</div>,
  },
)

const HeroSwiper = dynamicImport(
  () => import("@/components/HeroComponent/HeroSwiper"),
  {
    loading: () => <div>Loading...</div>,
  },
)

const HeroSwiperOptimized = dynamicImport(
  () => import("@/components/HeroComponent/HeroSwiperOptimized"),
  {
    loading: () => <div>Loading...</div>,
  },
)

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
  params: any
}

// Add these export configurations
// export const dynamic = "force-static"
// export const revalidate = false // or a number in seconds if you want ISR

const HomePage = async ({ params }: PageProps) => {
  // Await the params first
  const { lang } = params

  // Then use the resolved lang parameter
  const [pageData, { t }] = await Promise.all([
    getHomePageContent(),
    getTranslation(lang),
  ])
  return (
    <main>
      <HeroSwiperOptimized
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
      <div className="">
        <ProductsDisplay lang={lang} />
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
          ? "https://esenciasbynancy.com/"
          : "https://esenciasbynancy.com/es",
    },
    other: {
      "hreflang-en": "https://esenciasbynancy.com/",
      "hreflang-es": "https://esenciasbynancy.com/es",
      "hreflang-x-default": "https://esenciasbynancy.com/",
    },
  }
}

// Add this function before or after generateMetadata
export async function generateStaticParams() {
  // Define the supported languages
  return [{ lang: "es" }]
}

export default HomePage
