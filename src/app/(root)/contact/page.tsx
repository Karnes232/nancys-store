import { fallbackLng } from "@/i18n/settings"

import { Metadata } from "next"
import ContactPage from "../[lang]/contact/page"

export const generateMetadata = async (): Promise<Metadata> => {
  // Reuse the same metadata generation from [lang]/page.tsx
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/contact/page"
  )
  return langGenerateMetadata({
    params: Promise.resolve({ lang: fallbackLng }),
  })
}

export async function generateStaticParams() {
  return [{}] // Empty object as this is the root route
}

export const dynamic = 'force-static'
export const revalidate = false  // or a number in seconds if you want ISR


export default async function RootPage() {
  // Reuse the same page component with the default language
  return <ContactPage params={Promise.resolve({ lang: fallbackLng })} />
}
