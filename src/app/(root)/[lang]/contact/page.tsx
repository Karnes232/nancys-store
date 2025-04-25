import { client } from "@/sanity/lib/client"
import React from "react"
import { getTranslation } from "@/i18n"
import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"
import { PageData } from "@/types/sanity.types"
import ContactForm from "@/components/ContactFormComponents/ContactForm"

// Add static paths generation for SSG
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
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
  params: { lang: string }
}

const ContactPage = async ({ params }: PageProps) => {
  const { lang } = params

  const [pageData, { t }] = await Promise.all([
    getContactPageContent(),
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
      <div className="bg-white dark:bg-black h-screen">
        <ContactForm />
      </div>
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { lang } = params
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

export default ContactPage