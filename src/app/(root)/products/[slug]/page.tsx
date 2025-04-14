import { fallbackLng } from "@/i18n/settings"
import ProductPage, { PageProps } from "../../[lang]/products/[slug]/page"

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
  params: Promise<{
    slug: string
  }>
}

export default async function RootPage({ params }: RootPageProps) {
  const { slug } = await params
  const pageParams = {
    lang: fallbackLng,
    slug: slug
  }
  
  return <ProductPage params={Promise.resolve(pageParams)} />
}
