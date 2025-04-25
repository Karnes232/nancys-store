import { fallbackLng } from "@/i18n/settings"
import ThankYouPage from "../[lang]/thankyou/page"
import { Metadata } from "next"

export default async function RootPage({ 
  searchParams 
}: { 
  searchParams?: { [key: string]: string | string[] } 
}) {
  const params = Promise.resolve({ lang: fallbackLng })
  
  return (
    <ThankYouPage
      params={params}
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