import { fallbackLng } from "@/i18n/settings"
import AboutUsPage from "../[lang]/about-us/page"
import { Metadata } from "next"

// Generate metadata for the root (English) version
export async function generateMetadata(): Promise<Metadata> {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/about-us/page"
  )
  return langGenerateMetadata({
    params: { lang: fallbackLng }
  })
}

// Root page component
export default async function RootPage() {
  return <AboutUsPage params={{ lang: fallbackLng }} />
}
