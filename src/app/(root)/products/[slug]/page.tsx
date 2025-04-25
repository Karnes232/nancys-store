import { fallbackLng } from "@/i18n/settings"
import ProductPage, { PageProps } from "../../[lang]/products/[slug]/page"
import { Metadata } from "next"

interface RootPageProps {
  params: Promise<{
    slug: string
  }>
}

export const generateMetadata = async ({
  params,
}: RootPageProps): Promise<Metadata> => {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../../[lang]/products/[slug]/page"
  )
  const { slug } = await params
  return langGenerateMetadata({
    params: Promise.resolve({ lang: fallbackLng, slug: slug }),
  })
}

export default async function RootPage({ params }: RootPageProps) {
  const { slug } = await params
  const pageParams = {
    lang: fallbackLng,
    slug: slug,
  }

  return <ProductPage params={Promise.resolve(pageParams)} />
}
