import { fallbackLng } from "@/i18n/settings"
import ThankYouPage from "../[lang]/thankyou/page"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/thankyou/page"
  )
  
  // The imported generateMetadata function is async, so we need to await its result
  return await langGenerateMetadata({
    params: { lang: fallbackLng }
  })
}

interface RootPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RootPage({ searchParams }: RootPageProps) {
  return (
    <ThankYouPage
      params={{ lang: fallbackLng }}
      searchParams={searchParams}
    />
  )
}