import { fallbackLng } from "@/i18n/settings"
import { Metadata } from "next"
import AboutUsPage from "../[lang]/about-us/page"

export const generateMetadata = async (): Promise<Metadata> => {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/about-us/page"
  )
  return langGenerateMetadata({
    params: { lang: fallbackLng },
  })
}

export async function generateStaticParams() {
  return [{}] // Empty object as this is the root route
}

// export const dynamic = "force-static"
// export const revalidate = false

export default function RootPage() {
  // Pass the resolved value, not the Promise
  return <AboutUsPage params={{ lang: fallbackLng }} />
}
