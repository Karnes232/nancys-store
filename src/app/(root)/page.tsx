import { fallbackLng } from "@/i18n/settings"
import HomePage from "./[lang]/page"
import { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  // Reuse the same metadata generation from [lang]/page.tsx
  const { generateMetadata: langGenerateMetadata } = await import(
    "./[lang]/page"
  )
  return langGenerateMetadata({
    params: Promise.resolve({ lang: fallbackLng }),
  })
}

export async function generateStaticParams() {
  return [{}] // Empty object as this is the root route
}

export const dynamic = "force-static"
export const revalidate = false // or a number in seconds if you want ISR

export default async function RootPage() {
  // Reuse the same page component with the default language
  return <HomePage params={Promise.resolve({ lang: fallbackLng })} />
}
