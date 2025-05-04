import { fallbackLng } from "@/i18n/settings"
import { Metadata } from "next"
import PhotoGalleryPage from "../[lang]/photo-gallery/page"

export const generateMetadata = async (): Promise<Metadata> => {
  const { generateMetadata: langGenerateMetadata } = await import(
    "../[lang]/photo-gallery/page"
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
  // Pass the resolved value, not the Promise
  return <PhotoGalleryPage params={{ lang: fallbackLng }} />
}
