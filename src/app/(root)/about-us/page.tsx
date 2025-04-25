import { fallbackLng } from "@/i18n/settings"

import { Metadata } from "next"
import AboutUsPage from "../[lang]/about-us/page"

export const generateMetadata = async (): Promise<Metadata> => {
  // Reuse the same metadata generation from [lang]/page.tsx
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/about-us/page"
  )
  return langGenerateMetadata({
    params: Promise.resolve({ lang: fallbackLng }),
  })
}

export default async function RootPage() {
  // Reuse the same page component with the default language
  return <AboutUsPage params={Promise.resolve({ lang: fallbackLng })} />
}
