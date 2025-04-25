import { fallbackLng } from "@/i18n/settings"
import { Metadata } from "next"
import CartPage from "../[lang]/cart/page"

export async function generateMetadata(): Promise<Metadata> {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/cart/page"
  )
  return langGenerateMetadata({
    params: { lang: fallbackLng }
  })
}

export default function RootPage() {
  return <CartPage params={{ lang: fallbackLng }} />
}