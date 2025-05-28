import { client } from "@/sanity/lib/client"
import React from "react"
import { getTranslation } from "@/i18n"
import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import TextComponentParagraph from "@/components/ProductsComponents/TextComponentParagraph"
import PhotoGallery from "@/components/PhotoGalleryComponents/PhotoGallery"

async function getPhotoGalleryPageContent() {
  const query = `
    *[_type == "gallery"][0] {
      title,
      description,
      mainImage{
        asset->{
          _ref,
          url
        },
        alt
      },
      mainImageLandscape{
        asset->{
          _ref,
          url
        },
        alt
      },
      images[]{
        asset->{
          _ref,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt,
        caption
      },
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

  return await client.fetch(query)
}

interface PageProps {
  params: any
}

export const dynamic = "force-static"
export const revalidate = false

const PhotoGalleryPage = async ({ params }: PageProps) => {
  const { lang } = params // Direct access, no await needed

  const [pageData, { t }] = await Promise.all([
    getPhotoGalleryPageContent(),
    getTranslation(lang),
  ])

  return (
    <main>
      <HeroSwiper
        heroImages={[pageData.mainImage]}
        heroImagesLandScape={[pageData.mainImageLandscape]}
        heroHeading={
          pageData.title
            ? (pageData.title[lang as keyof typeof pageData.title] ?? "")
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
      <div className="bg-white dark:bg-black my-20 lg:my-40">
        <TextComponentParagraph
          paragraph={
            pageData.description
              ? (pageData.description[
                  lang as keyof typeof pageData.description
                ] ?? "")
              : ""
          }
          ParagraphClassName="text-center"
        />
      </div>
      <div className="bg-white dark:bg-black">
        <PhotoGallery
          images={pageData.images.sort(() => Math.random() - 0.5)}
        />
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = params // Direct access, no await needed
  const pageData = await getPhotoGalleryPageContent()

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
  return [{ lang: "es" }]
}

export default PhotoGalleryPage
