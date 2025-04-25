import { fallbackLng } from "@/i18n/settings"
import ThankYouPage from "../[lang]/thankyou/page"
import { Metadata } from "next"

// Define a simpler interface for the root page
type RootPageProps = {
  searchParams?: { [key: string]: string | string[] }
}

export default async function RootPage({ searchParams }: RootPageProps) {
  return (
    <ThankYouPage
      params={{ lang: fallbackLng }}
      searchParams={searchParams}
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