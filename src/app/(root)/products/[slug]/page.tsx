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

export default async function RootPage() {
  // Reuse the same page component with the default language
  return <ProductPage params={{ lang: fallbackLng, slug: "test" }} />
}
