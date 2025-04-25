import { fallbackLng } from "@/i18n/settings"
import HomePage from "./[lang]/page"
import { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  // Import the language-specific metadata generation function
  const { generateMetadata: langGenerateMetadata } = await import(
    "./[lang]/page"
  )
  // Pass params as an object, not a Promise
  return langGenerateMetadata({
    params: { lang: fallbackLng },
  })
}

export default function RootPage() {
  // Pass params as an object, not a Promise
  return <HomePage params={{ lang: fallbackLng }} />
}


// import { fallbackLng } from "@/i18n/settings"
// import HomePage from "./[lang]/page"
// import { Metadata } from "next"

// export const generateMetadata = async (): Promise<Metadata> => {
//   // Reuse the same metadata generation from [lang]/page.tsx
//   const { generateMetadata: langGenerateMetadata } = await import(
//     "./[lang]/page"
//   )
//   return langGenerateMetadata({
//     params: Promise.resolve({ lang: fallbackLng }),
//   })
// }

// export default async function RootPage() {
//   // Reuse the same page component with the default language
//   return <HomePage params={Promise.resolve({ lang: fallbackLng })} />
// }
