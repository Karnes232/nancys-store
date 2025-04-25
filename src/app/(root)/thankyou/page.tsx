import { fallbackLng } from "@/i18n/settings"
import ThankYouPage from "../[lang]/thankyou/page"
import { Metadata } from "next"

// Remove searchParams from props since this is a static page
export default function RootPage() {
  return (
    <ThankYouPage
      params={{ lang: fallbackLng }}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/thankyou/page"
  )
  
  return langGenerateMetadata({
    params: { lang: fallbackLng }
  })
}