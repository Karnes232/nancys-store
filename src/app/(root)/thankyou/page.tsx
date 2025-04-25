import { fallbackLng } from "@/i18n/settings"
import ThankYouPage from "../[lang]/thankyou/page"
import { Metadata } from "next"

// Update the RootPageProps interface to match PageProps
interface RootPageProps {
  params: { lang: string }
  searchParams?: { [key: string]: string | string[] }
}

export async function generateMetadata(): Promise<Metadata> {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/thankyou/page"
  )
  
  // Fix: Only pass the params object that the function is expecting
  return langGenerateMetadata({
    params: { lang: fallbackLng }
  })
}

export default function RootPage({ searchParams }: RootPageProps) {
  return (
    <ThankYouPage
      params={{ lang: fallbackLng }}
      searchParams={searchParams}
    />
  )
}