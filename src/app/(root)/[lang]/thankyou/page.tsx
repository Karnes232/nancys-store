import React from "react"
import { PageData } from "@/types/sanity.types"
import { client } from "@/sanity/lib/client"
import { getTranslation } from "@/i18n"
import HeroSwiper from "@/components/HeroComponent/HeroSwiper"
import { Metadata } from "next"
import imageUrlBuilder from "@sanity/image-url"

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

async function getCompanyEmail() {
  const query = `
      *[_type == "generalLayout"][0] {
        email
      }
    `
  return await client.fetch(query)
}

// Define the correct interface for the page props
interface PageProps {
  params: { lang: string }
  searchParams?: { [key: string]: string | string[] }
}

const ThankYouPage = async ({ params, searchParams }: PageProps) => {
  const { lang } = params
  const name = searchParams?.name as string | undefined
  
  const [pageData, { t }, email] = await Promise.all([
    getContactPageContent(),
    getTranslation(lang),
    getCompanyEmail(),
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
      <div className="flex flex-col items-center justify-center max-w-xs xl:max-w-sm mx-auto min-h-[40vh] xl:min-h-[50vh]">
        <div className="mb-10">
          <div className="flex flex-col justify-center items-center text-slate-600 ">
            <div className="text-2xl xl:text-4xl font-serif text-center mt-6">
              {t("ThankYouPage.thank_you_message", { name: name || '' })}
            </div>

            <div className="text-center text-sm xl:text-base mt-2 xl:mt-6">
              {t("ThankYouPage.contact_follow_up")}{" "}
              <a
                href={`mailto:${email.email}`}
                aria-label="Gmail"
                rel="noreferrer"
                className="underline"
              >
                {t("ThankYouPage.contact_us")}
              </a>{" "}
              {t("ThankYouPage.with_questions")}
            </div>
          </div>
        </div>
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
      canonical: lang === "en" ? "/thankyou" : `/${lang}/thankyou`,
      languages: {
        en: "/thankyou",
        es: "/es/thankyou",
      },
    },
  }
}

export default ThankYouPage