import { fallbackLng } from "@/i18n/settings"

import { Metadata } from "next"
// import ContactPage from "../[lang]/contact/page
import ProductPage from "../../[lang]/products/[slug]/page"

// export const generateMetadata = async (): Promise<Metadata> => {
//   // Reuse the same metadata generation from [lang]/page.tsx
//   const { generateMetadata: langGenerateMetadata } = await import(
//     "../[lang]/contact/page"
//   )
//   return langGenerateMetadata({
//     params: Promise.resolve({ lang: fallbackLng }),
//   })
// }

interface RootPageProps {
  params: {
    slug: string
  }
}

export default async function RootPage({ params }: RootPageProps) {
  const pageParams = {
    lang: fallbackLng,
    slug: params.slug
  }
  
  // @ts-ignore - Temporarily ignore type checking for this line
  return <ProductPage params={pageParams} />
}
