import { fallbackLng } from "@/i18n/settings"
import HomePage from "./[lang]/page"
import { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  const { generateMetadata: langGenerateMetadata } = await import(
    "./[lang]/page"
  )
  return langGenerateMetadata({
    params: { lang: fallbackLng },
  })
}

export async function generateStaticParams() {
  return [{}] // Empty object as this is the root route
}

export const dynamic = "force-static"
export const revalidate = false

export default function RootPage() {
  // Pass the resolved value, not the Promise itself
  return <HomePage params={{ lang: fallbackLng }} />
}