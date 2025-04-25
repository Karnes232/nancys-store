import { fallbackLng } from "@/i18n/settings"
import ThankYouPage, { PageProps } from "../[lang]/thankyou/page"
import { Metadata } from "next"

// Use the imported PageProps type
export default function RootPage(props: PageProps) {
  return (
    <ThankYouPage
      params={{ lang: fallbackLng }}
      searchParams={props.searchParams}
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