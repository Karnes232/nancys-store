import { fallbackLng } from "@/i18n/settings"
import ThankYouPage from "../[lang]/thankyou/page"
import { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  // Reuse the same metadata generation from [lang]/page.tsx
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/thankyou/page"
  )
  return langGenerateMetadata({
    params: Promise.resolve({ lang: fallbackLng }),
    searchParams: Promise.resolve({}),
  })
}

interface RootPageProps {
  params: Promise<{}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RootPage({
  params,
  searchParams,
}: RootPageProps) {
  const pageParams = {
    lang: fallbackLng,
  }

  return (
    <ThankYouPage
      params={Promise.resolve(pageParams)}
      searchParams={Promise.resolve({})}
    />
  )
}
