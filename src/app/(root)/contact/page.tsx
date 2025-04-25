import { fallbackLng } from "@/i18n/settings"
import { Metadata } from "next"
import ContactPage from "../[lang]/contact/page"

export async function generateMetadata(): Promise<Metadata> {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/contact/page"
  )
  return langGenerateMetadata({
    params: { lang: fallbackLng }
  })
}

export default function RootPage() {
  return <ContactPage params={{ lang: fallbackLng }} />
}